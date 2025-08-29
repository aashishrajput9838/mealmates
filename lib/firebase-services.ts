import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  doc, 
  deleteDoc,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db, auth } from './firebase';

export interface FoodDonation {
  id?: string;
  title: string;
  description: string;
  imageData: string; // Base64 encoded image data
  expiryTime: string;
  quantity: number;
  status: 'available' | 'claimed' | 'expired';
  createdAt: any;
  updatedAt: any;
  userId: string;
  userEmail: string;
  userName?: string;
}

export interface DonationWithId extends FoodDonation {
  id: string;
}

// Convert file to base64 for storage in Firestore
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// Add new donation to Firestore
export const addDonation = async (donation: Omit<FoodDonation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const donationData = {
      ...donation,
      userId: currentUser.uid,
      userEmail: currentUser.email || '',
      userName: currentUser.displayName || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'donations'), donationData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding donation:', error);
    throw new Error('Failed to add donation');
  }
};

// Get all donations for the current user
export const getUserDonations = async (): Promise<DonationWithId[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const q = query(
      collection(db, 'donations'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const donations: DonationWithId[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      donations.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        imageData: data.imageData,
        expiryTime: data.expiryTime,
        quantity: data.quantity,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
      });
    });

    return donations;
  } catch (error) {
    console.error('Error getting user donations:', error);
    throw new Error('Failed to get donations');
  }
};

// Get all available donations (for receivers)
export const getAvailableDonations = async (): Promise<DonationWithId[]> => {
  try {
    const q = query(
      collection(db, 'donations'),
      where('status', '==', 'available'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const donations: DonationWithId[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      donations.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        imageData: data.imageData,
        expiryTime: data.expiryTime,
        quantity: data.quantity,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
      });
    });

    return donations;
  } catch (error) {
    console.error('Error getting available donations:', error);
    throw new Error('Failed to get available donations');
  }
};

// Update donation status
export const updateDonationStatus = async (donationId: string, status: 'available' | 'claimed' | 'expired'): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const donationRef = doc(db, 'donations', donationId);
    await updateDoc(donationRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating donation status:', error);
    throw new Error('Failed to update donation status');
  }
};

// Update donation details
export const updateDonation = async (donationId: string, updates: Partial<FoodDonation>): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const donationRef = doc(db, 'donations', donationId);
    await updateDoc(donationRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating donation:', error);
    throw new Error('Failed to update donation');
  }
};

// Delete donation
export const deleteDonation = async (donationId: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    // Delete the document from Firestore
    const donationRef = doc(db, 'donations', donationId);
    await deleteDoc(donationRef);
  } catch (error) {
    console.error('Error deleting donation:', error);
    throw new Error('Failed to delete donation');
  }
};

// Claim a donation (for receivers)
export const claimDonation = async (donationId: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const donationRef = doc(db, 'donations', donationId);
    await updateDoc(donationRef, {
      status: 'claimed',
      claimedBy: currentUser.uid,
      claimedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error claiming donation:', error);
    throw new Error('Failed to claim donation');
  }
};
