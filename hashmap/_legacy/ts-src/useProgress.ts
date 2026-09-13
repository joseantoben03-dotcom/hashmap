import { useCallback, useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const USER_ID_KEY = 'hashmap-tutorial-user-id';
const PROGRESS_KEY = 'hashmap-tutorial-progress';

export interface ProgressState {
  currentStep: number;
  completedSteps: number[];
}

export type SyncStatus = 'loading' | 'synced' | 'offline' | 'saving';

function getUserId(): string {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

function readLocalProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw) as ProgressState;
  } catch {
    // Corrupt or missing local data - fall back to a fresh start.
  }
  return { currentStep: 1, completedSteps: [] };
}

function writeLocalProgress(state: ProgressState) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
}

// Tracks tutorial progress. Always writes to localStorage immediately
// (so nothing is lost), and opportunistically syncs to the Express/Mongo
// backend when it's reachable - so this keeps working even before the
// backend's MONGODB_URI is filled in.
export function useProgress() {
  const [userId] = useState(getUserId);
  const [progress, setProgress] = useState<ProgressState>(readLocalProgress);
  const [status, setStatus] = useState<SyncStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/progress/${userId}`);
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const next: ProgressState = {
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
    async (next: ProgressState) => {
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
    const fresh: ProgressState = { currentStep: 1, completedSteps: [] };
    save(fresh);
  }, [save]);

  return { progress, status, save, reset };
}
