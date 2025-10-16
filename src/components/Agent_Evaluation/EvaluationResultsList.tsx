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

//crt code till the edit and delete with alert pop up code...


// evaluationresultlist.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DownloadIcon } from 'lucide-react';
import {
  SearchIcon,
  PlusIcon,
  MoreIcon,
  ChevronDownIcon,
} from '../../../constants';
import PlayIcon from '@/components/icons/PlayIcon';
import RunHistory from './Run_History';
import Papa from 'papaparse';
import { toast } from 'react-hot-toast';

// ITEMS PER PAGE
const ITEMS_PER_PAGE = 10;

interface Assessment {
  id: number | string;
  name: string;
  description: string;
  category: string;
  createdDate: string;
  updatedDate: string;
  created_at?: string;
  updated_at?: string;
}

// Props for item
interface AssessmentItemProps {
  assessment: Assessment;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onStart: (id: number | string) => void;
  onUpdateSuccess: () => void; // callback to refresh or re-fetch list
}

const categoryColors: Record<string, string> = {
  'Gen AI': 'bg-purple-100 text-purple-800 border-purple-200',
  'Network Security': 'bg-blue-100 text-blue-800 border-blue-200',
  'Cloud (AWS)': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'IOT': 'bg-red-100 text-red-800 border-red-200',
  'DevOps': 'bg-green-100 text-green-800 border-green-200',
  'Uncategorized': 'bg-gray-100 text-gray-700 border-gray-200',
};

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhlZTMyOGUyODI2NWM2OGJmNDVmMTllIiwiZW1haWwiOiJybmFnZXNoNjYwQGdtYWlsLmNvbSIsImV4cCI6MTc2MDYyNzYyMiwibmJmIjoxNzYwNjA5NjIyLCJpYXQiOjE3NjA2MDk2MjJ9.Hn1f6KcYsFfZnD_gI6VNchQy1301XdC1QWC5NwyIQc8';

const AssessmentItem: React.FC<AssessmentItemProps> = ({
  assessment,
  isExpanded,
  onToggleExpand,
  onStart,
  onUpdateSuccess,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categoryStyle =
    categoryColors[assessment.category] || categoryColors['Uncategorized'];

  const openEdit = () => {
    setIsMenuOpen(false);
    setIsEditOpen(true);
  };
  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const openDelete = () => {
    setIsMenuOpen(false);
    setIsDeleteOpen(true);
  };
  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="grid grid-cols-12 gap-6 items-center py-4 px-4 hover:bg-gray-50 transition">
        <div className="col-span-1 flex justify-center">
          <button
            onClick={onToggleExpand}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <div className="col-span-3 text-brand-primary">
          <p className="font-semibold text-gray-900">{assessment.name}</p>
          <p className="text-sm text-gray-500 mt-1 font-normal">
            {showFullDesc
              ? assessment.description
              : `${assessment.description?.slice(0, 80)}${
                  assessment.description?.length > 80 ? '...' : ''
                }`}
            {assessment.description?.length > 80 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="ml-1 text-primary font-semibold text-xs hover:underline"
              >
                {showFullDesc ? 'See less' : 'See more'}
              </button>
            )}
          </p>
        </div>

        <div className="col-span-2 flex justify-center">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryStyle}`}
          >
            {assessment.category || 'Uncategorized'}
          </span>
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
            aria-label="Start Assessment"
          >
            <PlayIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-900 hover:text-gray-800"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            <MoreIcon className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
              <button
                onClick={openEdit}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={openDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
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

      {isEditOpen && (
        <EditModal
          assessment={assessment}
          onClose={closeEdit}
          onUpdateSuccess={() => {
            closeEdit();
            onUpdateSuccess();
          }}
        />
      )}

      {isDeleteOpen && (
        <DeleteModal
          assessment={assessment}
          onClose={closeDelete}
          onDeleteSuccess={() => {
            closeDelete();
            onUpdateSuccess();
          }}
        />
      )}
    </div>
  );
};

interface EditModalProps {
  assessment: Assessment;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  assessment,
  onClose,
  onUpdateSuccess,
}) => {
  const [name, setName] = useState(assessment.name);
  const [description, setDescription] = useState(assessment.description);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const [validationMessage, setValidationMessage] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationMessage('');
    setIsValidated(false);
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    } else {
      setCsvFile(null);
    }
  };

  const handleValidate = () => {
    if (!csvFile) {
      setValidationMessage('No CSV file selected for validation.');
      return;
    }
    if (!csvFile.name.toLowerCase().endsWith('.csv')) {
      setValidationMessage(
        'Error: File invalid, please upload a CSV file only.'
      );
      return;
    }

    setIsProcessing(true);
    setValidationMessage('Validating...');

    Papa.parse<string[]>(csvFile, {
      header: false,
      complete: (results) => {
        if (results.errors.length > 0) {
          setValidationMessage(`Error parsing CSV: ${results.errors[0].message}`);
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        const requiredHeaders = [
          'Category',
          'Control Objective',
          'What to Check',
          'Rating Explanation',
          'Recommendations',
        ];

        if (results.data.length < 2) {
          setValidationMessage(
            'Error: CSV must contain a header row and at least one data row.'
          );
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        const headers = (results.data[0] as string[]).map((h) => h.trim());
        const firstDataRow = results.data[1] as string[];

        const hasAllHeaders =
          requiredHeaders.every((h, idx) => headers[idx] === h) &&
          headers.length === requiredHeaders.length;

        if (!hasAllHeaders) {
          setValidationMessage(
            'Error: CSV headers do not match the required format.'
          );
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        const isFirstRowValid =
          firstDataRow.length === requiredHeaders.length &&
          firstDataRow.every((cell) => cell && cell.trim() !== '');

        if (!isFirstRowValid) {
          setValidationMessage(
            'Error: The first data row below the headers cannot be empty.'
          );
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        setValidationMessage('CSV is valid. You can update now.');
        setIsValidated(true);
        setIsProcessing(false);
      },
      error: (err) => {
        setValidationMessage(`Error parsing CSV: ${err?.message || 'Unknown'}`);
        setIsValidated(false);
        setIsProcessing(false);
      },
    });
  };

  const handleSubmit = async () => {
    // basic validations
    if (!name.trim() || !description.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    // if user has selected a new CSV, ensure it's validated
    if (csvFile && !isValidated) {
      toast.error('Please validate the CSV file before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('lens_name', name);
      formData.append('lens_description', description);

      if (csvFile) {
        formData.append('csv_file', csvFile);
      }

      const resp = await fetch(
        `http://localhost:8080/api/lenses/${assessment.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: formData,
        }
      );
      if (!resp.ok) {
        const text = await resp.text().catch(() => null);
        throw new Error(`Error: ${resp.status} ${text ?? ''}`);
      }
      const respJson = await resp.json().catch(() => null);
      console.log('Update success:', respJson);
      toast.success('Lens updated successfully!');
      onUpdateSuccess();
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update lens.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm(
      'Are you sure you want to permanently delete this lens? This action cannot be undone.'
    );
    if (!ok) return;

    setIsDeleting(true);
    try {
      const resp = await fetch(
        `http://localhost:8080/api/lenses/${assessment.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!resp.ok) {
        const text = await resp.text().catch(() => null);
        throw new Error(`Error: ${resp.status} ${text ?? ''}`);
      }
      toast.success('Lens deleted successfully.');
      onUpdateSuccess();
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete lens.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Edit Lens</h2>
            <p className="text-sm text-gray-500 mt-1">
              Update lens details or upload a new CSV. 
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-500 hover:text-gray-700 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Lens name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={assessment.category}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-600"
                title="Category is read-only in this modal"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Short description of the lens"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-2">Upload New CSV</label>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 bg-gray-100 rounded border hover:bg-gray-200 inline-flex items-center gap-2">
                  Choose file
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <div className="text-sm text-gray-700">
                  {csvFile ? csvFile.name : 'No file selected'}
                </div>
              </div>


            </div>

            <div className="text-sm text-gray-500">
              <p>
                Required CSV headers:
              </p>
              <ul className="list-disc ml-5 mt-2">
                <li>Category</li>
                <li>Control Objective</li>
                <li>What to Check</li>
                <li>Rating Explanation</li>
                <li>Recommendations</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t">

  {/* ✅ Validation message on left */}
  <div className="text-sm mt-2">
    {validationMessage && (
      <span className={isValidated ? 'text-green-600' : 'text-red-600'}>
        {validationMessage}
      </span>
    )}
  </div>

  {/* ✅ Both buttons on right side */}
  <div className="flex items-center gap-3">
    <button
      onClick={handleValidate}
      disabled={!csvFile || isProcessing}
      className="px-4 py-2 border rounded disabled:opacity-50"
    >
      {isProcessing ? 'Validating...' : 'Validate'}
    </button>

    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 disabled:opacity-60"
    >
      {isSubmitting ? 'Updating...' : 'Update Lens'}
    </button>
  </div>

</div>


          
        </div>
      </div>
    </div>
  );
};

/* -------------------
   DeleteModal Component
   ------------------- */
interface DeleteModalProps {
  assessment: Assessment;
  onClose: () => void;
  onDeleteSuccess: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  assessment,
  onClose,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const resp = await fetch(
        `http://localhost:8080/api/lenses/${assessment.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!resp.ok) {
        const text = await resp.text().catch(() => null);
        throw new Error(`Delete failed: ${resp.status} ${text ?? ''}`);
      }
      toast.success('Lens deleted successfully.');
      onDeleteSuccess();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete lens.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
    <div className="flex items-start justify-between gap-4 mb-6"> 
      {/* increased bottom margin from mb-4 → mb-6 for more breathing space */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Delete Lens</h2>
        {/* added mb-2 for spacing and removed tightness */}
        <p className="text-sm text-gray-500">
          This will permanently delete the lens and all its associated data. Proceed?
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="text-gray-500 hover:text-gray-700 rounded-full p-2"
        >
          ✕
        </button>
      </div>
    </div>

    <div className="pt-3">
      <div className="flex items-center justify-end gap-3 pt-4">
        
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="px-4 py-2 border rounded bg-white hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirmDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 disabled:opacity-60"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

const AssessmentList: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  const [page, setPage] = useState(1);

  const fetchAssessments = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/lenses', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status}`);
      }
      const data = await res.json();
      const list = Array.isArray(data.body) ? data.body : [];

      const formatted: Assessment[] = list.map((item: any) => ({
        id: item.id,
        name: item.name || 'Untitled',
        description: item.description || 'No description available',
        category: item.category || 'Uncategorized',
        createdDate: item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : '-',
        updatedDate: item.updated_at
          ? new Date(item.updated_at).toLocaleDateString()
          : '-',
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
      setAssessments(formatted);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to fetch lenses.');
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  // filter & sort
  const filtered = assessments.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'newest')
      return (
        new Date(b.created_at || '').getTime() -
        new Date(a.created_at || '').getTime()
      );
    if (sort === 'oldest')
      return (
        new Date(a.created_at || '').getTime() -
        new Date(b.created_at || '').getTime()
      );
    if (sort === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleStart = (id: number | string) => {
    window.location.href = '/agent-evaluation/start-assessment';
  };

  const handleCreate = () => {
    window.location.href = '/agent-evaluation/create-lens';
  };

  const handleDownloadCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Description',
      'Category',
      'Created Date',
      'Updated Date',
    ];
    const rows = assessments.map((a) => [
      a.id,
      `"${a.name}"`,
      `"${a.description?.replace(/"/g, '""')}"`,
      a.category,
      a.createdDate,
      a.updatedDate,
    ]);
    const csvContent =
      headers.join(',') + '\n' + rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessments.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Reset page when filtered list changes to keep UI consistent
    setPage(1);
  }, [search, sort, assessments.length]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          <div className="relative flex-grow max-w-lg">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Lens, Category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-lg leading-tight focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="newest">Sort by: Newest</option>
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
            <DownloadIcon className="w-5 h-5" /> Download
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
          onUpdateSuccess={fetchAssessments}
        />
      ))}

      <div className="flex justify-between items-center p-4 border-t text-sm text-gray-600">
        <span>
          Showing {sorted.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1} to{' '}
          {sorted.length === 0
            ? 0
            : Math.min(page * ITEMS_PER_PAGE, sorted.length)}{' '}
          of {sorted.length} results
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
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
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
};

export default AssessmentList;
