import { useState } from 'react';
import { computeHash, findEntry } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step5LookupDelete({ buckets, onDelete, onBack, onContinue }) {
  const story = STORY_STEPS[5];
  const [query, setQuery] = useState('Timmy');
  const [result, setResult] = useState(null);

  function checkLocker(q) {
    if (!q.trim()) return;
    setQuery(q);
    setResult(findEntry(buckets, q.trim()));
  }

  function eatLunch() {
    if (!query.trim()) return;
    onDelete(query.trim());
    setResult(null);
  }

  const bucketForQuery = query.trim() ? computeHash(query.trim()).index : null;
  const probedKeys = result
    ? buckets[result.index].slice(0, result.probes).map((entry) => entry.key)
    : [];

  return (
    <section className="step">
      <div className="story-card-modern">
        <span className="story-badge-neon">{story.badge}</span>
        <h2 className="story-title-modern">{story.title}</h2>
        <p className="story-headline-modern">{story.headline}</p>
        <p className="story-text-simple">{story.storyLine}</p>
      </div>

      <div className="interactive-card">
        <div className="button-row">
          <button
            type="button"
            className="btn-chip"
            onClick={() => checkLocker('Timmy')}
          >
            Check Present: "Timmy"
          </button>
          <button
            type="button"
            className="btn-chip"
            onClick={() => checkLocker('Sam')}
          >
            Check Missing: "Sam"
          </button>
          {result?.entry && (
            <button type="button" className="btn-glow btn-glow--rose" onClick={eatLunch}>
              Eat Lunch & Empty Locker "{result.entry.key}"
            </button>
          )}
        </div>

        {result && (
          <div className={`status-banner ${result.entry ? 'status-banner--success' : 'status-banner--warning'}`}>
            {result.entry ? (
              <span>✓ Found {result.entry.key}'s lunchbox ({result.entry.value}) in Locker #{result.index}!</span>
            ) : (
              <span>Polite Fallback (.get()): "Sam" didn't bring lunch today. Zero crash!</span>
            )}
          </div>
        )}
      </div>

      <div className="shelf-section">
        <BucketWall
          buckets={buckets}
          highlightIndex={result ? result.index : bucketForQuery}
          highlightVariant={result ? (result.entry ? 'found' : 'miss') : 'compute'}
          probedKeys={probedKeys}
        />
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="See Magic in Real Life →"
      />
    </section>
  );
}
