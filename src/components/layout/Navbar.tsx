import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Map, 
  Heart, 
  BookOpen, 
  Sparkles,
  UserCircle,
  LogOut,
  PawPrint,
  Activity
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/town-square', label: 'Town Square', icon: Users },
  { path: '/map', label: 'Resource Map', icon: Map },
  { path: '/pet-profile', label: 'Pet ID', icon: PawPrint },
  { path: '/activity', label: 'Activity', icon: Activity },
  { path: '/adoption', label: 'Adoption', icon: Heart },
  { path: '/knowledge', label: 'Knowledge', icon: BookOpen },
  { path: '/ai-assistant', label: 'AI Care', icon: Sparkles },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="content-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <PawPrint className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Pet Square</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {isLoggedIn && navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'nav-link',
                  isActive(link.path) && 'nav-link-active'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/circles" className="btn-ghost text-sm">
                  Circles
                </Link>
                <Link to="/profile" className="btn-ghost text-sm flex items-center gap-2">
                  <UserCircle className="w-4 h-4" />
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn-ghost text-sm flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Join the Square
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 bg-background border-b border-border transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="content-container py-4 space-y-1">
          {isLoggedIn ? (
            <>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                      isActive(link.path) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <hr className="my-3 border-border" />
              <Link
                to="/circles"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted"
              >
                <Users className="w-5 h-5" />
                Pet Circles
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted"
              >
                <UserCircle className="w-5 h-5" />
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted w-full text-left text-destructive"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-muted"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl bg-primary text-primary-foreground text-center"
              >
                Join the Square
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
