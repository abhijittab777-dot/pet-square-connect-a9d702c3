import Layout from '@/components/layout/Layout';
import { Heart, Search } from 'lucide-react';

const pets = [
  { id: 1, name: 'Barnaby', breed: 'Beagle', age: '8 years', tag: 'Senior', image: '🐕' },
  { id: 2, name: 'Whiskers', breed: 'Tabby Cat', age: '2 years', tag: 'Ready for Home', image: '🐱' },
  { id: 3, name: 'Luna', breed: 'German Shepherd', age: '4 years', tag: 'Special Needs', image: '🐕‍🦺' },
];

const AdoptionPage = () => (
  <Layout>
    <div className="content-container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Find Your Furever Friend</h1>
      <p className="text-muted-foreground mb-8">Give a loving home to pets in need</p>
      
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input placeholder="Search by breed, age, or location..." className="input-premium pl-12 w-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="card-premium overflow-hidden card-hover">
            <div className="h-48 bg-secondary flex items-center justify-center text-6xl">{pet.image}</div>
            <div className="p-5">
              <span className="badge-accent text-xs mb-2">{pet.tag}</span>
              <h3 className="font-semibold text-lg">{pet.name}</h3>
              <p className="text-sm text-muted-foreground">{pet.breed} • {pet.age}</p>
              <button className="btn-primary w-full mt-4 py-2"><Heart className="w-4 h-4 mr-2" />Inquire</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default AdoptionPage;
