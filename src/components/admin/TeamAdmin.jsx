import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { teamAPI } from '../../services/api';

const TeamAdmin = () => {
  const { t, i18n } = useTranslation();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, [i18n.language]);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await teamAPI.getAll();
      setTeam(res.data.data);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{t('admin.team_management')}</h3>
      <button className="mb-4 px-4 py-2 bg-brand-red text-white rounded">{t('admin.add_member')}</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">{t('admin.name')}</th>
              <th className="px-4 py-2">{t('admin.role')}</th>
              <th className="px-4 py-2">{t('admin.status')}</th>
              <th className="px-4 py-2">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, idx) => (
              <tr key={member._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{member.name[i18n.language]}</td>
                <td className="px-4 py-2">{member.role}</td>
                <td className="px-4 py-2">{member.isActive ? t('admin.active') : t('admin.inactive')}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 mx-1">{t('admin.edit')}</button>
                  <button className="text-red-600 mx-1">{t('admin.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div className="text-center py-4">{t('loading')}</div>}
    </div>
  );
};

export default TeamAdmin;