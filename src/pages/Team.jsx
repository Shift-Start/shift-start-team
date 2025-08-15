import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { teamAPI, handleApiError } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Team = () => {
  const { t } = useTranslation();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة لتحميل أعضاء الفريق
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getAll();
      setTeamMembers(response.data.data || []);
      setError(null);
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      // البيانات الافتراضية عند الخطأ - يمكن إزالتها أو تعديلها حسب الحاجة
      setTeamMembers([
        {
          id: 1,
          nameKey: 'team.members.ahmed.name',
          role: 'fullstack',
          bioKey: 'team.members.ahmed.bio',
          image: '/api/placeholder/300/300',
          skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
          social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
          },
        },
        {
          id: 2,
          nameKey: 'team.members.fatima.name',
          role: 'ui',
          bioKey: 'team.members.fatima.bio',
          image: '/api/placeholder/300/300',
          skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
          social: {
            dribbble: 'https://dribbble.com',
            behance: 'https://behance.com',
            linkedin: 'https://linkedin.com',
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const getRoleColor = (role) => {
    const colors = {
      fullstack: 'from-gold-500 to-gold-700',
      frontend: 'from-gold-300 to-gold-500',
      backend: 'from-gold-400 to-gold-600',
      ui: 'from-gold-300 to-silver-400',
      ux: 'from-silver-400 to-silver-600',
      manager: 'from-silver-500 to-silver-700',
    };
    return colors[role] || 'from-gold-400 to-gold-600';
  };

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
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      behance: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
        </svg>
      ),
    };
    return icons[platform] || null;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // إذا حدث خطأ، نعرض رسالة واضحة
  if (error) {
    return (
      <div className="text-center py-16 text-red-600 text-xl font-semibold">
        {error}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('seo.team.title')}</title>
        <meta name="description" content={t('seo.team.description')} />
      </Helmet>

      {/* قسم hero */}
      <section className="relative py-20 bg-gradient-to-br from-gold-300/20 via-gold-400/20 to-gold-500/20">
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
                background: 'linear-gradient(to right, #d4af37, #f0c419)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('team.title')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gold-700">
              {t('team.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* فريق العمل */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="card p-6 text-center hover-lift relative overflow-hidden bg-gradient-to-br from-gold-50 to-gold-100 rounded-lg shadow-md">
                  {/* ظل خلفي */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getRoleColor(
                      member.role
                    )} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}
                  ></div>

                  {/* الصورة والسيرة */}
                  <div className="relative z-10">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={t(member.nameKey)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-silver-300 to-silver-400 flex items-center justify-center">
                            <span className="text-4xl font-bold text-silver-600">
                              {t(member.nameKey).charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* الاسم */}
                    <h3 className="text-xl font-bold mb-2 text-gold-700">
                      {t(member.nameKey)}
                    </h3>
                    {/* نبذة */}
                    <p className="mb-4 leading-relaxed min-h-[70px] text-gold-600">
                      {t(member.bioKey)}
                    </p>
                    {/* المهارات */}
                    <div className="mb-4 flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gold-100 text-gold-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {/* روابط التواصل */}
                    <div className="flex justify-center space-x-4">
                      {member.social &&
                        Object.entries(member.social).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gold-300 hover:bg-gold-600 text-gold-700 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label={platform}
                          >
                            {getSocialIcon(platform)}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الانضمام */}
      <section className="section-padding bg-gold-50">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{
              background: 'linear-gradient(to right, #d4af37, #f0c419)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('team.joinUs.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8 text-gold-700"
          >
            {t('team.joinUs.description')}
          </motion.p>
          {/* تفاصيل الانضمام */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-semibold mb-2 text-gold-700"
          >
            {t('team.joinUs.creativeEnvironment.title')}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm mb-8 text-gold-600"
          >
            {t('team.joinUs.creativeEnvironment.desc')}
          </motion.p>

          {/* زر إرسال البريد الإلكتروني */}
          <motion.a
            href="mailto:careers@shiftstart.sy"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg font-semibold text-lg inline-block bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-400/30"
          >
            {t('team.joinUs.sendCV')}
          </motion.a>
        </div>
      </section>
    </>
  );
};

export default Team;