import { STEPS } from '../data/steps';

export default function StepSidebar({
  currentStep,
  completedSteps,
  onSelectStep,
  syncStatus,
  onReset
}) {
  return (
    <nav className="sidebar" aria-label="Story scenes">
      <div className="sidebar__header">
        <div className="sidebar__institution-badge">INTERACTIVE STORY</div>
        <h1>The Endless Line</h1>
        <p className="sidebar__subtitle">How Hashing & Python Run Modern Society</p>
      </div>

      <ol className="drawer-list">
        {STEPS.map((step) => {
          const isDone = completedSteps.includes(step.id);
          const isActive = step.id === currentStep;
          const isReachable =
            isDone || step.id === currentStep || step.id === Math.max(...completedSteps, 0) + 1;

          return (
            <li key={step.id}>
              <button
                type="button"
                className={`drawer${isActive ? ' drawer--active' : ''}${isDone ? ' drawer--done' : ''}`}
                onClick={() => isReachable && onSelectStep(step.id)}
                disabled={!isReachable}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="drawer__stamp" aria-hidden="true">
                  {isDone ? '✓' : step.id}
                </span>
                <span className="drawer__labels">
                  <span className="drawer__label">Scene {step.id}</span>
                  <span className="drawer__title">{step.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="sidebar__footer">
        <p className="sync-status">
          {syncStatus === 'synced' ? '✓ Progress Saved' : 'Saved on Device'}
        </p>
        <button type="button" className="link-button" onClick={onReset}>
          Restart Story
        </button>
      </div>
    </nav>
  );
}
