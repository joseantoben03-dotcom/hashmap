import { useCallback, useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const USER_ID_KEY = 'hashmap-tutorial-user-id';
const PROGRESS_KEY = 'hashmap-tutorial-progress';

function getUserId() {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

function readLocalProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupt or missing local data - fall back to a fresh start.
  }
  return { currentStep: 1, completedSteps: [] };
}

function writeLocalProgress(state) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
}

// Tracks tutorial progress. Always writes to localStorage immediately
// (so nothing is lost), and opportunistically syncs to the Express/Mongo
// backend when it's reachable - so this keeps working even before the
// backend's MONGODB_URI is filled in.
export function useProgress() {
  const [userId] = useState(getUserId);
  const [progress, setProgress] = useState(readLocalProgress);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/progress/${userId}`);
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const next = {
            currentStep: data.currentStep || 1,
            completedSteps: data.completedSteps || []
          };
          setProgress(next);
          writeLocalProgress(next);
          setStatus('synced');
        }
      } catch {
        if (!cancelled) setStatus('offline');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const save = useCallback(
    async (next) => {
      setProgress(next);
      writeLocalProgress(next);
      setStatus('saving');
      try {
        const res = await fetch(`${API_BASE}/progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, ...next })
        });
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`);
        setStatus('synced');
      } catch {
        setStatus('offline');
      }
    },
    [userId]
  );

  const reset = useCallback(() => {
    const fresh = { currentStep: 1, completedSteps: [] };
    save(fresh);
  }, [save]);

  return { progress, status, save, reset };
}
