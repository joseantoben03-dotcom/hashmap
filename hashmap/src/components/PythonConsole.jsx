import { useEffect, useState } from 'react';
import { STORY_STEPS } from '../data/caseStudy';

export default function PythonConsole({ stepId }) {
  const stepData = STORY_STEPS[stepId] || STORY_STEPS[1];

  const [code, setCode] = useState(stepData.pythonSnippet);
  const [terminalOutput, setTerminalOutput] = useState(stepData.pythonOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    setCode(stepData.pythonSnippet);
    setTerminalOutput(stepData.pythonOutput);
    setShowQuiz(false);
    setSelectedOpt(null);
    setQuizSubmitted(false);
  }, [stepId, stepData]);

  function handleRun() {
    setIsRunning(true);
    setTerminalOutput('Running in Python 3.12...\n');
    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput(stepData.pythonOutput);
    }, 120);
  }

  return (
    <aside className="python-console" aria-label="Python Companion">
      <div className="python-console__header">
        <div className="python-console__badge">
          <span className="python-icon">🐍</span>
          <span className="python-console__filename">volunteer_hub.py</span>
        </div>
        <button
          type="button"
          className="btn-quiz-toggle"
          onClick={() => setShowQuiz(!showQuiz)}
        >
          {showQuiz ? '◄ View Code' : '⚡ Quick Check'}
        </button>
      </div>

      <div className="python-console__body">
        {!showQuiz ? (
          <div className="python-console__pane">
            <div className="code-editor-header">
              <span className="code-editor-title">Python Code (Editable)</span>
              <button
                type="button"
                className="btn-small btn-small--run"
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? 'Running…' : '▶ Run Code'}
              </button>
            </div>

            <textarea
              className="python-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={5}
            />

            <div className="python-terminal">
              <pre className="python-terminal__output">{terminalOutput}</pre>
            </div>
          </div>
        ) : (
          <div className="python-console__pane python-console__quiz">
            <p className="quiz-question">{stepData.quiz.question}</p>
            <div className="quiz-options">
              {stepData.quiz.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === stepData.quiz.correctIndex;
                let optClass = 'quiz-option';
                if (quizSubmitted) {
                  if (isCorrect) optClass += ' quiz-option--correct';
                  else if (isSelected) optClass += ' quiz-option--wrong';
                } else if (isSelected) {
                  optClass += ' quiz-option--selected';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={optClass}
                    onClick={() => {
                      setSelectedOpt(idx);
                      setQuizSubmitted(true);
                    }}
                  >
                    <span className="quiz-option__letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="quiz-option__text">{opt}</span>
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div
                className={`quiz-feedback ${
                  selectedOpt === stepData.quiz.correctIndex
                    ? 'quiz-feedback--success'
                    : 'quiz-feedback--error'
                }`}
              >
                {selectedOpt === stepData.quiz.correctIndex
                  ? stepData.quiz.feedback
                  : 'Not quite! Try again.'}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
