import { useState, useEffect, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Send, 
  Share2, 
  Calendar, 
  CreditCard, 
  Star, 
  ChevronLeft, 
  Clock,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { getServiceById } from '../data/services';
import { Group, Message as MessageType } from '../types';
import toast from 'react-hot-toast';

const GroupDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  const subscription = group ? getServiceById(group.subscriptionId) : null;
  const isMember = group?.members.some(member => member.uid === user?.uid);
  const isAdmin = group?.members.some(member => member.uid === user?.uid && member.role === 'admin');
  const canJoin = group && group.status === 'forming' && group.members.length < group.maxMembers && !isMember;
  const memberCount = group?.members.length || 0;
  const maxMembers = group?.maxMembers || 0;
  const spotsLeft = maxMembers - memberCount;

  useEffect(() => {
    // Animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock fetching group data
  // In a real app, this would come from Firestore
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setLoading(true);
        
        // Mock data for the group detail
        const mockGroup: Group = {
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
              joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            },
          ],
          status: 'forming',
          paymentInfo: 'Monthly payment through Venmo',
          maxMembers: 4,
          description: 'Looking for 2 more people to join our Netflix Premium group. We split the cost monthly. We usually watch shows together on weekends sometimes, but everyone gets their own profile.',
        };
        
        // Mock messages
        const mockMessages: MessageType[] = [
          {
            id: 'msg1',
            groupId: 'netflix-premium-1',
            senderId: 'user123',
            senderName: 'Alex Johnson',
            text: 'Welcome to the Netflix group! We\'re looking for 2 more people to join.',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            isRead: true,
          },
          {
            id: 'msg2',
            groupId: 'netflix-premium-1',
            senderId: 'user456',
            senderName: 'Sam Smith',
            text: 'Just joined! Looking forward to sharing the subscription.',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            isRead: true,
          },
          {
            id: 'msg3',
            groupId: 'netflix-premium-1',
            senderId: 'user123',
            senderName: 'Alex Johnson',
            text: 'Great! I\'ll send the payment details once we have all 4 members.',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1000 * 60 * 30), // 3 days ago + 30 min
            isRead: true,
          },
          {
            id: 'msg4',
            groupId: 'netflix-premium-1',
            senderId: 'user456',
            senderName: 'Sam Smith',
            text: 'Sounds good! I invited a friend who might be interested.',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            isRead: true,
          },
        ];
        
        setGroup(mockGroup);
        setMessages(mockMessages);
      } catch (error) {
        console.error('Error fetching group data:', error);
        toast.error('Failed to load group details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGroup();
    }
  }, [id]);

  const handleJoinGroup = async () => {
    if (!group || !user) return;
    
    try {
      // In a real app, this would update the group in Firestore
      toast.success('You have joined the group successfully!');
      
      // Update the local state to reflect the new member
      const newMember = {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL,
        role: 'member',
        joinedAt: new Date(),
      };
      
      setGroup(prev => {
        if (!prev) return null;
        return {
          ...prev,
          members: [...prev.members, newMember],
        };
      });
      
      // Add a system message
      const systemMessage: MessageType = {
        id: `msg-${Date.now()}`,
        groupId: group.id,
        senderId: 'system',
        senderName: 'System',
        text: `${user.displayName || 'A new user'} has joined the group!`,
        createdAt: new Date(),
        isRead: false,
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
    } catch (error) {
      console.error('Error joining group:', error);
      toast.error('Failed to join the group');
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user || !group) return;
    
    // Create a new message
    const message: MessageType = {
      id: `msg-${Date.now()}`,
      groupId: group.id,
      senderId: user.uid,
      senderName: user.displayName || 'Anonymous',
      text: newMessage.trim(),
      createdAt: new Date(),
      isRead: false,
    };
    
    // In a real app, this would save to Firestore
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <AlertCircle size={48} className="mx-auto text-error-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Group Not Found</h2>
          <p className="text-gray-600 mb-6">
            The group you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/groups" className="btn btn-primary">
            <ChevronLeft size={16} className="mr-1" />
            Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <section className={`${subscription?.backgroundColor || 'bg-primary-600'} text-white py-12`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center mb-2">
                <Link to="/groups" className="flex items-center text-white/80 hover:text-white mr-3">
                  <ChevronLeft size={20} />
                  <span>Back</span>
                </Link>
                <span 
                  className={`px-2 py-0.5 text-xs rounded-full uppercase ${
                    group.status === 'forming' 
                      ? 'bg-white/20 text-white' 
                      : group.status === 'active'
                      ? 'bg-success-100 text-success-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {group.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{group.name}</h1>
              <p className="text-lg text-white/80">
                Sharing {group.subscriptionName} • {group.members.length}/{group.maxMembers} members
              </p>
            </div>

            {canJoin ? (
              <button
                onClick={handleJoinGroup}
                className="mt-4 md:mt-0 btn bg-white text-primary-600 hover:bg-gray-100 flex items-center"
              >
                <UserPlus size={18} className="mr-2" />
                Join Group
              </button>
            ) : !isMember ? (
              <div className="mt-4 md:mt-0 py-2 px-3 bg-white/10 rounded-lg text-white">
                Group is {group.status === 'forming' ? 'full' : 'not accepting new members'}
              </div>
            ) : (
              <div className="mt-4 md:mt-0 py-2 px-3 bg-white/10 rounded-lg text-white">
                You're a member
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Group Details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">About</h2>
                <p className="text-gray-700 mb-4">{group.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar size={18} className="flex-shrink-0 mt-0.5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-gray-600">{format(new Date(group.createdAt), 'MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CreditCard size={18} className="flex-shrink-0 mt-0.5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-gray-600">{group.paymentInfo}</p>
                    </div>
                  </div>
                  
                  {subscription && (
                    <div className="flex items-start">
                      <Clock size={18} className="flex-shrink-0 mt-0.5 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Individual Monthly Cost</p>
                        <p className="text-primary-600 font-bold">
                          ${(subscription.price / group.maxMembers).toFixed(2)}/mo
                        </p>
                        <p className="text-xs text-gray-500">
                          (Total: ${subscription.price.toFixed(2)}/mo)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {isMember && (
                  <div className="mt-6 pt-5 border-t">
                    <button className="btn btn-outline w-full flex items-center justify-center">
                      <Share2 size={16} className="mr-2" />
                      Invite Friends
                    </button>
                  </div>
                )}
              </div>
              
              {/* Members */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="text-xl font-bold">Members</h2>
                  <div className="text-sm text-gray-500">
                    {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {group.members.map((member) => (
                    <div key={member.uid} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-700 mr-3">
                          {member.photoURL ? (
                            <img 
                              src={member.photoURL} 
                              alt={member.displayName} 
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium">
                              {member.displayName.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{member.displayName}</p>
                          <div className="flex items-center">
                            <span 
                              className={`text-xs px-1.5 py-0.5 rounded ${
                                member.role === 'admin' 
                                  ? 'bg-primary-100 text-primary-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {member.role}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              Joined {format(new Date(member.joinedAt), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {isMember && member.uid !== user?.uid && (
                        <button className="text-gray-400 hover:text-primary-600">
                          <MessageSquare size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Chat and Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold">Group Chat</h2>
                  <div className="text-sm text-gray-500">
                    {messages.length} messages
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare size={48} className="text-gray-300 mb-2" />
                      <p className="text-gray-500">No messages yet.</p>
                      <p className="text-gray-400 text-sm">
                        {isMember ? 'Start the conversation!' : 'Join the group to chat.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[75%] rounded-lg p-3 ${
                              message.senderId === user?.uid 
                                ? 'bg-primary-500 text-white' 
                                : message.senderId === 'system'
                                ? 'bg-gray-200 text-gray-700'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.senderId !== user?.uid && message.senderId !== 'system' && (
                              <p className="text-xs font-medium mb-1">{message.senderName}</p>
                            )}
                            <p>{message.text}</p>
                            <p className="text-xs opacity-70 text-right mt-1">
                              {format(new Date(message.createdAt), 'h:mm a, MMM d')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {isMember ? (
                  <form onSubmit={handleSendMessage} className="p-4 border-t flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="input flex-1 mr-2"
                    />
                    <button 
                      type="submit" 
                      disabled={!newMessage.trim()}
                      className="btn btn-primary"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                ) : (
                  <div className="p-4 border-t bg-gray-50 text-center">
                    <p className="text-gray-600 mb-2">Join this group to participate in the conversation</p>
                    {canJoin && (
                      <button
                        onClick={handleJoinGroup}
                        className="btn btn-primary"
                      >
                        <UserPlus size={18} className="mr-2" />
                        Join Group
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupDetailPage;