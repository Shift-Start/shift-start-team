import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../contexts/AppContext';

const Header = () => {
  const { t } = useTranslation();
  const { darkMode, setDarkMode, language, setLanguage, sidebarOpen, toggleSidebar } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'team', path: '/team' },
    { key: 'projects', path: '/projects' },
    { key: 'contact', path: '/contact' },
  ];

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'ar' ? 'en' : 'ar');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gold-500 to-silver-400 bg-clip-text text-transparent">
                Shift Start
              </h1>
              <p className="text-sm text-silver-500 dark:text-silver-300">
                {language === 'ar' ? 'نقطة تحول' : 'Turning Point'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`transition-colors ${
                  location.pathname === item.path
                    ? 'text-gold-500 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gold-400'
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gold-100/50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'EN' : 'عر'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gold-100/50 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-silver-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gold-100/50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                    sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                    sidebarOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                    sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            sidebarOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 border-t border-silver-300 dark:border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => toggleSidebar()}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gold-100 text-gold-700 dark:bg-gold-600/20 dark:text-gold-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gray-800'
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;