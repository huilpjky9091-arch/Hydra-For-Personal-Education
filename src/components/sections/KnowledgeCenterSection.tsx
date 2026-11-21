import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, RotateCcw, Award, HelpCircle } from 'lucide-react';
import { KNOWLEDGE_TOPICS, QUIZ_QUESTIONS } from '../../data/knowledgeCenterData';

export const KnowledgeCenterSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('classification');
  // Map of questionId -> chosen option index
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const activeTopic =
    KNOWLEDGE_TOPICS.find((t) => t.id === selectedTopicId) ?? KNOWLEDGE_TOPICS[0];

  const topicQuestions = QUIZ_QUESTIONS.filter((q) => q.topicId === activeTopic.id);

  // Compute global and topic quiz scores
  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = QUIZ_QUESTIONS.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] === q.correctIndex
  ).length;

  const topicCorrect = topicQuestions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] === q.correctIndex
  ).length;

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const resetTopicQuiz = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      topicQuestions.forEach((q) => {
        delete next[q.id];
      });
      return next;
    });
  };

  return (
    <section id="knowledge" className="border-t border-slate-200/80 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header + Global Score Badge */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700">
              EXHIBIT 11 • INTERACTIVE KNOWLEDGE CENTER & QUIZ
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ศูนย์การเรียนรู้และแบบทดสอบชีววิทยา (11 Topics)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              ทบทวนความรู้เชิงลึกทั้ง 11 หัวข้อระดับชีววิทยามหาวิทยาลัยเบื้องต้น
              พร้อมแบบทดสอบท้ายบทและเฉลยคำอธิบายทางวิทยาศาสตร์อย่างละเอียด
            </p>
          </div>

          <div className="museum-panel flex items-center gap-3 rounded-2xl px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-500">
                TOTAL QUIZ SCORE
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {totalCorrect} / {QUIZ_QUESTIONS.length} ข้อ{' '}
                <span className="font-normal text-xs text-slate-500">
                  (ตอบแล้ว {totalAnswered} ข้อ)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Layout: 11 Topic Sidebar + Topic Study + Quiz */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 4 cols: 11 Topics Selector */}
          <div className="lg:col-span-4 space-y-2">
            {KNOWLEDGE_TOPICS.map((topic) => {
              const isActive = topic.id === activeTopic.id;
              const qForTopic = QUIZ_QUESTIONS.filter((q) => q.topicId === topic.id);
              const qCorrect = qForTopic.filter((q) => answers[q.id] === q.correctIndex).length;
              const qAnswered = qForTopic.filter((q) => answers[q.id] !== undefined).length;

              return (
                <button
                  key={topic.id}
                  type="button"
                  id={`knowledge-topic-${topic.id}`}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full flex items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-sky-300 hover:bg-sky-50/40'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: topic.badgeColor }}
                      >
                        {topic.order}
                      </span>
                      <span className="truncate text-xs font-bold">{topic.titleEn}</span>
                    </div>
                    <div
                      className={`mt-0.5 truncate pl-7 text-[11px] ${
                        isActive ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {topic.titleTh}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                      qAnswered === qForTopic.length && qCorrect === qForTopic.length
                        ? 'bg-teal-500 text-white'
                        : isActive
                        ? 'bg-white/15 text-slate-200'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    {qCorrect}/{qForTopic.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right 8 cols: Topic Content + Interactive Quiz */}
          <div className="lg:col-span-8 space-y-6">
            {/* Study Content Card */}
            <div className="museum-panel rounded-3xl p-6 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-700">
                    <BookOpen className="h-4 w-4" />
                    <span>TOPIC #{String(activeTopic.order).padStart(2, '0')}</span>
                    <span className="text-slate-300">•</span>
                    <span>{activeTopic.subtitle}</span>
                  </div>
                  <h3 className="mt-1.5 text-2xl font-extrabold text-slate-900">
                    {activeTopic.titleEn} — {activeTopic.titleTh}
                  </h3>
                </div>
              </div>

              {/* Taxonomy Table if Classification topic */}
              {activeTopic.taxonomyTable && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-mono uppercase">
                      <tr>
                        <th className="px-4 py-2.5">Rank</th>
                        <th className="px-4 py-2.5">Taxon</th>
                        <th className="px-4 py-2.5">คำอธิบายลักษณะสำคัญ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {activeTopic.taxonomyTable.map((row) => (
                        <tr key={row.rank}>
                          <td className="px-4 py-2.5 font-mono font-semibold text-slate-500">
                            {row.rank}
                          </td>
                          <td className="px-4 py-2.5 font-bold text-sky-900">{row.value}</td>
                          <td className="px-4 py-2.5 text-slate-700">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Bullet Summaries */}
              <ul className="space-y-2.5">
                {activeTopic.summaryPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight Box */}
              <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4 text-xs leading-relaxed text-teal-950">
                <span className="font-bold">ประเด็นสำคัญระดับมหาวิทยาลัย: </span>
                {activeTopic.scientificHighlight}
              </div>

              {/* Key Scientific Vocabulary */}
              <div>
                <div className="mb-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  คำศัพท์วิทยาศาสตร์ประจำหัวข้อ
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {activeTopic.keyTerms.map((term) => (
                    <div
                      key={term.en}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="text-xs font-bold text-slate-900">{term.en}</div>
                      <div className="mt-0.5 text-[11px] text-slate-600">{term.th}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Quiz Module for Active Topic */}
            <div className="museum-panel rounded-3xl p-6 space-y-5 border-sky-200/80 bg-slate-50/40">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-sky-700" />
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      แบบทดสอบประจำบท: {activeTopic.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500">
                      คะแนนหัวข้อนี้: {topicCorrect} / {topicQuestions.length} ข้อ
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetTopicQuiz}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  ทำแบบทดสอบหัวข้อนี้ใหม่
                </button>
              </div>

              <div className="space-y-4">
                {topicQuestions.map((q, qIdx) => {
                  const chosen = answers[q.id];
                  const hasAnswered = chosen !== undefined;
                  const isCorrect = chosen === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3"
                    >
                      <div className="text-sm font-bold text-slate-900">
                        {qIdx + 1}. {q.question}
                      </div>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {q.options.map((opt, optIdx) => {
                          const selectedThis = chosen === optIdx;
                          const isRightOption = optIdx === q.correctIndex;

                          let btnStyle =
                            'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-sky-300 hover:bg-sky-50/50';
                          if (hasAnswered) {
                            if (isRightOption) {
                              btnStyle = 'border-teal-500 bg-teal-50 text-teal-950 font-semibold';
                            } else if (selectedThis) {
                              btnStyle = 'border-red-400 bg-red-50 text-red-900';
                            } else {
                              btnStyle = 'border-slate-200 bg-white text-slate-400 opacity-75';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`flex items-start gap-2 rounded-xl border p-3 text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                            >
                              <span className="mt-0.5 font-mono font-bold">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div
                          className={`flex items-start gap-2 rounded-xl p-3 text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-teal-50 text-teal-950 border border-teal-200'
                              : 'bg-red-50 text-red-950 border border-red-200'
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                          ) : (
                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                          )}
                          <div>
                            <span className="font-bold">
                              {isCorrect ? 'ถูกต้อง! ' : 'ยังไม่ถูกต้อง — เฉลย: '}
                            </span>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
