// import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
// import { Evaluation, EvaluationStatus, EvaluationRun } from '../../../types';
// import { SearchIcon, PlusIcon, MoreIcon, ChevronDownIcon, EvaluationIcon, EditIcon } from '../../../constants';
// import { mockEvaluations } from './evaluation_data'; 
// import { StatusBadge } from '@/components/Agent_Evaluation/Status_Badge';
// import RunHistory from './Run_History';

// // EvaluationItem Component
// const EvaluationItem: React.FC<{
//   evaluation: Evaluation;
//   isExpanded: boolean;
//   onToggleExpand: () => void;
//   // This onViewResult prop for EvaluationItem now matches what EvaluationResultsList expects
//   onViewResult: (evaluation: Evaluation, run: EvaluationRun) => void; 
//   onReRunEvaluation: (evaluationId: number) => void;
// }> = ({ evaluation, isExpanded, onToggleExpand, onViewResult, onReRunEvaluation }) => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const menuRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//                 setIsMenuOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const handleReRunClick = () => {
//         setIsMenuOpen(false);
//         onReRunEvaluation(evaluation.id);
//     };

//     return (
//     <div className="border-b border-gray-200 last:border-b-0">
//         <div className="grid grid-cols-12 gap-4 items-center py-4 px-4 hover:bg-gray-50">
//             <div className="col-span-1 flex justify-center">
//                 <button
//                     onClick={onToggleExpand}
//                     className="p-1 rounded-full hover:bg-gray-200"
//                     aria-expanded={isExpanded}
//                     aria-controls={`eval-history-${evaluation.id}`}
//                 >
//                     <ChevronDownIcon
//                         className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
//                     />
//                 </button>
//             </div>
//             <div className="col-span-11 md:col-span-5 flex items-center">
//                 <EvaluationIcon className="w-6 h-6 mr-3 text-gray-400 flex-shrink-0" />
//                 <div className="min-w-0">
//                     <p className="font-semibold text-brand-primary truncate" title={evaluation.name}>{evaluation.name}</p>
//                     <p className="text-sm text-brand-secondary" title={evaluation.description}>{evaluation.description}</p>
//                 </div>
//             </div>
//             <div className="col-span-4 md:col-span-2 flex justify-center">
//                 <StatusBadge status={evaluation.status} />
//             </div>
//             <div className="col-span-4 md:col-span-2 text-brand-secondary text-sm text-center">
//                 {evaluation.combinations.length}
//             </div>
//             <div className="col-span-4 md:col-span-1 text-brand-secondary text-sm">{evaluation.lastRun}</div>
//             <div className="col-span-6 md:col-span-1 flex justify-end">
//                 <div className="relative" ref={menuRef}>
//                     <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
//                         <MoreIcon className="w-5 h-5" />
//                     </button>
//                     {isMenuOpen && (
//                         <div className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20">
//                             <button
//                                 onClick={handleReRunClick}
//                                 className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             >
//                                 <EditIcon className="w-4 h-4 mr-3 text-gray-500" />
//                                 <span>Re-run Evaluation</span>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//         {isExpanded && (
//             <div id={`eval-history-${evaluation.id}`} className="px-6 py-4 bg-white border-t border-gray-200">
//                 <RunHistory
//                     evaluation={evaluation}
//                     // This calls the onViewResult prop, passing both evaluation and run
//                     onViewResult={(run) => onViewResult(evaluation, run)} 
//                 />
//             </div>
//         )}
//     </div>
//     );
// };

// // PaginationControls Component
// const PaginationControls: React.FC<{
//     currentPage: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
//     totalResults: number;
//     itemsPerPage: number;
// }> = ({ currentPage, totalPages, onPageChange, totalResults, itemsPerPage }) => {
//     if (totalPages <= 1) return null;

//     const firstItem = (currentPage - 1) * itemsPerPage + 1;
//     const lastItem = Math.min(currentPage * itemsPerPage, totalResults);

//     return (
//         <div className="p-4 flex items-center justify-between border-t border-gray-200 text-sm text-gray-700 bg-gray-50/50 rounded-b-xl">
//             <div>
//                 Showing <span className="font-semibold text-gray-900">{firstItem}</span> to <span className="font-semibold text-gray-900">{lastItem}</span> of <span className="font-semibold text-gray-900">{totalResults}</span> results
//             </div>
//             <div className="inline-flex items-center -space-x-px">
//                 <button
//                     onClick={() => onPageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     aria-label="Previous page"
//                 >
//                     Previous
//                 </button>
//                 <button
//                     onClick={() => onPageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     aria-label="Next page"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// // --- Main EvaluationResultsList Component ---
// export const EvaluationResultsList: React.FC<{
//     onNavigateToCreate: () => void;
//     // This is the prop type EvaluationResultsList expects from its parent
//     onViewResult: (evaluation: Evaluation, run: EvaluationRun) => void;
// }> = ({ onNavigateToCreate, onViewResult }) => {
//     const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortBy, setSortBy] = useState('modified_desc');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [expandedEvalId, setExpandedEvalId] = useState<number | null>(null);

//     const itemsPerPage = 10;

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1);
//     };

//     const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSortBy(e.target.value);
//         setCurrentPage(1);
//     };

//     const handleReRunEvaluation = useCallback((evaluationId: number) => {
//         console.log(`Re-running evaluation with ID: ${evaluationId}`);
//         setEvaluations(prevEvals =>
//             prevEvals.map(evalItem =>
//                 evalItem.id === evaluationId
//                     ? { ...evalItem, status: EvaluationStatus.Submitted, lastRun: 'Pending...' }
//                     : evalItem
//             )
//         );
//     }, []);

//     const filteredEvaluations = useMemo(() => {
//         return evaluations.filter(e =>
//             e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             e.description.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [evaluations, searchTerm]);

//     const sortedEvaluations = useMemo(() => {
//         const sortable = [...filteredEvaluations];

//         const parseDate = (dateString: string) => {
//             if (dateString === 'N/A' || !dateString) return 0;
//             return new Date(dateString).getTime();
//         }

//         switch (sortBy) {
//             case 'name_asc':
//                 sortable.sort((a, b) => a.name.localeCompare(b.name));
//                 break;
//             case 'name_desc':
//                 sortable.sort((a, b) => b.name.localeCompare(a.name));
//                 break;
//             case 'status': {
//                 const statusOrder: { [key in EvaluationStatus]: number } = {
//                     [EvaluationStatus.InProgress]: 1,
//                     [EvaluationStatus.Submitted]: 2,
//                     [EvaluationStatus.Completed]: 3,
//                 };
//                 sortable.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
//                 break;
//             }
//             case 'modified_asc':
//                 sortable.sort((a, b) => parseDate(a.lastRun) - parseDate(b.lastRun));
//                 break;
//             case 'modified_desc':
//             default:
//                 sortable.sort((a, b) => parseDate(b.lastRun) - parseDate(a.lastRun));
//                 break;
//         }
//         return sortable;
//     }, [filteredEvaluations, sortBy]);

//     const totalPages = Math.ceil(sortedEvaluations.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentEvaluations = sortedEvaluations.slice(indexOfFirstItem, indexOfLastItem);

//     return (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//             <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center gap-4 flex-1 min-w-[300px]">
//                     <div className="relative flex-grow max-w-lg">
//                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search evaluations by name, agent, or description..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
//                         />
//                     </div>

//                     <div className="relative">
//                         <select
//                             value={sortBy}
//                             onChange={handleSortChange}
//                             className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition"
//                             aria-label="Sort evaluations"
//                         >
//                             <option value="modified_desc">Sort by: Newest</option>
//                             <option value="modified_asc">Sort by: Oldest</option>
//                             <option value="name_asc">Sort by: Name (A-Z)</option>
//                             <option value="name_desc">Sort by: Name (Z-A)</option>
//                             <option value="status">Sort by: Status</option>
//                         </select>
//                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                             <ChevronDownIcon className="w-5 h-5" />
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <button
//                         onClick={onNavigateToCreate}
//                         className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors whitespace-nowrap"
//                     >
//                         <PlusIcon className="w-5 h-5" />
//                         + Create Lens
//                     </button>
//                 </div>
//             </div>

//             <div className="hidden md:grid grid-cols-12 gap-4 py-4 px-4 bg-gray-50 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200">
//                 <div className="col-span-1"></div>
//                 <div className="col-span-5">Name</div>
//                 <div className="col-span-2 text-center">Status</div>
//                 <div className="col-span-2 text-center"># Combinations</div>
//                 <div className="col-span-1">Last Run</div>
//                 <div className="col-span-1 text-right">Actions</div>
//             </div>

//             <div>
//                 {currentEvaluations.length > 0 ? (
//                     currentEvaluations.map((evaluation) => (
//                         <EvaluationItem
//                             key={evaluation.id}
//                             evaluation={evaluation}
//                             isExpanded={expandedEvalId === evaluation.id}
//                             onToggleExpand={() =>
//                                 setExpandedEvalId(
//                                     expandedEvalId === evaluation.id ? null : evaluation.id
//                                 )
//                             }
//                             onViewResult={onViewResult} // Pass the navigation handler here
//                             onReRunEvaluation={handleReRunEvaluation}
//                         />
//                     ))
//                 ) : (
//                     <div className="text-center p-8 text-gray-500">
//                         No evaluations found matching your criteria.
//                     </div>
//                 )}
//             </div>

//             <PaginationControls
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={setCurrentPage}
//                 totalResults={sortedEvaluations.length}
//                 itemsPerPage={itemsPerPage}
//             />
//         </div>
//     );
// };

// export default EvaluationResultsList;


'use client';
import React, { useState, useRef, useEffect } from 'react';
import { DownloadIcon } from 'lucide-react';
import {
  SearchIcon,
  PlusIcon,
  MoreIcon,
  ChevronDownIcon,
} from '../../../constants';
import PlayIcon from '@/components/icons/PlayIcon';
import RunHistory from './Run_History';

const mockAssessments = [
  {
    id: 1,
    name: 'Primary Model Comparison',
    description:
      'Comparing the main models across all key performance indicators including precision, recall, and overall performance across various datasets.',
    category: 'Model Analysis',
    createdDate: '2025-10-01',
    updatedDate: '2025-10-13',
  },
  {
    id: 2,
    name: 'Customer Sentiment Evaluation',
    description:
      'Analyzing sentiment accuracy of customer interaction data and comparing multiple fine-tuned language models for consistency.',
    category: 'Customer Analytics',
    createdDate: '2025-09-28',
    updatedDate: '2025-10-12',
  },
  {
    id: 3,
    name: 'Data Bias Audit',
    description:
      'Identifying and quantifying potential data bias in demographic segments using fairness indicators and model bias scores.',
    category: 'Data Quality',
    createdDate: '2025-09-25',
    updatedDate: '2025-09-29',
  },
];

const handleDownloadCSV = () => {
  const headers = ['ID', 'Name', 'Description', 'Category', 'Created Date', 'Updated Date'];

  const rows = mockAssessments.map(a => [
    a.id,
    `"${a.name}"`,
    `"${a.description.replace(/"/g, '""')}"`, // Escape quotes
    a.category,
    a.createdDate,
    a.updatedDate,
  ]);

  const csvContent =
    headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'lenses.csv';
  a.click();
  URL.revokeObjectURL(url);
};

const ITEMS_PER_PAGE = 10;

const AssessmentItem: React.FC<{
  assessment: any;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onStart: (id: number) => void;
}> = ({ assessment, isExpanded, onToggleExpand, onStart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="grid grid-cols-12 gap-6 items-center py-4 px-4 hover:bg-gray-50 transition">
        <div className="col-span-1 flex justify-center">
          <button
            onClick={onToggleExpand}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-expanded={isExpanded}
          >
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Name & Description */}
        <div className="col-span-3 text-brand-primary">
          <p className="font-semibold">{assessment.name}</p>
          <p className="text-sm text-gray-500 mt-1 font-normal">
            {showFullDesc
              ? assessment.description
              : `${assessment.description.slice(0, 80)}${
                  assessment.description.length > 80 ? '...' : ''
                }`}
            {assessment.description.length > 80 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="ml-1 text-primary font-semibold text-xs hover:underline"
              >
                {showFullDesc ? 'See less' : 'See more'}
              </button>
            )}
          </p>
        </div>

        <div className="col-span-2 text-center text-gray-700 px-4">
          {assessment.category}
        </div>

        <div className="col-span-2 text-center text-gray-600">
          {assessment.createdDate}
        </div>
        <div className="col-span-2 text-center text-gray-600">
          {assessment.updatedDate}
        </div>

        <div
          className="col-span-1 flex justify-end items-center gap-1 relative pr-4"
          ref={menuRef}
        >
          <button
            onClick={() => onStart(assessment.id)}
            className="p-2 rounded-full hover:text-primary/90 text-primary"
            title="Start Assessment"
          >
            <PlayIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-900 hover:text-gray-800"
          >
            <MoreIcon className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Edit 
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Delete 
              </button>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="bg-gray-50 px-4 pb-4">
          <RunHistory />
        </div>
      )}
    </div>
  );
};

export default function AssessmentList() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const filtered = mockAssessments.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleStart = (id: number) => {
    window.location.href = '/agent-evaluation/start-assessment';
  };

  const handleCreate = () => {
    window.location.href = '/agent-evaluation/create-lens';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          <div className="relative flex-grow max-w-lg">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Lens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-lg leading-tight focus:ring-2 focus:ring-primary outline-none"
            >
              <option  value="newest">Sort by: Newest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="name">Sort by: Name</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDownIcon className="w-5 h-5" />
            </div>
          </div>
          
        </div>

        <div className="flex gap-2">
  <button
    onClick={handleDownloadCSV}
    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
  >
    <DownloadIcon className="w-5 h-5" /> Export
  </button>

  <button
    onClick={handleCreate}
    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
  >
    <PlusIcon className="w-5 h-5" /> Create Lens
  </button>
</div>

      </div>

      <div className="hidden md:grid grid-cols-12 gap-6 py-4 px-4 bg-gray-50 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200">
        <div className="col-span-1"></div>
        <div className="col-span-3">Lens Name</div>
        <div className="col-span-2 text-center px-4">Category</div>
        <div className="col-span-2 text-center">Created Date</div>
        <div className="col-span-2 text-center">Updated Date</div>
        <div className="col-span-1 text-right pr-4">Actions</div>
      </div>

      {paginated.map((a) => (
        <AssessmentItem
          key={a.id}
          assessment={a}
          isExpanded={expandedId === a.id}
          onToggleExpand={() =>
            setExpandedId(expandedId === a.id ? null : a.id)
          }
          onStart={handleStart}
        />
      ))}

      {/* Pagination Controls */}
      {/* Pagination Controls - Matches Screenshot Style */}
<div className="flex justify-between items-center p-4 border-t text-sm text-gray-600">
  <span>
    Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{' '}
    {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} results
  </span>

  <div className="flex items-center gap-2">
    <button
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      className={`px-4 py-2 rounded-md border ${
        page === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 text-gray-700'
      }`}
    >
      Previous
    </button>

    <button
      disabled={page === totalPages}
      onClick={() => setPage((p) => p + 1)}
      className={`px-4 py-2 rounded-md border ${
        page === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 text-gray-700'
      }`}
    >
      Next
    </button>
  </div>
</div>

      </div>
   
  );
}
