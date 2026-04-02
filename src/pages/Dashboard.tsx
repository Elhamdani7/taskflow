import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import useProjects from '../hooks/useProjects';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects, columns, loading, error, addProject, renameProject, deleteProject } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAddProject = async (name: string, color: string) => {
    setSaving(true);
    await addProject(name, color);
    setSaving(false);
    setShowForm(false);
  };

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(prev => !prev)}
      />
      <div className={styles.body}>
        <Sidebar 
          projects={projects} 
          isOpen={sidebarOpen} 
          onRename={renameProject}
          onDelete={deleteProject}
        />
        <div className={styles.content}>
          <div className={styles.toolbar}>
            {error && <div className={styles.error}>{error}</div>}
            {!showForm ? (
              <button className={styles.addBtn} onClick={() => setShowForm(true)}>
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={handleAddProject}
                onCancel={() => setShowForm(false)}
                disabled={saving}
              />
            )}
          </div>
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}