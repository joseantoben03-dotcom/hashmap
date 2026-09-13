import { STEPS } from '../data/steps';

const STATUS_TEXT = {
  loading: 'Opening the file…',
  saving: 'Filing progress…',
  synced: 'Progress filed to server',
  offline: 'Progress kept on this device'
};

export default function StepSidebar({ currentStep, completedSteps, onSelectStep, syncStatus, onReset }) {
  return (
    <nav className="sidebar" aria-label="Tutorial steps">
      <div className="sidebar__header">
        <h1>Hashmap</h1>
        <p className="sidebar__subtitle">A field guide, filed step by step</p>
      </div>

      <ol className="drawer-list">
        {STEPS.map((step) => {
          const isDone = completedSteps.includes(step.id);
          const isActive = step.id === currentStep;
          // Steps unlock in order: this one, or any already completed, or the next one up.
          const isReachable = isDone || step.id === currentStep || step.id === Math.max(...completedSteps, 0) + 1;

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
                  <span className="drawer__label">{step.drawerLabel}</span>
                  <span className="drawer__title">{step.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="sidebar__footer">
        <p className="sync-status" data-status={syncStatus}>
          {STATUS_TEXT[syncStatus]}
        </p>
        <button type="button" className="link-button" onClick={onReset}>
          Start over
        </button>
      </div>
    </nav>
  );
}
