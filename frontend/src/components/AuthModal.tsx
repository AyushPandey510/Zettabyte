
import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onLogin: (userData: any) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const AuthModal = ({ mode, onClose, onLogin, onSwitchMode }: AuthModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        setIsLoading(false);
        return;
      }
    }
    
    // Mock successful authentication
    const userData = {
      id: Math.random().toString(36),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email
    };
    
    onLogin(userData);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-up">
      <Card className="w-full max-w-md ghibli-card animate-scale-in">
        <CardHeader className="relative text-center">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 text-forest-green-600 hover:text-forest-green-800 hover:bg-forest-green-50 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-forest-green-400 to-forest-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          
          <CardTitle className="text-2xl font-bold text-forest-green-800">
            {mode === 'login' ? 'Welcome Back!' : 'Join Zettabyte'}
          </CardTitle>
          <CardDescription className="text-forest-green-600">
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Create your account to start your coding journey'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-green-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-green-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="ghibli-input pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest-green-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-green-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="ghibli-input pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest-green-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-green-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="ghibli-input pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-green-500 hover:text-forest-green-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-green-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-green-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="ghibli-input pl-10"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full ghibli-button bg-gradient-to-r from-forest-green-400 to-forest-green-500 text-white hover:from-forest-green-500 hover:to-forest-green-600 mt-6"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-forest-green-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                className="text-forest-green-700 font-medium hover:text-forest-green-800 underline underline-offset-2"
              >
                {mode === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
