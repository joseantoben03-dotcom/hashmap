export default function BucketWall({
  buckets,
  highlightIndex = null,
  highlightVariant = 'compute',
  probedKeys = []
}) {
  return (
    <div className="bucket-wall-container">
      <div className="bucket-wall__meta">
        <span className="bucket-wall__title">Memory Slots / Hash Buckets (Table Size: {buckets.length})</span>
        <span className="bucket-wall__hint">Direct-indexed memory addresses</span>
      </div>
      <div className="bucket-wall" role="list" aria-label="Hashmap buckets">
        {buckets.map((bucket, index) => {
          const isHighlighted = index === highlightIndex;
          return (
            <div
              key={index}
              role="listitem"
              className={`bucket${isHighlighted ? ` bucket--${highlightVariant}` : ''}`}
            >
              <div className="bucket__header">
                <span className="bucket__index">Slot [{index}]</span>
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
                      {chainIdx > 0 && <span className="bucket__card-chain">chain #{chainIdx + 1}</span>}
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
