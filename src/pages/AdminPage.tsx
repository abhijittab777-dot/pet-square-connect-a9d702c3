import Layout from '@/components/layout/Layout';
import { Shield, AlertTriangle, Users, CheckCircle, XCircle } from 'lucide-react';

const reports = [
  { id: 1, type: 'Spam', content: 'Suspicious post about...', date: 'Today' },
  { id: 2, type: 'Harassment', content: 'Inappropriate comment...', date: 'Yesterday' },
];

const AdminPage = () => (
  <Layout showFooter={false}>
    <div className="flex min-h-[calc(100vh-5rem)]">
      <aside className="w-64 bg-card border-r border-border p-4 hidden md:block">
        <h2 className="font-bold mb-4 flex items-center gap-2"><Shield className="w-5 h-5" />Admin Panel</h2>
        <nav className="space-y-1">
          {['Report Review', 'User Moderation', 'Lost Pet Verification', 'Service Verification'].map((item) => (
            <button key={item} className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-sm">{item}</button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Report Review</h1>
        <div className="space-y-4">
          {reports.map((r) => (
            <div key={r.id} className="card-premium p-4 flex items-center justify-between">
              <div>
                <span className="badge-warning mr-2">{r.type}</span>
                <span className="text-sm text-muted-foreground">{r.content}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-success/10 text-success"><CheckCircle className="w-5 h-5" /></button>
                <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><XCircle className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </Layout>
);

export default AdminPage;
