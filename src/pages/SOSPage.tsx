import { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  Camera, 
  X,
  ChevronRight,
  ChevronLeft,
  Zap,
  BookOpen,
  Filter
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Alert, defaultAlerts } from '@/lib/storage';
import { toast } from 'sonner';

const firstAidGuides = [
  { id: 1, title: 'Dog ate chocolate', icon: '🍫', urgency: 'high' },
  { id: 2, title: 'Choking pet', icon: '😮', urgency: 'critical' },
  { id: 3, title: 'Heatstroke signs', icon: '🌡️', urgency: 'high' },
  { id: 4, title: 'Bleeding wound', icon: '🩹', urgency: 'medium' },
  { id: 5, title: 'Poisoning symptoms', icon: '☠️', urgency: 'critical' },
  { id: 6, title: 'Seizure response', icon: '⚡', urgency: 'high' },
];

const SOSPage = () => {
  const [alerts, setAlerts] = useLocalStorage<Alert[]>('alerts', defaultAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');
  const [reportStep, setReportStep] = useState(1);
  const [showGuide, setShowGuide] = useState<typeof firstAidGuides[0] | null>(null);
  
  const [reportData, setReportData] = useState({
    petName: '',
    petType: 'Dog',
    breed: '',
    age: '',
    description: '',
    location: '',
    contact: '',
  });

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch = 
        alert.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || alert.type === filterType;
      
      return matchesSearch && matchesType && alert.status === 'active';
    });
  }, [alerts, searchQuery, filterType]);

  const lostAlerts = filteredAlerts.filter(a => a.type === 'lost');
  const foundAlerts = filteredAlerts.filter(a => a.type === 'found');

  const openReportModal = (type: 'lost' | 'found') => {
    setReportType(type);
    setReportStep(1);
    setReportData({
      petName: '',
      petType: 'Dog',
      breed: '',
      age: '',
      description: '',
      location: '',
      contact: '',
    });
    setShowReportModal(true);
  };

  const submitReport = () => {
    const newAlert: Alert = {
      id: 'alert-' + Date.now(),
      type: reportType,
      petName: reportData.petName || 'Unknown',
      petType: reportData.petType,
      breed: reportData.breed || 'Unknown breed',
      description: reportData.description,
      location: reportData.location,
      reporterName: 'You',
      reporterContact: reportData.contact,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setAlerts(prev => [newAlert, ...prev]);
    setShowReportModal(false);
    toast.success(
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5" />
        <span>Push notification sent to all local users!</span>
      </div>
    );
  };

  const renderReportStep = () => {
    switch (reportStep) {
      case 1:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-semibold">Pet Details</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                {reportType === 'lost' ? "Pet's Name" : 'Pet Type'}
              </label>
              <input
                type="text"
                value={reportType === 'lost' ? reportData.petName : reportData.petType}
                onChange={(e) => setReportData({ 
                  ...reportData, 
                  [reportType === 'lost' ? 'petName' : 'petType']: e.target.value 
                })}
                placeholder={reportType === 'lost' ? "What's your pet's name?" : "Dog, Cat, etc."}
                className="input-premium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Breed</label>
              <input
                type="text"
                value={reportData.breed}
                onChange={(e) => setReportData({ ...reportData, breed: e.target.value })}
                placeholder="e.g., Golden Retriever"
                className="input-premium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Age</label>
              <input
                type="text"
                value={reportData.age}
                onChange={(e) => setReportData({ ...reportData, age: e.target.value })}
                placeholder="e.g., 3 years"
                className="input-premium"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-semibold">Location & Photo</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                {reportType === 'lost' ? 'Last Seen Location' : 'Location Found'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={reportData.location}
                  onChange={(e) => setReportData({ ...reportData, location: e.target.value })}
                  placeholder="Enter address or landmark"
                  className="input-premium pl-12"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Photo</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  A clear photo helps identification
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={reportData.description}
                onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                placeholder="Any distinctive features, collar color, behavior..."
                className="input-premium min-h-[100px] resize-none"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-semibold">Review & Submit</h3>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">{reportType} Pet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pet</span>
                  <span className="font-medium">{reportData.petName || reportData.petType} - {reportData.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{reportData.location || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium text-right max-w-[200px] truncate">
                    {reportData.description || 'No description'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Contact Info</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={reportData.contact}
                  onChange={(e) => setReportData({ ...reportData, contact: e.target.value })}
                  placeholder="Phone number for contact"
                  className="input-premium pl-12"
                />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm flex items-start gap-2">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Submitting will immediately notify all Pet Square users in your area with a push notification.
                </span>
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="content-container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              SOS Emergency Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Report and find lost pets in your community
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => openReportModal('lost')}
              className="btn-primary bg-destructive hover:bg-destructive/90 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Report Lost Pet
            </button>
            <button 
              onClick={() => openReportModal('found')}
              className="btn-secondary flex items-center gap-2"
            >
              Report Found Pet
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, breed, or location..."
              className="input-premium pl-12 w-full"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'lost', 'found'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`filter-chip capitalize ${filterType === type ? 'filter-chip-active' : ''}`}
              >
                {type === 'all' ? 'All Alerts' : `${type} Pets`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Alerts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lost Pets */}
            {(filterType === 'all' || filterType === 'lost') && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                  Active Lost Pet Alerts ({lostAlerts.length})
                </h2>
                {lostAlerts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {lostAlerts.map((alert) => (
                      <div key={alert.id} className="card-premium p-5 border-destructive/20">
                        <div className="flex items-start justify-between mb-3">
                          <span className="badge-destructive">Lost Pet</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(alert.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl">🐕</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold">{alert.petName}</h3>
                            <p className="text-sm text-muted-foreground">{alert.breed}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                              <MapPin className="w-3 h-3" />
                              {alert.location}
                            </p>
                          </div>
                        </div>
                        {alert.description && (
                          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                            {alert.description}
                          </p>
                        )}
                        <button className="btn-secondary w-full mt-4 py-2 text-sm">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Contact Reporter
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No active lost pet alerts in your area</p>
                  </div>
                )}
              </div>
            )}

            {/* Found Pets */}
            {(filterType === 'all' || filterType === 'found') && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-success" />
                  Found Pet Reports ({foundAlerts.length})
                </h2>
                {foundAlerts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {foundAlerts.map((alert) => (
                      <div key={alert.id} className="card-premium p-5 border-success/20">
                        <div className="flex items-start justify-between mb-3">
                          <span className="badge-success">Found Pet</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(alert.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl">🐱</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold">{alert.petType}</h3>
                            <p className="text-sm text-muted-foreground">{alert.breed}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                              <MapPin className="w-3 h-3" />
                              {alert.location}
                            </p>
                          </div>
                        </div>
                        {alert.description && (
                          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                            {alert.description}
                          </p>
                        )}
                        <button className="btn-primary w-full mt-4 py-2 text-sm">
                          <Phone className="w-4 h-4 inline mr-2" />
                          This might be my pet!
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No found pet reports in your area</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* First Aid Guide */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                First-Aid Quick Guide
              </h2>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  className="w-full py-2 pl-9 pr-4 rounded-lg bg-muted text-sm"
                />
              </div>
              <div className="space-y-2">
                {firstAidGuides.map((guide) => (
                  <button
                    key={guide.id}
                    onClick={() => setShowGuide(guide)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <span className="text-xl">{guide.icon}</span>
                    <span className="flex-1 text-sm">{guide.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      guide.urgency === 'critical' 
                        ? 'bg-destructive/10 text-destructive' 
                        : guide.urgency === 'high'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {guide.urgency}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-xl animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {reportType === 'lost' ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Report Lost Pet
                  </>
                ) : (
                  <>
                    <span className="text-xl">🔍</span>
                    Report Found Pet
                  </>
                )}
              </h2>
              <button 
                onClick={() => setShowReportModal(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-6 pt-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      s <= reportStep ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Step {reportStep} of 3
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {renderReportStep()}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border">
              {reportStep > 1 ? (
                <button 
                  onClick={() => setReportStep(reportStep - 1)}
                  className="btn-ghost flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}
              {reportStep < 3 ? (
                <button 
                  onClick={() => setReportStep(reportStep + 1)}
                  className="btn-primary flex items-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={submitReport}
                  className={`btn-primary flex items-center gap-2 ${
                    reportType === 'lost' ? 'bg-destructive hover:bg-destructive/90' : ''
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  Submit Alert
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* First Aid Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl w-full max-w-lg shadow-xl animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="text-2xl">{showGuide.icon}</span>
                {showGuide.title}
              </h2>
              <button 
                onClick={() => setShowGuide(null)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm font-medium text-destructive">
                  ⚠️ If symptoms are severe, contact your vet immediately!
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Immediate Steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Stay calm and assess the situation</li>
                  <li>Remove pet from immediate danger</li>
                  <li>Check vital signs (breathing, heartbeat)</li>
                  <li>Contact your emergency vet</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What NOT to do:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Don't induce vomiting without vet guidance</li>
                  <li>Don't give human medications</li>
                  <li>Don't panic - pets sense your stress</li>
                </ul>
              </div>
            </div>
            <div className="p-6 border-t border-border">
              <button 
                onClick={() => setShowGuide(null)}
                className="btn-primary w-full"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SOSPage;
