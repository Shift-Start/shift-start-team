import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { teamAPI } from '../../services/api';
import Modal from '../UI/Modal';
import LoadingSpinner from '../UI/LoadingSpinner';

const TeamAdmin = () => {
  const { t, i18n } = useTranslation();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [form, setForm] = useState({ name: { ar: '', en: '' }, role: '', isActive: true });
  const [formLoading, setFormLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

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

  const openAddModal = () => {
    setEditMember(null);
    setForm({ name: { ar: '', en: '' }, role: '', isActive: true });
    setAvatarPreview(null);
    setAvatarFile(null);
    setIsModalOpen(true);
  };
  const openEditModal = (member) => {
    setEditMember(member);
    setForm({
      name: { ...member.name },
      role: member.role,
      isActive: member.isActive,
    });
    setAvatarPreview(member.avatar || null);
    setAvatarFile(null);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormChange = (e) => {
    const { name, value, dataset, type, checked } = e.target;
    if (name === 'name') {
      setForm((prev) => ({ ...prev, name: { ...prev.name, [dataset.lang]: value } }));
    } else if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('name[ar]', form.name.ar);
      formData.append('name[en]', form.name.en);
      formData.append('role', form.role);
      formData.append('isActive', form.isActive);
      if (avatarFile) formData.append('avatar', avatarFile);
      if (editMember) {
        await teamAPI.update(editMember._id, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setAlert({ type: 'success', msg: t('admin.updated_successfully') });
      } else {
        await teamAPI.create(formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setAlert({ type: 'success', msg: t('admin.added_successfully') });
      }
      fetchTeam();
      closeModal();
    } catch (err) {
      setAlert({ type: 'error', msg: t('admin.error_occurred') });
    } finally {
      setFormLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const openDeleteModal = (member) => {
    setDeleteTarget(member);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await teamAPI.delete(deleteTarget._id);
      setAlert({ type: 'success', msg: t('admin.deleted_successfully') });
      fetchTeam();
      closeDeleteModal();
    } catch (err) {
      setAlert({ type: 'error', msg: t('admin.error_occurred') });
    } finally {
      setDeleteLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{t('admin.team_management')}</h3>
      <button className="mb-4 px-4 py-2 bg-brand-red text-white rounded" onClick={openAddModal}>{t('admin.add_member')}</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">{t('admin.avatar')}</th>
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
                <td className="px-4 py-2">
                  {member.avatar && <img src={member.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover inline-block mr-2 border" />}
                  {member.name[i18n.language]}
                </td>
                <td className="px-4 py-2">{member.role}</td>
                <td className="px-4 py-2">{member.isActive ? t('admin.active') : t('admin.inactive')}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 mx-1 flex items-center" onClick={() => openEditModal(member)}><i className="fas fa-edit mr-1"></i>{t('admin.edit')}</button>
                  <button className="text-red-600 mx-1 flex items-center" onClick={() => openDeleteModal(member)}><i className="fas fa-trash mr-1"></i>{t('admin.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div className="text-center py-4">{t('loading')}</div>}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editMember ? t('admin.edit_member') : t('admin.add_member')}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label className="block mb-1 font-semibold">{t('admin.avatar')}</label>
            <div className="mb-2">
              <label className="cursor-pointer inline-block">
                <span className="inline-block bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
                  <i className="fas fa-upload mr-2"></i>{t('admin.upload_image')}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
            {avatarPreview && <img src={avatarPreview} alt="avatar preview" className="w-20 h-20 rounded-full object-cover border mb-2" />}
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.name_ar')}</label>
            <input type="text" name="name" data-lang="ar" value={form.name.ar} onChange={handleFormChange} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.name_en')}</label>
            <input type="text" name="name" data-lang="en" value={form.name.en} onChange={handleFormChange} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.role')}</label>
            <input type="text" name="role" value={form.role} onChange={handleFormChange} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.status')}</label>
            <select name="isActive" value={form.isActive ? 'active' : 'inactive'} onChange={e => handleFormChange({ target: { ...e.target, name: 'isActive', value: e.target.value === 'active' } })} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required>
              <option value="active">{t('admin.active')}</option>
              <option value="inactive">{t('admin.inactive')}</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded flex items-center"><i className="fas fa-times mr-2"></i>{t('admin.cancel')}</button>
            <button type="submit" disabled={formLoading} className="px-4 py-2 bg-brand-red text-white rounded flex items-center">
              {formLoading ? <LoadingSpinner size={20} /> : <i className="fas fa-save mr-2"></i>}
              {formLoading ? t('loading') : t('admin.save')}
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title={t('admin.confirm_delete')}
        footer={
          <div className="flex justify-end">
            <button onClick={closeDeleteModal} className="mr-2 px-4 py-2 bg-gray-300 rounded">{t('admin.cancel')}</button>
            <button onClick={handleDelete} disabled={deleteLoading} className="px-4 py-2 bg-red-600 text-white rounded">
              {deleteLoading ? t('loading') : t('admin.delete')}
            </button>
          </div>
        }
      >
        <div>{t('admin.delete_confirm_msg')}</div>
      </Modal>
      {alert && (
        <div className={`my-4 p-2 rounded ${alert.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{alert.msg}</div>
      )}
    </div>
  );
};

export default TeamAdmin;