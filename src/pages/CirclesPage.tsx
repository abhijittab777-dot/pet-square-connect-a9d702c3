import Layout from '@/components/layout/Layout';
import { Users } from 'lucide-react';

const groups = [
  { id: 1, name: 'Dog Parents NYC', members: 234, type: 'location' },
  { id: 2, name: 'Golden Retriever Lovers', members: 567, type: 'breed' },
  { id: 3, name: 'First-Time Pet Parents', members: 189, type: 'interest' },
];

const CirclesPage = () => (
  <Layout>
    <div className="content-container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Local Pet Circles</h1>
      <p className="text-muted-foreground mb-8">Connect with pet parents in your community</p>
      
      <div className="flex gap-2 mb-6">
        {['Dogs', 'Cats', 'Birds'].map((f) => <button key={f} className="filter-chip">{f}</button>)}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="card-premium p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">{group.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{group.members} members</p>
            <button className="btn-secondary w-full py-2">Join</button>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default CirclesPage;
