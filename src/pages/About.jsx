import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, type: 'spring', stiffness: 80, damping: 15 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, type: 'spring', stiffness: 80, damping: 15 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const values = [
    {
      key: 'quality',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'innovation',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      key: 'excellence',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      key: 'commitment',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const whyChooseUs = [
    {
      number: '01',
      emoji: '🚀',
      title: 'سرعة في التنفيذ',
      description: 'نلتزم بالمواعيد المحددة ونسلم مشاريعك في الوقت المناسب',
    },
    {
      number: '02',
      emoji: '💡',
      title: 'حلول مبتكرة',
      description: 'نقدم أفكار إبداعية وحلول تقنية متقدمة تميز مشروعك',
    },
    {
      number: '03',
      emoji: '🤝',
      title: 'شراكة طويلة الأمد',
      description: 'نؤمن بالعلاقات طويلة الأمد ونقدم الدعم المستمر',
    },
  ];

  const codeLines = [
    { prefix: 'const', name: 'team', op: '=', value: '{', color: 'text-purple-400' },
    { prefix: '  passion:', name: '', op: '', value: "'unlimited',", color: 'text-green-400' },
    { prefix: '  experience:', name: '', op: '', value: "'5+ years',", color: 'text-green-400' },
    { prefix: '  projects:', name: '', op: '', value: "'50+ delivered',", color: 'text-green-400' },
    { prefix: '  tech:', name: '', op: '', value: "['React', 'Node', 'AI'],", color: 'text-yellow-400' },
    { prefix: '  goal:', name: '', op: '', value: "'digital excellence'", color: 'text-cyan-400' },
    { prefix: '};', name: '', op: '', value: '', color: 'text-purple-400' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('seo.about.title')}</title>
        <meta name="description" content={t('seo.about.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/10 to-brand-purple/10 dark:bg-[#0a0e1a] dark:from-brand-blue/5 dark:via-brand-cyan/5 dark:to-brand-purple/5 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg"></div>

        {/* Blob animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-cyan/10 dark:bg-brand-cyan/5 rounded-full blur-3xl blob animate-float"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-3xl blob animate-float-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl animate-pulse-glow"></div>
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
              {t('about.subtitle')}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 gradient-text-animate"
            >
              {t('about.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {t('about.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content - Our Story with Terminal Card */}
      <section className="section-padding dark:bg-[#0a0e1a] section-dark-mesh relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                قصتنا
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                نحن فريق من المبدعين والمطورين الذين يجمعهم شغف واحد: تقديم أفضل الحلول التقنية.
                نؤمن بقوة التكنولوجيا في تغيير الأعمال وتحسين حياة الناس.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              className="relative"
            >
              {/* Terminal-style card */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-[#1e293b]" style={{ boxShadow: '0 0 40px rgba(0, 229, 255, 0.05)' }}>
                {/* Terminal header */}
                <div className="bg-gray-100 dark:bg-[#1a1f2e] px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">version-ai.js</span>
                </div>
                {/* Terminal body */}
                <div className="bg-white dark:bg-[#0d1117] p-6 font-mono text-sm leading-loose">
                  {codeLines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.12, duration: 0.4 }}
                      className="flex"
                    >
                      <span className="text-gray-400 dark:text-gray-600 select-none w-6 text-right mr-4">{idx + 1}</span>
                      <span className={line.color}>{line.prefix}</span>
                      {line.name && <span className="text-blue-400 ml-1">{line.name}</span>}
                      {line.op && <span className="text-gray-500 mx-1">{line.op}</span>}
                      <span className={line.color}>{line.value}</span>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-2 flex items-center"
                  >
                    <span className="text-gray-400 dark:text-gray-600 select-none w-6 text-right mr-4">8</span>
                    <span className="text-brand-cyan typing-cursor">_</span>
                  </motion.div>
                </div>
              </div>

              {/* Decorative blobs behind the terminal */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-cyan/20 dark:bg-brand-cyan/10 rounded-full blur-xl"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-brand-purple/20 dark:bg-brand-purple/10 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={ref} className="section-padding bg-gray-50 dark:bg-[#0a0e1a] section-dark-mesh relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Vision Card */}
            <motion.div
              variants={scaleUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group"
            >
              <div className="card p-8 text-center h-full hover-glow neon-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('about.vision.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={scaleUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group"
            >
              <div className="card p-8 text-center h-full hover-glow neon-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-blue to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {t('about.mission.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              مبادئنا
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mt-4 gradient-text">
              {t('about.values.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              القيم التي نؤمن بها وتوجه عملنا اليومي
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <motion.div
                key={value.key}
                variants={scaleUp}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-center group"
              >
                <div className="relative mx-auto mb-6 w-20 h-20">
                  {/* Morphing blob background */}
                  <div className="absolute inset-0 bg-brand-gradient opacity-20 dark:opacity-30 blob group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-brand-gradient rounded-full flex items-center justify-center text-white pulse-glow group-hover:shadow-lg group-hover:shadow-brand-cyan/20 transition-all duration-500">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {t(`about.values.${value.key}`)}
                </h3>
                <div className="w-12 h-1 bg-brand-gradient rounded mx-auto group-hover:w-20 transition-all duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50 dark:bg-[#0a0e1a] section-dark-mesh relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50"></div>
        <div className="container-custom relative z-10">
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
              مميزاتنا
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mt-4 gradient-text">
              لماذا تختارنا؟
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.number}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.6, type: 'spring', stiffness: 100, damping: 15 },
                  },
                }}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group"
              >
                <div className="card p-8 text-center h-full hover-glow relative overflow-hidden">
                  {/* Number indicator with gradient background */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      {item.number}
                    </div>
                  </div>

                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
