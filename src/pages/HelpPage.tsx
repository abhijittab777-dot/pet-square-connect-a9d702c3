import Layout from '@/components/layout/Layout';
import { HelpCircle, Dog, Cat, Bird, Sparkles } from 'lucide-react';

const petTypes = [
  { id: 'dog', label: 'Dog', icon: Dog },
  { id: 'cat', label: 'Cat', icon: Cat },
  { id: 'bird', label: 'Bird', icon: Bird },
];

const HelpPage = () => (
  <Layout>
    <div className="content-container py-8 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Need Help Right Now?</h1>
      <p className="text-muted-foreground mb-8">Select your pet type and describe your issue</p>
      
      <div className="flex justify-center gap-4 mb-8">
        {petTypes.map((pet) => (
          <button key={pet.id} className="card-premium p-6 card-hover flex flex-col items-center gap-2">
            <pet.icon className="w-8 h-8 text-primary" />
            <span>{pet.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {['Emergency', 'Health', 'Training', 'Adoption'].map((issue) => (
          <button key={issue} className="filter-chip">{issue}</button>
        ))}
      </div>

      <div className="card-premium p-8 text-left">
        <HelpCircle className="w-12 h-12 text-primary mb-4" />
        <h3 className="font-semibold mb-2">Community Support</h3>
        <p className="text-muted-foreground">Select options above to find nearby helpers and community advice.</p>
      </div>
    </div>
  </Layout>
);

export default HelpPage;
