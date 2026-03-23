import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { teamAPI, handleApiError } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const Team = () => {
  const { t } = useTranslation();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [joinRef, joinInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await teamAPI.getAll();
        setTeamMembers(response.data.data || []);
        setError(null);
      } catch (err) {
        const errorInfo = handleApiError(err);
        setError(errorInfo.message);
        setTeamMembers([
    {
      id: 1,
      name: 'أحمد محمد',
      nameEn: 'Ahmed Mohammed',
      role: 'fullstack',
      bio: 'مطور شامل مع خبرة 5 سنوات في React و Node.js',
      bioEn: 'Full-stack developer with 5 years experience in React and Node.js',
      image: '/api/placeholder/300/300',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      nameEn: 'Fatima Ahmed',
      role: 'ui',
      bio: 'مصممة واجهات مبدعة متخصصة في UX/UI Design',
      bioEn: 'Creative UI designer specialized in UX/UI Design',
      image: '/api/placeholder/300/300',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
      social: {
        dribbble: 'https://dribbble.com',
        behance: 'https://behance.com',
        linkedin: 'https://linkedin.com',
      }
    },
    {
      id: 3,
      name: 'محمد علي',
      nameEn: 'Mohammed Ali',
      role: 'backend',
      bio: 'مطور خلفي خبير في Python و Django',
      bioEn: 'Backend developer expert in Python and Django',
      image: '/api/placeholder/300/300',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
      }
    },
    {
      id: 4,
      name: 'سارة حسن',
      nameEn: 'Sara Hassan',
      role: 'frontend',
      bio: 'مطورة واجهات أمامية متخصصة في Vue.js',
      bioEn: 'Frontend developer specialized in Vue.js',
      image: '/api/placeholder/300/300',
      skills: ['Vue.js', 'Nuxt.js', 'TailwindCSS', 'JavaScript'],
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    },
    {
      id: 5,
      name: 'عمر خالد',
      nameEn: 'Omar Khaled',
      role: 'manager',
      bio: 'مدير مشاريع ذو خبرة في إدارة الفرق التقنية',
      bioEn: 'Project manager with experience in managing technical teams',
      image: '/api/placeholder/300/300',
      skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    },
    {
      id: 6,
      name: 'ليلى أحمد',
      nameEn: 'Layla Ahmed',
      role: 'ux',
      bio: 'مصممة تجربة مستخدم تركز على البحث والتحليل',
      bioEn: 'UX designer focused on research and analysis',
      image: '/api/placeholder/300/300',
      skills: ['User Research', 'Wireframing', 'Usability Testing', 'Analytics'],
      social: {
        linkedin: 'https://linkedin.com',
        behance: 'https://behance.com',
      }
    },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getRoleColor = (role) => {
    const colors = {
      fullstack: 'from-blue-500 to-purple-500',
      frontend: 'from-green-500 to-blue-500',
      backend: 'from-orange-500 to-red-500',
      ui: 'from-pink-500 to-purple-500',
      ux: 'from-purple-500 to-indigo-500',
      manager: 'from-gray-600 to-gray-800',
    };
    return colors[role] || 'from-gray-500 to-gray-700';
  };

  const getRoleGlow = (role) => {
    const glows = {
      fullstack: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
      frontend: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]',
      backend: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]',
      ui: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
      ux: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
      manager: 'group-hover:shadow-[0_0_30px_rgba(107,114,128,0.15)]',
    };
    return glows[role] || '';
  };

  const getSocialIcon = (platform) => {
    const icons = {
      github: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      dribbble: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.45C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
        </svg>
      ),
      behance: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      ),
    };
    return icons[platform] || null;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>{t('seo.team.title')}</title>
        <meta name="description" content={t('seo.team.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden dark:bg-[#0a0e1a]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 via-white to-brand-purple/5 dark:from-brand-cyan/5 dark:via-[#0a0e1a] dark:to-brand-purple/5"></div>
        <div className="absolute inset-0 grid-bg"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-brand-cyan/10 dark:bg-brand-cyan/5 rounded-full blur-3xl blob animate-float"></div>
          <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-3xl blob animate-float-slow" style={{ animationDelay: '2s' }}></div>
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
                {t('team.title')}
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 gradient-text-animate"
            >
              {t('team.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {t('team.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section ref={gridRef} className="section-padding dark:bg-[#0a0e1a] section-dark-mesh relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className={`card p-6 text-center hover-glow relative overflow-hidden transition-all duration-500 dark:border-[#1e293b] dark:hover:border-brand-cyan/30 ${getRoleGlow(member.role)}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${getRoleColor(member.role)} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.06] transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-[#1e293b] shadow-xl relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-600 dark:text-gray-300">
                            {(member.name?.ar || member.name || member.nameEn)?.charAt(0)}
                          </span>
                        </div>
                      </motion.div>

                      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRoleColor(member.role)} shadow-lg`}>
                        {t(`team.roles.${member.role}`)}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {member.name?.ar || member.name || member.nameEn}
                    </h3>

                    {/* Bio */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                      {member.bio?.ar || member.bio || member.bioEn}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="tech-badge text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 rtl:space-x-reverse">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-gray-100 dark:bg-[#1a2332] hover:bg-brand-blue dark:hover:bg-brand-cyan/20 text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-brand-cyan rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                        >
                          {getSocialIcon(platform)}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section ref={joinRef} className="section-padding dark:bg-[#0a0e1a] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-[20%] w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl blob animate-float-slow"></div>
          <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-brand-cyan/5 rounded-full blur-3xl blob animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate={joinInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white/50 dark:bg-[#111827]/50 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-gray-200/50 dark:border-[#1e293b]/50 hover-glow"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text-animate">
                انضم إلى فريقنا
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                نحن دائماً نبحث عن مواهب جديدة للانضمام إلى فريقنا. إذا كنت شغوفاً بالتكنولوجيا ومهتماً بالتطوير، تواصل معنا.
              </p>

              <motion.div
                initial="hidden"
                animate={joinInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
              >
                {[
                  { emoji: '🚀', title: 'بيئة إبداعية', desc: 'نوفر بيئة عمل محفزة للإبداع والابتكار' },
                  { emoji: '📚', title: 'تطوير مستمر', desc: 'فرص للتعلم وتطوير المهارات باستمرار' },
                  { emoji: '🤝', title: 'عمل جماعي', desc: 'فريق متعاون ومتفهم يدعم بعضه البعض' },
                ].map((perk, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="text-center p-6 rounded-2xl bg-white/60 dark:bg-[#0a0e1a]/60 border border-gray-200/30 dark:border-[#1e293b]/50 hover:border-brand-cyan/20 dark:hover:border-brand-cyan/20 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{perk.emoji}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{perk.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{perk.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                href="mailto:careers@versionai.dev"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gradient text-white px-10 py-4 rounded-xl font-semibold text-lg inline-block shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <span className="relative z-10">أرسل سيرتك الذاتية</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Team;
