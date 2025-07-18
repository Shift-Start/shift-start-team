import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { contactAPI } from '../../services/api';
import Modal from '../UI/Modal';

const ContactAdmin = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMsg, setEditMsg] = useState(null);
  const [form, setForm] = useState({ status: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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

  const openEditModal = (msg) => {
    setEditMsg(msg);
    setForm({ status: msg.status });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await contactAPI.update(editMsg._id, form);
      setAlert({ type: 'success', msg: t('admin.updated_successfully') });
      fetchContacts();
      closeModal();
    } catch (err) {
      setAlert({ type: 'error', msg: t('admin.error_occurred') });
    } finally {
      setFormLoading(false);
      setTimeout(() => setAlert(null), 3000);
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
                  <button className="text-blue-600 mx-1" onClick={() => openEditModal(msg)}>{t('admin.mark_read')}</button>
                  <button className="text-red-600 mx-1">{t('admin.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div className="text-center py-4">{t('loading')}</div>}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={t('admin.edit_message_status')}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">{t('admin.status')}</label>
            <select name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required>
              <option value="unread">{t('admin.unread')}</option>
              <option value="read">{t('admin.read')}</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded">{t('admin.cancel')}</button>
            <button type="submit" disabled={formLoading} className="px-4 py-2 bg-brand-red text-white rounded">
              {formLoading ? t('loading') : t('admin.save')}
            </button>
          </div>
        </form>
      </Modal>
      {alert && (
        <div className={`my-4 p-2 rounded ${alert.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{alert.msg}</div>
      )}
    </div>
  );
};

export default ContactAdmin;