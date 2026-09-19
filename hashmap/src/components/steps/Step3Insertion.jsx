import { useState } from 'react';
import { BUCKET_COUNT, computeHash, totalEntries } from '../../lib/hashmap';
import { COURSE_PRESETS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import HashWorking from '../HashWorking';
import StepFooter from '../StepFooter';

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
      <div className="step-badge">Operation 1 • Insertion & Updates</div>
      <h2>Enrolling Courses (Filing Entries)</h2>

      <p>
        Now let's populate the IIT Ropar course registry. When you register a course in Python via{' '}
        <code>registry["CS101"] = "Intro to AI"</code>, Python hashes the key, routes it directly to its
        assigned slot, and stores the record in <strong>O(1) time</strong>.
      </p>

      <div className="field-row">
        <label htmlFor="insert-key">Course Code</label>
        <input
          id="insert-key"
          type="text"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="e.g. CS101"
          maxLength={24}
        />
      </div>
      <div className="field-row">
        <label htmlFor="insert-value">Course Details</label>
        <input
          id="insert-value"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="e.g. Intro to AI (4 Cr)"
          maxLength={32}
        />
      </div>

      <HashWorking computation={preview} emptyHint="Enter a course code and title to see its memory slot." />

      <div className="button-row">
        <button
          type="button"
          className="button button--primary"
          onClick={() => file(key, value)}
          disabled={!key.trim() || !value.trim()}
        >
          Enroll Course
        </button>

        <span className="preset-label">Quick Enroll:</span>
        {COURSE_PRESETS.map((course) => (
          <button
            key={course.key}
            type="button"
            className="button button--ghost"
            onClick={() => file(course.key, course.value)}
          >
            + {course.key}
          </button>
        ))}
      </div>

      <BucketWall buckets={buckets} highlightIndex={lastIndex} highlightVariant="insert" />

      <div className="callout callout--tip">
        <strong>💡 Key Uniqueness in Python:</strong> Try enrolling <code>"CS101"</code> again with a new title.
        Notice that Python updates the existing entry in place instead of creating duplicate keys!
      </div>

      <p className="step-note">
        {filed === 0
          ? 'The registry is currently empty.'
          : `${filed} course${filed === 1 ? '' : 's'} registered in the active memory table.`}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="What Happens When Keys Collide? →"
        hint={filed < 2 ? 'Enroll at least two courses to see records in memory.' : undefined}
      />
    </section>
  );
}
