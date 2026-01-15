import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { BookOpen, Search, CheckCircle } from 'lucide-react';

const articles = [
  { id: 1, title: 'First-Time Dog Owner Guide', category: 'First-time owners', verifiedBy: 12 },
  { id: 2, title: 'Understanding Pet Nutrition', category: 'Food & Nutrition', verifiedBy: 24 },
  { id: 3, title: 'Vaccination Timeline for Puppies', category: 'Vaccination timelines', verifiedBy: 18 },
  { id: 4, title: 'Basic Training Commands', category: 'Training basics', verifiedBy: 31 },
];

const KnowledgePage = () => {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'First-time owners', 'Food & Nutrition', 'Vaccination timelines', 'Training basics'];

  return (
    <Layout>
      <div className="content-container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" /> Knowledge Wall
        </h1>
        <p className="text-muted-foreground mb-8">Expert advice verified by pet parents</p>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`filter-chip capitalize ${filter === f ? 'filter-chip-active' : ''}`}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {articles.filter(a => filter === 'all' || a.category === filter).map((article) => (
            <div key={article.id} className="card-premium p-6 card-hover cursor-pointer">
              <span className="badge-primary text-xs mb-3">{article.category}</span>
              <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-success" /> Verified by {article.verifiedBy} pet parents
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgePage;
