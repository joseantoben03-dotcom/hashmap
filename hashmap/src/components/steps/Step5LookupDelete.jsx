import { useState } from 'react';
import { computeHash, findEntry } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step5LookupDelete({ buckets, onDelete, onBack, onContinue }) {
  const [query, setQuery] = useState('');
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
  const probedKeys = result ? buckets[result.index].slice(0, result.probes).map((entry) => entry.key) : [];

  return (
    <section className="step">
      <h2>Lookup & delete</h2>
      <p>
        Looking something up works the same way as filing it: hash the key to find the drawer, then
        walk that drawer's stack until you find a matching card (or reach the bottom and come up
        empty).
      </p>

      <div className="field-row">
        <label htmlFor="lookup-key">Key to find</label>
        <input
          id="lookup-key"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setResult(null);
          }}
          placeholder="e.g. cat"
          maxLength={24}
        />
      </div>

      <div className="button-row">
        <button type="button" className="button button--primary" onClick={lookup} disabled={!query.trim()}>
          Look it up
        </button>
        {result?.entry && (
          <button type="button" className="button button--danger" onClick={remove}>
            Delete "{result.entry.key}"
          </button>
        )}
      </div>

      {result && (
        <p className="step-note">
          {result.entry
            ? `Found "${result.entry.key}" → ${result.entry.value} in drawer ${result.index} after checking ${result.probes} card${result.probes === 1 ? '' : 's'}.`
            : `Checked drawer ${result.index} and every card in it - "${query.trim()}" isn't filed.`}
        </p>
      )}

      <BucketWall
        buckets={buckets}
        highlightIndex={result ? result.index : bucketForQuery}
        highlightVariant={result ? (result.entry ? 'found' : 'miss') : 'compute'}
        probedKeys={probedKeys}
      />

      <StepFooter onBack={onBack} onContinue={onContinue} continueLabel="Wrap up with the complexity" />
    </section>
  );
}
