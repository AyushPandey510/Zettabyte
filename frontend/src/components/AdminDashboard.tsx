
import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Calendar, BarChart, LogOut, Code, Sparkles, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  type: string;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Algorithm Arena",
      description: "Test your problem-solving skills in this competitive programming challenge",
      date: "2024-08-15",
      time: "10:00 AM",
      participants: 45,
      maxParticipants: 100,
      type: "Competition"
    },
    {
      id: 2,
      title: "Web Wizardry Workshop",
      description: "Learn modern web development techniques with React and Next.js",
      date: "2024-08-18",
      time: "2:00 PM",
      participants: 32,
      maxParticipants: 50,
      type: "Workshop"
    }
  ]);

  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: '',
    type: 'Workshop'
  });

  const handleCreateEvent = () => {
    const newEvent: Event = {
      id: Date.now(),
      title: eventForm.title,
      description: eventForm.description,
      date: eventForm.date,
      time: eventForm.time,
      participants: 0,
      maxParticipants: parseInt(eventForm.maxParticipants),
      type: eventForm.type
    };
    
    setEvents([...events, newEvent]);
    setEventForm({ title: '', description: '', date: '', time: '', maxParticipants: '', type: 'Workshop' });
    setShowEventForm(false);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      maxParticipants: event.maxParticipants.toString(),
      type: event.type
    });
    setShowEventForm(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    
    const updatedEvents = events.map(event => 
      event.id === editingEvent.id 
        ? {
            ...event,
            title: eventForm.title,
            description: eventForm.description,
            date: eventForm.date,
            time: eventForm.time,
            maxParticipants: parseInt(eventForm.maxParticipants),
            type: eventForm.type
          }
        : event
    );
    
    setEvents(updatedEvents);
    setEditingEvent(null);
    setEventForm({ title: '', description: '', date: '', time: '', maxParticipants: '', type: 'Workshop' });
    setShowEventForm(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);
  const averageParticipation = events.length > 0 ? Math.round(totalParticipants / events.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream-50 via-forest-green-50 to-sky-blue-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-forest-green-400 to-forest-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Code className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-forest-green-800">Admin Dashboard</h1>
              <p className="text-sm text-forest-green-600">Manage Zettabyte Events</p>
            </div>
          </div>
          
          <Button 
            onClick={onLogout}
            variant="outline"
            className="ghibli-button border-forest-green-300 text-forest-green-700 hover:bg-forest-green-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="ghibli-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-forest-green-600">Total Events</p>
                  <p className="text-3xl font-bold text-forest-green-800">{events.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-forest-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="ghibli-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-forest-green-600">Total Participants</p>
                  <p className="text-3xl font-bold text-forest-green-800">{totalParticipants}</p>
                </div>
                <Users className="w-8 h-8 text-sky-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="ghibli-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-forest-green-600">Avg. Participation</p>
                  <p className="text-3xl font-bold text-forest-green-800">{averageParticipation}</p>
                </div>
                <BarChart className="w-8 h-8 text-soft-pink-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Management */}
        <Card className="ghibli-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-forest-green-800">Event Management</CardTitle>
                <CardDescription>Create, edit, and manage your events</CardDescription>
              </div>
              <Button 
                onClick={() => setShowEventForm(true)}
                className="ghibli-button bg-gradient-to-r from-forest-green-400 to-forest-green-500 text-white hover:from-forest-green-500 hover:to-forest-green-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="border border-stone-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-forest-green-800 mb-1">{event.title}</h3>
                        <p className="text-sm text-forest-green-600 mb-2">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-forest-green-500">
                          <span>📅 {event.date}</span>
                          <span>🕐 {event.time}</span>
                          <span>👥 {event.participants}/{event.maxParticipants}</span>
                          <span className="px-2 py-1 rounded-full bg-forest-green-100 text-forest-green-700">
                            {event.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          onClick={() => handleEditEvent(event)}
                          size="sm"
                          variant="outline"
                          className="text-sky-blue-600 hover:text-sky-blue-700 hover:bg-sky-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteEvent(event.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl ghibli-card max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-forest-green-800">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </CardTitle>
                <Button
                  onClick={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                    setEventForm({ title: '', description: '', date: '', time: '', maxParticipants: '', type: 'Workshop' });
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-forest-green-600 hover:text-forest-green-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-forest-green-700">Event Title</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="ghibli-input mt-1"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-forest-green-700">Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="ghibli-input mt-1 h-24 resize-none"
                  placeholder="Enter event description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-forest-green-700">Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="ghibli-input mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-forest-green-700">Time</label>
                  <input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="ghibli-input mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-forest-green-700">Max Participants</label>
                  <input
                    type="number"
                    value={eventForm.maxParticipants}
                    onChange={(e) => setEventForm({ ...eventForm, maxParticipants: e.target.value })}
                    className="ghibli-input mt-1"
                    placeholder="e.g., 100"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-forest-green-700">Event Type</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                    className="ghibli-input mt-1"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  onClick={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                    setEventForm({ title: '', description: '', date: '', time: '', maxParticipants: '', type: 'Workshop' });
                  }}
                  variant="outline"
                  className="border-stone-300 text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                  className="ghibli-button bg-gradient-to-r from-forest-green-400 to-forest-green-500 text-white hover:from-forest-green-500 hover:to-forest-green-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
