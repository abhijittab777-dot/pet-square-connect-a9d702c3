import { useState, useMemo } from 'react';
import { 
  PawPrint, 
  Heart, 
  Shield, 
  Phone, 
  FileText, 
  ChevronDown,
  Plus,
  Camera,
  Edit3,
  X,
  Check,
  RefreshCw,
  Syringe,
  Scissors,
  Cpu
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Pet, User, defaultPets, defaultUser } from '@/lib/storage';
import { toast } from 'sonner';

const temperamentOptions = [
  'Good with kids', 'Good with dogs', 'Good with cats', 'High energy', 
  'Calm', 'Loves water', 'Scared of thunder', 'Food motivated', 
  'Independent', 'Cuddly', 'Playful', 'Protective'
];

const speciesOptions: Pet['species'][] = ['dog', 'cat', 'bird', 'rabbit', 'other'];

const PetProfilePage = () => {
  const [pets, setPets] = useLocalStorage<Pet[]>('pets', defaultPets);
  const [activePetId, setActivePetId] = useLocalStorage<string>('activePetId', 'pet-1');
  const [user] = useLocalStorage<User>('user', defaultUser);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);
  const [editingTraits, setEditingTraits] = useState(false);
  
  const [newPetData, setNewPetData] = useState({
    name: '',
    species: 'dog' as Pet['species'],
    breed: '',
    age: '',
  });

  const activePet = useMemo(() => {
    return pets.find(p => p.id === activePetId) || pets[0];
  }, [pets, activePetId]);

  const handleSwitchPet = (petId: string) => {
    setActivePetId(petId);
    setShowSwitcher(false);
  };

  const handleAddPet = () => {
    if (!newPetData.name.trim()) {
      toast.error('Please enter a pet name');
      return;
    }

    const newPet: Pet = {
      id: 'pet-' + Date.now(),
      name: newPetData.name,
      species: newPetData.species,
      breed: newPetData.breed || 'Mixed',
      age: parseInt(newPetData.age) || 1,
      vaccinated: false,
      neutered: false,
      microchipped: false,
      temperament: [],
    };

    setPets(prev => [...prev, newPet]);
    setActivePetId(newPet.id);
    setShowAddPet(false);
    setNewPetData({ name: '', species: 'dog', breed: '', age: '' });
    toast.success(`${newPet.name} added to your family! 🐾`);
  };

  const toggleHealthBadge = (badge: 'vaccinated' | 'neutered' | 'microchipped') => {
    setPets(prev => prev.map(pet => 
      pet.id === activePetId 
        ? { ...pet, [badge]: !pet[badge] }
        : pet
    ));
  };

  const toggleTemperament = (trait: string) => {
    setPets(prev => prev.map(pet => {
      if (pet.id !== activePetId) return pet;
      
      const hasTrail = pet.temperament.includes(trait);
      return {
        ...pet,
        temperament: hasTrail 
          ? pet.temperament.filter(t => t !== trait)
          : [...pet.temperament, trait]
      };
    }));
  };

  if (!activePet) {
    return (
      <Layout>
        <div className="content-container py-20 text-center">
          <PawPrint className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">No pets yet!</h1>
          <p className="text-muted-foreground mb-6">Add your first pet to get started</p>
          <button onClick={() => setShowAddPet(true)} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add a Pet
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="content-container py-8">
        {/* Header Card */}
        <div className="card-premium p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Pet Photo */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-secondary flex items-center justify-center mx-auto md:mx-0">
                {activePet.photo ? (
                  <img src={activePet.photo} alt={activePet.name} className="w-full h-full object-cover rounded-3xl" />
                ) : (
                  <PawPrint className="w-16 h-16 text-primary" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 rounded-full bg-card shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Pet Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">{activePet.name}</h1>
                
                {/* Switch Pet Button */}
                <div className="relative">
                  <button 
                    onClick={() => setShowSwitcher(!showSwitcher)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors mx-auto md:mx-0"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Switch Pet
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showSwitcher && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border z-10 animate-scale-in">
                      <div className="p-2">
                        {pets.map((pet) => (
                          <button
                            key={pet.id}
                            onClick={() => handleSwitchPet(pet.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                              pet.id === activePetId 
                                ? 'bg-primary/10 text-primary' 
                                : 'hover:bg-muted'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                              <PawPrint className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium">{pet.name}</p>
                              <p className="text-xs text-muted-foreground">{pet.breed}</p>
                            </div>
                            {pet.id === activePetId && (
                              <Check className="w-4 h-4 ml-auto" />
                            )}
                          </button>
                        ))}
                        <hr className="my-2 border-border" />
                        <button
                          onClick={() => {
                            setShowSwitcher(false);
                            setShowAddPet(true);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Plus className="w-5 h-5" />
                          </div>
                          <span className="font-medium">Add New Pet</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-4">
                {activePet.breed} • {activePet.age} {activePet.age === 1 ? 'year' : 'years'} old
              </p>

              {activePet.bio && (
                <p className="text-muted-foreground italic mb-4">"{activePet.bio}"</p>
              )}

              {/* Health Badges */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <button 
                  onClick={() => toggleHealthBadge('vaccinated')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activePet.vaccinated 
                      ? 'bg-success/10 text-success' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Syringe className="w-4 h-4" />
                  {activePet.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                </button>
                <button 
                  onClick={() => toggleHealthBadge('neutered')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activePet.neutered 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Scissors className="w-4 h-4" />
                  {activePet.neutered ? 'Neutered' : 'Not Neutered'}
                </button>
                <button 
                  onClick={() => toggleHealthBadge('microchipped')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activePet.microchipped 
                      ? 'bg-accent/10 text-accent' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  {activePet.microchipped ? 'Microchipped' : 'Not Microchipped'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Playbook / Temperament */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                The Playbook
              </h2>
              <button 
                onClick={() => setEditingTraits(!editingTraits)}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-4 h-4" />
                {editingTraits ? 'Done' : 'Edit'}
              </button>
            </div>

            {editingTraits ? (
              <div className="flex flex-wrap gap-2">
                {temperamentOptions.map((trait) => (
                  <button
                    key={trait}
                    onClick={() => toggleTemperament(trait)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      activePet.temperament.includes(trait)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {activePet.temperament.length > 0 ? (
                  activePet.temperament.map((trait) => (
                    <span key={trait} className="badge-primary">
                      {trait}
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No traits added yet. Click edit to add some!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="card-premium p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-primary" />
              Emergency Contact
            </h2>
            {activePet.vetContact ? (
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium">Primary Vet</p>
                  <p className="text-sm text-muted-foreground">{activePet.vetContact}</p>
                </div>
                <button className="btn-primary py-2 px-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Phone className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No vet contact added</p>
                <button className="btn-secondary">Add Vet Contact</button>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="card-premium p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              Medical Records
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="aspect-square rounded-xl bg-muted/50 flex flex-col items-center justify-center p-4 hover:bg-muted transition-colors cursor-pointer"
                >
                  <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">Document {i}</span>
                </div>
              ))}
              <button className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Owner Card */}
          <div className="card-premium p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              Pet Parent
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.location}</p>
                <p className="text-sm text-muted-foreground">{user.phone || user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Pet Modal */}
      {showAddPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-xl animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-primary" />
                Add New Pet
              </h2>
              <button 
                onClick={() => setShowAddPet(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Pet Name</label>
                <input
                  type="text"
                  value={newPetData.name}
                  onChange={(e) => setNewPetData({ ...newPetData, name: e.target.value })}
                  placeholder="What's your pet's name?"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Species</label>
                <div className="grid grid-cols-5 gap-2">
                  {speciesOptions.map((species) => (
                    <button
                      key={species}
                      type="button"
                      onClick={() => setNewPetData({ ...newPetData, species })}
                      className={`py-3 px-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                        newPetData.species === species
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {species}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Breed</label>
                <input
                  type="text"
                  value={newPetData.breed}
                  onChange={(e) => setNewPetData({ ...newPetData, breed: e.target.value })}
                  placeholder="e.g., Golden Retriever"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Age (years)</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={newPetData.age}
                  onChange={(e) => setNewPetData({ ...newPetData, age: e.target.value })}
                  placeholder="How old is your pet?"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Photo (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-border">
              <button 
                onClick={() => setShowAddPet(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPet}
                className="btn-primary flex-1"
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PetProfilePage;
