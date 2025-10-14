let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

export const sessionManager = {
  get: (key?: string) => {
    if (typeof window === 'undefined') return key ? undefined : {};
    try {
      let data = {};
      const sessionData = sessionStorage.getItem('tokens');

      if (sessionData) {
        data = JSON.parse(sessionData);
      } else {
        const localData = localStorage.getItem('tokens');
        if (localData) {
          data = JSON.parse(localData);
          sessionStorage.setItem('tokens', localData); // Sync to sessionStorage
        }
      }

      return key ? (data as any)[key] : data;
    } catch (error) {
      console.error('Session get failed:', error);
      return key ? undefined : {};
    }
  },

  set: (key: string, value: any, rememberMe: boolean = false) => {
    if (typeof window === 'undefined') return false;
    if (!key || value === undefined) return false;

    try {
      const session = sessionManager.get();
      (session as any)[key] = value;
      const sessionStr = JSON.stringify(session);

      sessionStorage.setItem('tokens', sessionStr);

      if (rememberMe || localStorage.getItem('rememberMe') === 'true') {
        localStorage.setItem('tokens', sessionStr);
        localStorage.setItem('rememberMe', 'true');
      }

      return true;
    } catch (error) {
      console.error('Session set failed:', key, error);
      return false;
    }
  },

  setSession: (tokens: any, rememberMe: boolean = false) => {
    if (typeof window === 'undefined') return false;

    try {
      const sessionStr = JSON.stringify(tokens);
      sessionStorage.setItem('tokens', sessionStr);

      if (rememberMe || localStorage.getItem('rememberMe') === 'true') {
        localStorage.setItem('tokens', sessionStr);
        localStorage.setItem('rememberMe', 'true');
      }

      return true;
    } catch (error) {
      console.error('Session set failed:', error);
      return false;
    }
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('tokens');
      localStorage.removeItem('tokens');
      localStorage.removeItem('rememberMe');

      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
      }
    }
  },

  isTokenExpired: (token: string) => {
    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) return true;
      const payload = JSON.parse(atob(payloadPart));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },

  getTokenExpiry: (token: string) => {
    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) return 0;
      const payload = JSON.parse(atob(payloadPart));
      return payload?.exp ? payload.exp * 1000 : 0;
    } catch {
      return 0;
    }
  },

  scheduleSmartRefresh: (idToken: string, refreshCallback: () => Promise<void>) => {
    if (typeof window === 'undefined') return;

    if (refreshTimeout) clearTimeout(refreshTimeout);

    const expiresAt = sessionManager.getTokenExpiry(idToken);
    if (!expiresAt || expiresAt < Date.now()) {
      console.warn('Token expiry invalid or already expired. Skipping refresh scheduling.');
      return;
    }

    const refreshTime = expiresAt - Date.now() - 5 * 60 * 1000; // 5 mins before expiry
    const delay = Math.max(refreshTime, 60000); // At least 1 min

    console.log(`Token will refresh in ${Math.round(delay / 60000)} minutes`);

    refreshTimeout = setTimeout(async () => {
      try {
        console.log('Executing scheduled token refresh');
        await refreshCallback();

        // Always re-schedule using latest token, even if unchanged
        const latestIdToken = sessionManager.get('id_token');
        if (latestIdToken) {
          sessionManager.scheduleSmartRefresh(latestIdToken, refreshCallback);
        } else {
          console.warn('No ID token available after refresh. Not rescheduling.');
        }
      } catch (error) {
        console.error('Smart refresh failed:', error);
      }
    }, delay);
  }
};
