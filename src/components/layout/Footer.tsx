import { Link } from 'react-router-dom';
import { PawPrint, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="content-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Pet Square</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The neighborhood square for you and your best friend. Built for the love of pets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/town-square" className="hover:text-foreground transition-colors">
                  Town Square
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-foreground transition-colors">
                  Resource Map
                </Link>
              </li>
              <li>
                <Link to="/sos" className="hover:text-foreground transition-colors">
                  SOS Hub
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="hover:text-foreground transition-colors">
                  Knowledge Wall
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/adoption" className="hover:text-foreground transition-colors">
                  Adoption Portal
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-foreground transition-colors">
                  AI Care Assistant
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-foreground transition-colors">
                  Ask for Help
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-foreground transition-colors">
                  Pet Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Pet Square. Built with <Heart className="w-4 h-4 inline text-destructive" /> for the love of pets.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
