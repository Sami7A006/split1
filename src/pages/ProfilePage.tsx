import { useState, useEffect, ChangeEvent } from 'react';
import { Table as Tab, Users, CreditCard, Bell, Star, Settings, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }

    // Animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [user]);

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      await updateUserProfile({ displayName });
      setIsEditingProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setDisplayName(user?.displayName || '');
    setIsEditingProfile(false);
  };

  return (
    <div className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-lg text-primary-100">
            Manage your account, groups, and settings
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center py-4 px-6 border-b-2 ${
                activeTab === 'profile'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <User size={18} className="mr-2" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex items-center py-4 px-6 border-b-2 ${
                activeTab === 'groups'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users size={18} className="mr-2" />
              <span>My Groups</span>
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center py-4 px-6 border-b-2 ${
                activeTab === 'payments'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCard size={18} className="mr-2" />
              <span>Payments</span>
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`flex items-center py-4 px-6 border-b-2 ${
                activeTab === 'ratings'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star size={18} className="mr-2" />
              <span>Ratings</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center py-4 px-6 border-b-2 ${
                activeTab === 'notifications'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bell size={18} className="mr-2" />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center py-4 px-6 border-b-2 ${
                activeTab === 'settings'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings size={18} className="mr-2" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-8 bg-gray-50 min-h-[calc(100vh-15rem)]">
        <div className="container mx-auto px-4 md:px-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Profile</h2>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="btn btn-outline"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'Profile'}
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      ) : (
                        <User size={48} />
                      )}
                    </div>
                    {isEditingProfile && (
                      <button className="btn btn-outline mt-2">
                        Upload Photo
                      </button>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="input"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{displayName || 'Not set'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-gray-900 py-2">{email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member Since
                      </label>
                      <p className="text-gray-900 py-2">
                        {user?.metadata.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : 'Unknown'}
                      </p>
                    </div>

                    {isEditingProfile && (
                      <div className="flex space-x-2 pt-4">
                        <button
                          onClick={handleSaveProfile}
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === 'groups' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Groups</h2>
                <button className="btn btn-primary">Create Group</button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 text-center">
                  <p className="text-gray-600">You are not a member of any groups yet.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Browse available groups or create your own to start saving on subscriptions.
                  </p>
                  <div className="mt-4">
                    <button className="btn btn-primary mr-2">Browse Groups</button>
                    <button className="btn btn-outline">Create Group</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Payment History</h2>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 text-center">
                  <p className="text-gray-600">You don't have any payment history yet.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Once you join a group and make a payment, it will appear here.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Ratings Tab */}
          {activeTab === 'ratings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">My Ratings</h2>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 text-center">
                  <p className="text-gray-600">You haven't received any ratings yet.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Ratings from other members will appear here after you've shared subscriptions with them.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Notifications</h2>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 text-center">
                  <p className="text-gray-600">You don't have any notifications.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We'll notify you when you receive group invites, messages, or payment reminders.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2">Email notifications</span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2">Group invites</span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2">Payment reminders</span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="ml-2">New messages</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Password</h3>
                  <button className="btn btn-outline">Change Password</button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">Email Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="ml-2">Marketing emails</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="ml-2">New feature updates</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3 text-error-600">Danger Zone</h3>
                  <p className="text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="btn bg-error-100 text-error-600 hover:bg-error-200">
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;