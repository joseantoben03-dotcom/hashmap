export default function BucketWall({
  buckets,
  highlightIndex = null,
  highlightVariant = 'compute',
  probedKeys = []
}) {
  return (
    <div className="bucket-wall-container">
      <div className="bucket-wall__meta">
        <span className="bucket-wall__title">🔐 Magic Lockers (7 Slots)</span>
        <span className="bucket-wall__hint">Instant locker addresses</span>
      </div>
      <div className="bucket-wall" role="list" aria-label="Magic lockers">
        {buckets.map((bucket, index) => {
          const isHighlighted = index === highlightIndex;
          return (
            <div
              key={index}
              role="listitem"
              className={`bucket${isHighlighted ? ` bucket--${highlightVariant}` : ''}`}
            >
              <div className="bucket__header">
                <span className="bucket__index">Locker #{index}</span>
                <span className="bucket__count">{bucket.length}</span>
              </div>

              <div className="bucket__cards">
                {bucket.length === 0 && <span className="bucket__empty">— empty —</span>}
                {bucket.map((entry, chainIdx) => (
                  <div
                    key={entry.key}
                    className={`bucket__card${
                      probedKeys.includes(entry.key) ? ' bucket__card--probed' : ''
                    }`}
                  >
                    <div className="bucket__card-top">
                      <span className="bucket__card-key">{entry.key}</span>
                      {chainIdx > 0 && <span className="bucket__card-chain">roommate</span>}
                    </div>
                    <span className="bucket__card-value">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
