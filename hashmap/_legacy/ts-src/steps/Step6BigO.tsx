import { totalEntries, type Buckets } from '../../lib/hashmap';
import StepFooter from '../StepFooter';

interface Step6BigOProps {
  buckets: Buckets;
  onBack: () => void;
  onFinish: () => void;
  isFinished: boolean;
}

const ROWS: { op: string; average: string; worst: string }[] = [
  { op: 'Insert', average: 'O(1)', worst: 'O(n)' },
  { op: 'Lookup', average: 'O(1)', worst: 'O(n)' },
  { op: 'Delete', average: 'O(1)', worst: 'O(n)' }
];

export default function Step6BigO({ buckets, onBack, onFinish, isFinished }: Step6BigOProps) {
  const filed = totalEntries(buckets);

  return (
    <section className="step">
      <h2>Complexity & recap</h2>
      <p>
        On average, keys spread out evenly across drawers, so each drawer holds only a handful of
        cards - that's why insert, lookup, and delete are all considered <strong>O(1)</strong>, constant
        time, regardless of how many entries are filed.
      </p>
      <p>
        The worst case is a hashmap gone wrong: every key hashing to the <em>same</em> drawer, turning
        the lookup into a full walk through one long chain - <strong>O(n)</strong>. Good hash functions
        exist specifically to make that worst case vanishingly rare.
      </p>

      <table className="complexity-table">
        <thead>
          <tr>
            <th scope="col">Operation</th>
            <th scope="col">Average case</th>
            <th scope="col">Worst case</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.op}>
              <th scope="row">{row.op}</th>
              <td><code>{row.average}</code></td>
              <td><code>{row.worst}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="step-note">
        Over this tutorial you filed {filed} entr{filed === 1 ? 'y' : 'ies'} across the wall - {' '}
        {filed === 0 ? 'go back and try filing a few if you skipped that step.' : 'nicely done.'}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onFinish}
        continueLabel={isFinished ? 'Recap complete' : 'Finish tutorial'}
      />
    </section>
  );
}
