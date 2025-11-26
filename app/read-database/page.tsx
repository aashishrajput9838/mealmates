"use client"

import { useEffect, useState } from 'react';
import { readAllCollections } from '@/lib/read-database';
import { auth } from '@/lib/firebase';

export default function ReadDatabasePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe?.();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await readAllCollections();
      setData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(`Failed to fetch data: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Database Reader</h1>
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg w-full max-w-md">
          <p className="mb-4">Please sign in to view database contents.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Database Contents</h1>
      
      <div className="mb-4 flex gap-2">
        <button 
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-destructive mb-4">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p>Loading database contents...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((collection, index) => (
            <div key={index} className="bg-card text-card-foreground rounded-lg p-4 shadow">
              <h2 className="text-xl font-bold mb-2">
                Collection: {collection.collection}
                {collection.count !== undefined && ` (${collection.count} documents)`}
              </h2>
              
              {collection.error ? (
                <div className="text-destructive">
                  <p>Error: {collection.error}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <pre className="bg-muted p-2 rounded text-xs">
                    {JSON.stringify(collection.documents, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}