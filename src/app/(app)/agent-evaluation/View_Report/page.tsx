// 'use client';

// import React, { useMemo, useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Evaluation, EvaluationRun, EvaluationRunCombination, EvaluationRunCombinationStatus, ModelMetrics } from '../../../../../types';
// import { LoadingSpinnerIcon, CheckCircleIcon, ChevronDownIcon, BackIcon, ReportIcon, StarIcon, ClockIcon, KnowledgeBaseIcon, MinusCircleIcon } from '../../../../../constants';
// import { mockBots, mockModels, mockPrompts, mockEvaluationMetrics, mockEvaluations } from '@/components/Agent_Evaluation/evaluation_data';
// //import Report_Chart from '@/components/Agent_Evaluation/Report_Chart';
// import { StatusBadge } from '@/components/Agent_Evaluation/Status_Badge';

// const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
//     <div className="w-full bg-gray-200 rounded-full h-1.5">
//         <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
//     </div>
// );

// const REPORT_STAT_METRIC_MAP = {
//     'Fastest Model': { metricName: 'Latency', higherIsBetter: false },
//     'Highest Quality': { metricName: 'Quality Score', higherIsBetter: true },
//     'Lowest Toxicity': { metricName: 'Toxicity Score', higherIsBetter: false },
//     'Best Readability': { metricName: 'Readability Score', higherIsBetter: true },
// };

// const ReportStatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | React.ReactNode; }> = ({ icon, label, value }) => {
//     return (
//         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 h-full">
//             <div className="p-3.5 bg-gray-100 rounded-xl">
//                 {icon}
//             </div>
//             <div>
//                 <p className="text-sm text-gray-500 font-medium">{label}</p>
//                 <p className="text-2xl font-bold text-gray-800">{value}</p>
//             </div>
//         </div>
//     );
// };

// const ModelPerformanceChart: React.FC<{ combinedData: any[] }> = ({ combinedData }) => {
//     const [activeMetric, setActiveMetric] = useState<any>('Pass Rate');
//     const metrics: ('Pass Rate' | 'Latency' | 'Quality Score' | 'Toxicity Score' | 'Readability Score')[] = ['Pass Rate', 'Latency', 'Quality Score', 'Toxicity Score', 'Readability Score'];

//     const modelMetricsForChart = useMemo(() => {
//         if (!combinedData || combinedData.length === 0) return [];
//         const completed = combinedData.filter(c => c.status === 'Completed');
//         if (completed.length === 0) return [];
        
//         const metricIdToName = new Map(mockEvaluationMetrics.map(m => [m.id, m.name]));
//         const modelAverages = new Map<string, { [metricName: string]: number }>();
//         const modelScores = new Map<string, { [metricName: string]: number[] }>();

//         completed.forEach(c => {
//             if (!c.modelName || c.modelName === 'N/A') return;
//             if (!modelScores.has(c.modelName)) modelScores.set(c.modelName, {});
//             const modelEntry = modelScores.get(c.modelName)!;
//             c.metricScores?.forEach((ms: { metricId: number; score: number; }) => {
//                 const metricName = metricIdToName.get(ms.metricId);
//                 if (metricName) {
//                     if (!modelEntry[metricName]) modelEntry[metricName] = [];
//                     modelEntry[metricName].push(ms.score);
//                 }
//             });
//         });

//         modelScores.forEach((metrics, modelName) => {
//             const avgScores: { [metricName: string]: number } = {};
//             for (const metricName in metrics) {
//                 const scores = metrics[metricName];
//                 avgScores[metricName] = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
//             }
//             modelAverages.set(modelName, avgScores);
//         });

//         const finalModelMetricsForChart: ModelMetrics[] = [];
//         modelAverages.forEach((metrics, modelName) => {
//             finalModelMetricsForChart.push({
//                 name: modelName,
//                 passRate: metrics['Pass Rate'] ? parseFloat(metrics['Pass Rate'].toFixed(2)) : 0,
//                 avgLatency: metrics['Latency'] ? parseFloat((metrics['Latency'] * 1000).toFixed(0)) : 0,
//                 avgQualityScore: metrics['Quality Score'] ? parseFloat((metrics['Quality Score']).toFixed(2)) : 0,
//                 avgToxicityScore: metrics['Toxicity Score'] ? parseFloat(metrics['Toxicity Score'].toFixed(2)) : 0,
//                 avgReadabilityScore: metrics['Readability Score'] ? parseFloat((metrics['Readability Score']).toFixed(0)) : 0,
//             });
//         });

//         return finalModelMetricsForChart.sort((a,b) => a.name.localeCompare(b.name));
//     }, [combinedData]);

//     return (
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-96 flex flex-col">
//             <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
//                 <h3 className="text-xl font-bold text-gray-800">
//                     Model Performance Comparison
//                 </h3>
//                 <div className="flex items-center gap-2 flex-wrap">
//                     {metrics.map(metric => (
//                         <button
//                             key={metric}
//                             onClick={() => setActiveMetric(metric === 'Pass Rate' ? 'Pass Rate' : `Avg ${metric}`)}
//                             className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                                 activeMetric.includes(metric)
//                                     ? 'bg-brand-dark-blue text-white'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                         >
//                             {metric}
//                         </button>
//                     ))}
//                 </div>
//             </div>
            
//             {/* <div className="flex-grow">
//                 {modelMetricsForChart.length > 0 ? (
//                     <Report_Chart data={modelMetricsForChart} selectedMetric={activeMetric} />
//                 ) : (
//                     <div className="flex items-center justify-center h-full text-gray-500">
//                         No completed runs with this metric to display.
//                     </div>
//                 )}
//             </div> */}
//         </div>
//     );
// };

// const ScoreWithLabel: React.FC<{ score: number | null | undefined }> = ({ score }) => {
//     if (score === null || score === undefined) {
//         return <span className="text-gray-500">N/A</span>;
//     }

//     const isPass = score >= 80;
//     const labelText = isPass ? 'Pass' : 'Fail';
//     const labelColor = isPass ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';

//     return (
//         <div className="flex flex-col items-center justify-center gap-1">
//             <div className="font-semibold text-brand-primary">{score.toFixed(1)}%</div>
//             <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${labelColor}`}>{labelText}</span>
//         </div>
//     );
// };

// const ModelResponseCard: React.FC<{ modelName: string; comboData: any }> = ({ modelName, comboData }) => {
//     const metrics = useMemo(() => {
//         if (!comboData?.metricScores) return {};
//         const metricMap: Record<string, number> = {};
//         const metricIdToName = new Map(mockEvaluationMetrics.map(m => [m.id, m.name]));
//         comboData.metricScores.forEach((ms: { metricId: number; score: number; }) => {
//             const name = metricIdToName.get(ms.metricId);
//             if (name) metricMap[name] = ms.score;
//         });
//         return metricMap;
//     }, [comboData]);

//     const modelHeaderMap: Record<string, string> = { 'Model-Beta': 'Model Beta', 'Nova Lite': 'Nova-Lite' };

//     return (
//         <div className="bg-white rounded-lg border border-gray-200 flex flex-col">
//             <h5 className="font-semibold text-gray-800 p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                 {modelHeaderMap[modelName] || modelName}
//             </h5>
//             <div className="p-4 flex-grow">
//                 <p className="text-xs text-gray-500 uppercase font-semibold">Output</p>
//                 <pre className="text-sm font-mono whitespace-pre-wrap mt-1 mb-4 max-h-48 overflow-y-auto bg-gray-50 p-2 rounded-md">
//                     {comboData?.output || <span className="text-gray-400 italic">Not available</span>}
//                 </pre>

//                 <p className="text-xs text-gray-500 uppercase font-semibold mt-4">Metrics</p>
//                 <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
//                     <div className="flex justify-between"><span>Latency:</span> <span className="font-semibold">{metrics['Latency'] !== undefined ? `${(metrics['Latency'] * 1000).toFixed(0)}ms` : 'N/A'}</span></div>
//                     <div className="flex justify-between"><span>Quality:</span> <span className="font-semibold">{metrics['Quality Score'] !== undefined ? `${(metrics['Quality Score']).toFixed(1)}/10` : 'N/A'}</span></div>
//                     <div className="flex justify-between"><span>Toxicity:</span> <span className="font-semibold">{metrics['Toxicity Score'] !== undefined ? metrics['Toxicity Score'].toFixed(2) : 'N/A'}</span></div>
//                     <div className="flex justify-between"><span>Readability:</span> <span className="font-semibold">{metrics['Readability Score'] !== undefined ? `${metrics['Readability Score'].toFixed(1)}` : 'N/A'}</span></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- Main Page Component ---
// // This component should be the default export for the page.
// export default function EvaluationReportPage() { // Removed props: onBack, data
//     const router = useRouter();
//     const searchParams = useSearchParams(); // Get URL query parameters

//     // Extract evaluationId and runId from the URL query string
//     const evaluationId = searchParams.get('evaluationId');
//     const runId = searchParams.get('runId');

//     // State to hold the fetched data for the current report
//     const [reportData, setReportData] = useState<{ evaluation: Evaluation, run: EvaluationRun } | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     // Effect to fetch/filter the data based on URL query parameters
//     useEffect(() => {
//         setIsLoading(true);
//         if (evaluationId && runId) {
//             const foundEvaluation = mockEvaluations.find(evalItem => evalItem.id.toString() === evaluationId);
//             if (foundEvaluation) {
//                 const foundRun = foundEvaluation.runs.find((runItem: any) => runItem.runId === runId);
//                 if (foundRun) {
//                     setReportData({ evaluation: foundEvaluation, run: foundRun });
//                 } else {
//                     setReportData(null); // Run not found
//                 }
//             } else {
//                 setReportData(null); // Evaluation not found
//             }
//         } else {
//             setReportData(null); // Missing parameters
//         }
//         setIsLoading(false); // Set loading to false after attempting to find data
//     }, [evaluationId, runId]); // Re-run effect if IDs in URL change

//     const [activeTab, setActiveTab] = useState<'summary' | 'details'>('summary');
//     const [liveProgress, setLiveProgress] = useState<Record<number, number>>({});
//     const [expandedInputKey, setExpandedInputKey] = useState<string | null>(null);

//     // Use reportData instead of the 'data' prop
//     const combinedData = useMemo(() => {
//         if (!reportData) return [];
//         const { evaluation, run } = reportData; // Use reportData here
//         return run.runCombinations.map(runCombo => {
//             const combinationDetails = evaluation.combinations.find(c => c.id === runCombo.combinationId);
//             const agent = mockBots.find(b => b.bot_id === String(combinationDetails?.agentId));
//             const prompt = mockPrompts.find(p => p.id === combinationDetails?.promptId);
//             const model = mockModels.find(m => m.id === combinationDetails?.modelId);
            
//             return {
//                 ...runCombo,
//                 agentName: agent?.bot_title || 'N/A',
//                 promptName: prompt?.name || 'N/A',
//                 promptVersion: combinationDetails?.promptVersion || 'N/A',
//                 modelName: model?.name || 'N/A',
//                 modelId: model?.id,
//             }
//         });
//     }, [reportData]); // Depend on reportData

//     const processedDetails = useMemo(() => {
//         if (!combinedData || combinedData.length === 0) return { inputs: [], models: [] };

//         const models = ['Model-Alpha', 'Claude 3 Sonnet', 'Claude 3.5 Sonnet', 'Nova-Lite', 'Model-Beta', 'Llama 4', 'Nova Pro'];
//         const inputMap = new Map<string, {
//             input: string;
//             expected_output: string | null;
//             scores: Record<string, { score: number | null; itemData: any; }>;
//         }>();

//         combinedData.forEach(item => {
//             if (!item.input) return;
//             const inputKey = item.input;
//             if (!inputMap.has(inputKey)) {
//                 inputMap.set(inputKey, {
//                     input: item.input,
//                     expected_output: item.expected_output,
//                     scores: {},
//                 });
//             }
            
//             const inputEntry = inputMap.get(inputKey)!;
//             const modelKey = item.modelName;
//             if (models.includes(modelKey)) { 
//                 inputEntry.scores[modelKey] = { score: item.score, itemData: item };
//             }
//         });

//         return { inputs: Array.from(inputMap.values()), models };
//     }, [combinedData]);

//     // Live progress simulation (useEffect for interval)
//     useEffect(() => {
//         // Use reportData here
//         if (reportData && reportData.run) {
//             const initialProgress: Record<number, number> = {};
//             reportData.run.runCombinations.forEach(rc => {
//                 if (rc.status === 'In Progress') {
//                     initialProgress[rc.combinationId] = rc.progress;
//                 }
//             });
//             setLiveProgress(initialProgress);
//             // Reset state when new report data loads
//             setExpandedInputKey(null);
//             setActiveTab('summary');

//             const interval = setInterval(() => {
//                 setLiveProgress(currentProgress => {
//                     const newProgress = { ...currentProgress };
//                     let hasChanged = false;
//                     for (const id in newProgress) {
//                         if (newProgress[id] < 100) {
//                             newProgress[id] = Math.min(100, newProgress[id] + Math.random() * 8);
//                             hasChanged = true;
//                         }
//                     }
//                     return hasChanged ? newProgress : currentProgress;
//                 });
//             }, 1200);

//             return () => clearInterval(interval);
//         }
//     }, [reportData]); // Depend on reportData

//     // --- Calculation for Overall Summary moved here ---
//     const summaryStats = useMemo(() => {
//         if (!combinedData || combinedData.length === 0) return null;

//         const completed = combinedData.filter(c => c.status === 'Completed');
//         if (completed.length === 0) return null;

//         const metricIdToName = new Map(mockEvaluationMetrics.map(m => [m.id, m.name]));

//         const passRateMetricId = mockEvaluationMetrics.find(m => m.name === 'Pass Rate')?.id;
//         let passRateSum = 0;
//         let passRateCount = 0;
//         completed.forEach(c => {
//             const score = c.metricScores?.find(ms => ms.metricId === passRateMetricId)?.score;
//             if (score !== undefined) {
//                 passRateSum += score;
//                 passRateCount++;
//             }
//         });
//         const overallPassRate = passRateCount > 0 ? (passRateSum / passRateCount) : 0;

//         const totalPrompts = new Set(completed.map(c => c.input)).size;


//         const modelAverages = new Map<string, { [metricName: string]: number }>();
//         const modelScores = new Map<string, { [metricName: string]: number[] }>();

//         completed.forEach(c => {
//             if (!c.modelName || c.modelName === 'N/A') return;
//             if (!modelScores.has(c.modelName)) modelScores.set(c.modelName, {});
//             const modelEntry = modelScores.get(c.modelName)!;
//             c.metricScores?.forEach(ms => {
//                 const metricName = metricIdToName.get(ms.metricId);
//                 if (metricName) {
//                     if (!modelEntry[metricName]) modelEntry[metricName] = [];
//                     modelEntry[metricName].push(ms.score);
//                 }
//             });
//         });

//         modelScores.forEach((metrics, modelName) => {
//             const avgScores: { [metricName: string]: number } = {};
//             for (const metricName in metrics) {
//                 const scores = metrics[metricName];
//                 avgScores[metricName] = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
//             }
//             modelAverages.set(modelName, avgScores);
//         });

//         const findBestModel = (metricKey: keyof typeof REPORT_STAT_METRIC_MAP) => {
//             const { metricName, higherIsBetter } = REPORT_STAT_METRIC_MAP[metricKey];
//             let bestModel = 'N/A';
//             let bestScore: number | null = null;
//             modelAverages.forEach((metrics, modelName) => {
//                 const score = metrics[metricName];
//                 if (score !== undefined) {
//                     if (bestScore === null || (higherIsBetter ? score > bestScore : score < bestScore)) {
//                         bestScore = score;
//                         bestModel = modelName;
//                     }
//                 }
//             });
//             return bestModel;
//         };
        
//         return {
//             overallPassRate: `${overallPassRate.toFixed(0)}%`,
//             totalPrompts: totalPrompts.toString(),
//             fastestModel: findBestModel('Fastest Model'),
//             highestQuality: findBestModel('Highest Quality'),
//             lowestToxicity: findBestModel('Lowest Toxicity'),
//             bestReadability: findBestModel('Best Readability'),
//         };
//     }, [combinedData]);
//     // --- End of Calculation for Overall Report ---

//     // Render loading state or error if data is not available
//     if (isLoading) {
//         return (
//             <div className="h-full w-full flex items-center justify-center p-8 bg-gray-50">
//                 <div className="text-center">
//                     <LoadingSpinnerIcon className="w-8 h-8 mx-auto text-brand-primary mb-4" />
//                     <p className="text-lg text-gray-600">Loading evaluation results...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!reportData) { // Use reportData here
//         return (
//             <div className="h-full w-full flex items-center justify-center p-8 bg-gray-50">
//                 <div className="text-center">
//                     <p className="text-lg text-gray-600">No evaluation data found for the provided IDs.</p>
//                     <p className="text-sm text-gray-500 mt-2">Please ensure valid 'evaluationId' and 'runId' are present in the URL query parameters.</p>
//                     <button
//                         onClick={() => router.back()}
//                         className="mt-4 px-4 py-2 bg-brand-dark-blue text-white rounded-lg hover:bg-brand-primary transition-colors"
//                     >
//                         Go Back
//                     </button>
//                 </div>
//             </div>
//         );
//     }
    
//     const tabClasses = (isActive: boolean) => 
//         `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//             isActive
//                 ? 'border-brand-dark-blue text-brand-dark-blue'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//         }`;
    
//     const modelHeaderMap: Record<string, string> = {
//         'Model-Beta': 'Model Beta',
//         'Nova Lite': 'Nova-Lite'
//     };

//     return (
//         <div className="h-full w-full flex flex-col bg-gray-50 overflow-y-auto p-8 font-sans">
//             <div className="flex-shrink-0">
//                 <button
//                     onClick={() => router.back()} // Use router.back() for navigation
//                     className="flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors mb-6"
//                 >
//                     <BackIcon className="w-5 h-5" />
//                     <span>Back To Evaluations</span>
//                 </button>
//             </div>
//             <div className="bg-white rounded-2xl shadow-xl w-full flex-1 flex flex-col overflow-hidden border border-gray-200">
//                 <div className="p-6 border-b border-gray-200">
//                     <h2 className="text-3xl font-bold text-gray-800">Evaluation Report</h2>
//                     <p className="text-base text-gray-600 mt-1">Analysis of performance metrics and response quality for leading models.</p>
//                 </div>
                
//                 <div className="border-b border-gray-200">
//                     <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
//                         <button onClick={() => setActiveTab('summary')} className={tabClasses(activeTab === 'summary')}>
//                             Overall Summary
//                         </button>
//                         <button onClick={() => setActiveTab('details')} className={tabClasses(activeTab === 'details')}>
//                             Detailed Comparison
//                         </button>
//                     </nav>
//                 </div>

//                 <div className="flex-grow overflow-y-auto bg-gray-50/50">
//                     {activeTab === 'summary' && (
//                         summaryStats ? (
//                             <div className="p-6 space-y-6">
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
//                                     <ReportStatCard label="Overall Pass Rate" value={summaryStats.overallPassRate} icon={<CheckCircleIcon className="w-6 h-6 text-green-600"/>} />
//                                     <ReportStatCard label="Total Prompts" value={summaryStats.totalPrompts} icon={<ReportIcon className="w-6 h-6 text-blue-600"/>} />
//                                     <ReportStatCard label="Fastest Model" value={summaryStats.fastestModel} icon={<ClockIcon className="w-6 h-6 text-purple-600"/>} />
//                                     <ReportStatCard label="Highest Quality" value={summaryStats.highestQuality} icon={<StarIcon className="w-6 h-6 text-yellow-500 fill-yellow-400"/>} />
//                                     <ReportStatCard label="Lowest Toxicity" value={summaryStats.lowestToxicity} icon={<MinusCircleIcon className="w-6 h-6 text-red-600"/>} />
//                                     <ReportStatCard label="Best Readability" value={summaryStats.bestReadability} icon={<KnowledgeBaseIcon className="w-6 h-6 text-indigo-600"/>} />
//                                 </div>
//                                 <ModelPerformanceChart combinedData={combinedData} />
//                             </div>
//                         ) : (
//                              <div className="p-6 text-center text-gray-500">
//                                 <p>Not enough completed runs to generate an Overall Summary Report.</p>
//                                 <p className="text-sm mt-2">{reportData?.run.overallReport}</p> {/* Use reportData here */}
//                             </div>
//                         )
//                     )}
//                     {activeTab === 'details' && (
//                         <div className="p-6">
//                             <div className="overflow-auto border border-gray-200 rounded-lg bg-white shadow-sm">
//                                 <table className="min-w-full text-sm">
//                                     <thead className="bg-gray-100/70">
//                                         <tr>
//                                             <th className="px-4 py-3 text-left font-semibold text-gray-600 w-12"></th>
//                                             <th className="px-4 py-3 text-left font-semibold text-gray-600 w-2/5">Input</th>
//                                             {processedDetails.models.map(modelName => (
//                                                 <th key={modelName} className="px-4 py-3 text-center font-semibold text-gray-600">
//                                                     {modelHeaderMap[modelName] || modelName}
//                                                 </th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white">
//                                         {processedDetails.inputs.length === 0 ? (
//                                             <tr><td colSpan={processedDetails.models.length + 2} className="text-center p-8 text-gray-500">No combinations to display.</td></tr>
//                                         ) : (
//                                             processedDetails.inputs.map(inputRow => (
//                                                <React.Fragment key={inputRow.input}>
//                                                     <tr 
//                                                         className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
//                                                         onClick={() => setExpandedInputKey(prevId => prevId === inputRow.input ? null : inputRow.input)}
//                                                     >
//                                                        <td className="px-4 py-3 text-center">
//                                                            <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${expandedInputKey === inputRow.input ? 'rotate-180' : ''}`} />
//                                                        </td>
//                                                        <td className="px-4 py-3">
//                                                            <div className="font-medium text-gray-800 truncate">{inputRow.input}</div>
//                                                        </td>
//                                                        {processedDetails.models.map(modelName => (
//                                                            <td key={modelName} className="px-4 py-3 text-center">
//                                                                 <ScoreWithLabel score={inputRow.scores[modelName]?.score} />
//                                                            </td>
//                                                        ))}
//                                                     </tr>
//                                                     {expandedInputKey === inputRow.input && (
//                                                         <tr className="bg-gray-100/50">
//                                                             <td colSpan={processedDetails.models.length + 2} className="p-0">
//                                                                 <div className="p-6 bg-gray-50 border-y-2 border-brand-accent/20">
//                                                                     <div className="space-y-6">
//                                                                         <div>
//                                                                             <h4 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-2">Expected Output</h4>
//                                                                             <pre className="bg-green-50 text-green-800 border border-green-200 rounded-md p-3 text-sm font-mono whitespace-pre-wrap">
//                                                                                 {inputRow.expected_output || <span className="text-gray-400 italic">Not available</span>}
//                                                                             </pre>
//                                                                         </div>
//                                                                         <div>
//                                                                             <h4 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-3">Model Responses</h4>
//                                                                             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
//                                                                                 {processedDetails.models.map(modelName => {
//                                                                                     const comboData = inputRow.scores[modelName]?.itemData;
//                                                                                     if (!comboData) return (
//                                                                                          <div key={modelName} className="p-4 bg-gray-100 rounded-lg border border-gray-200">
//                                                                                             <h5 className="font-semibold text-gray-800">{modelHeaderMap[modelName] || modelName}</h5>
//                                                                                             <p className="text-sm text-gray-500 mt-2">No data available.</p>
//                                                                                         </div>
//                                                                                     );
//                                                                                     return <ModelResponseCard key={modelName} modelName={modelName} comboData={comboData} />;
//                                                                                 })}
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </td>
//                                                         </tr>
//                                                     )}
//                                                </React.Fragment>
//                                            ))
//                                         )}
//                                     </tbody>
//                                  </table>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                  <div className="p-4 bg-white border-t border-gray-200 text-center text-xs text-gray-400">
//                     Evaluation Run ID: {reportData?.run.runId} {/* Use reportData here */}
//                 </div>
//             </div>
//         </div>
//     );
// };