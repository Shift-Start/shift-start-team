import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const timelineStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.2 },
    },
  };

  const timelineItem = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const services = [
    {
      key: 'webDevelopment',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: ['React & Vue.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'REST APIs'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'webDesign',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: ['UI/UX Design', 'Responsive Design', 'Brand Identity', 'Prototyping'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      key: 'mobileApps',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      ),
      features: ['React Native', 'Flutter', 'iOS & Android', 'Cross-platform'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      key: 'ecommerce',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      features: ['Shopify', 'WooCommerce', 'Payment Integration', 'Inventory Management'],
      color: 'from-orange-500 to-red-500',
    },
    {
      key: 'seo',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: ['Keyword Research', 'On-page SEO', 'Technical SEO', 'Analytics'],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      key: 'maintenance',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: ['Bug Fixes', 'Updates', '24/7 Support', 'Performance Optimization'],
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'اكتشاف',
      description: 'نحلل متطلباتك ونفهم أهدافك',
      icon: '🔍',
    },
    {
      step: '02',
      title: 'تخطيط',
      description: 'نضع استراتيجية شاملة للمشروع',
      icon: '📋',
    },
    {
      step: '03',
      title: 'تصميم',
      description: 'نصمم واجهات جذابة وسهلة الاستخدام',
      icon: '🎨',
    },
    {
      step: '04',
      title: 'تطوير',
      description: 'نبني الحل التقني باستخدام أفضل الممارسات',
      icon: '⚡',
    },
    {
      step: '05',
      title: 'اختبار',
      description: 'نختبر الجودة والأداء بعناية',
      icon: '🧪',
    },
    {
      step: '06',
      title: 'إطلاق',
      description: 'نطلق المشروع مع الدعم المستمر',
      icon: '🚀',
    },
  ];

  const technologies = [
    'React', 'Vue.js', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL',
    'Docker', 'AWS', 'Figma', 'TailwindCSS', 'TypeScript', 'Next.js',
  ];

  return (
    <>
      <Helmet>
        <title>خدماتنا - Version AI</title>
        <meta name="description" content="اكتشف مجموعة شاملة من خدمات التطوير والتصميم التي نقدمها في Version AI" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/10 to-brand-purple/10 dark:bg-[#0a0e1a] dark:from-brand-blue/5 dark:via-brand-cyan/5 dark:to-brand-purple/5 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg"></div>

        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand-cyan/10 dark:bg-brand-cyan/5 rounded-full blur-3xl blob animate-float"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-3xl blob animate-float-slow" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 dark:bg-brand-cyan/10 border border-brand-blue/20 dark:border-brand-cyan/20 text-brand-blue dark:text-brand-cyan text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              {t('services.subtitle')}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 gradient-text-animate"
            >
              {t('services.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {t('services.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding dark:bg-[#0a0e1a] section-dark-mesh relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.key}
                variants={cardVariant}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="card p-8 h-full hover-glow relative overflow-hidden neon-border">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 3, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="w-20 h-20 bg-brand-gradient rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:shadow-brand-cyan/20"
                    >
                      {service.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {t(`services.${service.key}.title`)}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {t(`services.${service.key}.description`)}
                    </p>

                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                          className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-brand-cyan to-brand-blue rounded-full mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0"></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section with Timeline */}
      <section className="section-padding bg-gray-50 dark:bg-[#0a0e1a] section-dark-mesh relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-50"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span
              variants={fadeInUp}
              className="text-brand-blue dark:text-brand-cyan text-sm font-semibold uppercase tracking-wider"
            >
              منهجيتنا
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mt-4 gradient-text">
              كيف نعمل
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              نتبع منهجية مدروسة لضمان نجاح مشروعك
            </motion.p>
          </motion.div>

          {/* Timeline layout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={timelineStagger}
            className="relative max-w-4xl mx-auto"
          >
            {/* Vertical timeline connector */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-cyan via-brand-blue to-brand-purple opacity-30 dark:opacity-50"></div>

            {process.map((step, index) => (
              <motion.div
                key={step.step}
                variants={timelineItem}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center text-white text-sm font-bold shadow-lg"
                    style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' }}
                  >
                    {step.step}
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="card p-6 hover-glow relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">{step.icon}</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding dark:bg-[#0a0e1a] section-dark-mesh relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-brand-blue dark:text-brand-cyan text-sm font-semibold uppercase tracking-wider"
            >
              أدواتنا
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mt-4 gradient-text">
              التقنيات التي نستخدمها
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              نعمل بأحدث التقنيات والأدوات لضمان جودة عالية
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {technologies.map((tech) => (
              <motion.div
                key={tech}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="tech-badge justify-center py-3 px-4 cursor-default"
              >
                <span className="font-medium">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Glassmorphism */}
      <section className="section-padding dark:bg-[#0a0e1a] relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 grid-bg"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-cyan/10 dark:bg-brand-cyan/5 rounded-full blur-3xl blob"></div>
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-3xl blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center glass dark:glass-dark rounded-3xl p-12 md:p-16 hover-glow relative overflow-hidden"
          >
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text-animate">
              مستعد لبدء مشروعك؟
            </h2>
            <p className="text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              تواصل معنا اليوم واحصل على استشارة مجانية حول مشروعك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-gradient text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-500 inline-block relative overflow-hidden"
              >
                <span className="relative z-10">ابدأ مشروعك الآن</span>
              </Link>
              <Link
                to="/projects"
                className="px-10 py-4 rounded-xl font-semibold text-lg border-2 border-brand-blue/30 dark:border-brand-cyan/30 text-brand-blue dark:text-brand-cyan hover:bg-brand-blue/5 dark:hover:bg-brand-cyan/5 hover:border-brand-blue dark:hover:border-brand-cyan transition-all duration-500 inline-block"
              >
                شاهد أعمالنا
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
