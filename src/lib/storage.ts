// LocalStorage persistence utilities for Pet Square

const STORAGE_PREFIX = 'petSquare_';

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  clear: (): void => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  },
};

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  emergencyContact: string;
  avatar?: string;
  joinedDate: string;
}

export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  age: number;
  photo?: string;
  bio?: string;
  vaccinated: boolean;
  neutered: boolean;
  microchipped: boolean;
  temperament: string[];
  vetContact?: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPetTag: string;
  authorAvatar?: string;
  content: string;
  category: 'advice' | 'playdates' | 'lost-found' | 'recommendations' | 'general';
  location?: string;
  image?: string;
  pawUps: number;
  pawedBy: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  type: 'lost' | 'found';
  petName: string;
  petType: string;
  breed: string;
  description: string;
  location: string;
  photo?: string;
  reporterName: string;
  reporterContact: string;
  status: 'active' | 'resolved';
  createdAt: string;
}

export interface Reminder {
  id: string;
  petId: string;
  petName: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  petId: string;
  type: 'walk' | 'play';
  duration: number;
  distance?: number;
  date: string;
}

export interface JournalEntry {
  id: string;
  petId: string;
  content: string;
  mood: number;
  photo?: string;
  isPrivate: boolean;
  createdAt: string;
}

// Default mock data
export const defaultUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+1 555-123-4567',
  location: 'Brooklyn, NY',
  emergencyContact: '+1 555-987-6543',
  joinedDate: '2024-06-15',
};

export const defaultPets: Pet[] = [
  {
    id: 'pet-1',
    name: 'Luna',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    bio: 'Professional Ball Fetcher & Certified Good Girl',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    temperament: ['Good with kids', 'High energy', 'Loves water', 'Friendly'],
    vetContact: 'Dr. Smith - (555) 234-5678',
  },
  {
    id: 'pet-2',
    name: 'Max',
    species: 'cat',
    breed: 'Maine Coon',
    age: 5,
    bio: 'Master of Naps & Window Watching',
    vaccinated: true,
    neutered: true,
    microchipped: false,
    temperament: ['Independent', 'Calm', 'Loves treats'],
    vetContact: 'Dr. Smith - (555) 234-5678',
  },
];

export const defaultPosts: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-2',
    authorName: 'Sarah Mitchell',
    authorPetTag: 'Golden Retriever Mom',
    content: 'Had the best morning walk with Cooper today! The sunrise at Prospect Park was absolutely magical. Any other early risers here? 🌅🐕',
    category: 'general',
    location: '5 mins away',
    pawUps: 24,
    pawedBy: ['user-1'],
    comments: [
      {
        id: 'comment-1',
        authorId: 'user-3',
        authorName: 'Mike Chen',
        content: 'The best time for walks! Less crowded too.',
        createdAt: '2024-01-15T08:30:00Z',
      },
    ],
    createdAt: '2024-01-15T07:15:00Z',
  },
  {
    id: 'post-2',
    authorId: 'user-4',
    authorName: 'Emma Watson',
    authorPetTag: 'Cat Parent x2',
    content: 'Looking for recommendations for a good cat-sitter in the Williamsburg area. We\'re going away for a week next month. Must be experienced with shy cats! 🐱',
    category: 'recommendations',
    location: '10 mins away',
    pawUps: 8,
    pawedBy: [],
    comments: [],
    createdAt: '2024-01-15T10:20:00Z',
  },
  {
    id: 'post-3',
    authorId: 'user-5',
    authorName: 'James Park',
    authorPetTag: 'Rescue Dog Dad',
    content: 'Organizing a rescue dog meetup this Saturday at McCarren Park! All rescue pups welcome. Let\'s celebrate our second-chance babies! 🎉',
    category: 'playdates',
    location: '15 mins away',
    pawUps: 45,
    pawedBy: ['user-1', 'user-2'],
    comments: [
      {
        id: 'comment-2',
        authorId: 'user-1',
        authorName: 'Alex Johnson',
        content: 'Luna and I will be there! Can\'t wait!',
        createdAt: '2024-01-15T11:00:00Z',
      },
    ],
    createdAt: '2024-01-15T09:45:00Z',
  },
];

export const defaultAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'lost',
    petName: 'Buddy',
    petType: 'Dog',
    breed: 'Beagle Mix',
    description: 'Brown and white, wearing a blue collar with tags. Very friendly but might be scared.',
    location: 'Last seen near Central Park West',
    reporterName: 'John Davis',
    reporterContact: '555-111-2222',
    status: 'active',
    createdAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 'alert-2',
    type: 'found',
    petName: 'Unknown',
    petType: 'Cat',
    breed: 'Tabby',
    description: 'Gray tabby cat, no collar. Found hiding under a porch. Very scared but eating.',
    location: 'Found on 5th Street near the bakery',
    reporterName: 'Lisa Chen',
    reporterContact: '555-333-4444',
    status: 'active',
    createdAt: '2024-01-15T16:00:00Z',
  },
];

export const defaultReminders: Reminder[] = [
  {
    id: 'reminder-1',
    petId: 'pet-1',
    petName: 'Luna',
    title: 'Flea & Tick Medication',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
  },
  {
    id: 'reminder-2',
    petId: 'pet-1',
    petName: 'Luna',
    title: 'Annual Vaccination',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    completed: false,
  },
  {
    id: 'reminder-3',
    petId: 'pet-2',
    petName: 'Max',
    title: 'Grooming Appointment',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    completed: false,
  },
];

// Initialize storage with defaults if empty
export const initializeStorage = () => {
  if (!storage.get('initialized', false)) {
    storage.set('user', defaultUser);
    storage.set('pets', defaultPets);
    storage.set('activePetId', 'pet-1');
    storage.set('posts', defaultPosts);
    storage.set('alerts', defaultAlerts);
    storage.set('reminders', defaultReminders);
    storage.set('activities', []);
    storage.set('journal', []);
    storage.set('isLoggedIn', false);
    storage.set('onboardingComplete', false);
    storage.set('initialized', true);
  }
};
