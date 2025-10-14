// //Run History COmponent
// // This component displays the run history of an evaluation, allowing users to view details of each run

// import React from 'react';
// import { Evaluation, EvaluationRun } from '../../../types';
// import { StatusBadge } from './Status_Badge';

// interface RunHistoryProps {
//     evaluation: Evaluation;
//     onViewResult: (run: EvaluationRun) => void;
// }

// const RunHistory: React.FC<RunHistoryProps> = ({ evaluation, onViewResult }) => {
//     if (!evaluation.runs || evaluation.runs.length === 0) {
//         return <p className="text-sm text-gray-500 text-center py-4">No previous runs available for this evaluation.</p>;
//     }

//     const displayedRuns = evaluation.runs;

//     return (
//         <div className="space-y-2">
//             <h4 className="text-sm font-semibold text-gray-600 mb-2">Run History</h4>
//             <div className="overflow-x-auto border border-gray-200 rounded-lg">
//                 <div className="max-h-64 overflow-y-auto">
//                     <table className="min-w-full text-sm">
//                         <thead className="bg-gray-50 sticky top-0 z-10">
//                             <tr>
//                                 <th className="pl-20 px-4 py-2 text-left font-small text-gray-600 uppercase">Run ID</th>
//                                 <th className="px-7 py-2 text-left font-medium text-gray-600 uppercase">Submitted Date</th>
//                                 <th className="px-7 py-2 text-left font-medium text-gray-600 uppercase">Completed Date</th>
//                                 <th className="px-7 py-2 text-left font-medium text-gray-600 uppercase">Status</th>
//                                 <th className="pl-20 py-2 text-left font-medium text-gray-600 uppercase">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200 font-small">
//                             {displayedRuns.map((run) => (
//                                 <tr key={run.runId}>
//                                     <td className="pl-20 py-2 text-gray-700 font-mono">{run.runId}</td>
//                                     <td className="pl-9 pr-7 py-2 text-gray-600">{run.submittedDate}</td>
//                                     <td className="pl-9 pr-4 py-2 text-gray-600">{run.completedDate || 'N/A'}</td>
//                                     <td className="pl-4 pr-4 py-2 text-gray-600">
//                                         <StatusBadge status={run.status} />
//                                     </td>
//                                     <td className="pl-20 py-2">
//                                         <button
//                                             onClick={() => onViewResult(run)}
//                                             className="text-sm font-medium text-brand-dark-blue hover:underline"
//                                         >
//                                             View Result
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RunHistory; // Export it as default to match the import style in the main component

'use client';
import React from 'react';
import { StatusBadge } from './Status_Badge';
import { PencilIcon, TrashIcon} from '../../../constants';
import { EvaluationRunCombinationStatus } from '../../../types';

interface RunHistoryProps {
    evaluation?: any;
}

const mockRuns: {
    id: string;
    name: string;
    status: EvaluationRunCombinationStatus;
    customerName: string;
    createdDate: string;
    updatedDate: string;
}[] = [
    {
        id: 'run-001',
        name: 'Primary Model Comparison',
        status: 'Completed',
        customerName: 'John Doe',
        createdDate: 'Oct 10, 2025',
        updatedDate: 'Oct 13, 2025',
    },
    {
        id: 'run-002',
        name: 'Customer Sentiment Evaluation',
        status: 'In Progress',
        customerName: 'Emma Watson',
        createdDate: 'Oct 09, 2025',
        updatedDate: 'Oct 12, 2025',
    },
    {
        id: 'run-003',
        name: 'Data Bias Audit',
        status: 'Completed',
        customerName: 'Alex Johnson',
        createdDate: 'Oct 08, 2025',
        updatedDate: 'Oct 10, 2025',
    },
];

const RunHistory: React.FC<RunHistoryProps> = ({ evaluation }) => {
    return (
        <div className="space-y-3 px-4 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Assessement</h4>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <div className="max-h-64 overflow-y-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="pl-6 py-3 text-left font-semibold text-gray-600 uppercase">Name</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Customer Name</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Created Date</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Updated Date</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase">Action</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockRuns.map((run) => (
                                <tr key={run.id} className="hover:bg-gray-50 transition">
                                    <td className="pl-6 py-3 text-gray-800 font-medium">{run.name}</td>
                                    <td className="px-6 py-3">
                                        <StatusBadge status={run.status} />
                                    </td>
                                    <td className="px-6 py-3 text-gray-700">{run.customerName}</td>
                                    <td className="px-6 py-3 text-gray-600">{run.createdDate}</td>
                                    <td className="px-6 py-3 text-gray-600">{run.updatedDate}</td>
                                 <td className="px-6 py-3">
  <div className="flex items-center gap-3"> {/* ✅ Flex container to align buttons horizontally */}
    <button
      className="flex items-center gap-1 text-primary hover:text-primary/90 font-medium"
      title="Edit"
      onClick={() => alert(`Editing ${run.name}`)}
    >
      <PencilIcon className="w-4 h-4" />
    </button>

    <button
      className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium"
      title="Delete"
      onClick={() => alert(`Deleting ${run.name}`)}
    >
      <TrashIcon className="w-4 h-4" />
    </button>
  </div>
</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RunHistory;
