import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projectsAPI, handleApiError } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lang = i18n.language;

  // استدعاء الـ API وتحميل المشاريع
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getAll();
        setProjects(response.data.data || []);
        setError(null); // مسح أي خطأ سابق عند النجاح
      } catch (err) {
        handleApiError(err);
        setError('حدث خطأ أثناء جلب البيانات'); // رسالة الخطأ عند الفشل
        setProjects([]); // إفراغ المشاريع عند الخطأ
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { key: 'all', icon: '🌐', labelKey: 'projects.categories.all' },
    { key: 'website', icon: '💻', labelKey: 'projects.categories.website' },
    { key: 'mobile', icon: '📱', labelKey: 'projects.categories.mobile' },
    { key: 'ecommerce', icon: '🛒', labelKey: 'projects.categories.ecommerce' },
    { key: 'corporate', icon: '🏢', labelKey: 'projects.categories.corporate' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // عرض رسالة خطأ إذا حدث خطأ
  if (error) {
    return (
      <div className="text-center py-16 text-red-600 text-xl font-semibold">
        {error}
      </div>
    );
  }

  // عرض المكون التحميل أثناء التحميل
  if (loading) {
    return <LoadingSpinner />;
  }

  const getTechColor = (tech) => {
    const colorsTech = {
      React: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Vue.js': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      MongoDB: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      Firebase: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      Laravel: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      Flutter: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'React Native': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      TailwindCSS: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
      TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return colorsTech[tech] || colorsTech.default;
  };

  const getLocalizedText = (item, field) => {
    if (!item[field]) return '';
    return item[field][lang] || item[field].en || item[field].ar || '';
  };

  // دالة لإرجاع أيقونة التواصل بناءً على المنصة
  const getSocialIcon = (platform) => {
    const icons = {
      github: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.936 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      dribbble: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.301 3.437 9.799 8.206 11.385.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    };
    return icons[platform] || null;
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.projects.title')}</title>
        <meta name="description" content={t('seo.projects.description')} />
      </Helmet>

      {/* في حال وجود خطأ، يتم عرض رسالة الخطأ فقط */}
      {/* وإذا لم يوجد خطأ، يتم عرض المحتوى */}
      
      {/* حالة الخطأ */}
      {/* ستعرض رسالة خطأ واضحة للمستخدم */}
      
      {/* الحالة الطبيعية */}
      {/* تتضمن ال hero، الفلاتر، والعرض */}
      
      {/* هنا نبدأ بالمحتوى إذا لم يوجد خطأ */}
      {!error && (
        <>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gold-300/10 via-silver-300/10 to-gold-300/10">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-500 to-gold-400 text-transparent bg-clip-text">
                  {t('projects.title')}
                </h1>
                <p className="text-xl max-w-3xl mx-auto text-silver-600">
                  {t('projects.subtitle')}
                </p>
              </motion.div>
            </div>
          </section>

          {/* فلاتر المشاريع */}
          <section className="section-padding bg-silver-300/20">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveFilter(category.key)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse ${
                      activeFilter === category.key
                        ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-400/50 border border-gold-400'
                        : 'bg-white text-silver-600 border border-silver-600'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{t(category.labelKey)}</span>
                  </button>
                ))}
              </motion.div>

              {/* عرض المشاريع */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="card overflow-hidden hover-lift h-full bg-silver-300/20 border border-gold-300 shadow-lg shadow-gold-400/30">
                      {/* صورة المشروع */}
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={getLocalizedText(project, 'title')}
                          className="w-full h-48 object-cover"
                        />

                        {/* التراكب */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center bg-gradient-to-r from-gold-500/80 to-gold-400/80">
                          <div className="flex space-x-4 rtl:space-x-reverse">
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold-500"
                              >
                                {/* أيقونة الموقع الإلكتروني */}
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold-500"
                              >
                                {/* أيقونة Github */}
                                <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* علامة مميزة للمشاريع المميزة */}
                        {project.featured && (
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-gold-500 text-white shadow-sm shadow-gold-400">
                            {t('projects.featured')}
                          </div>
                        )}
                      </div>

                      {/* تفاصيل المشروع */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-silver-600">
                          {getLocalizedText(project, 'title')}
                        </h3>
                        <p className="mb-4 leading-relaxed text-silver-600">
                          {getLocalizedText(project, 'description')}
                        </p>
                        {/* التقنيات المستخدمة */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {/* أزرار الإجراء */}
                        <div className="flex space-x-3 rtl:space-x-reverse">
                          {(project.links?.live || project.url) && (
                            <a
                              href={project.links?.live || project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-4 rounded-lg text-center text-sm font-medium hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-md shadow-gold-400/50"
                            >
                              {t('projects.visitSite')}
                            </a>
                          )}
                          <button
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 border border-gold-400 text-gold-500 bg-silver-300/20 hover:bg-gold-400 hover:text-white"
                            onClick={() => alert(t('projects.viewProject'))}
                          >
                            {t('projects.viewProject')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* حالة عدم وجود مشاريع بعد التصفيه */}
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-silver-600"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t('projects.noProjectsTitle')}
                  </h3>
                  <p>{t('projects.noProjectsDesc')}</p>
                </motion.div>
              )}
            </div>
          </section>

          {/* قسم النداء للتواصل */}
          <section className="section-padding bg-gradient-to-r from-gold-500 to-gold-400 text-white">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('projects.ctaTitle')}</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{t('projects.ctaDesc')}</p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-semibold text-lg inline-block bg-silver-300 text-gold-500 shadow-lg shadow-gold-400/50"
                >
                  {t('projects.ctaButton')}
                </motion.a>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Projects;