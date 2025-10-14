import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, HomeIcon, BellIcon, LogoutIcon, UserCircleIcon, QuestionMarkCircleIcon } from '../../../constants';
import { useRouter } from 'next/navigation';
import LoadingIcon from '../ui/loadingIcon';
import { sessionManager } from '../../lib/session';
import { useAuthStore } from '../../stores/useAuthStore';

interface AiStudioSectionHeaderProps {
  title: string;
  subtitle?: string;
  backgroundColorClasses?: string;
  textColorClasses?: string;
  decorativeIcon?: React.ReactElement<{ className?: string }>;

  // Search bar props
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  
  // Create button props
  showCreateButton?: boolean;
  createButtonText?: string;
  onCreateClick?: () => void;
  
  // Navigation props
  onNavigateHome?: () => void;
}

const AiStudioSectionHeader: React.FC<AiStudioSectionHeaderProps> = ({
  title,
  subtitle,
  backgroundColorClasses = 'bg-gradient-to-r from-slate-800 via-indigo-900 to-purple-900',
  textColorClasses = 'text-white',
  decorativeIcon,
  showSearchBar,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  showCreateButton,
  createButtonText,
  onCreateClick,
  onNavigateHome,
}) => {
  const [loading, setLoading] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const secondaryNavItems = [
    { icon: UserCircleIcon, label: 'Profile' },
    { icon: QuestionMarkCircleIcon, label: 'Help' },
    { icon: BellIcon, label: 'Notifications' },
    { icon: LogoutIcon, label: 'Logout' },
  ];

  function handleLogout() {
    setLoading(true);
    sessionManager.clear();
    clearAuth();
    router.push('/login');
  }

  function handleMenuItemClick(label: string) {
    setIsUserMenuOpen(false);
    if (label === 'Logout') {
      handleLogout();
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <LoadingIcon text='Signing out...' />;
  }
  return (
    <div className="">
      <div className="">
        <div className={`p-6 sm:p-6 relative`} style={{backgroundImage: 'url(/images/backgrounds/ai-image1.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Navigation Icons */}
          <div className="absolute top-4 left-6 z-20">
            <button
              onClick={onNavigateHome}
              aria-label="Home"
              className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm shadow-md hover:bg-primary/30 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <HomeIcon className="w-7 h-7" />
            </button>
          </div>
          
          <div className="absolute top-4 right-4 sm:right-6 z-20">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User Menu"
                className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm shadow-md hover:bg-primary/30 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <UserCircleIcon className="w-7 h-7" />
              </button>
              
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a 
                        href="#" 
                        key={item.label} 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMenuItemClick(item.label);
                        }}
                      >
                        <Icon className="w-4 h-4 mr-3 text-gray-500" />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            <h1 className={`text-3xl sm:text-3xl font-bold tracking-tight ${textColorClasses}`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`mt-2 text-2xl ${textColorClasses} opacity-80 max-w-2xl`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {showSearchBar && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex gap-4 items-center mt-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="search"
                  placeholder={searchPlaceholder || "Search..."}
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 py-3 rounded-lg shadow-sm border border-border  text-foreground placeholder:  focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all text-base placeholder:text-chatbot-base"
                  aria-label={searchPlaceholder || "Search"}
                />
              </div>
              {showCreateButton && (
                <button
                  onClick={onCreateClick}
                  className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 transition-colors duration-200 font-medium whitespace-nowrap text-chatbot-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {createButtonText || "Create New"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStudioSectionHeader;
