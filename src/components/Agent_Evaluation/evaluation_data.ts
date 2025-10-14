// // @ts-nocheck
// // This file contains extensive mock data for the Agent Evaluation UI. To keep the pruning
// // focused and avoid many cross-file type errors, disable TS checking here and only
// // import runtime enums used by code.
// import { EvaluationStatus, EvaluationRunCombinationStatus } from '../../../types';

// // Runtime-friendly fallbacks for a few enums used only as values in this mock data.
// // These used to come from shared types; during pruning we keep simple runtime constants
// // so that the build / dev server doesn't throw ReferenceError when evaluating this file.
// const PromptStatus = {
//     Published: 'Published',
//     Draft: 'Draft',
//     Archived: 'Archived',
// } as const;

// const KnowledgeBaseStatus = {
//     Active: 'Active',
//     Indexing: 'Indexing',
//     Archived: 'Archived',
// } as const;

// // NEW: Helper function to generate a random date for submitted/completed
// const getRandomDate = (start: Date, end: Date) => {
//     const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//     return date.toLocaleString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//     });
// };

// const evaluationDataset = [
//     {
//         input: 'Summarize the impact of AI on the healthcare industry in three points.',
//         expected_output: '1. Improved diagnostics through AI-powered imaging analysis.\n2. Personalized treatment plans based on genetic data.\n3. Streamlined administrative tasks and drug discovery.',
//         modelOutputs: {
//             'Model-Alpha': 'AI is making healthcare better by helping doctors find diseases earlier, creating custom treatments for people, and making all the paperwork and drug research stuff way faster.',
//             'Model-Beta': 'The healthcare industry has been revolutionized by AI, primarily in three key areas: diagnostics, where AI algorithms improve the accuracy of medical imaging; personalized medicine, which allows for treatments tailored to an individual\'s genetic makeup; and operational efficiency, by automating administrative tasks.',
//             'Claude 3.5 Sonnet': '1. **Enhanced Diagnostic Accuracy:** AI algorithms analyze medical images (X-rays, MRIs) with superhuman precision, leading to earlier and more accurate disease detection.\n2. **Personalized Medicine & Treatment:** AI models process vast amounts of patient data, including genomics, to predict treatment responses and tailor personalized health plans.\n3. **Operational & Research Efficiency:** AI automates administrative tasks like scheduling and billing, and drastically accelerates the drug discovery and development timeline.',
//             'Nova-Lite': 'AI helps in healthcare. It makes diagnoses better. It personalizes treatments. It speeds up discovering new drugs.',
//             'Claude 3 Sonnet': '1. **Improved Diagnostics:** AI enhances the analysis of medical images, leading to earlier and more accurate diagnoses.\n2. **Personalized Treatment:** It enables the creation of customized treatment plans by analyzing individual patient data.\n3. **Accelerated Research:** AI significantly speeds up drug discovery and streamlines administrative workflows, optimizing healthcare operations.',
//             'Llama 4': '1. AI diagnostics are sharpening medical imaging reads.\n2. Patient-specific treatments are now possible through genomic analysis.\n3. Automation of back-office tasks and R&D is accelerating healthcare.',
//             'Nova Pro': '1. **Advanced Diagnostics**: Nova Pro AI enhances diagnostic capabilities in medical imaging.\n2. **Tailored Therapeutics**: It allows for personalized treatment strategies.\n3. **Operational Acceleration**: Streamlines both administrative and research pathways in healthcare.',
//         }
//     },
//     {
//         input: 'Write a short, catchy marketing headline for a new productivity app called "Zenith".',
//         expected_output: 'A short, punchy headline like "Zenith: Reach Your Peak Productivity" or "Conquer Your Day with Zenith."',
//         modelOutputs: {
//             'Model-Alpha': 'Zenith: The Best Productivity App.',
//             'Model-Beta': 'Zenith: Achieve More.',
//             'Claude 3.5 Sonnet': 'Zenith: Stop Juggling. Start Achieving.',
//             'Nova-Lite': 'Zenith Productivity App.',
//             'Claude 3 Sonnet': 'Zenith: Your Peak Productivity Awaits.',
//             'Llama 4': 'Zenith: Elevate Your Workflow.',
//             'Nova Pro': 'Zenith: Productivity, Perfected.',
//         }
//     },
//     {
//         input: 'What are the main differences between nuclear fission and nuclear fusion?',
//         expected_output: 'Fission is the splitting of a large, unstable nucleus into smaller nuclei, while fusion is the process where two light nuclei combine together, releasing vast amounts of energy. Fission is used in current nuclear power plants, while fusion is a technology still in development.',
//         modelOutputs: {
//             'Model-Alpha': 'Fission splits big atoms, fusion joins small atoms. Fission is used now for power, fusion is for the future.',
//             'Model-Beta': 'Nuclear fission involves splitting a heavy atomic nucleus, releasing energy. Nuclear fusion is the combining of light nuclei to form a heavier nucleus, which releases significantly more energy. Fission is commercially viable; fusion is not yet.',
//             'Claude 3.5 Sonnet': 'The primary difference lies in the process: **Fission** is the **splitting** of a single heavy, unstable atomic nucleus (like Uranium-235) into two or more lighter nuclei. **Fusion**, conversely, is the **combining** of two light atomic nuclei (like hydrogen isotopes) to form a single heavier nucleus. While both release enormous amounts of energy, fusion releases substantially more and produces less long-lived radioactive waste.',
//             'Nova-Lite': 'Fission splits atoms. Fusion joins atoms. Fission is used in power plants. Fusion is experimental.',
//             'Claude 3 Sonnet': 'Nuclear fission is the process of splitting a large atomic nucleus into smaller ones, which is the principle behind current nuclear reactors. Nuclear fusion is the process of combining two or more light atomic nuclei to form a heavier one, releasing immense energy, a process that powers the sun and is being researched for future power generation.',
//             'Llama 4': 'Fission splits a heavy nucleus; fusion merges light nuclei. Fission powers today\'s reactors. Fusion is the future, powering stars.',
//             'Nova Pro': 'Nuclear Fission: Splits a large atomic nucleus. Commercially used today. Nuclear Fusion: Combines two or more light nuclei. Experimental, but offers more energy with less waste.',
//         }
//     }
// ];

// export const mockBots: Bot[] = [
//   {
//     _id: "1234567890abcdef12345678",
//     bot_title: 'ChatBot Assistant 1',
//     bot_description: 'This is bot number 1, designed to assist with customer queries and provide automated support. It ...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=1',
//     sync_status: 'Available',
//     version: 'v1.0.0',
//     lastUpdated: '01/07/2025',
//     platform: 'Web & Mobile',
//     tags: ['customer-support', 'tier-1', 'experimental', 'sales', 'marketing'],
//   },
//   {
//     id: 2,
//     name: 'Content Creator Pro',
//     description: 'Generates high-quality marketing copy, blog posts, and social media updates. Specialized in SEO...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=2',
//     status: 'Available',
//     version: 'v2.1.0',
//     lastUpdated: '25/06/2025',
//     platform: 'Web',
//     tags: ['marketing', 'content-creation', 'seo'],
//   },
//   {
//     id: 3,
//     name: 'Data Analyst Bot',
//     description: 'Helps with data queries and generates quick summaries from large datasets. Integrates with SQL...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=3',
//     status: 'ahas',
//     version: 'v0.5.0',
//     lastUpdated: '15/07/2025',
//     platform: 'Internal',
//     tags: ['analytics', 'data', 'beta'],
//   },
//   {
//     id: 4,
//     name: 'Sales Outreach Helper',
//     description: 'Automates initial contact with potential leads and schedules follow-up meetings. Connects to CRM...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=4',
//     status: 'ashah',
//     version: 'v1.2.1',
//     lastUpdated: '10/07/2025',
//     platform: 'Web & Mobile',
//     tags: ['sales', 'automation', 'crm'],
//   },
//   {
//     id: 5,
//     name: 'HR Policy Advisor',
//     description: 'Answers common questions about company policies, benefits, and HR procedures, available 24/7...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=5',
//     status: 'asfa',
//     version: 'v1.0.0',
//     lastUpdated: '01/01/2025',
//     platform: 'Internal',
//     tags: ['hr', 'internal', 'policy'],
//   },
//   {
//     id: 6,
//     name: 'Code Review Assistant',
//     description: 'Automatically reviews pull requests for style, best practices, and common errors. Supports multiple languages...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=6',
//     status: 'asdcsa',
//     version: 'v3.0.0',
//     lastUpdated: '20/07/2025',
//     platform: 'GitHub',
//     tags: ['devops', 'engineering', 'code-quality', 'ci/cd'],
//   },
//     {
//     id: 7,
//     name: 'Social Media Manager',
//     description: 'Schedules posts across multiple platforms and analyzes engagement metrics to optimize content strategy...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=7',
//     status: 'sdgav',
//     version: 'v1.8.0',
//     lastUpdated: '18/07/2025',
//     platform: 'Web',
//     tags: ['social-media', 'marketing', 'analytics'],
//   },
//   {
//     id: 8,
//     name: 'Research Gatherer',
//     description: 'Gathers and summarizes information from academic journals, news articles, and web sources on any topic...',
//     avatarUrl: 'https://i.pravatar.cc/150?img=8',
//     status: 'afava',
//     version: 'v0.2.0',
//     lastUpdated: '21/07/2025',
//     platform: 'Web',
//     tags: ['research', 'academic', 'summary'],
//   },
// ];

// export const mockModels: Model[] = [
//     { id: 'model-alpha', name: 'Model-Alpha', provider: 'Custom AI', description: 'Balanced performance and speed.' },
//     { id: 'model-beta', name: 'Model-Beta', provider: 'Custom AI', description: 'Optimized for speed and low latency.' },
//     { id: 'model-gamma', name: 'Model-Gamma', provider: 'Custom AI', description: 'Legacy model with high stability.' },
//     { id: 'model-delta', name: 'Model-Delta', provider: 'Custom AI', description: 'Highest quality model for complex reasoning.' },
//     { id: 'claude-3.5-sonnet-v2', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Our most intelligent model, balancing speed and performance.' },
//     { id: 'nova-lite-aws', name: 'Nova-Lite', provider: 'AWS', description: 'A lightweight and fast model for general tasks from Amazon.' },
//     { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', description: 'Ideal balance of intelligence and speed for enterprise workloads.' },
//     { id: 'llama-4-maverick-17b', name: 'Llama 4', provider: 'Meta', description: 'The latest powerful and instruct-tuned model from Meta.' },
//     { id: 'nova-pro-aws', name: 'Nova Pro', provider: 'AWS', description: 'The most powerful Nova model for complex problem-solving from Amazon.' },
// ];

// // Simple string statuses used by the mock data
// const allPromptStatuses = ['Published', 'Draft', 'Archived'];

// const promptTemplates = {
//     'Customer Service': `You are a helpful AI assistant for {{agent_name}}. The user is asking for help with an order. Their order number is {{order_id}}. Politely address their query: "{{user_query}}". Provide a clear, concise, and friendly answer.`,
//     'Content Generation': `Generate a short, engaging blog post about {{topic}}. The tone should be optimistic and informative. The target audience is {{audience}}. Include a call to action at the end to "Learn More".`,
//     'Data Analysis': `Analyze the following dataset and provide a summary of key trends. Dataset: {{dataset}}. Focus on month-over-month growth and any significant anomalies. Present the findings as a short, bulleted list.`
// };

// export const mockPrompts: Prompt[] = Array.from({ length: 27 }, (_, i) => {
//     const promptType = ['Customer Service', 'Content Generation', 'Data Analysis'][i % 3] as keyof typeof promptTemplates;
//     const promptName = `Prompt ${i + 1} - ${promptType}`;
    
//     const currentVersionNum = (i % 4) + 1; // v1.1 to v1.4
//     const versions: PromptVersion[] = [];
    
//     for (let j = currentVersionNum - 1; j >= 1; j--) {
//         versions.push({
//             version: `v1.${j}`,
//             status: j < 2 ? PromptStatus.Archived : PromptStatus.Published,
//             lastModified: `Jun ${10 + j}, 2025`,
//             description: `This is a past description for v1.${j}.`,
//             content: `This is the historical prompt content for version v1.${j} of "${promptName}". It's an older iteration. It mentioned the topic {{topic_v${j}}}.`
//         });
//     }

//     const currentStatus = allPromptStatuses[i % allPromptStatuses.length];
//     const currentVersion = `v1.${currentVersionNum}`;
//     const lastModified = `Jul ${27 - i}, 2025`;
//     const description = `This is a detailed description for prompt example number ${i + 1}, which handles ${promptType}.`;
//     const content = promptTemplates[promptType];

//     return {
//         id: i + 1,
//         name: promptName,
//         description,
//         content,
//         status: currentStatus,
//         version: currentVersion,
//         agent: mockBots[i % mockBots.length].name,
//         lastModified,
//         versions,
//     };
// });


// const allKbStatuses = [KnowledgeBaseStatus.Active, KnowledgeBaseStatus.Indexing, KnowledgeBaseStatus.Archived];
// const allSourceTypes: ('File Upload' | 'Web URL' | 'Database')[] = ['File Upload', 'Web URL', 'Database'];

// export const mockKnowledgeBaseItems: KnowledgeBaseItem[] = Array.from({ length: 15 }, (_, i) => {
//     let sourceTypes: ('File Upload' | 'Web URL' | 'Database')[] = [];
//     const mod = i % 6;
//     let urls: string[] | undefined = undefined;

//     if (mod === 0) {
//         sourceTypes = [allSourceTypes[0]]; // File Upload
//     } else if (mod === 1) {
//         sourceTypes = [allSourceTypes[1]]; // Web URL
//         urls = [`https://site-${i}.com/faq`, `https://site-${i}.com/about`, `https://site-${i}.com/contact`];
//     } else if (mod === 2) {
//         sourceTypes = [allSourceTypes[0], allSourceTypes[1]]; // File Upload, Web URL
//         urls = [`https://docs.company-${i}.dev/guides`, `https://docs.company-${i}.dev/api/v2`];
//     } else if (mod === 3) {
//         sourceTypes = [allSourceTypes[2]]; // Database
//     } else if (mod === 4) {
//         sourceTypes = [allSourceTypes[1], allSourceTypes[2]]; // Web URL, Database
//         urls = [`https://support.forum-${i}.org/`];
//     } else {
//         sourceTypes = [allSourceTypes[0], allSourceTypes[1], allSourceTypes[2]]; // All three
//         urls = [`https://everything-${i}.com/`, `https://everything-${i}.com/legal`, `https://everything-${i}.com/terms`, `https://everything-${i}.com/privacy`];
//     }
    
//     return {
//       id: i + 1,
//       name: `KB Source ${i + 1} - ${['Product Docs', 'FAQ Pages', 'Internal Policies', 'API Specs', 'User Guides', 'Legal Agreements'][i % 6]}`,
//       description: `Contains documents related to ${['product specifications', 'customer questions', 'company guidelines', 'API endpoints', 'user workflows', 'terms of service'][i % 6]}.`,
//       status: allKbStatuses[i % allKbStatuses.length],
//       sourceType: sourceTypes,
//       lastModified: `Jul ${15 - i}, 2025`,
//       fileCount: Math.floor(Math.random() * 50) + 1,
//       attachedBotCount: i % 3 === 0 ? Math.floor(Math.random() * 3) + 1 : 0,
//       urls: urls,
//     };
// });

// export const mockToolsData: Tool[] = [
//   { id: 1, name: 'Query_Knowledge_Base', description: 'Performs a semantic search on a specified knowledge base.', category: 'AI & Machine Learning', version: 'v1.2.0', lastModified: 'Jul 28, 2025' },
//   { id: 2, name: 'Get_Object_From_Storage', description: 'Retrieves a specific object or file from a cloud storage bucket.', category: 'Storage', version: 'v1.0.1', lastModified: 'Jul 25, 2025' },
//   { id: 3, name: 'List_Stored_Objects', description: 'Lists all objects within a specified path in a cloud storage bucket.', category: 'Storage', version: 'v1.1.0', lastModified: 'Jul 22, 2025' },
//   { id: 4, name: 'Send_Email', description: 'Sends an email to a specified recipient with a subject and body.', category: 'Communication', version: 'v2.0.0', lastModified: 'Jul 20, 2025' },
//   { id: 5, name: 'Query_Database', description: 'Executes a read-only SQL query against a connected database.', category: 'Data & Analytics', version: 'v1.5.0', lastModified: 'Jul 18, 2025' },
//   { id: 6, name: 'Generate_Text_To_SQL', description: 'Converts a natural language query into an executable SQL query.', category: 'AI & Machine Learning', version: 'v0.8.0', lastModified: 'Jul 15, 2025' },
//   { id: 7, name: 'Create_Calendar_Event', description: 'Adds a new event to a specified user\'s calendar.', category: 'Communication', version: 'v1.1.0', lastModified: 'Jul 14, 2025' },
//   { id: 8, name: 'Update_CRM_Record', description: 'Updates a customer record in the connected CRM system.', category: 'Data & Analytics', version: 'v2.3.0', lastModified: 'Jul 12, 2025' },
//   { id: 9, name: 'File_Parser', description: 'Extracts text and metadata from PDF, DOCX, and TXT files.', category: 'Custom', version: 'v1.0.0', lastModified: 'Jul 11, 2025' },
//   { id: 10, name: 'Web_Scraper', description: 'Scrapes content from a specified URL.', category: 'Custom', version: 'v0.5.0', lastModified: 'Jul 10, 2025' },
//   { id: 11, name: 'Image_Generator', description: 'Generates an image based on a textual description.', category: 'AI & Machine Learning', version: 'v1.0.0', lastModified: 'Jul 08, 2025' },
//   { id: 12, name: 'Sentiment_Analysis', description: 'Analyzes a piece of text to determine if its sentiment is positive, negative, or neutral.', category: 'AI & Machine Learning', version: 'v1.4.0', lastModified: 'Jul 05, 2025' },
//   { id: 13, name: 'Summarize_Text', description: 'Creates a concise summary of a long piece of text.', category: 'AI & Machine Learning', version: 'v2.1.0', lastModified: 'Jul 02, 2025' },
//   { id: 14, name: 'Translate_Text', description: 'Translates text from one language to another.', category: 'AI & Machine Learning', version: 'v1.8.0', lastModified: 'Jul 01, 2025' },
//   { id: 15, name: 'Put_Object_To_Storage', description: 'Uploads a file or object to a cloud storage bucket.', category: 'Storage', version: 'v1.0.2', lastModified: 'Jun 30, 2025' },
// ];

// const feedbackCategories: AgentFeedback['category'][] = ['Factually Incorrect', 'Partially Followed', 'Others'];
// const feedbackUsers = ['Peter Parker', 'Tony Stark', 'Bruce Wayne', 'Diana Prince', 'Clark Kent'];

// export const mockAgentFeedback: AgentFeedback[] = Array.from({ length: 35 }, (_, i) => {
//     const agent = mockBots[i % mockBots.length];
//     return {
//         id: i + 1,
//         createdOn: `2025-07-${String(30 - i).padStart(2, '0')}`,
//         feedbackBy: feedbackUsers[i % feedbackUsers.length],
//         agentName: agent.name,
//         agentId: agent.id,
//         vote: i % 3 === 0 ? 'down' : 'up',
//         category: feedbackCategories[i % feedbackCategories.length],
//         comment: i % 4 === 0 ? `This is a short comment.` : `This is a longer comment to test text wrapping and display. The agent's response was not what I expected and I think it could be improved by providing more context about the initial query. It failed to understand the nuance of my request regarding the Q3 financial projections.`
//     };
// });

// export const mockEvaluationMetrics: EvaluationMetric[] = [
//     { id: 1, name: 'Pass Rate', description: 'Measures the factual correctness of responses.' },
//     { id: 2, name: 'Latency', description: 'Measures the response time in seconds. Lower is better.' },
//     { id: 3, name: 'Quality Score', description: 'A holistic score for response quality.' },
//     { id: 4, name: 'Toxicity Score', description: 'Scores the level of toxic content in responses. Lower is better.' },
//     { id: 5, name: 'Readability Score', description: 'Evaluates if the response is easy to read and understand.' },
//     { id: 6, name: 'Hallucination Rate', description: 'Measures how often the model generates non-factual information.' },
// ];

// const evaluationTemplates: { name: string; description: string; combinations: EvaluationCombination[] }[] = [
//     {
//         name: 'Primary Model Comparison',
//         description: 'Comparing the main models across all key performance indicators.',
//         combinations: [
//             { id: 1, agentId: 1, promptId: 1, promptVersion: 'v1.4', modelId: 'model-alpha' },
//             { id: 2, agentId: 1, promptId: 1, promptVersion: 'v1.4', modelId: 'model-beta' },
//             { id: 10, agentId: 1, promptId: 1, promptVersion: 'v1.4', modelId: 'claude-3.5-sonnet-v2' },
//             { id: 11, agentId: 1, promptId: 1, promptVersion: 'v1.4', modelId: 'nova-lite-aws' },
//             { id: 13, agentId: 1, promptId: 1, promptVersion: 'v1.4', modelId: 'claude-3-sonnet' },
//             { id: 14, agentId: 1, promptId: 1, promptVersion: 'v1.4', modelId: 'llama-4-maverick-17b' },
//             { id: 15, agentId: 1, promptId: 1, promptVersion: 'v1.4', modelId: 'nova-pro-aws' },
//         ],
//     },
//     {
//         name: 'Hallucination Check',
//         description: 'Checking for hallucinations in Content Creator Pro on various prompts.',
//         combinations: [
//             { id: 5, agentId: 2, promptId: 2, promptVersion: 'v1.3', modelId: 'claude-3-sonnet' },
//             { id: 6, agentId: 2, promptId: 5, promptVersion: 'v1.1', modelId: 'claude-3-sonnet' },
//         ],
//     },
//     {
//         name: 'Toxicity Analysis',
//         description: 'Evaluating multiple agents for toxic output generation.',
//         combinations: [
//             { id: 7, agentId: 4, promptId: 1, promptVersion: 'v1.4', modelId: 'claude-3.5-sonnet-v2' },
//             { id: 8, agentId: 6, promptId: 7, promptVersion: 'v1.2', modelId: 'nova-pro-aws' },
//             { id: 9, agentId: 7, promptId: 8, promptVersion: 'v1.1', modelId: 'claude-3.5-sonnet-v2' },
//         ],
//     },
// ];

// export const mockEvaluations: Evaluation[] = Array.from({ length: 18 }, (_, i) => {
//     const template = evaluationTemplates[i % evaluationTemplates.length];
//     const statuses = [EvaluationStatus.Completed, EvaluationStatus.InProgress, EvaluationStatus.Submitted];
//     const currentStatus = (i === 0 || i === 1) ? EvaluationStatus.Completed : statuses[i % statuses.length];

//     const runs: EvaluationRun[] = [];
//     // Always create at least one run, even for Submitted status, to show history
//     const runCount = 1; // You can make this dynamic if you want more runs per evaluation

//     for (let j = 0; j < runCount; j++) {
//         let runCombinations: EvaluationRunCombination[] = [];
//         let runOverallStatus: EvaluationRunCombinationStatus;
//         let runProgress: number;
//         let runSubmittedDate: string;
//         let runCompletedDate: string | null;

//         // Determine dates based on current loop index to make them seem somewhat chronological
//         const now = new Date();
//         const daysAgo = (i * 2) + (j * 5); // Make older evaluations have older dates
//         const submittedAt = new Date(now.setDate(now.getDate() - daysAgo));
//         runSubmittedDate = getRandomDate(submittedAt, new Date()); // Submitted 'recently' relative to current evaluation

//         if (currentStatus === EvaluationStatus.Submitted) {
//             // For 'Submitted' evaluations, the run is just submitted, no completion date
//             runOverallStatus = 'Submitted';
//             runProgress = 0;
//             runCompletedDate = null;
//             runCombinations = template.combinations.map(combo => ({
//                 combinationId: combo.id,
//                 status: 'Submitted', // Individual combinations are also submitted
//                 progress: 0,
//                 score: null,
//                 metricScores: undefined,
//                 summary: null,
//                 input: `Initial prompt for ${combo.modelId}`,
//                 output: null,
//                 expected_output: null,
//             }));
//         } else if (currentStatus === EvaluationStatus.InProgress) {
//             // For 'In Progress' evaluations, the run is in progress, no completion date yet
//             runOverallStatus = 'In Progress';
//             runProgress = parseFloat((Math.random() * 80 + 10).toFixed(0)); // Random progress
//             runCompletedDate = null;
//             runCombinations = template.combinations.map(combo => ({
//                 combinationId: combo.id,
//                 status: 'In Progress',
//                 progress: parseFloat((Math.random() * 80 + 10).toFixed(0)),
//                 score: null,
//                 metricScores: undefined,
//                 summary: null,
//                 input: `Working on: ${combo.modelId} response.`,
//                 output: null,
//                 expected_output: null,
//             }));
//         } else { // EvaluationStatus.Completed
//             runOverallStatus = 'Completed';
//             runProgress = 100;
//             // Completed date is after submitted date
//             runCompletedDate = getRandomDate(submittedAt, new Date()); 

//             if (i === 0) { // Special case for "Primary Model Comparison" evaluation 1 (first item)
//                 runCombinations = [];
//                 evaluationDataset.forEach((datasetItem) => {
//                     template.combinations.forEach(combo => {
//                         const model = mockModels.find(m => m.id === combo.modelId)!;
//                         const modelOutput = (datasetItem.modelOutputs as any)[model.name] || 'No output generated for this model.';

//                         let scores: { metricId: number; score: number }[] = [];
//                         let overallScore = 0;

//                         switch(combo.modelId) {
//                             case 'model-alpha':
//                                 overallScore = 88.0;
//                                 scores = [{ metricId: 1, score: 88.0 }, { metricId: 2, score: 0.8 }, { metricId: 3, score: 8.5 }, { metricId: 4, score: 2.1 }, { metricId: 5, score: 78.0 }];
//                                 break;
//                             case 'model-beta':
//                                 overallScore = 85.0;
//                                 scores = [{ metricId: 1, score: 85.0 }, { metricId: 2, score: 0.65 }, { metricId: 3, score: 8.2 }, { metricId: 4, score: 2.5 }, { metricId: 5, score: 80.0 }];
//                                 break;
//                             case 'claude-3.5-sonnet-v2':
//                                 overallScore = 98.0;
//                                 scores = [{ metricId: 1, score: 98.0 }, { metricId: 2, score: 0.9 }, { metricId: 3, score: 9.6 }, { metricId: 4, score: 1.2 }, { metricId: 5, score: 92.0 }];
//                                 break;
//                             case 'nova-lite-aws':
//                                 overallScore = 82.0;
//                                 scores = [{ metricId: 1, score: 82.0 }, { metricId: 2, score: 0.5 }, { metricId: 3, score: 8.0 }, { metricId: 4, score: 3.1 }, { metricId: 5, score: 85.0 }];
//                                 break;
//                             case 'claude-3-sonnet':
//                                 overallScore = 96.0;
//                                 scores = [{ metricId: 1, score: 96.0 }, { metricId: 2, score: 0.85 }, { metricId: 3, score: 9.4 }, { metricId: 4, score: 1.4 }, { metricId: 5, score: 90.0 }];
//                                 break;
//                             case 'llama-4-maverick-17b':
//                                 overallScore = 95.0;
//                                 scores = [{ metricId: 1, score: 95.0 }, { metricId: 2, score: 1.1 }, { metricId: 3, score: 9.2 }, { metricId: 4, score: 1.8 }, { metricId: 5, score: 88.0 }];
//                                 break;
//                             case 'nova-pro-aws':
//                                 overallScore = 97.0;
//                                 scores = [{ metricId: 1, score: 97.0 }, { metricId: 2, score: 1.3 }, { metricId: 3, score: 9.5 }, { metricId: 4, score: 1.5 }, { metricId: 5, score: 91.0 }];
//                                 break;
//                             default:
//                                 overallScore = parseFloat((Math.random() * 20 + 75).toFixed(2));
//                                 scores = [{ metricId: 1, score: overallScore }];
//                         }

//                         runCombinations.push({
//                             combinationId: combo.id,
//                             status: 'Completed',
//                             progress: 100,
//                             score: overallScore,
//                             metricScores: scores,
//                             summary: `Response was reasonably accurate.`,
//                             input: datasetItem.input,
//                             output: modelOutput,
//                             expected_output: datasetItem.expected_output,
//                         });
//                     });
//                 });
//             } else { // Generic data for other COMPLETED evaluations
//                 runCombinations = template.combinations.map(combo => {
//                     const metricGenerators = {
//                         'Pass Rate': () => parseFloat((Math.random() * 15 + 83).toFixed(2)),
//                         'Latency': () => parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)),
//                         'Quality Score': () => parseFloat((Math.random() * 1.5 + 8.2).toFixed(2)),
//                         'Toxicity Score': () => parseFloat((Math.random() * 8).toFixed(2)),
//                         'Readability Score': () => parseFloat((Math.random() * 20 + 75).toFixed(2)),
//                         'Hallucination Rate': () => parseFloat((Math.random() * 5).toFixed(2)),
//                     };

//                     const metricScores = mockEvaluationMetrics.map(metric => ({
//                         metricId: metric.id,
//                         score: (metricGenerators[metric.name as keyof typeof metricGenerators] || (() => 0))()
//                     }));
//                     const overallScore = parseFloat((metricScores.find(ms => ms.metricId === 1)?.score || 0).toFixed(2));

//                     return {
//                         combinationId: combo.id,
//                         status: 'Completed',
//                         progress: 100,
//                         score: overallScore,
//                         metricScores,
//                         summary: `Response was ${overallScore > 90 ? 'highly' : 'moderately'} accurate.`,
//                         input: `What were the key takeaways from the Q2 2025 financial report?`,
//                         output: `The key takeaways from the Q2 2025 financial report are a 15% increase in revenue year-over-year, a 5% decrease in operating costs, and a strong performance in the North American market.`,
//                         expected_output: `The report highlights a 15% YoY revenue growth, a 5% reduction in operating costs, and market leadership in North America.`
//                     };
//                 });
//             }
//         }
        
//         runs.push({
//             runId: `run-${i + 1}-${j + 1}`,
//             status: runOverallStatus,
//             // date: `Jul ${25 - (i * 2) - j * 5}, 2025`, // Remove this old 'date' field
//             submittedDate: runSubmittedDate, // Use the newly generated submitted date
//             completedDate: runCompletedDate, // Use the newly generated completed date
//             overallReport: `The evaluation showed that Model A consistently outperformed Model B in factual accuracy, with an average score of ${runCombinations.reduce((acc, c) => acc + (c.score || 0), 0) / (runCombinations.length || 1)}%. Model B, however, was slightly better at maintaining a conversational tone.`,
//             progress: runProgress, // Use the run's overall progress
//             runCombinations,
//         });
//     }

//     return {
//         id: i + 1,
//         name: i === 0 ? "Primary Model Comparison" : `Eval ${i + 1} - ${template.name}`,
//         description: template.description,
//         status: currentStatus,
//         lastRun: currentStatus === EvaluationStatus.Submitted ? 'N/A' : (runs[0]?.completedDate || runs[0]?.submittedDate || 'N/A'), // Use completedDate or submittedDate for lastRun
//         combinations: template.combinations,
//         // Sort runs by submittedDate to ensure newest is first for 'lastRun' consistency
//         runs: runs.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()),
//     };
// });