import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Search, Filter, ChevronDown, Users, UserPlus, Calendar, Clock, Check } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Group } from '../types';
import { services, getServiceById } from '../data/services';
import toast from 'react-hot-toast';

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceParam = queryParams.get('service');

  useEffect(() => {
    // Set service filter from URL parameter if present
    if (serviceParam) {
      setSelectedService(serviceParam);
    }

    // Animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [serviceParam]);

  useEffect(() => {
    // Filter groups when search query or filters change
    let filtered = [...groups];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(query) ||
          group.description.toLowerCase().includes(query) ||
          group.subscriptionName.toLowerCase().includes(query)
      );
    }

    // Filter by service
    if (selectedService) {
      filtered = filtered.filter((group) => group.subscriptionId === selectedService);
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((group) => group.status === statusFilter);
    }

    setFilteredGroups(filtered);
  }, [groups, searchQuery, selectedService, statusFilter]);

  // Mock fetching groups data
  // In a real app, this would come from Firestore
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from Firestore
        // For now, we'll use mock data
        
        const mockGroups: Group[] = [
          {
            id: 'netflix-premium-1',
            name: 'Netflix Premium Group',
            subscriptionId: 'netflix',
            subscriptionName: 'Netflix',
            createdBy: 'user123',
            createdAt: new Date(),
            members: [
              {
                uid: 'user123',
                displayName: 'Alex Johnson',
                photoURL: null,
                role: 'admin',
                joinedAt: new Date(),
              },
              {
                uid: 'user456',
                displayName: 'Sam Smith',
                photoURL: null,
                role: 'member',
                joinedAt: new Date(),
              },
            ],
            status: 'forming',
            paymentInfo: 'Monthly payment through Venmo',
            maxMembers: 4,
            description: 'Looking for 2 more people to join our Netflix Premium group. We split the cost monthly.',
          },
          {
            id: 'spotify-family-1',
            name: 'Spotify Premium Family',
            subscriptionId: 'spotify',
            subscriptionName: 'Spotify Premium',
            createdBy: 'user789',
            createdAt: new Date(),
            members: [
              {
                uid: 'user789',
                displayName: 'Jamie Lee',
                photoURL: null,
                role: 'admin',
                joinedAt: new Date(),
              },
              {
                uid: 'user101',
                displayName: 'Taylor Wong',
                photoURL: null,
                role: 'member',
                joinedAt: new Date(),
              },
              {
                uid: 'user102',
                displayName: 'Jordan Clark',
                photoURL: null,
                role: 'member',
                joinedAt: new Date(),
              },
            ],
            status: 'forming',
            paymentInfo: 'Quarterly payments via PayPal',
            maxMembers: 5,
            description: 'Spotify Premium Family plan, looking for 2 more people to join. We pay quarterly to reduce transaction frequency.',
          },
          {
            id: 'adobe-cc-1',
            name: 'Adobe CC Study Group',
            subscriptionId: 'adobe-cc',
            subscriptionName: 'Adobe Creative Cloud',
            createdBy: 'user202',
            createdAt: new Date(),
            members: [
              {
                uid: 'user202',
                displayName: 'Pat Chen',
                photoURL: null,
                role: 'admin',
                joinedAt: new Date(),
              },
            ],
            status: 'forming',
            paymentInfo: 'Annual payment, split equally',
            maxMembers: 2,
            description: 'Design student looking for one person to share Adobe CC subscription. Perfect for other design/art students.',
          },
          {
            id: 'disney-plus-1',
            name: 'Disney+ Watch Party Squad',
            subscriptionId: 'disney-plus',
            subscriptionName: 'Disney+',
            createdBy: 'user303',
            createdAt: new Date(),
            members: [
              {
                uid: 'user303',
                displayName: 'Morgan Rivera',
                photoURL: null,
                role: 'admin',
                joinedAt: new Date(),
              },
              {
                uid: 'user304',
                displayName: 'Casey Williams',
                photoURL: null,
                role: 'member',
                joinedAt: new Date(),
              },
              {
                uid: 'user305',
                displayName: 'Riley Thompson',
                photoURL: null,
                role: 'member',
                joinedAt: new Date(),
              },
              {
                uid: 'user306',
                displayName: 'Avery Garcia',
                photoURL: null,
                role: 'member',
                joinedAt: new Date(),
              },
            ],
            status: 'active',
            paymentInfo: 'Monthly payment through Cash App',
            maxMembers: 4,
            description: 'Full Disney+ group that watches Star Wars and Marvel shows together weekly. We have a fun Discord server too!',
          },
        ];
        
        setGroups(mockGroups);
        setFilteredGroups(mockGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
        toast.error('Failed to load groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedService(null);
    setStatusFilter(null);
  };

  return (
    <div className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Subscription Groups</h1>
              <p className="text-lg text-primary-100">
                Find groups to join or create your own to start saving on subscription costs.
              </p>
            </div>
            <Link
              to="/groups/create"
              className="mt-4 md:mt-0 btn bg-white text-primary-600 hover:bg-gray-100 flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Create New Group
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 bg-white shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 pr-4 py-2 w-full"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline flex items-center"
              >
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown
                  size={18}
                  className={`ml-2 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {(searchQuery || selectedService || statusFilter) && (
                <button onClick={clearFilters} className="btn btn-secondary">
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slide-down">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-1/2">
                  <h3 className="font-medium mb-2">Subscription Service</h3>
                  <select
                    value={selectedService || ''}
                    onChange={(e) => setSelectedService(e.target.value || null)}
                    className="input w-full"
                  >
                    <option value="">All Services</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="font-medium mb-2">Group Status</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setStatusFilter(statusFilter === 'forming' ? null : 'forming')}
                      className={`px-3 py-1 rounded-full ${
                        statusFilter === 'forming'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Forming
                    </button>
                    <button
                      onClick={() => setStatusFilter(statusFilter === 'active' ? null : 'active')}
                      className={`px-3 py-1 rounded-full ${
                        statusFilter === 'active'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setStatusFilter(statusFilter === 'inactive' ? null : 'inactive')}
                      className={`px-3 py-1 rounded-full ${
                        statusFilter === 'inactive'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Groups List */}
      <section className="py-10 bg-gray-50 min-h-[calc(100vh-20rem)]">
        <div className="container mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No groups found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedService || statusFilter
                  ? 'Try adjusting your search filters'
                  : 'There are no groups available at the moment'}
              </p>
              {searchQuery || selectedService || statusFilter ? (
                <button
                  onClick={clearFilters}
                  className="btn btn-outline mx-auto"
                >
                  Clear Filters
                </button>
              ) : (
                <Link to="/groups/create" className="btn btn-primary mx-auto">
                  <Plus size={18} className="mr-1" />
                  Create a Group
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">Found {filteredGroups.length} groups</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="input py-1 pl-3 pr-8">
                    <option>Newest</option>
                    <option>Available Spots</option>
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredGroups.map((group) => {
                  const service = getServiceById(group.subscriptionId);
                  const availableSpots = group.maxMembers - group.members.length;
                  
                  return (
                    <div 
                      key={group.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className={`flex-shrink-0 w-full md:w-3 ${service?.backgroundColor || 'bg-gray-500'}`}></div>
                        <div className="p-5 md:p-6 flex-grow">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <div className="flex items-center mb-2">
                                <h3 className="text-xl font-bold">{group.name}</h3>
                                <span 
                                  className={`ml-3 px-2 py-0.5 text-xs rounded-full uppercase ${
                                    group.status === 'forming' 
                                      ? 'bg-primary-100 text-primary-700' 
                                      : group.status === 'active'
                                      ? 'bg-success-100 text-success-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {group.status}
                                </span>
                              </div>
                              <p className="text-gray-500 mb-2">
                                Sharing {group.subscriptionName}
                              </p>
                              <p className="text-gray-600 mb-4">{group.description}</p>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex flex-col items-end">
                              {service && (
                                <div className="text-right">
                                  <div className="text-sm text-gray-500">Monthly per person</div>
                                  <div className="text-xl font-bold text-primary-600">
                                    ${(service.price / group.maxMembers).toFixed(2)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row justify-between pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-3 mb-3 md:mb-0">
                              <div className="flex items-center text-sm text-gray-500">
                                <Users size={16} className="mr-1" />
                                <span>{group.members.length}/{group.maxMembers} members</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar size={16} className="mr-1" />
                                <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock size={16} className="mr-1" />
                                <span>{group.paymentInfo}</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              {group.status === 'forming' && availableSpots > 0 ? (
                                <Link 
                                  to={`/groups/${group.id}`} 
                                  className="btn btn-primary flex items-center"
                                >
                                  <UserPlus size={16} className="mr-1" />
                                  Join Group
                                </Link>
                              ) : group.status === 'active' ? (
                                <div className="flex items-center text-success-600">
                                  <Check size={16} className="mr-1" />
                                  <span>Group Active</span>
                                </div>
                              ) : (
                                <div className="text-gray-500">
                                  Group Full
                                </div>
                              )}
                              
                              <Link 
                                to={`/groups/${group.id}`} 
                                className="btn btn-outline"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default GroupsPage;