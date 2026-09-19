import { useState } from 'react';
import { computeHash, findEntry } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step5LookupDelete({ buckets, onDelete, onBack, onContinue }) {
  const [query, setQuery] = useState('CS101');
  const [result, setResult] = useState(null);

  function lookup() {
    if (!query.trim()) return;
    setResult(findEntry(buckets, query.trim()));
  }

  function remove() {
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
      <div className="step-badge">Operations 2 & 3 • Lookup & Deletion</div>
      <h2>Querying & Dropping Courses</h2>

      <p>
        When an IIT Ropar student queries a course or drops an elective before the registration deadline,
        how does Python locate or remove the record?
      </p>

      <p>
        Python computes <code>hash(key) % table_size</code> to jump directly to the target slot, then
        probes that slot until it matches the key or confirms it doesn't exist.
      </p>

      <div className="field-row">
        <label htmlFor="lookup-key">Course Code</label>
        <input
          id="lookup-key"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setResult(null);
          }}
          placeholder="e.g. CS101, EE201"
          maxLength={24}
        />
      </div>

      <div className="button-row">
        <button
          type="button"
          className="button button--primary"
          onClick={lookup}
          disabled={!query.trim()}
        >
          Query Registry (Lookup)
        </button>

        {result?.entry && (
          <button type="button" className="button button--danger" onClick={remove}>
            Drop Course "{result.entry.key}"
          </button>
        )}
      </div>

      {result && (
        <div className={`callout ${result.entry ? 'callout--tip' : 'callout--warning'}`}>
          {result.entry ? (
            <p>
              <strong>✓ Found "{result.entry.key}":</strong> {result.entry.value} in Slot [{result.index}]
              after probing {result.probes} record{result.probes === 1 ? '' : 's'}. Direct constant-time O(1) jump!
            </p>
          ) : (
            <p>
              <strong>✕ Not Found:</strong> Examined Slot [{result.index}] — course "{query.trim()}" is
              not registered.
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

      <div className="callout callout--note">
        <strong>⚠️ Avoiding the Infamous KeyError in Python:</strong>
        <p>
          In Python, writing <code>registry["UNKNOWN"]</code> crashes your application with a{' '}
          <code>KeyError</code>! Always use <code>registry.get("UNKNOWN", default_value)</code> for safe
          access, and <code>registry.pop(key, None)</code> for safe deletions.
        </p>
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Review Complexity & Python Superpowers →"
      />
    </section>
  );
}
