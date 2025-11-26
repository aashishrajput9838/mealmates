import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';

// Function to read all documents from a collection
export const readCollection = async (collectionName: string) => {
  try {
    if (!db) {
      throw new Error('Firebase database is not initialized');
    }

    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    
    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        data: doc.data()
      });
    });
    
    return {
      collection: collectionName,
      count: documents.length,
      documents
    };
  } catch (error) {
    console.error(`Error reading collection ${collectionName}:`, error);
    throw error;
  }
};

// Function to read all collections in the database
export const readAllCollections = async () => {
  try {
    if (!db) {
      throw new Error('Firebase database is not initialized');
    }

    // For this app, we know the main collection is 'donations'
    // In a more complex app, we might need to discover collections dynamically
    const collections = ['donations', 'users'];
    
    const results = [];
    for (const collectionName of collections) {
      try {
        const collectionData = await readCollection(collectionName);
        results.push(collectionData);
      } catch (error) {
        console.error(`Error reading collection ${collectionName}:`, error);
        results.push({
          collection: collectionName,
          error: (error as Error).message
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error reading all collections:', error);
    throw error;
  }
};