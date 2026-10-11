import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/lessonsData';
import { LanguageMode } from '../types';
import { UI_TRANSLATIONS } from '../data/i18n';
import { soundEffects } from '../utils/audio';

interface PahadiQuizProps {
  currentLanguage: LanguageMode;
  onComplete?: () => void;
}

export const PahadiQuiz: React.FC<PahadiQuizProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const t = UI_TRANSLATIONS.quiz;
  const question = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    soundEffects.playClick();
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    const selected = question.options.find((o) => o.id === selectedOptionId);
    const isCorrect = selected?.isCorrect ?? false;

    setIsAnswerSubmitted(true);
    if (isCorrect) {
      soundEffects.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      soundEffects.playClick();
    }
  };

  const handleNextQuestion = () => {
    soundEffects.playClick();
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      soundEffects.playChaiWhistle();
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleRestartQuiz = () => {
    soundEffects.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <section id="quiz" className="w-full bg-slate-950 py-16 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
            <span>{t.sectionNum[currentLanguage]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.heading[currentLanguage]}
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl mx-auto">
            {t.subheading[currentLanguage]}
          </p>
        </div>

        {!isQuizCompleted ? (
          <div className="p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            
            {/* Progress strip */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span className="font-mono tabular-nums">
                {t.questionOf[currentLanguage]} {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">
                {t.scoreLabel[currentLanguage]}: {score}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {question.question[currentLanguage]}
              </h3>
              {currentLanguage !== 'pahadi' && (
                <p className="text-xs text-slate-400">
                  <span className="text-amber-400 font-medium">गढ़वाली-पहाड़ी मूल:</span> {question.question.pahadi}
                </p>
              )}
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optionStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';

                if (isAnswerSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500/50';
                  } else {
                    optionStyle = 'bg-slate-950/50 border-slate-850 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-slate-950 border-amber-400 text-amber-200 ring-1 ring-amber-400/50';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {option.text[currentLanguage]}
                      </p>
                    </div>

                    {isAnswerSubmitted && option.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-3" />
                    )}
                    {isAnswerSubmitted && isSelected && !option.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-3" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {currentLanguage === 'english' ? 'Explanation Analysis:' : 'दगड़िया विश्लेषण:'}
                  </span>
                </p>
                <p>{question.explanation[currentLanguage]}</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold rounded-xl transition-all cursor-pointer text-sm shadow-md"
                >
                  {t.confirmBtn[currentLanguage]}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-all cursor-pointer text-sm shadow-md flex items-center gap-2"
                >
                  <span>
                    {currentQuestionIndex + 1 < QUIZ_QUESTIONS.length
                      ? t.nextBtn[currentLanguage]
                      : t.viewResultBtn[currentLanguage]}
                  </span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Completion Certificate Card */
          <div className="p-8 bg-slate-900 rounded-3xl border border-amber-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
                {currentLanguage === 'english' ? 'Himalayan Computer Science Certificate' : 'पहाड़ी कंप्यूटर प्रमाण-पत्र'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentLanguage === 'english'
                  ? score >= 4 ? 'Bravo Friend! You mastered Computer Architecture!' : 'Congratulations! Great effort & learning!'
                  : score >= 4 ? 'शाबाश दगड्या! तू त कंप्यूटर मास्टर बणि ग्या!' : 'बधाई दगड्या! खूब बढ़िया प्रयास!'}
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                {currentLanguage === 'english'
                  ? `You achieved ${score} out of 5 marks. You can now explain computer architecture through tea and manduwa analogies with ease!`
                  : `आपने 5 में से ${score} अंक प्राप्त किए। अब आप किसी को भी चाय-मंडुवा के उदाहरण से कंप्यूटर समझा सकते हैं!`}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 max-w-md mx-auto space-y-1">
              <p className="text-amber-300 font-semibold">
                {currentLanguage === 'english' ? 'Core Himalayan Axiom:' : 'गुरुमंत्र (Remember Always):'}
              </p>
              <p>
                {currentLanguage === 'english'
                  ? '"Keyboard/Mouse is raw ingredient, Hearth is CPU, Platter is RAM, Granary is SSD, and steaming Spiced Tea is Output!"'
                  : '"कीबोर्ड माउस सामग्री छ, चूल्हा सीपीयू छ, थाली रैम छ, कोठार एसएसडी छ और गरमा-गरम चाय आउटपुट छ!"'}
              </p>
              <div className="pt-2 mt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>संरक्षक / संचालक: <strong>आनंद कुमार (Anand Kumar)</strong></span>
                <span className="text-amber-400">बोराआगर, जाडापानी</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.retakeBtn[currentLanguage]}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
