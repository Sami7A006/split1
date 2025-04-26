import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, SplitSquareVertical, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Password validation
  const minLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      navigate('/');
    }

    // Animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    try {
      setLoading(true);
      await register(email, password, name);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Failed to create account';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary-600 py-4 px-6 text-white text-center">
          <SplitSquareVertical size={32} className="mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-primary-100">Join SubSplit and start saving on subscriptions</p>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-10"
                  placeholder="John Doe"
                  required
                />
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="your@email.com"
                  required
                />
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-700">Password requirements:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center">
                  {minLength ? (
                    <CheckCircle2 size={16} className="text-success-500 mr-2" />
                  ) : (
                    <X size={16} className="text-gray-400 mr-2" />
                  )}
                  <span className={minLength ? 'text-success-700' : 'text-gray-500'}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center">
                  {hasNumber ? (
                    <CheckCircle2 size={16} className="text-success-500 mr-2" />
                  ) : (
                    <X size={16} className="text-gray-400 mr-2" />
                  )}
                  <span className={hasNumber ? 'text-success-700' : 'text-gray-500'}>
                    Contains a number
                  </span>
                </div>
                <div className="flex items-center">
                  {hasSpecial ? (
                    <CheckCircle2 size={16} className="text-success-500 mr-2" />
                  ) : (
                    <X size={16} className="text-gray-400 mr-2" />
                  )}
                  <span className={hasSpecial ? 'text-success-700' : 'text-gray-500'}>
                    Contains a special character
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordsMatch ? (
                    <CheckCircle2 size={16} className="text-success-500 mr-2" />
                  ) : (
                    <X size={16} className="text-gray-400 mr-2" />
                  )}
                  <span className={passwordsMatch ? 'text-success-700' : 'text-gray-500'}>
                    Passwords match
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !minLength || !hasNumber || !hasSpecial || !passwordsMatch}
              className="btn btn-primary w-full py-2.5"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;