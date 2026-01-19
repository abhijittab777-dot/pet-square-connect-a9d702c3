import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  Plus, 
  ChevronLeft,
  Clock,
  PawPrint,
  Bell
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Reminder, Pet, defaultReminders, defaultPets } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const RemindersPage = () => {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('reminders', defaultReminders);
  const [pets] = useLocalStorage<Pet[]>('pets', defaultPets);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: '', petId: '', dueDate: '' });

  const today = new Date().toISOString().split('T')[0];

  const categorizedReminders = useMemo(() => {
    let filtered = reminders;
    
    if (filter === 'pending') {
      filtered = reminders.filter(r => !r.completed);
    } else if (filter === 'completed') {
      filtered = reminders.filter(r => r.completed);
    }

    const overdue = filtered.filter(r => r.dueDate < today && !r.completed);
    const todayReminders = filtered.filter(r => r.dueDate === today);
    const upcoming = filtered.filter(r => r.dueDate > today);
    const completed = filtered.filter(r => r.completed);

    return { overdue, today: todayReminders, upcoming, completed };
  }, [reminders, filter, today]);

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
    );
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.petId || !newReminder.dueDate) return;

    const pet = pets.find(p => p.id === newReminder.petId);
    const reminder: Reminder = {
      id: `reminder-${Date.now()}`,
      petId: newReminder.petId,
      petName: pet?.name || 'Unknown',
      title: newReminder.title,
      dueDate: newReminder.dueDate,
      completed: false,
    };

    setReminders(prev => [...prev, reminder]);
    setNewReminder({ title: '', petId: '', dueDate: '' });
    setIsAddOpen(false);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
    const isOverdue = reminder.dueDate < today && !reminder.completed;
    const isToday = reminder.dueDate === today;

    return (
      <div 
        className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
          reminder.completed 
            ? 'bg-muted/30' 
            : isOverdue 
              ? 'bg-destructive/10 border border-destructive/20'
              : 'bg-muted/50 hover:bg-muted'
        }`}
      >
        <button
          onClick={() => toggleReminder(reminder.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            reminder.completed 
              ? 'bg-success border-success' 
              : isOverdue
                ? 'border-destructive'
                : 'border-border hover:border-primary'
          }`}
        >
          {reminder.completed && <CheckCircle2 className="w-4 h-4 text-success-foreground" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
            {reminder.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <PawPrint className="w-3 h-3" />
              {reminder.petName}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className={`text-sm flex items-center gap-1 ${
              isOverdue ? 'text-destructive' : isToday ? 'text-warning' : 'text-muted-foreground'
            }`}>
              <Clock className="w-3 h-3" />
              {new Date(reminder.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: reminder.dueDate.split('-')[0] !== today.split('-')[0] ? 'numeric' : undefined
              })}
            </span>
          </div>
        </div>
        {isOverdue && !reminder.completed && (
          <span className="badge-destructive text-xs">Overdue</span>
        )}
        {isToday && !reminder.completed && (
          <span className="badge-warning text-xs">Today</span>
        )}
        <button
          onClick={() => deleteReminder(reminder.id)}
          className="text-muted-foreground hover:text-destructive transition-colors p-1"
          title="Delete reminder"
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="content-container py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Bell className="w-7 h-7 text-primary" />
              Reminders & Tasks
            </h1>
            <p className="text-muted-foreground mt-1">
              Keep track of your pet care schedule
            </p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reminder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Task Title</label>
                  <Input
                    placeholder="e.g., Vet appointment, Flea medication..."
                    value={newReminder.title}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Pet</label>
                  <Select 
                    value={newReminder.petId} 
                    onValueChange={(value) => setNewReminder(prev => ({ ...prev, petId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pet" />
                    </SelectTrigger>
                    <SelectContent>
                      {pets.map((pet) => (
                        <SelectItem key={pet.id} value={pet.id}>
                          {pet.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Due Date</label>
                  <Input
                    type="date"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, dueDate: e.target.value }))}
                    min={today}
                  />
                </div>
                <Button onClick={addReminder} className="w-full">
                  Add Reminder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Reminders List */}
        <div className="space-y-6">
          {/* Overdue */}
          {categorizedReminders.overdue.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-destructive flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5" />
                Overdue ({categorizedReminders.overdue.length})
              </h2>
              <div className="space-y-2">
                {categorizedReminders.overdue.map((reminder) => (
                  <ReminderItem key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          )}

          {/* Today */}
          {categorizedReminders.today.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-warning" />
                Today ({categorizedReminders.today.length})
              </h2>
              <div className="space-y-2">
                {categorizedReminders.today.map((reminder) => (
                  <ReminderItem key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {categorizedReminders.upcoming.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming ({categorizedReminders.upcoming.length})
              </h2>
              <div className="space-y-2">
                {categorizedReminders.upcoming.map((reminder) => (
                  <ReminderItem key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {filter !== 'pending' && categorizedReminders.completed.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-muted-foreground flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Completed ({categorizedReminders.completed.length})
              </h2>
              <div className="space-y-2">
                {categorizedReminders.completed.map((reminder) => (
                  <ReminderItem key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {reminders.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No reminders yet</h3>
              <p className="text-muted-foreground mb-6">
                Add your first reminder to keep track of pet care tasks
              </p>
              <Button onClick={() => setIsAddOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Reminder
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RemindersPage;
