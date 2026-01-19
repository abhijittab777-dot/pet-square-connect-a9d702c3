import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Cloud, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  MapPin,
  ChevronRight,
  PawPrint,
  Thermometer
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User, Pet, Reminder, Alert, defaultUser, defaultPets, defaultReminders, defaultAlerts } from '@/lib/storage';

const DashboardPage = () => {
  const [user] = useLocalStorage<User>('user', defaultUser);
  const [pets] = useLocalStorage<Pet[]>('pets', defaultPets);
  const [activePetId] = useLocalStorage<string>('activePetId', 'pet-1');
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('reminders', defaultReminders);
  const [alerts] = useLocalStorage<Alert[]>('alerts', defaultAlerts);

  const activePet = useMemo(() => {
    return pets.find(p => p.id === activePetId) || pets[0];
  }, [pets, activePetId]);

  const todayReminders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return reminders.filter(r => r.dueDate === today && !r.completed);
  }, [reminders]);

  const upcomingReminders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return reminders.filter(r => r.dueDate > today && !r.completed).slice(0, 3);
  }, [reminders]);

  const activeAlerts = useMemo(() => {
    return alerts.filter(a => a.status === 'active').slice(0, 3);
  }, [alerts]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
    );
  };

  return (
    <Layout>
      <div className="content-container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {getGreeting()}, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            It's a great day to walk {activePet?.name || 'your pet'} 🐾
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Widget */}
            <div className="card-premium p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center">
                    <Sun className="w-7 h-7 text-warning" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">72°F</p>
                    <p className="text-muted-foreground">Partly Cloudy</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm">
                    <Thermometer className="w-4 h-4 text-success" />
                    <span className="text-success font-medium">Low Pavement Heat</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Safe for walks
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Reminders */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today's Tasks
                </h2>
                <Link to="/dashboard" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>

              {todayReminders.length > 0 ? (
                <div className="space-y-3">
                  {todayReminders.map((reminder) => (
                    <div 
                      key={reminder.id}
                      onClick={() => toggleReminder(reminder.id)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        reminder.completed 
                          ? 'bg-success border-success' 
                          : 'border-border'
                      }`}>
                        {reminder.completed && <CheckCircle2 className="w-4 h-4 text-success-foreground" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {reminder.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          For {reminder.petName}
                        </p>
                      </div>
                      <span className="badge-warning">Due Today</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-success" />
                  <p>All caught up for today!</p>
                </div>
              )}

              {upcomingReminders.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Upcoming</p>
                  <div className="space-y-2">
                    {upcomingReminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between text-sm">
                        <span>{reminder.title} - {reminder.petName}</span>
                        <span className="text-muted-foreground">
                          {new Date(reminder.dueDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Local Alerts */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Local Alerts
                </h2>
                <Link to="/sos" className="text-sm text-primary hover:underline">
                  SOS Hub
                </Link>
              </div>

              {activeAlerts.length > 0 ? (
                <div className="space-y-3">
                  {activeAlerts.map((alert) => (
                    <Link
                      key={alert.id}
                      to="/sos"
                      className="block p-4 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`badge-${alert.type === 'lost' ? 'destructive' : 'success'}`}>
                              {alert.type === 'lost' ? 'Lost Pet' : 'Found Pet'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(alert.createdAt).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <p className="font-medium">{alert.petName} - {alert.breed}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Cloud className="w-12 h-12 mx-auto mb-3" />
                  <p>No active alerts in your area</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Pet Card */}
            {activePet && (
              <Link to="/pet-profile" className="card-premium p-6 block card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                    {activePet.photo ? (
                      <img src={activePet.photo} alt={activePet.name} className="w-full h-full object-cover" />
                    ) : (
                      <PawPrint className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{activePet.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {activePet.breed} • {activePet.age} years
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePet.vaccinated && <span className="badge-success text-xs">Vaccinated</span>}
                  {activePet.microchipped && <span className="badge-primary text-xs">Microchipped</span>}
                  {activePet.neutered && <span className="badge-accent text-xs">Neutered</span>}
                </div>
                <p className="text-sm text-primary mt-4 flex items-center gap-1">
                  View full profile <ChevronRight className="w-4 h-4" />
                </p>
              </Link>
            )}

            {/* Quick Actions */}
            <div className="card-premium p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link 
                  to="/sos" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="font-medium text-destructive">Report Lost/Found Pet</span>
                </Link>
                <Link 
                  to="/town-square" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <span>📝</span>
                  <span>Post to Town Square</span>
                </Link>
                <Link 
                  to="/activity" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <span>🏃</span>
                  <span>Start a Walk Session</span>
                </Link>
                <Link 
                  to="/map" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <span>🗺️</span>
                  <span>Find Nearby Services</span>
                </Link>
              </div>
            </div>

            {/* Community Preview */}
            <div className="card-premium p-6">
              <h3 className="font-semibold mb-4">Your Neighborhood</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full bg-secondary border-2 border-card"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">+42 neighbors</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  12 new posts today in {user.location}
                </p>
                <Link 
                  to="/circles" 
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Join local circles <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
