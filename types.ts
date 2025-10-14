import React from 'react';

// Module Definitions
export interface Module {
  id: string;
  name: string;
  description: string;
  descriptionClassName?: string;
  icon?: React.ReactElement<{ className?: string }>;
}

// Prompt Definitions
export enum PromptStatus {
  draft = 'draft',
  active = 'active',
  inactive = 'inactive',
  archived = 'archived'
}

export interface PromptVersion {
  content: string;
  status: PromptStatus;
  lastModified: string;
}

export interface Prompt {
  id?: number;
  current: string
  name: string
  description: string;
  agent: string;
  versions: Record<string, PromptVersion>;
}


// Bot Definitions
export type BotStatus = 'Available' | 'Active' | 'Inactive' | 'Draft' | 'Error' | 'Training';

export interface Bot {
  isAnonymous: any;
  isStandalone: any;
  _id: string;
  bot_description: string;
  bot_title: string;
  bot_last_used_time: number;
  sync_status: string;
  isEditAdmin: boolean;
  isAgent: boolean;
  published_status: boolean;
  bot_is_public: boolean;
  org_id: string;
  can_use: boolean;
  isSubAgent: boolean;
  bot_user_id: string;
  bot_owner_id: string;
  bot_is_owned: boolean;
  bot_id: string;
  bot_create_time: number;
  maxReRankedResults: number;
  reRankingEnabled: boolean;
  avatarUrl: string
}

// Chat Message Definitions
export type MessageSender = 'user' | 'bot' | 'assistant';

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  /** Associate with a bot if needed */
  botId?: string;
  /** Source chunks for reference replacement */
  usedChunks?: Array<{
    content: string;
    contentType: string;
    source: string;
    rank: number;
  }>;
}

// Knowledge Base Data Source Types
export type DataSourceType = 'PDF' | 'Website' | 'Text File' | 'Database' | 'Document' | 'API';
export type DataSourceStatus = 'Indexed' | 'Processing' | 'Failed' | 'Pending' | 'Available' | 'Syncing';

export interface DataSourceItem {
  id: string;
  name: string;
  type: DataSourceType;
  status: DataSourceStatus;
  /** ISO string or formatted date */
  dateAdded: string;
  /** Optional: number of items/pages */
  itemCount?: number;
  /** Optional: human-readable size */
  size?: string;
}

// Tool Section Definitions
export type ToolCategory = 'API' | 'Service' | 'Plugin' | 'Custom' | 'Data Store';
export type ToolStatus = 'Connected' | 'Disconnected' | 'Error' | 'Pending Setup' | 'Deprecated';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  /** Optional version */
  version?: string;
  /** ISO string or formatted date of last connection */
  lastConnected?: string;
  /** Optional tags */
  tags?: string[];
  /** Owner identifier */
  owner?: string;
}

// Chat Feature Types
export interface ChatPreview {
  lastMessage: string;
  timestamp?: number;
}

export interface ChatState {
  currentBot: Bot | null;
  messages: ChatMessage[];
  isLoading: boolean;
  chatPreviews: Record<string, ChatPreview>;
}

export interface ChatActions {
  setCurrentBot: (bot: Bot | null) => void;
  sendMessage: (text: string) => Promise<void>;
  startNewChat: () => void;
  selectChat: (bot: Bot) => void;
}

// API Conversation Types
export interface ApiConversation {
  id: string;
  title: string;
  createTime: number;
  model: string;
  botId: string;
}

export interface PublishDetailsResponse {
  bot_endpoint: string;
  value: string;
  bot_title?: string;
}


export type Page = 'Dashboard' | 'Agents' | 'Knowledge Base' | 'Prompts' | 'Tools' | 'Assessment' | 'Add Knowledge Base' | 'Manage' | 'PulseIQ';

export enum KnowledgeBaseStatus {
    Active = 'Active',
    Indexing = 'Indexing',
    Archived = 'Archived',
}

export interface KnowledgeBaseItem {
    id: number;
    name: string;
    description: string;
    status: KnowledgeBaseStatus;
    sourceType: ('File Upload' | 'Web URL' | 'Database')[];
    lastModified: string;
    fileCount: number;
    attachedBotCount: number;
}

export interface AgentFeedback {
  id: number;
  agentId: number;
  agentName: string;
  feedbackBy: string;
  vote: 'up' | 'down';
  category: string;
  comment: string;
  createdOn: string;
}

// Evaluation Types
export enum EvaluationStatus {
    Completed = 'Completed',
    InProgress = 'In Progress',
    Submitted = 'Submitted',
}

export type EvaluationRunCombinationStatus = 'In Progress' | 'Completed' | 'Failed' | 'Submitted';

export interface EvaluationRunCombination {
    combinationId: number;
    status: EvaluationRunCombinationStatus;
    progress: number; // 0-100
    score: number | null;
    metricScores?: { metricId: number; score: number }[];
    summary: string | null;
    input: string;
    output: string | null;
    expected_output: string | null;
}

export interface EvaluationRun {
    runId: string;
    status: EvaluationStatus; // Overall status of the run
    date: string;
    overallReport: string;
    runCombinations: EvaluationRunCombination[];
    submittedDate: string; // Date when the run was submitted
    completedDate: string | null; // Date when the run was completed, null if not yet completed or in progress
}

export interface EvaluationCombination {
    id: number;
    agentId: number | null;
    promptId: number | null;
    promptVersion: string | null;
    modelId: string | null;
}

export interface Evaluation {
    id: number;
    name: string;
    description: string;
    status: EvaluationStatus; // Overall status of the evaluation job
    lastRun: string;
    combinations: EvaluationCombination[]; // The template of combinations for this eval
    runs: EvaluationRun[];
}

export interface EvaluationMetric {
    id: number;
    name: string;
    description: string;
}

export interface EvaluationCreationData {
    name: string;
    description: string;
    combinations: EvaluationCombination[];
    datasetFiles: File[];
    metricIds: number[];
    parallelExecutions: number;
}

export interface ModelMetrics {
  name: string;
  passRate: number;
  avgLatency: number;
  avgQualityScore: number;
  avgToxicityScore: number;
  avgReadabilityScore: number;
}

// shared/types/listView.ts
export interface ListColumn<T = any> {
  key: string;
  label: string;
  width?: string; // e.g., "col-span-2", "col-span-3"
  sortable?: boolean;
  filterable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
  mobileLabel?: string; // Label for mobile view
  hideOnMobile?: boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  width?: string; // Grid column width
}

export interface ActionItem<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  className?: string;
  disabled?: (item: T) => boolean;
}

export interface ListViewProps<T = any> {
  data: T[];
  columns: ListColumn<T>[];
  filters?: FilterConfig[];
  actions?: ActionItem<T>[];
  pagination?: {
    enabled: boolean;
    itemsPerPage?: number;
    showInfo?: boolean;
  };
  searchable?: boolean;
  searchKeys?: string[]; // Keys to search in
  title?: string;
  subtitle?: string;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
  onRowClick?: (item: T) => void;
  showHeader?: boolean;
  mobileCardView?: boolean;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  [key: string]: any;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  category: string;
}