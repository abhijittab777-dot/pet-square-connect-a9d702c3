import Layout from '@/components/layout/Layout';
import { MapPin, Star, Users, Coffee, Stethoscope, Scissors, TreePine } from 'lucide-react';

const categories = [
  { id: 'vets', label: 'Vets', icon: Stethoscope, count: 12 },
  { id: 'groomers', label: 'Groomers', icon: Scissors, count: 8 },
  { id: 'parks', label: 'Dog Parks', icon: TreePine, count: 15 },
  { id: 'cafes', label: 'Pet Cafes', icon: Coffee, count: 6 },
];

const locations = [
  { id: 1, name: 'Happy Paws Vet Clinic', category: 'vets', rating: 4.8, distance: '0.5 mi', busy: false },
  { id: 2, name: 'Fluffy Grooming Spa', category: 'groomers', rating: 4.6, distance: '0.8 mi', busy: true },
  { id: 3, name: 'Central Dog Park', category: 'parks', rating: 4.9, distance: '0.3 mi', busy: false },
  { id: 4, name: 'Bark & Brew Cafe', category: 'cafes', rating: 4.5, distance: '1.2 mi', busy: true },
];

const ResourceMapPage = () => (
  <Layout>
    <div className="content-container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Resource Map</h1>
      <p className="text-muted-foreground mb-8">Find pet-friendly places in your area</p>
      
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button key={cat.id} className="filter-chip flex items-center gap-2">
            <cat.icon className="w-4 h-4" /> {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {locations.map((loc) => (
          <div key={loc.id} className="card-premium p-5 card-hover">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold">{loc.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {loc.distance}
                </p>
              </div>
              <div className="flex items-center gap-1 text-warning">
                <Star className="w-4 h-4 fill-current" /> {loc.rating}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${loc.busy ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                {loc.busy ? 'Currently Busy' : 'Not Busy'}
              </span>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-secondary border-2 border-card" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default ResourceMapPage;
