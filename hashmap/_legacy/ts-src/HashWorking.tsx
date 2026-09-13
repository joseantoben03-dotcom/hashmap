import type { HashComputation } from '../lib/hashmap';

interface HashWorkingProps {
  computation: HashComputation | null;
  emptyHint?: string;
}

export default function HashWorking({ computation, emptyHint }: HashWorkingProps) {
  if (!computation) {
    return <p className="hash-working hash-working--empty">{emptyHint ?? "Type a key to see how it's filed."}</p>;
  }

  const { key, charCodes, sum, index, bucketCount } = computation;
  const codesLine = charCodes.join(' + ');

  return (
    <p className="hash-working">
      <code>"{key}"</code> → char codes <code>{codesLine}</code> = <code>{sum}</code> → <code>{sum} mod {bucketCount}</code> ={' '}
      <strong>drawer {index}</strong>
    </p>
  );
}
