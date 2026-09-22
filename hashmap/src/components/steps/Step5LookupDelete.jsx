import { useState } from 'react';
import { computeHash, findEntry } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step5LookupDelete({ buckets, onDelete, onBack, onContinue }) {
  const story = STORY_STEPS[5];
  const [query, setQuery] = useState('Priya');
  const [result, setResult] = useState(null);

  function lookup() {
    if (!query.trim()) return;
    setResult(findEntry(buckets, query.trim()));
  }

  function distribute() {
    if (!query.trim()) return;
    onDelete(query.trim());
    setResult(null);
    setQuery('');
  }

  const bucketForQuery = query.trim() ? computeHash(query.trim()).index : null;
  const probedKeys = result
    ? buckets[result.index].slice(0, result.probes).map((entry) => entry.key)
    : [];

  return (
    <section className="step">
      <div className="story-header">
        <span className="story-badge">{story.badge}</span>
        <h2 className="story-headline">{story.headline}</h2>
      </div>

      <div className="story-card">
        <p className="story-micro">{story.story || story.microStory}</p>
        <div className="story-quote-inline">
          <span className="quote-speaker">{story.quote.speaker}:</span> “{story.quote.text}”
        </div>
      </div>

      <div className="interactive-demo-box">
        <div className="field-row">
          <label htmlFor="lookup-name">Check Citizen</label>
          <input
            id="lookup-name"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setResult(null);
            }}
            placeholder="e.g. Priya or Rohan"
            maxLength={20}
          />
        </div>

        <div className="button-row">
          <button
            type="button"
            className="button button--primary"
            onClick={lookup}
            disabled={!query.trim()}
          >
            ▶ Instant Inquiry (`.get()`)
          </button>

          {result?.entry && (
            <button type="button" className="button button--danger" onClick={distribute}>
              Hand Out Kit & Check Out "{result.entry.key}"
            </button>
          )}
        </div>

        {result && (
          <div className={`status-banner ${result.entry ? 'status-banner--success' : 'status-banner--warning'}`}>
            {result.entry ? (
              <span>
                <strong>✓ Found {result.entry.key}:</strong> {result.entry.value} in Shelf #{result.index} (1 jump)!
              </span>
            ) : (
              <span>
                <strong>Polite Fallback:</strong> Checked Shelf #{result.index} — "{query.trim()}" hasn't checked in yet. Zero crash!
              </span>
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
        continueLabel="The Big Picture: How Modern Society Runs →"
      />
    </section>
  );
}
