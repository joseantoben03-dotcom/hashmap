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
      <div className="story-badge">{story.badge}</div>
      <h2 className="story-headline">{story.headline}</h2>

      <div className="story-vignette">
        {story.story.map((paragraph, idx) => (
          <p key={idx} className="story-text">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="story-quote">
        <span className="story-quote__mark">“</span>
        <div className="story-quote__content">
          <p className="story-quote__text">{story.quote.text}</p>
          <span className="story-quote__speaker">— {story.quote.speaker}</span>
        </div>
      </div>

      <div className="field-row">
        <label htmlFor="lookup-name">Search Name</label>
        <input
          id="lookup-name"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setResult(null);
          }}
          placeholder="e.g. Priya, Kabir, or a stranger"
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
          Check Shelf (Instant Inquiry)
        </button>

        {result?.entry && (
          <button type="button" className="button button--danger" onClick={distribute}>
            Hand Over Kit & Check Out "{result.entry.key}"
          </button>
        )}
      </div>

      {result && (
        <div className={`callout ${result.entry ? 'callout--tip' : 'callout--warning'}`}>
          {result.entry ? (
            <p>
              <strong>✓ Found "{result.entry.key}":</strong> Assigned {result.entry.value} in Shelf #
              {result.index}. Located instantly in 1 jump checking {result.probes} box{result.probes === 1 ? '' : 'es'}!
            </p>
          ) : (
            <p>
              <strong>Not Yet Registered:</strong> Checked Shelf #{result.index}. "{query.trim()}" is
              not on the shelf yet. (Dev calmly directs them to Desk 1 without panicking).
            </p>
          )}
        </div>
      )}

      <BucketWall
        buckets={buckets}
        highlightIndex={result ? result.index : bucketForQuery}
        highlightVariant={result ? (result.entry ? 'found' : 'miss') : 'compute'}
        probedKeys={probedKeys}
      />

      <div className="story-insight">
        <strong>💡 The Social Insight:</strong> {story.insight}
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="The Big Picture: How Modern Society Runs →"
      />
    </section>
  );
}
