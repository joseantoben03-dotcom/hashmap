export default function StepFooter({ onBack, onContinue, continueLabel = 'Continue', hint }) {
  return (
    <div className="step-footer">
      {hint && <p className="step-footer__hint">{hint}</p>}
      <div className="step-footer__buttons">
        {onBack ? (
          <button type="button" className="button button--ghost" onClick={onBack}>
            Back
          </button>
        ) : (
          <span />
        )}
        <button type="button" className="button button--primary" onClick={onContinue}>
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
