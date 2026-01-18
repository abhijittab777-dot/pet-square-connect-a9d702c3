import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Layout from '@/components/layout/Layout';
import { MapPin, Star, Phone, Clock, Users, Stethoscope, Scissors, TreePine, Coffee, GraduationCap, User } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const categories = [
  { id: 'all', label: 'All', icon: MapPin, color: 'primary' },
  { id: 'vets', label: 'Vets', icon: Stethoscope, color: 'destructive' },
  { id: 'groomers', label: 'Groomers', icon: Scissors, color: 'accent' },
  { id: 'parks', label: 'Dog Parks', icon: TreePine, color: 'success' },
  { id: 'cafes', label: 'Pet Cafes', icon: Coffee, color: 'warning' },
  { id: 'trainers', label: 'Trainers', icon: GraduationCap, color: 'primary' },
  { id: 'sitters', label: 'Sitters', icon: User, color: 'accent' },
];

const locations = [
  { id: 1, name: 'Happy Paws Vet Clinic', category: 'vets', rating: 4.8, distance: '0.5 mi', busy: false, lat: 40.7580, lng: -73.9855, phone: '(555) 123-4567', hours: '8AM - 6PM', checkedIn: 3 },
  { id: 2, name: 'Fluffy Grooming Spa', category: 'groomers', rating: 4.6, distance: '0.8 mi', busy: true, lat: 40.7614, lng: -73.9776, phone: '(555) 234-5678', hours: '9AM - 7PM', checkedIn: 5 },
  { id: 3, name: 'Central Dog Park', category: 'parks', rating: 4.9, distance: '0.3 mi', busy: false, lat: 40.7829, lng: -73.9654, phone: '', hours: '6AM - 10PM', checkedIn: 12 },
  { id: 4, name: 'Bark & Brew Cafe', category: 'cafes', rating: 4.5, distance: '1.2 mi', busy: true, lat: 40.7549, lng: -73.9840, phone: '(555) 345-6789', hours: '7AM - 9PM', checkedIn: 8 },
  { id: 5, name: 'Prospect Park Dog Run', category: 'parks', rating: 4.7, distance: '0.6 mi', busy: false, lat: 40.7694, lng: -73.9712, phone: '', hours: 'Open 24h', checkedIn: 6 },
  { id: 6, name: 'Paws Training Academy', category: 'trainers', rating: 4.9, distance: '1.0 mi', busy: false, lat: 40.7505, lng: -73.9934, phone: '(555) 456-7890', hours: '10AM - 6PM', checkedIn: 2 },
  { id: 7, name: 'Loving Paws Pet Sitters', category: 'sitters', rating: 4.8, distance: '0.4 mi', busy: false, lat: 40.7589, lng: -73.9901, phone: '(555) 567-8901', hours: 'By appointment', checkedIn: 0 },
  { id: 8, name: 'City Vet Emergency', category: 'vets', rating: 4.7, distance: '1.5 mi', busy: true, lat: 40.7450, lng: -73.9880, phone: '(555) 678-9012', hours: '24/7', checkedIn: 4 },
];

// Custom marker icons
const createIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const markerIcons: Record<string, Icon> = {
  vets: createIcon('#dc2626'),
  groomers: createIcon('#c2703a'),
  parks: createIcon('#16a34a'),
  cafes: createIcon('#eab308'),
  trainers: createIcon('#4a7c59'),
  sitters: createIcon('#c2703a'),
};

const ResourceMapPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  const filteredLocations = useMemo(() => {
    if (activeCategory === 'all') return locations;
    return locations.filter(loc => loc.category === activeCategory);
  }, [activeCategory]);

  const getCategoryIcon = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.icon || MapPin;
  };

  return (
    <Layout>
      <div className="content-container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Resource Map</h1>
        <p className="text-muted-foreground mb-6">Find pet-friendly places in your area</p>
        
        {/* Category Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-chip flex items-center gap-2 ${activeCategory === cat.id ? 'filter-chip-active' : ''}`}
              >
                <Icon className="w-4 h-4" /> {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 card-premium overflow-hidden" style={{ height: '500px' }}>
            <MapContainer
              center={[40.7580, -73.9855]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={markerIcons[location.category]}
                  eventHandlers={{
                    click: () => setSelectedLocation(location),
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-semibold">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.distance}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Location Cards */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {selectedLocation ? (
              /* Selected Location Detail */
              <div className="card-premium p-6 animate-fade-in">
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="text-sm text-primary mb-4 hover:underline"
                >
                  ← Back to list
                </button>
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{selectedLocation.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {selectedLocation.distance}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-warning">
                    <Star className="w-5 h-5 fill-current" /> 
                    <span className="font-semibold">{selectedLocation.rating}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {selectedLocation.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedLocation.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedLocation.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedLocation.checkedIn} pets checked in</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${
                    selectedLocation.busy 
                      ? 'bg-warning/10 text-warning' 
                      : 'bg-success/10 text-success'
                  }`}>
                    {selectedLocation.busy ? 'Currently Busy' : 'Not Busy'}
                  </span>
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(selectedLocation.checkedIn, 4))].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs">
                        🐾
                      </div>
                    ))}
                    {selectedLocation.checkedIn > 4 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                        +{selectedLocation.checkedIn - 4}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="btn-primary flex-1 py-2.5">Check In</button>
                  <button className="btn-secondary flex-1 py-2.5">Directions</button>
                </div>
              </div>
            ) : (
              /* Location List */
              filteredLocations.map((loc) => {
                const CategoryIcon = getCategoryIcon(loc.category);
                return (
                  <div 
                    key={loc.id} 
                    onClick={() => setSelectedLocation(loc)}
                    className="card-premium p-5 card-hover cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <CategoryIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{loc.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {loc.distance}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="w-4 h-4 fill-current" /> {loc.rating}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        loc.busy 
                          ? 'bg-warning/10 text-warning' 
                          : 'bg-success/10 text-success'
                      }`}>
                        {loc.busy ? 'Currently Busy' : 'Not Busy'}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" /> {loc.checkedIn}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceMapPage;
