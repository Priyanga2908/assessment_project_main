// Server-side error logger to capture uncaught exceptions and unhandled rejections
// Imported from the root layout so it runs in the Next.js server process during dev.
if (typeof process !== 'undefined' && process && typeof process.on === 'function') {
  try {
    process.on('uncaughtException', (err: any) => {
      // eslint-disable-next-line no-console
      console.error('UNCAUGHT_EXCEPTION:', err && err.stack ? err.stack : err);
    });

    process.on('unhandledRejection', (reason: any) => {
      // eslint-disable-next-line no-console
      console.error('UNHANDLED_REJECTION:', reason && reason.stack ? reason.stack : reason);
    });
  } catch (e) {
    // ignore if process hooks cannot be set
  }
}
