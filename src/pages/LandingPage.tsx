import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Shield, 
  Star, 
  Calendar, 
  Heart,
  ChevronRight,
  Play,
  PawPrint,
  Sparkles,
  Bell
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import heroImage from '@/assets/hero-park.jpg';

const LandingPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Happy pet owners in park" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <div className="content-container relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Join 10,000+ pet parents</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              The Neighborhood Square for You and Your{' '}
              <span className="text-gradient">Best Friend</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Join a community that watches out for your pet. From emergency SOS alerts to local playdates, Pet Square keeps your pet safe and social.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/signup" className="btn-hero inline-flex items-center justify-center gap-2">
                <PawPrint className="w-5 h-5" />
                Join the Square
              </Link>
              <button className="btn-hero-secondary inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80">
                <Play className="w-5 h-5" />
                Watch how it works
              </button>
            </div>

            {/* Mini Alert Preview */}
            <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-success/10 border border-success/20">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-success">Alert Resolved!</p>
                  <p className="text-xs text-muted-foreground">Luna was found safe • 20 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Peace of Mind Feature Grid */}
      <section className="section-padding bg-secondary/30">
        <div className="content-container">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything Your Pet Needs, In One Place
            </h2>
            <p className="text-muted-foreground text-lg">
              Built by pet parents, for pet parents. Experience peace of mind like never before.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* SOS Feature */}
            <div className="feature-card group">
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SOS Emergency Hub</h3>
              <p className="text-muted-foreground">
                Never panic alone. Trigger instant local alerts if your pet goes missing and access 24/7 first-aid guides.
              </p>
              <Link to="/sos" className="inline-flex items-center gap-1 mt-4 text-destructive font-medium hover:gap-2 transition-all">
                Learn more <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Town Square Feature */}
            <div className="feature-card group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">The Town Square</h3>
              <p className="text-muted-foreground">
                Connect with neighbors. Share tips, find breed-specific groups, and stay updated on local pet news.
              </p>
              <Link to="/town-square" className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:gap-2 transition-all">
                Explore <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Resource Map Feature */}
            <div className="feature-card group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">The Resource Map</h3>
              <p className="text-muted-foreground">
                Your city, pet-verified. Find the best groomers, vets, and dog-friendly cafes as rated by your community.
              </p>
              <Link to="/map" className="inline-flex items-center gap-1 mt-4 text-accent font-medium hover:gap-2 transition-all">
                Discover <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="section-padding">
        <div className="content-container">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">The Neighborhood is Growing</h2>
              <p className="text-primary-foreground/80">Join thousands of pet parents making a difference</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">10k+</div>
                <div className="text-primary-foreground/70 text-sm mt-1">Pets Protected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">500+</div>
                <div className="text-primary-foreground/70 text-sm mt-1">Local Circles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">50+</div>
                <div className="text-primary-foreground/70 text-sm mt-1">Pets Reunited</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">4.9</div>
                <div className="text-primary-foreground/70 text-sm mt-1 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary/30">
        <div className="content-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Pet Parents
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "The SOS alert helped me find Luna in 20 minutes. I'm forever grateful.",
                author: "Sarah Mitchell",
                pet: "Golden Retriever Owner",
                rating: 5
              },
              {
                quote: "Finally, a platform that understands what pet parents really need. The community is amazing!",
                author: "Mike Chen",
                pet: "Cat Dad x2",
                rating: 5
              },
              {
                quote: "Found my new favorite dog park and the best vet in town, all through Pet Square.",
                author: "Emma Davis",
                pet: "French Bulldog Mom",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="card-premium p-6 md:p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet-ID Preview */}
      <section className="section-padding">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-primary mb-4">Pet-ID Profile</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                A Digital Passport for Your Pet
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Keep health records, temperament traits, and emergency contacts in one place—accessible to anyone who finds your pet with a simple scan.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Complete health records & vaccination history',
                  'Temperament traits & behavioral notes',
                  'Emergency contacts & vet information',
                  'QR code for instant profile access'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-success" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
                Create Your Pet's Profile <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mock Pet-ID Card */}
            <div className="relative">
              <div className="card-premium p-6 md:p-8 max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center">
                    <PawPrint className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Luna</h3>
                    <p className="text-muted-foreground">Golden Retriever • 3 years</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="badge-success">Vaccinated</span>
                  <span className="badge-success">Microchipped</span>
                  <span className="badge-primary">Neutered</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-accent" />
                    <span>Good with kids • Loves water • High energy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Owner: Alex Johnson • Brooklyn, NY</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Local Discovery */}
      <section className="section-padding bg-secondary/30">
        <div className="content-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Happening Now in Your Square
            </h2>
            <p className="text-muted-foreground text-lg">
              Stay connected with what's happening in your local pet community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Event Card */}
            <div className="card-premium p-6 card-hover">
              <div className="flex items-center gap-2 text-sm text-primary mb-3">
                <Calendar className="w-4 h-4" />
                <span>Event</span>
              </div>
              <h3 className="font-semibold mb-2">Sunday Poodle Meetup</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Central Park, Main Lawn • This Sunday, 10 AM
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-card" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">+12 attending</span>
              </div>
            </div>

            {/* Alert Card */}
            <div className="card-premium p-6 card-hover border-warning/30">
              <div className="flex items-center gap-2 text-sm text-warning mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Safety Alert</span>
              </div>
              <h3 className="font-semibold mb-2">Blue Algae Warning</h3>
              <p className="text-sm text-muted-foreground mb-4">
                West Lake area - Keep pets away from the water until further notice.
              </p>
              <span className="badge-warning">Active Warning</span>
            </div>

            {/* Adoption Card */}
            <div className="card-premium p-6 card-hover">
              <div className="flex items-center gap-2 text-sm text-accent mb-3">
                <Heart className="w-4 h-4" />
                <span>Adoption</span>
              </div>
              <h3 className="font-semibold mb-2">Meet Barnaby</h3>
              <p className="text-sm text-muted-foreground mb-4">
                A senior beagle looking for a quiet couch and a loving home.
              </p>
              <Link to="/adoption" className="btn-secondary text-sm py-2">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="content-container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Give Your Pet a Community?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of pet parents who trust Pet Square to keep their furry friends safe, healthy, and social.
            </p>
            <Link to="/signup" className="btn-hero inline-flex items-center gap-2">
              <PawPrint className="w-5 h-5" />
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
