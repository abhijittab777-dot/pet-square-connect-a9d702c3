import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  PawPrint, 
  Camera, 
  Bell, 
  Eye, 
  ArrowRight, 
  ArrowLeft,
  Check
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User as UserType, Pet, defaultUser, defaultPets } from '@/lib/storage';
import { toast } from 'sonner';

const speciesOptions = ['dog', 'cat', 'bird', 'rabbit', 'other'] as const;

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [, setUser] = useLocalStorage<UserType>('user', defaultUser);
  const [, setPets] = useLocalStorage<Pet[]>('pets', defaultPets);
  const [, setOnboardingComplete] = useLocalStorage('onboardingComplete', false);
  const [, setActivePetId] = useLocalStorage('activePetId', 'pet-1');
  const navigate = useNavigate();

  const [ownerInfo, setOwnerInfo] = useState({
    name: '',
    location: '',
    emergencyContact: '',
  });

  const [petInfo, setPetInfo] = useState({
    name: '',
    species: 'dog' as Pet['species'],
    breed: '',
    age: '',
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    communityVisibility: true,
  });

  const handleComplete = () => {
    // Save user data
    const newUser: UserType = {
      id: 'user-1',
      name: ownerInfo.name || 'Pet Parent',
      email: 'user@example.com',
      location: ownerInfo.location || 'New York, NY',
      emergencyContact: ownerInfo.emergencyContact || '',
      joinedDate: new Date().toISOString(),
    };
    setUser(newUser);

    // Save pet data
    const newPet: Pet = {
      id: 'pet-new-' + Date.now(),
      name: petInfo.name || 'My Pet',
      species: petInfo.species,
      breed: petInfo.breed || 'Mixed',
      age: parseInt(petInfo.age) || 1,
      vaccinated: false,
      neutered: false,
      microchipped: false,
      temperament: [],
    };
    setPets([newPet, ...defaultPets]);
    setActivePetId(newPet.id);
    setOnboardingComplete(true);
    
    toast.success('Welcome to Pet Square! 🐾');
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
            <p className="text-muted-foreground mb-8">
              This helps us personalize your experience
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={ownerInfo.name}
                    onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })}
                    placeholder="What should we call you?"
                    className="input-premium pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={ownerInfo.location}
                    onChange={(e) => setOwnerInfo({ ...ownerInfo, location: e.target.value })}
                    placeholder="City, State"
                    className="input-premium pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Emergency Contact</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={ownerInfo.emergencyContact}
                    onChange={(e) => setOwnerInfo({ ...ownerInfo, emergencyContact: e.target.value })}
                    placeholder="Emergency phone number"
                    className="input-premium pl-12"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <PawPrint className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Add your first pet</h2>
            <p className="text-muted-foreground mb-8">
              You can add more pets later from your profile
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Pet's Name</label>
                <input
                  type="text"
                  value={petInfo.name}
                  onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
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
                      onClick={() => setPetInfo({ ...petInfo, species })}
                      className={`py-3 px-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                        petInfo.species === species
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
                  value={petInfo.breed}
                  onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })}
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
                  value={petInfo.age}
                  onChange={(e) => setPetInfo({ ...petInfo, age: e.target.value })}
                  placeholder="How old is your pet?"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Photo (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload a photo
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Set your preferences</h2>
            <p className="text-muted-foreground mb-8">
              Customize how you want to use Pet Square
            </p>

            <div className="space-y-4">
              <div 
                onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get alerts for SOS, reminders, and community updates
                    </p>
                  </div>
                </div>
                <div className={`w-12 h-7 rounded-full transition-colors ${
                  preferences.notifications ? 'bg-primary' : 'bg-border'
                } relative`}>
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-all ${
                    preferences.notifications ? 'right-1' : 'left-1'
                  }`} />
                </div>
              </div>

              <div 
                onClick={() => setPreferences({ ...preferences, communityVisibility: !preferences.communityVisibility })}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Community Visibility</p>
                    <p className="text-sm text-muted-foreground">
                      Let neighbors see your profile and pet info
                    </p>
                  </div>
                </div>
                <div className={`w-12 h-7 rounded-full transition-colors ${
                  preferences.communityVisibility ? 'bg-primary' : 'bg-border'
                } relative`}>
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-all ${
                    preferences.communityVisibility ? 'right-1' : 'left-1'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="w-full max-w-lg">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-primary' : s < step ? 'w-2 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="card-premium p-8 md:p-10">
          {renderStep()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-ghost flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="btn-primary flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="btn-primary flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Complete Setup
              </button>
            )}
          </div>
        </div>

        {/* Skip Option */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          <button 
            onClick={handleComplete}
            className="hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
