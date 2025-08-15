import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const services = [
    {
      key: 'webDevelopment',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      featuresKeys: [
        'services.webDevelopment.features.0',
        'services.webDevelopment.features.1',
        'services.webDevelopment.features.2',
        'services.webDevelopment.features.3',
      ],
      gradient: 'from-gold-500 to-silver-300'
    },
    {
      key: 'webDesign',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      featuresKeys: [
        'services.webDesign.features.0',
        'services.webDesign.features.1',
        'services.webDesign.features.2',
        'services.webDesign.features.3',
      ],
      gradient: 'from-gold-300 to-gold-500'
    },
    {
      key: 'mobileApps',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      ),
      featuresKeys: [
        'services.mobileApps.features.0',
        'services.mobileApps.features.1',
        'services.mobileApps.features.2',
        'services.mobileApps.features.3',
      ],
      gradient: 'from-silver-300 to-silver-600'
    },
    {
      key: 'ecommerce',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      featuresKeys: [
        'services.ecommerce.features.0',
        'services.ecommerce.features.1',
        'services.ecommerce.features.2',
        'services.ecommerce.features.3',
      ],
      gradient: 'from-gold-300 to-gold-500'
    },
    {
      key: 'seo',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      featuresKeys: [
        'services.seo.features.0',
        'services.seo.features.1',
        'services.seo.features.2',
        'services.seo.features.3',
      ],
      gradient: 'from-gold-500 to-silver-300'
    },
    {
      key: 'maintenance',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      featuresKeys: [
        'services.maintenance.features.0',
        'services.maintenance.features.1',
        'services.maintenance.features.2',
        'services.maintenance.features.3',
      ],
      gradient: 'from-gold-500 to-silver-300'
    },
  ];

  const process = [
    {
      step: '01',
      titleKey: 'services.process.steps.0.title',
      descriptionKey: 'services.process.steps.0.description',
      icon: '🔍',
    },
    {
      step: '02',
      titleKey: 'services.process.steps.1.title',
      descriptionKey: 'services.process.steps.1.description',
      icon: '📋',
    },
    {
      step: '03',
      titleKey: 'services.process.steps.2.title',
      descriptionKey: 'services.process.steps.2.description',
      icon: '🎨',
    },
    {
      step: '04',
      titleKey: 'services.process.steps.3.title',
      descriptionKey: 'services.process.steps.3.description',
      icon: '⚡',
    },
    {
      step: '05',
      titleKey: 'services.process.steps.4.title',
      descriptionKey: 'services.process.steps.4.description',
      icon: '🧪',
    },
    {
      step: '06',
      titleKey: 'services.process.steps.5.title',
      descriptionKey: 'services.process.steps.5.description',
      icon: '🚀',
    },
  ];

  const technologies = [
    'services.technologies.react',
    'services.technologies.vue',
    'services.technologies.node',
    'services.technologies.python',
    'services.technologies.mongodb',
    'services.technologies.postgresql',
    'services.technologies.docker',
    'services.technologies.aws',
    'services.technologies.figma',
    'services.technologies.tailwind',
    'services.technologies.typescript',
    'services.technologies.nextjs',
  ];

  return (
    <>
      <Helmet>
        <title>{t('services.seo.title')}</title>
        <meta name="description" content={t('services.seo.description')} />
      </Helmet>

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
              {t('services.title')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-silver-600">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="card p-8 h-full hover-lift relative overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-silver-300 to-gold-300 border border-gold-400">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg bg-gradient-to-br ${service.gradient} z-0`}></div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-r from-gold-500 to-silver-300">
                      {service.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-silver-600">
                      {t(`services.${service.key}.title`)}
                    </h3>

                    <p className="mb-6 leading-relaxed text-silver-600">
                      {t(`services.${service.key}.description`)}
                    </p>

                    <div className="space-y-2">
                      {service.featuresKeys.map((featureKey, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gold-600">
                          <div className="w-2 h-2 rounded-full mr-3 rtl:ml-3 rtl:mr-0 bg-gold-500"></div>
                          {t(featureKey)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-silver-300/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gold-500 to-gold-400 text-transparent bg-clip-text">
              {t('services.process.title')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-silver-600">
              {t('services.process.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="card p-6 text-center hover-lift h-full rounded-lg shadow border border-gold-400 bg-silver-300/20 text-silver-600">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-sm font-bold mb-2 text-gold-500">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p>{t(step.descriptionKey)}</p>
                </div>

                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 rounded bg-gradient-to-r from-gold-500 to-silver-300"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gold-500 to-gold-400 text-transparent bg-clip-text">
              {t('services.technologies.title')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-silver-600">
              {t('services.technologies.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((techKey, index) => (
              <motion.div
                key={techKey}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card p-4 text-center hover-lift rounded-lg shadow border border-gold-400 text-silver-600 bg-silver-300/20"
              >
                <div className="text-sm font-medium">{t(techKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding text-white rounded-lg bg-gradient-to-r from-gold-400 to-silver-300 shadow-lg shadow-gold-400/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('services.cta.title')}</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{t('services.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-gold-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-block"
              >
                {t('services.cta.startProject')}
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gold-500 transition-all duration-300 inline-block"
              >
                {t('services.cta.viewProjects')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;