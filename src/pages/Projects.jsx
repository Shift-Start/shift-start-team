import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsAPI, handleApiError } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Projects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>{t('seo.projects.title')}</title>
        <meta name="description" content={t('seo.projects.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden dark:bg-[#0a0e1a]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-white to-brand-purple/5 dark:from-brand-cyan/5 dark:via-[#0a0e1a] dark:to-brand-purple/5"></div>
        <div className="absolute inset-0 grid-bg"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-[15%] w-72 h-72 bg-brand-cyan/10 dark:bg-brand-cyan/5 rounded-full blur-3xl blob animate-float"></div>
          <div className="absolute bottom-1/3 right-[10%] w-80 h-80 bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-3xl blob animate-float-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 dark:bg-brand-cyan/10 border border-brand-blue/20 dark:border-brand-cyan/20 text-brand-blue dark:text-brand-cyan text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                {t('projects.title')}
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 gradient-text-animate"
            >
              {t('projects.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {t('projects.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid Section */}
      <section ref={gridRef} className="section-padding dark:bg-[#0a0e1a] section-dark-mesh relative">
        <div className="container-custom">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse overflow-hidden ${
                  activeFilter === category.key
                    ? 'text-white shadow-lg shadow-brand-blue/25'
                    : 'bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2332] border border-gray-200 dark:border-[#1e293b] hover:border-brand-cyan/30 dark:hover:border-brand-cyan/20'
                }`}
              >
                {activeFilter === category.key && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 btn-gradient"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.icon}</span>
                <span className="relative z-10">{t(`projects.categories.${category.key}`)}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={fadeInScale}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <div className="card overflow-hidden hover-glow h-full transition-all duration-500 dark:border-[#1e293b] dark:hover:border-brand-cyan/20">
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-52 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-[#111827] dark:to-[#1a2332] flex items-center justify-center"
                      >
                        <span className="text-6xl opacity-30">🖼️</span>
                      </motion.div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6">
                        <div className="flex space-x-3 rtl:space-x-reverse">
                          {project.url && (
                            <motion.a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ scale: 1.1 }}
                              className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-blue hover:bg-white transition-all duration-300 shadow-lg"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </motion.a>
                          )}
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ scale: 1.1 }}
                              className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-blue hover:bg-white transition-all duration-300 shadow-lg"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {project.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan/90 text-white backdrop-blur-sm shadow-lg">
                          ⭐ مميز
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors duration-300">
                        {project.title?.ar || project.title || project.titleEn}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm line-clamp-2">
                        {project.description?.ar || project.description || project.descriptionEn}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="tech-badge text-xs"
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
                            className="flex-1 btn-gradient text-white py-2.5 px-4 rounded-xl text-center text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <span className="relative z-10">{t('projects.visitSite')}</span>
                          </a>
                        )}
                        <button className="px-4 py-2.5 border border-gray-200 dark:border-[#1e293b] text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#1a2332] hover:border-brand-cyan/30 dark:hover:border-brand-cyan/20 transition-all duration-300">
                          {t('projects.viewProject')}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
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
      <section ref={ctaRef} className="section-padding dark:bg-[#0a0e1a] relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-90"></div>
        <div className="absolute inset-0 grid-bg opacity-20"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-white/20"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                هل أعجبتك أعمالنا؟
              </h2>
              <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
                نحن مستعدون لتحويل فكرتك إلى مشروع ناجح. تواصل معنا اليوم ولنبدأ العمل على مشروعك القادم
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-brand-blue px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                ابدأ مشروعك معنا
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;
