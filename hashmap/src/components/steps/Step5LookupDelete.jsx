import { useState } from 'react';
import { computeHash, findEntry } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step5LookupDelete({ buckets, onDelete, onBack, onContinue }) {
  const story = STORY_STEPS[5];
  const [query, setQuery] = useState('Priya');
  const [result, setResult] = useState(null);

  function lookupName(q) {
    if (!q.trim()) return;
    setQuery(q);
    setResult(findEntry(buckets, q.trim()));
  }

  function distribute() {
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
      <div className="story-card-minimal">
        <span className="story-badge">{story.badge}</span>
        <h2 className="story-headline">{story.headline}</h2>
        <p className="story-micro">{story.storyLine}</p>
      </div>

      <div className="interactive-demo-box">
        <div className="button-row">
          <button
            type="button"
            className="button button--ghost"
            onClick={() => lookupName('Priya')}
          >
            Check Registered: "Priya"
          </button>
          <button
            type="button"
            className="button button--ghost"
            onClick={() => lookupName('Rohan')}
          >
            Check Missing: "Rohan"
          </button>
          {result?.entry && (
            <button type="button" className="button button--danger" onClick={distribute}>
              Hand Out Kit & Checkout "{result.entry.key}"
            </button>
          )}
        </div>

        {result && (
          <div className={`status-banner ${result.entry ? 'status-banner--success' : 'status-banner--warning'}`}>
            {result.entry ? (
              <span>✓ Found {result.entry.key}: {result.entry.value} in Shelf #{result.index}!</span>
            ) : (
              <span>Polite Fallback: "{query}" not registered yet. Zero crash!</span>
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
        continueLabel="See the Big Picture →"
      />
    </section>
  );
}
