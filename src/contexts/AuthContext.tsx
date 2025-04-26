import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

export interface User extends FirebaseUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as User);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with name
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      displayName: name,
      photoURL: null,
      createdAt: Timestamp.now(),
      groupsJoined: [],
      ratings: []
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }
    
    await updateProfile(auth.currentUser, data);
    
    // Update user document in Firestore
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      await setDoc(userRef, { ...userDoc.data(), ...data }, { merge: true });
    }
    
    // Update local user state to reflect changes immediately
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...data };
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};