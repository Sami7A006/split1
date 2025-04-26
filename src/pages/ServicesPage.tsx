import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Filter, ChevronDown } from 'lucide-react';
import { services } from '../data/services';
import { Subscription } from '../types';

const ServicesPage = () => {
  const [filteredServices, setFilteredServices] = useState<Subscription[]>(services);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    { id: 'streaming', name: 'Streaming' },
    { id: 'music', name: 'Music' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'other', name: 'Other' },
  ];

  useEffect(() => {
    // Animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory, maxPrice]);

  const filterServices = () => {
    let result = [...services];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((service) => service.category === selectedCategory);
    }

    // Filter by price
    result = result.filter((service) => service.price <= maxPrice);

    setFilteredServices(result);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setMaxPrice(100);
  };

  return (
    <div className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Banner */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Services to Share</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Browse our collection of premium subscriptions and find people to share costs with.
            Search by category or name to find exactly what you're looking for.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search services..."
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
                onClick={toggleFilters}
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
              {(searchQuery || selectedCategory || maxPrice < 100) && (
                <button onClick={clearFilters} className="btn btn-secondary">
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slide-down">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          selectedCategory === category.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-56">
                  <h3 className="font-medium mb-2">Max Price: ${maxPrice}</h3>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-2">No services found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search for something else.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 btn btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {filteredServices.length} services
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="input py-1 pl-3 pr-8">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Alphabetical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="card overflow-hidden hover:translate-y-[-5px] transition-all duration-300"
                  >
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
                          <p className="text-lg font-bold text-primary-600">${service.price.toFixed(2)}/mo</p>
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;