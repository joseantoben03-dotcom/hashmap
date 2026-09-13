export default function BucketWall({ buckets, highlightIndex = null, highlightVariant = 'compute', probedKeys = [] }) {
  return (
    <div className="bucket-wall" role="list" aria-label="Hashmap buckets">
      {buckets.map((bucket, index) => {
        const isHighlighted = index === highlightIndex;
        return (
          <div
            key={index}
            role="listitem"
            className={`bucket${isHighlighted ? ` bucket--${highlightVariant}` : ''}`}
          >
            <span className="bucket__index">{index}</span>
            <div className="bucket__cards">
              {bucket.length === 0 && <span className="bucket__empty">empty</span>}
              {bucket.map((entry) => (
                <div
                  key={entry.key}
                  className={`bucket__card${probedKeys.includes(entry.key) ? ' bucket__card--probed' : ''}`}
                >
                  <span className="bucket__card-key">{entry.key}</span>
                  <span className="bucket__card-value">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
