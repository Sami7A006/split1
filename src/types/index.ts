export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  createdAt: Date;
  groupsJoined: string[];
  ratings: Rating[];
}

export interface Rating {
  ratedBy: string;
  raterName: string;
  score: number;
  comment: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: number;
  maxMembers: number;
  features: string[];
  category: 'streaming' | 'music' | 'shopping' | 'productivity' | 'other';
  backgroundColor: string;
  popularity: number;
}

export interface Group {
  id: string;
  name: string;
  subscriptionId: string;
  subscriptionName: string;
  createdBy: string;
  createdAt: Date;
  members: GroupMember[];
  status: 'forming' | 'active' | 'inactive';
  paymentInfo: string;
  maxMembers: number;
  description: string;
}

export interface GroupMember {
  uid: string;
  displayName: string;
  photoURL: string | null;
  role: 'admin' | 'member';
  joinedAt: Date;
}

export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'group_invite' | 'group_formed' | 'payment_reminder' | 'message' | 'system';
  isRead: boolean;
  createdAt: Date;
  link?: string;
  data?: any;
}