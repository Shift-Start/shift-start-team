import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projectsAPI } from '../../services/api';
import Modal from '../UI/Modal';

const ProjectsAdmin = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState({ title: { ar: '', en: '' }, category: '', status: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [i18n.language]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data.data);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditProject(null);
    setForm({ title: { ar: '', en: '' }, category: '', status: '' });
    setIsModalOpen(true);
  };
  const openEditModal = (project) => {
    setEditProject(project);
    setForm({
      title: { ...project.title },
      category: project.category,
      status: project.status,
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormChange = (e) => {
    const { name, value, dataset } = e.target;
    if (name === 'title') {
      setForm((prev) => ({ ...prev, title: { ...prev.title, [dataset.lang]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editProject) {
        await projectsAPI.update(editProject._id, form);
        setAlert({ type: 'success', msg: t('admin.updated_successfully') });
      } else {
        await projectsAPI.create(form);
        setAlert({ type: 'success', msg: t('admin.added_successfully') });
      }
      fetchProjects();
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
      <h3 className="text-xl font-bold mb-4">{t('admin.projects_management')}</h3>
      <button className="mb-4 px-4 py-2 bg-brand-red text-white rounded" onClick={openAddModal}>{t('admin.add_project')}</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">{t('admin.title')}</th>
              <th className="px-4 py-2">{t('admin.category')}</th>
              <th className="px-4 py-2">{t('admin.status')}</th>
              <th className="px-4 py-2">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <tr key={project._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{project.title[i18n.language]}</td>
                <td className="px-4 py-2">{project.category}</td>
                <td className="px-4 py-2">{project.status}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 mx-1" onClick={() => openEditModal(project)}>{t('admin.edit')}</button>
                  <button className="text-red-600 mx-1">{t('admin.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div className="text-center py-4">{t('loading')}</div>}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editProject ? t('admin.edit_project') : t('admin.add_project')}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">{t('admin.title_ar')}</label>
            <input type="text" name="title" data-lang="ar" value={form.title.ar} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div>
            <label className="block mb-1">{t('admin.title_en')}</label>
            <input type="text" name="title" data-lang="en" value={form.title.en} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div>
            <label className="block mb-1">{t('admin.category')}</label>
            <input type="text" name="category" value={form.category} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div>
            <label className="block mb-1">{t('admin.status')}</label>
            <select name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required>
              <option value="">{t('admin.choose_status')}</option>
              <option value="active">{t('admin.active')}</option>
              <option value="inactive">{t('admin.inactive')}</option>
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

export default ProjectsAdmin;