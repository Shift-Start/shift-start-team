import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsAPI } from '../services/api';

const Home = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await projectsAPI.getFeatured();
        setFeaturedProjects(response.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      }
    };
    fetchFeaturedProjects();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const AnimatedCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const numericTarget = parseInt(target);
    
    useEffect(() => {
      if (!statsInView) return;
      let start = 0;
      const duration = 2000;
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * numericTarget));
        if (progress >= 1) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    }, [statsInView, numericTarget]);

    return <span className="counter-glow">{count}{suffix}</span>;
  };

  const services = [
    {
      key: 'webDevelopment',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      key: 'webDesign',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      key: 'mobileApps',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      key: 'ecommerce',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-cyan-500',
    },
  ];

  const stats = [
    { number: '50', suffix: '+', key: 'projects', label: 'مشروع مكتمل' },
    { number: '30', suffix: '+', key: 'clients', label: 'عميل سعيد' },
    { number: '5', suffix: '+', key: 'years', label: 'سنوات خبرة' },
    { number: '24', suffix: '/7', key: 'support', label: 'دعم فني' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
      </Helmet>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-white to-brand-purple/5 dark:from-brand-cyan/5 dark:via-[#0a0e1a] dark:to-brand-purple/5"></div>
        
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg"></div>

        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-cyan/10 dark:bg-brand-cyan/5 rounded-full blur-3xl blob animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-3xl blob animate-float-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 dark:bg-brand-blue/3 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 dark:bg-brand-cyan/10 border border-brand-blue/20 dark:border-brand-cyan/20 text-brand-blue dark:text-brand-cyan text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                Professional Software Development
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight"
            >
              <span className="gradient-text-animate">{t('hero.title')}</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/contact"
                className="btn-gradient text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              >
                <span className="relative z-10">{t('hero.cta')}</span>
              </Link>
              <Link
                to="/about"
                className="px-10 py-4 rounded-xl font-semibold text-lg border-2 border-brand-blue/30 dark:border-brand-cyan/30 text-brand-blue dark:text-brand-cyan hover:bg-brand-blue/5 dark:hover:bg-brand-cyan/5 hover:border-brand-blue dark:hover:border-brand-cyan transition-all duration-500"
              >
                {t('hero.learnMore')}
              </Link>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex flex-wrap gap-3 justify-center"
            >
              {['React', 'Node.js', 'TypeScript', 'MongoDB', 'AI/ML', 'Cloud'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="tech-badge"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-brand-blue/30 dark:border-brand-cyan/30 rounded-full flex justify-center"
          >
            <div className="w-1.5 h-3 bg-brand-blue dark:bg-brand-cyan rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section ref={ref} className="section-padding bg-gray-50/50 dark:bg-[#0a0e1a] section-dark-mesh relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span variants={fadeInUp} className="text-brand-blue dark:text-brand-cyan text-sm font-semibold uppercase tracking-wider">
              {t('services.subtitle')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mt-4 gradient-text"
            >
              {t('services.title')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                variants={fadeInScale}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="card p-8 text-center h-full hover-glow relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.06] transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(`services.${service.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-90"></div>
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center text-white"
              >
                <div className="text-5xl md:text-6xl font-extrabold mb-3">
                  {statsInView ? <AnimatedCounter target={stat.number} suffix={stat.suffix} /> : `0${stat.suffix}`}
                </div>
                <div className="text-lg opacity-80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center bg-white/50 dark:bg-[#111827]/50 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-gray-200/50 dark:border-[#1e293b]/50 hover-glow"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text-animate">
              هل لديك مشروع في ذهنك؟
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك في تحويل أفكارك إلى واقع رقمي مذهل. تواصل معنا اليوم ولنبدأ رحلة النجاح معاً.
            </p>
            <Link
              to="/contact"
              className="btn-gradient text-white px-10 py-4 rounded-xl font-semibold text-lg inline-block shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <span className="relative z-10">ابدأ مشروعك الآن</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
