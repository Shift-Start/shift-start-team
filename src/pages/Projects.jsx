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

  // ألوان الذهب والفضة (تدرجات ناعمة)
  const colors = {
    goldDark: '#bfa951',
    goldMedium: '#dbba45',
    goldLight: '#f4d580',
    silverDark: '#7a6e4e',
    silverLight: '#f4f1df',
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getAll();
        setProjects(response.data.data || []);
        setError(null);
      } catch (err) {
        const errorInfo = handleApiError(err);
        setError(errorInfo.message);
        // بيانات افتراضية في حال خطأ API
        setProjects([
           {
    id: 1,
    title: {
      ar: 'متجر إلكتروني متكامل',
      en: 'Complete E-commerce Store',
    },
    description: {
      ar: 'منصة تجارة إلكترونية شاملة مع نظام دفع متقدم وإدارة المخزون',
      en: 'Comprehensive e-commerce platform with advanced payment system and inventory management',
    },
    image: '/api/placeholder/600/400',
    category: 'ecommerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    url: 'https://example.com',
    github: 'https://github.com/example',
    featured: true,
  },
  {
    id: 2,
    title: {
      ar: 'تطبيق إدارة المهام',
      en: 'Task Management App',
    },
    description: {
      ar: 'تطبيق موبايل لإدارة المهام والمشاريع مع ميزات التعاون الجماعي',
      en: 'Mobile app for task and project management with team collaboration features',
    },
    image: '/api/placeholder/600/400',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Redux'],
    url: 'https://example.com',
    featured: false,
  },
  {
    id: 3,
    title: {
      ar: 'موقع شركة تقنية',
      en: 'Tech Company Website',
    },
    description: {
      ar: 'موقع ويب حديث لشركة تقنية مع تصميم متجاوب وأداء عالي',
      en: 'Modern website for tech company with responsive design and high performance',
    },
    image: '/api/placeholder/600/400',
    category: 'website',
    technologies: ['Vue.js', 'Nuxt.js', 'TailwindCSS'],
    url: 'https://example.com',
    featured: true,
  },
  {
    id: 4,
    title: {
      ar: 'نظام إدارة المحتوى',
      en: 'Content Management System',
    },
    description: {
      ar: 'نظام إدارة محتوى مخصص للمؤسسات مع واجهة إدارة متقدمة',
      en: 'Custom content management system for institutions with advanced admin interface',
    },
    image: '/api/placeholder/600/400',
    category: 'website',
    technologies: ['Laravel', 'Vue.js', 'MySQL'],
    url: 'https://example.com',
    featured: false,
  },
  {
    id: 5,
    title: {
      ar: 'تطبيق التوصيل',
      en: 'Delivery App',
    },
    description: {
      ar: 'تطبيق للتوصيل السريع مع تتبع الطلبات في الوقت الفعلي',
      en: 'Fast delivery app with real-time order tracking',
    },
    image: '/api/placeholder/600/400',
    category: 'mobile',
    technologies: ['Flutter', 'Firebase', 'Google Maps'],
    url: 'https://example.com',
    featured: true,
  },
  {
    id: 6,
    title: {
      ar: 'موقع مؤسسي',
      en: 'Corporate Website',
    },
    description: {
      ar: 'موقع إلكتروني لمؤسسة كبيرة مع نظام إدارة الأخبار والفعاليات',
      en: 'Corporate website for large institution with news and events management system',
    },
    image: '/api/placeholder/600/400',
    category: 'corporate',
    technologies: ['WordPress', 'PHP', 'MySQL'],
    url: 'https://example.com',
    featured: false,
  }
        ]);
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

  return (
    <>
      <Helmet>
        <title>{t('seo.projects.title')}</title>
        <meta name="description" content={t('seo.projects.description')} />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative py-20"
        style={{
          background: `linear-gradient(to bottom right, ${colors.goldLight}22, ${colors.silverLight}22)`,
        }}
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                background: `linear-gradient(to right, ${colors.goldDark}, ${colors.goldMedium})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('projects.title')}
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: colors.silverDark }}
            >
              {t('projects.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section
        className="section-padding"
        style={{ backgroundColor: colors.silverLight }}
      >
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
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse"
                style={{
                  background:
                    activeFilter === category.key
                      ? `linear-gradient(90deg, ${colors.goldDark}, ${colors.goldMedium})`
                      : 'white',
                  color: activeFilter === category.key
                    ? colors.silverLight
                    : colors.silverDark,
                  boxShadow: activeFilter === category.key
                    ? `0 4px 10px ${colors.goldMedium}aa`
                    : 'none',
                  border: activeFilter === category.key ? `1px solid ${colors.goldMedium}` : `1px solid ${colors.silverDark}`,
                }}
              >
                <span>{category.icon}</span>
                <span>{t(category.labelKey)}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
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
                <div
                  className="card overflow-hidden hover-lift h-full"
                  style={{
                    boxShadow: `0 4px 15px ${colors.goldMedium}88`,
                    border: `1px solid ${colors.goldLight}`,
                    backgroundColor: colors.silverLight,
                  }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={getLocalizedText(project, 'title')}
                      className="w-full h-48 object-cover"
                    />

                    {/* Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(90deg, ${colors.goldDark}cc, ${colors.goldMedium}cc)`,
                      }}
                    >
                      <div className="flex space-x-4 rtl:space-x-reverse">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                            style={{ color: colors.goldDark }}
                          >
                            {/* External Link Icon */}
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
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                            style={{ color: colors.goldDark }}
                          >
                            {/* GitHub Icon */}
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

                    {/* Featured Badge */}
                    {project.featured && (
                      <div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: colors.goldDark,
                          color: colors.silverLight,
                          boxShadow: `0 0 8px ${colors.goldMedium}`,
                        }}
                      >
                        {t('projects.featured')}
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: colors.silverDark }}
                    >
                      {getLocalizedText(project, 'title')}
                    </h3>

                    <p
                      className="mb-4 leading-relaxed"
                      style={{ color: colors.silverDark }}
                    >
                      {getLocalizedText(project, 'description')}
                    </p>

                    {/* Technologies */}
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

                    {/* Action Buttons */}
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      {(project.links?.live || project.url) && (
                        <a
                          href={project.links?.live || project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 rounded-lg text-center text-sm font-medium hover:shadow-lg transition-all duration-300"
                          style={{
                            background: `linear-gradient(90deg, ${colors.goldDark}, ${colors.goldMedium})`,
                            color: colors.silverLight,
                            boxShadow: `0 4px 10px ${colors.goldMedium}aa`,
                          }}
                        >
                          {t('projects.visitSite')}
                        </a>
                      )}
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                        style={{
                          border: `1px solid ${colors.goldMedium}`,
                          color: colors.goldDark,
                          backgroundColor: colors.silverLight,
                        }}
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

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
              style={{ color: colors.silverDark }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">
                {t('projects.noProjectsTitle')}
              </h3>
              <p>
                {t('projects.noProjectsDesc')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="section-padding"
        style={{
          background: `linear-gradient(90deg, ${colors.goldDark}, ${colors.goldMedium})`,
          color: colors.silverLight,
        }}
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('projects.ctaTitle')}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {t('projects.ctaDesc')}
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-semibold text-lg inline-block"
              style={{
                backgroundColor: colors.silverLight,
                color: colors.goldDark,
                boxShadow: `0 4px 10px ${colors.goldMedium}aa`,
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.goldLight)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.silverLight)}
            >
              {t('projects.ctaButton')}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;
