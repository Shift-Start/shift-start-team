import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsAPI } from '../services/api';

const Home = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuredProjects, setFeaturedProjects] = useState([]);

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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // ألوان الذهب والفضة المستخدمة
  const colors = {
    goldDark: '#bfa951',
    goldMedium: '#dbba45',
    goldLight: '#f4d580',
    silverDark: '#7a6e4e',
    silverLight: '#f4f1df',
  };

  const services = [
    {
      key: 'webDevelopment',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      key: 'webDesign',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
    },
    {
      key: 'mobileApps',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      ),
    },
    {
      key: 'ecommerce',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { number: '50+', key: 'projects' },
    { number: '30+', key: 'clients' },
    { number: '5+', key: 'years' },
    { number: '24/7', key: 'support' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.goldLight}20, ${colors.silverLight}20, ${colors.goldLight}20)`,
        }}
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-float"
            style={{ backgroundColor: `${colors.goldMedium}33` }}
          ></div>
          <div
            className="absolute top-40 right-20 w-32 h-32 rounded-full blur-xl animate-float"
            style={{ backgroundColor: `${colors.goldLight}33`, animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-24 h-24 rounded-full blur-xl animate-float"
            style={{ backgroundColor: `${colors.silverLight}33`, animationDelay: '4s' }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-16 h-16 rounded-full blur-xl animate-float"
            style={{ backgroundColor: `${colors.goldLight}22`, animationDelay: '1s' }}
          ></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{
                background: `linear-gradient(to right, ${colors.goldDark}, ${colors.goldMedium})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              style={{ color: colors.silverDark }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg mb-12 max-w-2xl mx-auto"
              style={{ color: colors.silverDark }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/contact"
                className="text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${colors.goldDark}, ${colors.goldMedium})`,
                }}
              >
                {t('hero.cta')}
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300"
                style={{
                  borderColor: colors.goldMedium,
                  color: colors.goldMedium,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = colors.goldMedium;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.goldMedium;
                }}
              >
                {t('hero.learnMore')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: colors.silverDark }}
          >
            <div
              className="w-1 h-3 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: colors.silverDark }}
            ></div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section
        ref={ref}
        className="section-padding"
        style={{ backgroundColor: colors.silverLight }}
      >
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                background: `linear-gradient(to right, ${colors.goldDark}, ${colors.goldMedium})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('services.title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg max-w-2xl mx-auto"
              style={{ color: colors.silverDark }}
            >
              {t('services.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map(service => (
              <motion.div
                key={service.key}
                variants={fadeInUp}
                className="p-6 text-center rounded-lg shadow-lg group hover:shadow-xl transition-shadow duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.goldLight}33, ${colors.silverLight}33)`,
                  border: `1px solid ${colors.goldMedium}`,
                  color: colors.silverDark,
                }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${colors.goldDark}, ${colors.silverLight})`,
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: colors.silverDark }}
                >
                  {t(`services.${service.key}.title`)}
                </h3>
                <p style={{ color: colors.silverDark }}>
                  {t(`services.${service.key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="section-padding"
        style={{
          background: `linear-gradient(90deg, ${colors.goldDark}, ${colors.goldMedium})`,
          color: 'white',
        }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{t(`stat.${stat.key}`)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="section-padding"
        style={{ backgroundColor: colors.silverLight }}
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center rounded-2xl p-12"
            style={{
              background: `linear-gradient(to right, ${colors.goldLight}aa, ${colors.silverLight}aa)`,
              color: colors.silverDark,
              boxShadow: `0 8px 24px ${colors.goldMedium}44`,
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                background: `linear-gradient(to right, ${colors.goldDark}, ${colors.goldMedium})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('callToAction.title')}
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.silverDark }}>
              {t('callToAction.description')}
            </p>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-lg font-semibold text-lg inline-block shadow-lg transition-all duration-300"
              style={{
                background: `linear-gradient(90deg, ${colors.goldDark}, ${colors.goldMedium})`,
                color: 'white',
              }}
            >
              {t('callToAction.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
