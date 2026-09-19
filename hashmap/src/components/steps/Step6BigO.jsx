import { totalEntries } from '../../lib/hashmap';
import StepFooter from '../StepFooter';

const ROWS = [
  { op: 'Insert (enroll)', average: 'O(1)', worst: 'O(n)', python: 'registry[code] = details' },
  { op: 'Lookup (query)', average: 'O(1)', worst: 'O(n)', python: 'registry.get(code)' },
  { op: 'Delete (drop)', average: 'O(1)', worst: 'O(n)', python: 'registry.pop(code, None)' },
  { op: 'Contains check', average: 'O(1)', worst: 'O(n)', python: 'code in registry' }
];

export default function Step6BigO({ buckets, onBack, onFinish, isFinished }) {
  const filed = totalEntries(buckets);

  return (
    <section className="step">
      <div className="step-badge">Milestone Complete • Production Architecture</div>
      <h2>Production Scale & Python Superpowers</h2>

      <p>
        By replacing sequential lists with a hash-driven dictionary, the IIT Ropar registry now handles
        thousands of concurrent lookups in <strong>O(1) constant time</strong>.
      </p>

      <table className="complexity-table">
        <thead>
          <tr>
            <th scope="col">Operation</th>
            <th scope="col">Average Case</th>
            <th scope="col">Worst Case</th>
            <th scope="col">Python Idiom</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.op}>
              <th scope="row">{row.op}</th>
              <td>
                <code>{row.average}</code>
              </td>
              <td>
                <code>{row.worst}</code>
              </td>
              <td>
                <code>{row.python}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout callout--tip">
        <h4>🚀 Pythonic Superpowers in Standard Library:</h4>
        <ul>
          <li>
            <strong><code>collections.defaultdict</code></strong>: Automatically creates default lists/sets
            for grouping (e.g. grouping students by department without checking <code>if dept in d</code>).
          </li>
          <li>
            <strong><code>collections.Counter</code></strong>: Instant frequency counts for enrollment numbers.
          </li>
          <li>
            <strong>Dictionary Comprehensions</strong>:{' '}
            <code>{`{k: v for k, v in data.items()}`}</code> for concise, readable transformations.
          </li>
          <li>
            <strong>Guaranteed Insertion Order</strong>: Since Python 3.7+, dictionaries maintain key insertion
            order by specification!
          </li>
        </ul>
      </div>

      <p className="step-note">
        {filed === 0
          ? 'You reviewed the architecture — try going back and enrolling courses to see them in memory.'
          : `Great job! You registered ${filed} course record${filed === 1 ? '' : 's'} across the system.`}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onFinish}
        continueLabel={isFinished ? 'Case Study Completed ✓' : 'Complete Case Study'}
      />
    </section>
  );
}
