import Layout from '@/components/layout/Layout';
import { Play, Trophy, Target } from 'lucide-react';

const ActivityPage = () => (
  <Layout>
    <div className="content-container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Activity & Play</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-premium p-6 text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">0:00</span>
          </div>
          <p className="text-muted-foreground mb-4">Today's Activity</p>
          <button className="btn-primary w-full"><Play className="w-4 h-4 mr-2" />Start Walk</button>
        </div>
        <div className="card-premium p-6">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Trophy className="w-5 h-5 text-warning" />Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {['🏃 First Walk', '🎯 7-Day Streak', '🏆 Early Bird'].map((badge, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/50 text-center text-sm">{badge}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default ActivityPage;
