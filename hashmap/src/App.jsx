import { useCallback, useState } from 'react';
import './App.css';
import StepSidebar from './components/StepSidebar';
import Step1Intro from './components/steps/Step1Intro';
import Step2HashFunction from './components/steps/Step2HashFunction';
import Step3Insertion from './components/steps/Step3Insertion';
import Step4Collision from './components/steps/Step4Collision';
import Step5LookupDelete from './components/steps/Step5LookupDelete';
import Step6BigO from './components/steps/Step6BigO';
import { STEPS, TOTAL_STEPS } from './data/steps';
import { useProgress } from './hooks/useProgress';
import { createBuckets, deleteEntry, insertEntry } from './lib/hashmap';

function App() {
  const { progress, status, save, reset } = useProgress();
  const [buckets, setBuckets] = useState(createBuckets);

  const { currentStep, completedSteps } = progress;

  const goToStep = useCallback(
    (id) => {
      save({ ...progress, currentStep: id });
    },
    [progress, save]
  );

  const completeAndAdvance = useCallback(
    (id) => {
      const nextCompleted = completedSteps.includes(id) ? completedSteps : [...completedSteps, id];
      const nextStep = id < TOTAL_STEPS ? id + 1 : id;
      save({ currentStep: nextStep, completedSteps: nextCompleted });
    },
    [completedSteps, save]
  );

  const goBack = useCallback(
    (id) => {
      if (id > 1) save({ ...progress, currentStep: id - 1 });
    },
    [progress, save]
  );

  const handleInsert = useCallback((key, value) => {
    let insertedIndex = 0;
    setBuckets((prev) => {
      const { buckets: next, index } = insertEntry(prev, key, value);
      insertedIndex = index;
      return next;
    });
    return insertedIndex;
  }, []);

  const handleDelete = useCallback((key) => {
    setBuckets((prev) => deleteEntry(prev, key).buckets);
  }, []);

  const handleReset = useCallback(() => {
    setBuckets(createBuckets());
    reset();
  }, [reset]);

  const currentMeta = STEPS.find((step) => step.id === currentStep) ?? STEPS[0];

  return (
    <div className="app-shell">
      <StepSidebar
        currentStep={currentStep}
        completedSteps={completedSteps}
        onSelectStep={goToStep}
        syncStatus={status}
        onReset={handleReset}
      />

      <main className="main-pane">
        <header className="main-pane__header">
          <span className="main-pane__eyebrow">
            Step {currentMeta.id} of {TOTAL_STEPS}
          </span>
        </header>

        {currentStep === 1 && <Step1Intro onContinue={() => completeAndAdvance(1)} />}

        {currentStep === 2 && (
          <Step2HashFunction onBack={() => goBack(2)} onContinue={() => completeAndAdvance(2)} />
        )}

        {currentStep === 3 && (
          <Step3Insertion
            buckets={buckets}
            onInsert={handleInsert}
            onBack={() => goBack(3)}
            onContinue={() => completeAndAdvance(3)}
          />
        )}

        {currentStep === 4 && (
          <Step4Collision
            buckets={buckets}
            onInsert={handleInsert}
            onBack={() => goBack(4)}
            onContinue={() => completeAndAdvance(4)}
          />
        )}

        {currentStep === 5 && (
          <Step5LookupDelete
            buckets={buckets}
            onDelete={handleDelete}
            onBack={() => goBack(5)}
            onContinue={() => completeAndAdvance(5)}
          />
        )}

        {currentStep === 6 && (
          <Step6BigO
            buckets={buckets}
            onBack={() => goBack(6)}
            onFinish={() => completeAndAdvance(6)}
            isFinished={completedSteps.includes(6)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
