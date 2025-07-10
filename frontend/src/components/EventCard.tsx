
import { Calendar, Clock, Users, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  type: string;
  image: string;
}

interface EventCardProps {
  event: Event;
  onRegister: () => void;
  animationDelay?: number;
}

const EventCard = ({ event, onRegister, animationDelay = 0 }: EventCardProps) => {
  const participationPercentage = (event.participants / event.maxParticipants) * 100;
  
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'competition':
        return 'from-soft-pink-400 to-soft-pink-500';
      case 'workshop':
        return 'from-sky-blue-400 to-sky-blue-500';
      case 'hackathon':
        return 'from-forest-green-400 to-forest-green-500';
      default:
        return 'from-warm-cream-400 to-warm-cream-500';
    }
  };

  return (
    <Card 
      className="ghibli-card overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardHeader className="relative">
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(event.type)} shadow-lg`}>
            {event.type}
          </span>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-4xl mb-3 animate-gentle-bounce">{event.image}</div>
          <CardTitle className="text-xl font-bold text-forest-green-800 group-hover:text-forest-green-600 transition-colors">
            {event.title}
          </CardTitle>
        </div>
        
        <CardDescription className="text-forest-green-600 text-center leading-relaxed">
          {event.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-forest-green-700">
            <Calendar className="w-4 h-4 text-forest-green-500" />
            <span className="text-sm font-medium">{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-forest-green-700">
            <Clock className="w-4 h-4 text-forest-green-500" />
            <span className="text-sm font-medium">{event.time}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-forest-green-700">
            <Users className="w-4 h-4 text-forest-green-500" />
            <span className="text-sm font-medium">
              {event.participants}/{event.maxParticipants} participants
            </span>
          </div>
        </div>
        
        {/* Participation Progress Bar */}
        <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-forest-green-400 to-forest-green-500 rounded-full transition-all duration-300"
            style={{ width: `${participationPercentage}%` }}
          ></div>
        </div>
        
        <Button 
          onClick={onRegister}
          className="w-full ghibli-button bg-gradient-to-r from-forest-green-400 to-forest-green-500 text-white hover:from-forest-green-500 hover:to-forest-green-600 group"
          disabled={event.participants >= event.maxParticipants}
        >
          {event.participants >= event.maxParticipants ? (
            <>
              <Users className="w-4 h-4 mr-2" />
              Event Full
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
              Register Now
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
