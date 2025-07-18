import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projectsAPI, handleApiError } from '../services/api';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const Projects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
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
        // Fallback to sample data if API fails
        setProjects([
    {
      id: 1,
      title: 'متجر إلكتروني متكامل',
      titleEn: 'Complete E-commerce Store',
      description: 'منصة تجارة إلكترونية شاملة مع نظام دفع متقدم وإدارة المخزون',
      descriptionEn: 'Comprehensive e-commerce platform with advanced payment system and inventory management',
      image: '/api/placeholder/600/400',
      category: 'ecommerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      url: 'https://example.com',
      github: 'https://github.com/example',
      featured: true,
    },
    {
      id: 2,
      title: 'تطبيق إدارة المهام',
      titleEn: 'Task Management App',
      description: 'تطبيق موبايل لإدارة المهام والمشاريع مع ميزات التعاون الجماعي',
      descriptionEn: 'Mobile app for task and project management with team collaboration features',
      image: '/api/placeholder/600/400',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux'],
      url: 'https://example.com',
      featured: false,
    },
    {
      id: 3,
      title: 'موقع شركة تقنية',
      titleEn: 'Tech Company Website',
      description: 'موقع ويب حديث لشركة تقنية مع تصميم متجاوب وأداء عالي',
      descriptionEn: 'Modern website for tech company with responsive design and high performance',
      image: '/api/placeholder/600/400',
      category: 'website',
      technologies: ['Vue.js', 'Nuxt.js', 'TailwindCSS'],
      url: 'https://example.com',
      featured: true,
    },
    {
      id: 4,
      title: 'نظام إدارة المحتوى',
      titleEn: 'Content Management System',
      description: 'نظام إدارة محتوى مخصص للمؤسسات مع واجهة إدارة متقدمة',
      descriptionEn: 'Custom content management system for institutions with advanced admin interface',
      image: '/api/placeholder/600/400',
      category: 'website',
      technologies: ['Laravel', 'Vue.js', 'MySQL'],
      url: 'https://example.com',
      featured: false,
    },
    {
      id: 5,
      title: 'تطبيق التوصيل',
      titleEn: 'Delivery App',
      description: 'تطبيق للتوصيل السريع مع تتبع الطلبات في الوقت الفعلي',
      descriptionEn: 'Fast delivery app with real-time order tracking',
      image: '/api/placeholder/600/400',
      category: 'mobile',
      technologies: ['Flutter', 'Firebase', 'Google Maps'],
      url: 'https://example.com',
      featured: true,
    },
    {
      id: 6,
      title: 'موقع مؤسسي',
      titleEn: 'Corporate Website',
      description: 'موقع إلكتروني لمؤسسة كبيرة مع نظام إدارة الأخبار والفعاليات',
      descriptionEn: 'Corporate website for large institution with news and events management system',
      image: '/api/placeholder/600/400',
      category: 'corporate',
      technologies: ['WordPress', 'PHP', 'MySQL'],
      url: 'https://example.com',
      featured: false,
    },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { key: 'all', icon: '🌐' },
    { key: 'website', icon: '💻' },
    { key: 'mobile', icon: '📱' },
    { key: 'ecommerce', icon: '🛒' },
    { key: 'corporate', icon: '🏢' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />;
  }

  const getTechColor = (tech) => {
    const colors = {
      React: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
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
    return colors[tech] || colors.default;
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.projects.title')}</title>
        <meta name="description" content={t('seo.projects.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-red/10 via-brand-pink/10 to-brand-purple/10 dark:from-brand-red/5 dark:via-brand-pink/5 dark:to-brand-purple/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('projects.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
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
                    ? 'bg-brand-gradient text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <span>{category.icon}</span>
                <span>{t(`projects.categories.${category.key}`)}</span>
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
                <div className="card overflow-hidden hover-lift h-full">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                      <span className="text-6xl opacity-50">🖼️</span>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4 rtl:space-x-reverse">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-red hover:scale-110 transition-transform duration-300"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-red hover:scale-110 transition-transform duration-300"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                        مميز
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {project.title?.ar || project.title || project.titleEn}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {project.description?.ar || project.description || project.descriptionEn}
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
                          className="flex-1 bg-brand-gradient text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:shadow-lg transition-all duration-300"
                        >
                          {t('projects.visitSite')}
                        </a>
                      )}
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
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
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                لا توجد مشاريع
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                لا توجد مشاريع في هذه الفئة حالياً
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-brand-gradient text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              هل أعجبتك أعمالنا؟
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              نحن مستعدون لتحويل فكرتك إلى مشروع ناجح. تواصل معنا اليوم ولنبدأ العمل على مشروعك القادم
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-block"
            >
              ابدأ مشروعك معنا
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;