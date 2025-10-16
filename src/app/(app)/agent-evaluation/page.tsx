'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AiStudioSidebar from '@/components/ai_studio/AiStudioSidebar';
import AiStudioSectionHeader from '@/components/ai_studio/AiStudioSectionHeader';
import EvaluationResultsList from '@/components/Agent_Evaluation/EvaluationResultsList'; // Your list component
import { Evaluation, EvaluationRun } from '../../../../types';

export default function AgentEvaluationListPage() {
  const router = useRouter();

  const handleNavigateToCreate = () => {
    router.push('/ai-studio/agent-evaluation/create');
  };

  const handleViewResult = (evaluation: Evaluation, run: EvaluationRun) => {
    // Construct the URL using query parameters for the static 'View_Report' page
    const url = `/agent-evaluation/View_Report?evaluationId=${evaluation.id}&runId=${run.runId}`;
    console.log(`Navigating to report URL: ${url}`);
    router.push(url);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <AiStudioSectionHeader
        title="Lens Creation"
        subtitle="Manage, Edit, Create Lens "
        onNavigateHome={() => router.push('/ai-studio')}
      />
      <div className="flex flex-1 overflow-hidden">
        <AiStudioSidebar activeNav="agentEvaluation" setActiveNav={() => {}} />
        <div className="flex-1 flex flex-col bg-sidebar overflow-hidden h-full">
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              <EvaluationResultsList
              />
            </div>
          </main>
        </div>
      </div>
      <footer className="w-full p-2 sm:p-2 border-t border-border bg-sidebar text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Axcess.io. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AiStudioSidebar from '@/components/ai_studio/AiStudioSidebar';
// import AiStudioSectionHeader from '@/components/ai_studio/AiStudioSectionHeader';
// import EvaluationResultsList from '@/components/Agent_Evaluation/EvaluationResultsList';

// export default function AgentEvaluationPage() {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState('');

//   return (
//     <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
//       {/* Full Width Header */}
//       <AiStudioSectionHeader
//         title="Agent Evaluation"
//         subtitle="Evaluate and assess agent performance metrics."
//         onNavigateHome={() => router.push('/ai-studio')}
//       />

//       {/* Middle Content with Sidebar */}

//       <div className="flex flex-1 overflow-hidden">
//         <AiStudioSidebar activeNav="agentEvaluation" setActiveNav={() => {}} />
//         <div className="flex-1 flex flex-col bg-sidebar overflow-hidden h-full">
//           <main className="flex-1 overflow-y-auto">
//             <div className="p-8">
//               <EvaluationResultsList />
//             </div>
//           </main>
//         </div>
//       </div>


//       {/* Middle Content with Sidebar
//       <div className="flex flex-1 overflow-hidden">
//         <AiStudioSidebar activeNav="agentEvaluation" setActiveNav={() => {}} />
//         <div className="flex-1 flex flex-col bg-sidebar overflow-hidden h-full">
//           <main className="flex-1 overflow-y-auto">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
              
//             {/* Search and Create Section

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//                 <div className="relative flex-1">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="search"
//                     placeholder="Search evaluations by agent, metric, or date..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full h-12 pl-12 pr-4 py-3 rounded-lg shadow-sm border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base"
//                   />
//                 </div>
//                 <button
//                   onClick={() => console.log('../components/Agent_Evaluation/Create_Evaluation_Flow')}
//                   className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 transition-colors duration-200 font-medium whitespace-nowrap"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Create Evaluation
//                 </button>
//               </div>

//               {/* ListView

//               <div className="flex-1 flex flex-col bg-sidebar overflow-hidden h-full">
//                 <main className="flex-1 overflow-y-auto px-6 pt-6 space-y-6">
//                   <EvaluationResultsList />
//                 </main>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>*}

      
//       {/* Full Width Footer */}
//       <footer className="w-full p-2 sm:p-2 border-t border-border bg-sidebar text-center text-sm text-muted-foreground">
//         <p>&copy; {new Date().getFullYear()} Axcess.io. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }