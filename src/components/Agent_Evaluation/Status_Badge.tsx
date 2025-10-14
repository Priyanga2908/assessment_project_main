import React from 'react';
import { EvaluationRunCombinationStatus } from '../../../types';

interface CombinationStatusBadgeProps {
    status: EvaluationRunCombinationStatus;
}

export const StatusBadge: React.FC<CombinationStatusBadgeProps> = ({ status }) => {
    const styles: Record<EvaluationRunCombinationStatus, string> = {
        'Completed': 'bg-green-100 text-green-700',
        'In Progress': 'bg-blue-100 text-blue-700',
        'Failed': 'bg-red-100 text-red-700',
        'Submitted': 'bg-gray-100 text-gray-600',
    };
    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full inline-flex items-center ${styles[status]}`}>
            {status}
        </span>
    );
};