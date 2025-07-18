import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { teamAPI, projectsAPI, contactAPI, authAPI, handleApiError } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
// مكونات الإدارة (سيتم إنشاؤها لاحقًا)
// import TeamAdmin from '../components/admin/TeamAdmin';
// import ProjectsAdmin from '../components/admin/ProjectsAdmin';
// import ContactAdmin from '../components/admin/ContactAdmin';

const Admin = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    team: { total: 0, active: 0 },
    projects: { total: 0, featured: 0 },
    contacts: { total: 0, new: 0 }
  });
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authAPI.checkStatus();
      if (response.data.authenticated && response.data.user?.role === 'admin') {
        setUser(response.data.user);
        setIsAuthenticated(true);
        fetchStats();
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login(loginForm);
      if (response.data.data.user.role === 'admin') {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        fetchStats();
      } else {
        alert(t('admin.no_permission'));
      }
    } catch (error) {
      alert(t('admin.login_failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      alert(t('admin.logout_failed'));
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [teamStats, projectStats, contactStats] = await Promise.all([
        teamAPI.getStats(),
        projectsAPI.getStats(),
        contactAPI.getStats()
      ]);
      setStats({
        team: teamStats.data.data,
        projects: projectStats.data.data,
        contacts: contactStats.data.data
      });
    } catch (error) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Helmet>
          <title>{t('admin.title')} - Shift Start</title>
        </Helmet>
        <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="text-center">
            <img src="/images/logo.png" alt="logo" className="mx-auto mb-4 w-20" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('admin.title')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('admin.login_prompt')}
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.email')}
              </label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="admin@shiftstart.sy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.password')}
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gradient text-white py-2 px-4 rounded-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? t('admin.logging_in') : t('admin.login')}
            </button>
          </form>
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => i18n.changeLanguage('ar')} className="px-2 py-1 rounded bg-gray-200">عربي</button>
            <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 rounded bg-gray-200">EN</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>{t('admin.title')} - Shift Start</title>
      </Helmet>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center py-8">
            <img src="/images/logo.png" alt="logo" className="w-20 mb-4" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Shift Start</h1>
          </div>
          <nav className="flex flex-col gap-2 px-4">
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-brand-red text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{t('admin.dashboard')}</button>
            <button onClick={() => setActiveTab('team')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'team' ? 'bg-brand-red text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{t('admin.team')}</button>
            <button onClick={() => setActiveTab('projects')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-brand-red text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{t('admin.projects')}</button>
            <button onClick={() => setActiveTab('contacts')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'contacts' ? 'bg-brand-red text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{t('admin.contacts')}</button>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-2 py-4">
          <button onClick={() => i18n.changeLanguage('ar')} className="px-2 py-1 rounded bg-gray-200">عربي</button>
          <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 rounded bg-gray-200">EN</button>
          <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">{t('admin.logout')}</button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('admin.title')}</h2>
          <span className="text-gray-600 dark:text-gray-400">{t('admin.welcome')}, {user?.name}</span>
        </div>
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <span className="inline-block w-8 h-8 bg-blue-500 rounded-full mr-4"></span>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.team_members')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.team.active} / {stats.team.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <span className="inline-block w-8 h-8 bg-green-500 rounded-full mr-4"></span>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.projects')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.projects.featured} / {stats.projects.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <span className="inline-block w-8 h-8 bg-purple-500 rounded-full mr-4"></span>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.new_contacts')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.contacts.new} / {stats.contacts.total}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Team Management */}
        {activeTab === 'team' && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            {/* <TeamAdmin /> */}
            <p className="text-gray-600 dark:text-gray-400 text-center">{t('admin.team_coming_soon')}</p>
          </div>
        )}
        {/* Projects Management */}
        {activeTab === 'projects' && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            {/* <ProjectsAdmin /> */}
            <p className="text-gray-600 dark:text-gray-400 text-center">{t('admin.projects_coming_soon')}</p>
          </div>
        )}
        {/* Contacts Management */}
        {activeTab === 'contacts' && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            {/* <ContactAdmin /> */}
            <p className="text-gray-600 dark:text-gray-400 text-center">{t('admin.contacts_coming_soon')}</p>
          </div>
        )}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <LoadingSpinner />
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;