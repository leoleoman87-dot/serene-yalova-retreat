import { createFileRoute } from '@tanstack/react-router';
import { AdminModal } from '../components/site/AdminModal';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <AdminModal onClose={() => window.location.href = '/'} />
    </div>
  );
}
