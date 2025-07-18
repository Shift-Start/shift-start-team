import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projectsAPI } from '../../services/api';
import Modal from '../UI/Modal';
import LoadingSpinner from '../UI/LoadingSpinner';

const ProjectsAdmin = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState({ title: { ar: '', en: '' }, category: '', status: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
    setImagePreview(null);
    setImageFile(null);
    setIsModalOpen(true);
  };
  const openEditModal = (project) => {
    setEditProject(project);
    setForm({
      title: { ...project.title },
      category: project.category,
      status: project.status,
    });
    setImagePreview(project.image || null);
    setImageFile(null);
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('title[ar]', form.title.ar);
      formData.append('title[en]', form.title.en);
      formData.append('category', form.category);
      formData.append('status', form.status);
      if (imageFile) formData.append('image', imageFile);
      if (editProject) {
        await projectsAPI.update(editProject._id, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setAlert({ type: 'success', msg: t('admin.updated_successfully') });
      } else {
        await projectsAPI.create(formData, { headers: { 'Content-Type': 'multipart/form-data' } });
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

  const openDeleteModal = (project) => {
    setDeleteTarget(project);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await projectsAPI.delete(deleteTarget._id);
      setAlert({ type: 'success', msg: t('admin.deleted_successfully') });
      fetchProjects();
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
      <h3 className="text-xl font-bold mb-4">{t('admin.projects_management')}</h3>
      <button className="mb-4 px-4 py-2 bg-brand-red text-white rounded" onClick={openAddModal}>{t('admin.add_project')}</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">{t('admin.image')}</th>
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
                <td className="px-4 py-2">
                  {project.image && <img src={project.image} alt="project" className="w-10 h-10 rounded object-cover inline-block mr-2 border" />}
                  {project.title[i18n.language]}
                </td>
                <td className="px-4 py-2">{project.category}</td>
                <td className="px-4 py-2">{project.status}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 mx-1 flex items-center" onClick={() => openEditModal(project)}><i className="fas fa-edit mr-1"></i>{t('admin.edit')}</button>
                  <button className="text-red-600 mx-1 flex items-center" onClick={() => openDeleteModal(project)}><i className="fas fa-trash mr-1"></i>{t('admin.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div className="text-center py-4">{t('loading')}</div>}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editProject ? t('admin.edit_project') : t('admin.add_project')}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label className="block mb-1 font-semibold">{t('admin.image')}</label>
            <div className="mb-2">
              <label className="cursor-pointer inline-block">
                <span className="inline-block bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
                  <i className="fas fa-upload mr-2"></i>{t('admin.upload_image')}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            {imagePreview && <img src={imagePreview} alt="project preview" className="w-20 h-20 rounded object-cover border mb-2" />}
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.title_ar')}</label>
            <input type="text" name="title" data-lang="ar" value={form.title.ar} onChange={handleFormChange} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.title_en')}</label>
            <input type="text" name="title" data-lang="en" value={form.title.en} onChange={handleFormChange} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.category')}</label>
            <input type="text" name="category" value={form.category} onChange={handleFormChange} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t('admin.status')}</label>
            <select name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded px-2 py-1 focus:ring focus:ring-brand-red/30" required>
              <option value="">{t('admin.choose_status')}</option>
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

export default ProjectsAdmin;