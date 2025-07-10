
import { useState } from 'react';
import { Calendar, Code, Users, Award, Sparkles, TreePine, Leaf, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '@/components/EventCard';
import AuthModal from '@/components/AuthModal';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
    // Check if admin (mock logic)
    if (userData.email === 'admin@zettabyte.com') {
      setIsAdmin(true);
    }
  };

  const mockEvents = [
    {
      id: 1,
      title: "Algorithm Arena",
      description: "Test your problem-solving skills in this competitive programming challenge",
      date: "2024-08-15",
      time: "10:00 AM",
      participants: 45,
      maxParticipants: 100,
      type: "Competition",
      image: "🧮"
    },
    {
      id: 2,
      title: "Web Wizardry Workshop",
      description: "Learn modern web development techniques with React and Next.js",
      date: "2024-08-18",
      time: "2:00 PM",
      participants: 32,
      maxParticipants: 50,
      type: "Workshop",
      image: "🌐"
    },
    {
      id: 3,
      title: "AI Innovation Hackathon",
      description: "24-hour hackathon focusing on AI and machine learning solutions",
      date: "2024-08-22",
      time: "9:00 AM",
      participants: 67,
      maxParticipants: 80,
      type: "Hackathon",
      image: "🤖"
    }
  ];

  if (isAdmin) {
    return <AdminDashboard onLogout={() => { setIsAdmin(false); setUser(null); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream-50 via-forest-green-50 to-sky-blue-50">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 animate-float">
          <Leaf className="w-8 h-8 text-forest-green-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-gentle-bounce">
          <Star className="w-6 h-6 text-soft-pink-300 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
          <TreePine className="w-10 h-10 text-forest-green-400 opacity-40" />
        </div>
        <div className="absolute bottom-20 right-20 animate-gentle-bounce" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-7 h-7 text-sky-blue-300 opacity-60" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-forest-green-400 to-forest-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Code className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-forest-green-800">Zettabyte</h1>
              <p className="text-sm text-forest-green-600">Coding Event Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-forest-green-700 font-medium">Welcome, {user.name}!</span>
                <Button 
                  onClick={() => setUser(null)}
                  variant="outline"
                  className="ghibli-button border-forest-green-300 text-forest-green-700 hover:bg-forest-green-50"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  onClick={() => { setAuthMode('login'); setShowAuth(true); }}
                  variant="outline"
                  className="ghibli-button border-forest-green-300 text-forest-green-700 hover:bg-forest-green-50"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => { setAuthMode('register'); setShowAuth(true); }}
                  className="ghibli-button bg-gradient-to-r from-forest-green-400 to-forest-green-500 text-white hover:from-forest-green-500 hover:to-forest-green-600"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="mb-8 relative">
            <h2 className="text-6xl font-bold text-forest-green-800 mb-4 relative z-10">
              Welcome to Zettabyte
            </h2>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-forest-green-200 to-sky-blue-200 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-xl text-forest-green-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join us for an extraordinary coding journey where innovation meets creativity. 
            Participate in workshops, competitions, and hackathons designed to challenge and inspire.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => { setAuthMode('register'); setShowAuth(true); }}
              className="ghibli-button bg-gradient-to-r from-forest-green-400 to-forest-green-500 text-white hover:from-forest-green-500 hover:to-forest-green-600 text-lg px-8 py-4"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Events
            </Button>
            <Button 
              variant="outline"
              className="ghibli-button border-2 border-sky-blue-400 text-sky-blue-700 hover:bg-sky-blue-50 text-lg px-8 py-4"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Schedule
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "Participants", value: "500+", color: "forest-green" },
              { icon: Code, label: "Events", value: "25+", color: "sky-blue" },
              { icon: Award, label: "Prizes", value: "₹50K+", color: "soft-pink" }
            ].map((stat, index) => (
              <Card key={index} className={`ghibli-card text-center animate-scale-in hover:scale-105 transition-transform duration-300`} style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-500 flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-forest-green-800 mb-2">{stat.value}</h3>
                  <p className="text-forest-green-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-forest-green-800 mb-4">Upcoming Events</h3>
            <p className="text-xl text-forest-green-600 max-w-2xl mx-auto">
              Discover exciting coding challenges, workshops, and competitions designed to enhance your skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRegister={() => {
                  if (user) {
                    // Show success message or QR code
                    alert('Registration successful! Check your email for QR code.');
                  } else {
                    setAuthMode('register');
                    setShowAuth(true);
                  }
                }}
                animationDelay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-forest-green-800 to-forest-green-900 text-white py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-green-400 to-forest-green-600 rounded-full flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold">Zettabyte</h4>
          </div>
          <p className="text-forest-green-200 mb-4">
            Empowering the next generation of coders and innovators
          </p>
          <p className="text-forest-green-300 text-sm">
            © 2024 Zettabyte. Made with ❤️ for coding enthusiasts.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal 
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
};

export default Index;
