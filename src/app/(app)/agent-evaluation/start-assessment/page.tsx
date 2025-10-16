'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AiStudioSidebar from '@/components/ai_studio/AiStudioSidebar';
import AiStudioSectionHeader from '@/components/ai_studio/AiStudioSectionHeader';

/**
 * Start Assessment Page - DEFINITIVE VERSION (Radio Buttons)
 * - UI styling and layout from the reference design.
 * - Logic reverted to single-select radio buttons for ratings as per new requirement.
 * - Kept the 'Clear' button functionality.
 */

// NOTE: Using a hardcoded token is for development only. This must be replaced.
const HARDCODED_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhlZjQxMDRkNzkxNjE4YmM0YWExZTBkIiwiZW1haWwiOiJybmFnZXNoNjYwQGdtYWlsLmNvbSIsImV4cCI6MTc2MDYyOTkwMCwibmJmIjoxNzYwNjExOTAwLCJpYXQiOjE3NjA2MTE5MDB9.WBKsjtG3IJWqYD-G4l1q5adnE8DLog9zK0Oqzmh0UTE';

type Question = {
  id: string;
  text: string;
  type?: string;
  required?: boolean;
  metadata?: {
    rating_explanation?: string;
    recommendations?: string;
    row_index?: number;
  };
};

type Subsection = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

type Section = {
  id: string;
  title: string;
  description?: string;
  subsections: Subsection[];
};

type LensData = {
  id: string;
  name: string;
  description: string;
  sections: Section[];
};

// --- HELPER FUNCTIONS ---

const parseRatingOptions = (ratingExplanation?: string): { value: number; label: string; description: string }[] => {
  if (!ratingExplanation) return [];
  return ratingExplanation
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => {
      const valueMatch = line.match(/^(\d+)\s*-\s*(.*)/);
      if (!valueMatch) return null;
      const value = parseInt(valueMatch[1], 10);
      const fullText = valueMatch[2];
      const labelMatch = fullText.match(/^([^.?!]+)(.*)/);
      const label = labelMatch ? labelMatch[1].trim() : fullText.trim();
      const description = labelMatch && labelMatch[2] ? labelMatch[2].replace(/^[\s.?!]+/, '').trim() : '';
      return { value, label, description };
    })
    .filter((option): option is { value: number; label: string; description: string } => option !== null)
    .sort((a, b) => b.value - a.value);
};

// Reverted to parse recommendations for a SINGLE rating
// Reverted to parse recommendations for a SINGLE rating
const parseRecommendationsForRating = (recommendations?: string, rating?: number): string[] => {
  if (!recommendations || rating === undefined || rating === 5) return [];
  const lines = recommendations.split('\n').filter(line => line.trim());
  const items: string[] = [];
  const ratingIndex = lines.findIndex(line => line.includes(`Rating ${rating}`));
  if (ratingIndex === -1) return [];
  for (let i = ratingIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/^Rating \d/)) break;
    const match = line.match(/^\d+\.\s*(.+)$/);
    if (match) {
      // CORRECTED LINE: Use match[1]
      items.push(match[1].trim());
    }
  }
  return items;
};
export default function StartAssessmentPage() {
  const router = useRouter();

  const [lens, setLens] = useState<LensData | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  // State reverted to handle a single 'rating' number
  const [answers, setAnswers] = useState<Record<string, { rating?: number; notes?: string; selectedRecommendations?: string[] }>>({});
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({});

  const lensId = '68f0d8d8ae0bd57e6942c464';

  useEffect(() => {
    const fetchLens = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8080/api/lenses/${lensId}`, {
          headers: { Authorization: `Bearer ${HARDCODED_TOKEN}` },
        });
        if (!res.ok) throw new Error(`API Error: ${res.status} ${await res.text()}`);
        const data = await res.json();
        const lensData: LensData = data?.body;
        if (!lensData || !lensData.sections) throw new Error('Invalid API response format.');

        setLens(lensData);
        const qlist: Question[] = lensData.sections.flatMap(s => s.subsections.flatMap(sub => sub.questions));
        setAllQuestions(qlist);

        // Initialize answers with 'rating: undefined'
        const initialAnswers: Record<string, any> = {};
        qlist.forEach(q => {
          initialAnswers[q.id] = { rating: undefined, notes: '', selectedRecommendations: [] };
        });
        setAnswers(initialAnswers);
        
        const initialExpanded: Record<string, boolean> = {};
        lensData.sections.forEach(s => s.subsections.forEach(sub => initialExpanded[sub.id] = true));
        setExpandedSubsections(initialExpanded);
      } catch (err: any) {
        console.error('Error fetching lens:', err);
        setError(err?.message || 'Failed to fetch lens');
      } finally {
        setLoading(false);
      }
    };
    fetchLens();
  }, [lensId]);

  const calculateProgress = (questionIds: string[]) => {
    const answered = questionIds.filter(qid => progress[qid]).length;
    return { answered, total: questionIds.length };
  };

  const total = allQuestions.length;
  const answeredCount = Object.values(progress).filter(Boolean).length;
  const currentQuestion = allQuestions[currentIdx];

  // --- HANDLERS (Reverted to single rating logic) ---

  const setRating = (questionId: string, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        rating,
        selectedRecommendations: [] // Reset recommendations on rating change
      }
    }));
  };

  const setNotes = (questionId: string, notes: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: { ...(prev[questionId] || {}), notes } }));
  };
  
  const toggleRecommendation = (questionId: string, recommendation: string) => {
    setAnswers(prev => {
      const current = prev[questionId]?.selectedRecommendations || [];
      const updated = current.includes(recommendation)
        ? current.filter(r => r !== recommendation)
        : [...current, recommendation];
      return { ...prev, [questionId]: { ...(prev[questionId] || {}), selectedRecommendations: updated } };
    });
  };

  const toggleSubsection = (subId: string) => {
    setExpandedSubsections(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    const qAns = answers[currentQuestion.id];
    // Validation updated for a single rating
    if (!qAns || typeof qAns.rating !== 'number') {
      alert('Please select a rating before proceeding.');
      return;
    }
    setProgress(prev => ({ ...prev, [currentQuestion.id]: true }));
    if (currentIdx < total - 1) {
      setCurrentIdx(s => s + 1);
    } else {
      alert('Assessment completed ✅');
    }
  };

  const handleClear = () => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        rating: undefined, // Clear the single rating
        notes: '',
        selectedRecommendations: []
      }
    }));
    setProgress(prev => ({ ...prev, [currentQuestion.id]: false }));
  };
  
  const handleSelectQuestion = (qid: string) => {
    const idx = allQuestions.findIndex(q => q.id === qid);
    if (idx >= 0) setCurrentIdx(idx);
  };
  
  const handleSaveExit = () => router.push('/agent-evaluation');

  // --- UI LOADING/ERROR STATES ---
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <AiStudioSectionHeader 
          title={`Assessment / Loading...`} 
          subtitle="Please wait..." 
          onNavigateHome={() => router.push('/agent-evaluation')} 
        />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground animate-pulse">Loading assessment data…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <AiStudioSectionHeader 
          title="Assessment" 
          subtitle="Error" 
          onNavigateHome={() => router.push('/agent-evaluation')} 
        />
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <h3 className="text-red-700 font-semibold">Failed to load assessment</h3>
            <p className="text-sm text-red-600 mt-2">{error}</p>
            <button
              onClick={() => location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- UI COMPONENTS ---
  const ProgressSidebar = () => {
    if (!lens) return null;
    return (
      <aside className="w-80 bg-card border-r border-border overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-border">
          <button onClick={() => router.push('/agent-evaluation')} className="text-sm text-primary font-medium mb-3 flex items-center gap-2 hover:underline">
            ← Back to Assessments
          </button>
          <div className="text-sm text-muted-foreground">
            Progress: {answeredCount}/{total}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {lens.sections.map((section, sidx) => {
            const sectionQuestionIds = section.subsections.flatMap(sub => sub.questions.map(q => q.id));
            const sectionProgress = calculateProgress(sectionQuestionIds);
            return (
              <div key={section.id} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground text-sm">{sidx + 1}. {section.title}</h4>
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">{sectionProgress.answered}/{sectionProgress.total}</span>
                </div>
                <div className="space-y-3">
                  {section.subsections.map((sub) => {
                    const subProgress = calculateProgress(sub.questions.map(q => q.id));
                    const isExpanded = expandedSubsections[sub.id];
                    const hasActiveQuestion = sub.questions.some(q => currentQuestion?.id === q.id);
                    return (
                      <div key={sub.id} className={`border rounded-md ${hasActiveQuestion ? 'border-primary border-2' : 'border-border'}`}>
                        <div onClick={() => toggleSubsection(sub.id)} className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 rounded-t-md">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-sm">{isExpanded ? '▼' : '▶'}</span>
                            <span className="font-medium text-sm text-foreground">{sub.title}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">{subProgress.answered}/{subProgress.total}</span>
                        </div>
                        {isExpanded && (
                          <ul className="border-t border-border">
                            {sub.questions.map((q, qIdx) => {
                              const done = progress[q.id];
                              const isActive = currentQuestion && currentQuestion.id === q.id;
                              return (
                                <li key={q.id} onClick={() => handleSelectQuestion(q.id)} className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer border-b border-border last:border-b-0 ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'}`}>
                                  <span className="text-xs text-muted-foreground mt-0.5 flex-shrink-0">Q{qIdx + 1}</span>
                                  <span className="flex-1 text-sm ">{q.text}</span>
                                  <span className="text-xs mt-0.5 flex-shrink-0">{done ? <span className="text-green-600 font-bold">✓</span> : <span className="text-gray-400">○</span>}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    );
  };

  const QuestionCard = () => {
    if (!currentQuestion) return <div className="bg-card rounded-xl shadow-sm p-6"><p className="text-muted-foreground">No question selected.</p></div>;

    const answerForQ = answers[currentQuestion.id];
    const rating = answerForQ?.rating;
    const notes = answerForQ?.notes || '';
    const selectedRecommendations = answerForQ?.selectedRecommendations || [];
    const ratingOptions = parseRatingOptions(currentQuestion.metadata?.rating_explanation);
    const recommendations = parseRecommendationsForRating(currentQuestion.metadata?.recommendations, rating);

    return (
      <div className="bg-card rounded-xl shadow-sm p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground mb-2">{currentQuestion.text}</h2>
            <p className="text-sm text-muted-foreground">Select the rating that best describes the current compliance level</p>
          </div>
          <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded">Q {currentIdx + 1}/{total}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Select from the following</label>
          <div className="space-y-3">
            {ratingOptions.map((option) => (
              <label key={option.value} className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${rating === option.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <input
                  type="radio"
                  name={`rating-${currentQuestion.id}`}
                  checked={rating === option.value}
                  onChange={() => setRating(currentQuestion.id, option.value)}
                  className="bg-background w-5 h-5 mt-0.5 accent-primary cursor-pointer flex-shrink-0"
                  style={{ borderRadius: '4px' }}
                />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{option.value} - {option.label}</div>
                  {option.description && <div className="text-sm text-muted-foreground mt-1">{option.description}</div>}
                </div>
              </label>
            ))}
          </div>
        </div>

        {rating !== undefined && rating < 5 && recommendations.length > 0 && (
          <div className="border-t border-border pt-6">
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer font-medium text-foreground mb-4">
                <span>Recommendations</span>
                <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-3">Select recommended actions to address this rating:</p>
                {recommendations.map((rec, idx) => (
                  <label key={idx} className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRecommendations.includes(rec)}
                      onChange={() => toggleRecommendation(currentQuestion.id, rec)}
                      className="w-4 h-4 mt-0.5 accent-primary cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-foreground flex-1">{rec}</span>
                  </label>
                ))}
              </div>
            </details>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Remarks / Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(currentQuestion.id, e.target.value)}
            className="bg-background w-full border border-border rounded-lg p-3 min-h-[120px] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Enter notes or context for this question..."
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <button onClick={handleClear} className="px-5 py-2 border border-border rounded-md hover:bg-muted text-sm font-medium text-red-600 hover:border-red-600">
            Clear
          </button>
          <div className="flex gap-3">
            <button onClick={handleSaveExit} className="px-5 py-2 border border-border rounded-md hover:bg-muted text-sm font-medium transition-colors">
              Save & Exit
            </button>
            <button onClick={handleNext} className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HelpfulResources = () => (
    <aside className="w-80 border-l border-border bg-card p-6 overflow-y-auto">
      <h4 className="font-semibold text-foreground text-lg mb-6">Helpful resources</h4>
      <div className="space-y-6">
        <div>
          <h5 className="font-semibold text-foreground mb-2">Ask an expert</h5>
        </div>
        <hr className="border-border" />
        <div>
          <h5 className="font-semibold text-foreground mb-3">Evaluate customer needs</h5>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Involve key stakeholders, including business, development, and operations teams, to determine 
            where to focus efforts on external customer needs. This verifies that you have a thorough 
            understanding of the operations support that is required to achieve your desired business outcomes.
          </p>
        </div>
        <hr className="border-border" />
        <div>
          <h5 className="font-semibold text-foreground mb-3">Evaluate internal customer needs</h5>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Involve key stakeholders, including business, development, and operations teams, when determining 
            where to focus efforts on internal customer needs. This will ensure that you have a thorough 
            understanding of the operations support that is required to achieve business outcomes.
          </p>
        </div>
      </div>
    </aside>
  );

  // --- MAIN RENDER ---
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background">
      <AiStudioSectionHeader
        title={`Assessment / ${lens?.name ?? 'Lens'}`}
        subtitle={lens?.description ?? ''}
        onNavigateHome={() => router.push('/agent-evaluation')}
      />
      <div className="flex flex-1 overflow-hidden">
        <AiStudioSidebar activeNav="agentEvaluation" setActiveNav={() => {}} />
        <ProgressSidebar />
        <main className="flex-1 overflow-y-auto p-8 bg-sidebar">
          <div className="max-w-5xl mx-auto">
            <QuestionCard />
          </div>
        </main>
        <HelpfulResources />
      </div>
      <footer className="w-full p-2 border-t border-border bg-sidebar text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Axcess.io. All rights reserved.</p>
      </footer>
    </div>
  );
}