import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '@/lib/firebase';

export function useRealtimeData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!database) {
      setError("Firebase database not initialized");
      setLoading(false);
      return;
    }
    
    const dbRef = ref(database, path);
    
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        setLoading(false);
        setError(null);
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          setData(null);
        }
      },
      (error) => {
        setLoading(false);
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [path]);

  return { data, loading, error };
}

export function useRealtimeList<T>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!database) {
      setError("Firebase database not initialized");
      setLoading(false);
      return;
    }
    
    const dbRef = ref(database, path);
    
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        setLoading(false);
        setError(null);
        if (snapshot.exists()) {
          const items = snapshot.val();
          setData(Object.values(items));
        } else {
          setData([]);
        }
      },
      (error) => {
        setLoading(false);
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [path]);

  return { data, loading, error };
}

export function useRealtimeQuery<T>(path: string, orderBy: string, equalToValue: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!database) {
      setError("Firebase database not initialized");
      setLoading(false);
      return;
    }
    
    if (!equalToValue) {
      setLoading(false);
      setData([]);
      return;
    }

    const dbRef = ref(database, path);
    const dbQuery = query(dbRef, orderByChild(orderBy), equalTo(equalToValue));
    
    const unsubscribe = onValue(
      dbQuery,
      (snapshot) => {
        setLoading(false);
        setError(null);
        if (snapshot.exists()) {
          const items = snapshot.val();
          setData(Object.values(items));
        } else {
          setData([]);
        }
      },
      (error) => {
        setLoading(false);
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [path, orderBy, equalToValue]);

  return { data, loading, error };
}
