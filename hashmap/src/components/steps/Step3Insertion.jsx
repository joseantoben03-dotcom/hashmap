import { useState } from 'react';
import { BUCKET_COUNT, computeHash, totalEntries } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import HashWorking from '../HashWorking';
import StepFooter from '../StepFooter';

const SUGGESTIONS = [
  ['apple', '🍎'],
  ['bat', '🦇'],
  ['comet', '☄️'],
  ['drum', '🥁']
];

export default function Step3Insertion({ buckets, onInsert, onBack, onContinue }) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [lastIndex, setLastIndex] = useState(null);

  const filed = totalEntries(buckets);
  const preview = key.trim() ? computeHash(key.trim(), BUCKET_COUNT) : null;

  function file(k, v) {
    if (!k.trim() || !v.trim()) return;
    const index = onInsert(k.trim(), v.trim());
    setLastIndex(index);
    setKey('');
    setValue('');
  }

  return (
    <section className="step">
      <h2>Filing entries</h2>
      <p>
        Filing a key-value pair is just: compute the drawer with the hash function, then drop the card
        in that drawer. No searching required.
      </p>

      <div className="field-row">
        <label htmlFor="insert-key">Key</label>
        <input
          id="insert-key"
          type="text"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="e.g. apple"
          maxLength={24}
        />
      </div>
      <div className="field-row">
        <label htmlFor="insert-value">Value</label>
        <input
          id="insert-value"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="e.g. 🍎"
          maxLength={24}
        />
      </div>

      <HashWorking computation={preview} emptyHint="Type a key and value, then file it." />

      <div className="button-row">
        <button
          type="button"
          className="button button--primary"
          onClick={() => file(key, value)}
          disabled={!key.trim() || !value.trim()}
        >
          File it
        </button>
        {SUGGESTIONS.map(([k, v]) => (
          <button key={k} type="button" className="button button--ghost" onClick={() => file(k, v)}>
            + {k}
          </button>
        ))}
      </div>

      <BucketWall buckets={buckets} highlightIndex={lastIndex} highlightVariant="insert" />

      <p className="step-note">{filed === 0 ? 'The wall is still empty.' : `${filed} entr${filed === 1 ? 'y' : 'ies'} filed so far.`}</p>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="What happens when two keys collide?"
        hint={filed < 2 ? 'File at least a couple of entries to see the wall fill in.' : undefined}
      />
    </section>
  );
}
