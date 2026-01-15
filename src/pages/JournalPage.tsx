import Layout from '@/components/layout/Layout';
import { BookHeart, Plus } from 'lucide-react';

const JournalPage = () => (
  <Layout>
    <div className="content-container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
        <BookHeart className="w-8 h-8 text-accent" /> Pet Journal
      </h1>
      <p className="text-muted-foreground mb-8">"Today with my pet" - Capture precious moments</p>
      
      <button className="btn-primary mb-8"><Plus className="w-4 h-4 mr-2" />New Entry</button>
      
      <div className="text-center py-16 text-muted-foreground">
        <BookHeart className="w-16 h-16 mx-auto mb-4" />
        <p>Start your journal today!</p>
        <p className="text-sm">Record daily reflections, moods, and photos.</p>
      </div>
    </div>
  </Layout>
);

export default JournalPage;
