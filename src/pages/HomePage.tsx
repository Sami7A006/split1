import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, CreditCard, Shield, Ticket, CheckCircle2 } from 'lucide-react';
import { getPopularServices } from '../data/services';
import { Subscription } from '../types';

const HomePage = () => {
  const [popularServices, setPopularServices] = useState<Subscription[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setPopularServices(getPopularServices(4));
    // Animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Split Subscriptions.<br />
                <span className="text-accent-300">Save Money.</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-lg">
                Connect with other students to share the cost of premium subscriptions. Get the services you love at a fraction of the price.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/services" className="btn bg-white text-primary-600 hover:bg-gray-100 text-base px-6 py-3 rounded-lg font-medium">
                  Browse Services
                </Link>
                <Link to="/register" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-base px-6 py-3 rounded-lg font-medium">
                  Sign Up Now
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full bg-accent-500 rounded-xl transform rotate-3"></div>
                <img 
                  src="https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Students saving money together" 
                  className="relative w-full h-auto rounded-xl shadow-xl max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SubSplit Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sharing subscription costs has never been easier. Follow these simple steps and start saving today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:shadow-md transition duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Create Your Account</h3>
              <p className="text-gray-600">
                Sign up, complete your profile, and tell us which subscriptions you're interested in sharing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:shadow-md transition duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                <Ticket className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Join or Create a Group</h3>
              <p className="text-gray-600">
                Browse existing groups or create your own. Our matching system finds people interested in the same services.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:shadow-md transition duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-5">
                <CreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Split & Save</h3>
              <p className="text-gray-600">
                Once your group is formed, coordinate payments through our secure platform and enjoy premium services for less.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Subscriptions */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Subscriptions</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                These are the most shared subscriptions on SubSplit. Find group members and start saving today.
              </p>
            </div>
            <Link to="/services" className="mt-4 md:mt-0 btn btn-primary">
              View All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <div key={service.id} className="card overflow-hidden hover:translate-y-[-5px] transition-all duration-300">
                <div className={`h-40 relative ${service.backgroundColor}`}>
                  <img 
                    src={service.icon} 
                    alt={service.name} 
                    className="w-full h-full object-cover mix-blend-multiply opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 text-sm">Group Price</span>
                      <p className="text-lg font-bold text-primary-600">₹{service.price}/mo</p>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users size={16} className="mr-1" />
                      <span className="text-sm">Up to {service.maxMembers}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <Link 
                      to={`/groups?service=${service.id}`}
                      className="btn btn-primary flex-1"
                    >
                      Find Groups
                    </Link>
                    <Link 
                      to={`/services/${service.id}`}
                      className="btn btn-outline flex-1"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SubSplit?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've created the safest and most user-friendly way for students to share subscription costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Payment Handling</h3>
                <p className="text-gray-600">
                  Our platform facilitates secure payment sharing between group members, ensuring everyone pays their fair share.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Verified Student Community</h3>
                <p className="text-gray-600">
                  Connect with other students from your college or around India in a trusted environment.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smart Matching System</h3>
                <p className="text-gray-600">
                  Our algorithm helps you find the perfect group members based on your subscription preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Save Up to 80% on Subscriptions</h3>
                <p className="text-gray-600">
                  By sharing costs with 2-5 members, you can drastically reduce what you pay for premium services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join SubSplit today and connect with other students who want to share subscription costs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="btn bg-white text-primary-600 hover:bg-gray-100 text-base px-8 py-3 rounded-lg font-medium"
            >
              Sign Up Free
            </Link>
            <Link 
              to="/services" 
              className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-base px-8 py-3 rounded-lg font-medium"
            >
              Browse Services <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;