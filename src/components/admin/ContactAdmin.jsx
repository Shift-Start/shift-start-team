import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { contactAPI } from '../../services/api';

const ContactAdmin = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await contactAPI.getAll();
      setContacts(res.data.data);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{t('admin.contacts_management')}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">{t('admin.name')}</th>
              <th className="px-4 py-2">{t('admin.email')}</th>
              <th className="px-4 py-2">{t('admin.subject')}</th>
              <th className="px-4 py-2">{t('admin.status')}</th>
              <th className="px-4 py-2">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((msg, idx) => (
              <tr key={msg._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{msg.name}</td>
                <td className="px-4 py-2">{msg.email}</td>
                <td className="px-4 py-2">{msg.subject}</td>
                <td className="px-4 py-2">{msg.status}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 mx-1">{t('admin.mark_read')}</button>
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

export default ContactAdmin;