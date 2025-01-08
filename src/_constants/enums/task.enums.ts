export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
  HALTED: "HALTED",
  ARCHIVED: "ARCHIVED",
} as const;

export const TaskPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export const TaskAssignmentType = {
  GROUP: "GROUP",
  INDIVIDUAL: "INDIVIDUAL",
} as const;

export type TaskAssignmentType =
  (typeof TaskAssignmentType)[keyof typeof TaskAssignmentType];

export const FileType = {
  PDF: "PDF",
  IMAGE: "IMAGE", // Generic for image files
  VIDEO: "VIDEO", // Generic for video files
  AUDIO: "AUDIO", // Generic for audio files
  DOCUMENT: "DOCUMENT", // Generic for document files not explicitly defined
  DOC: "DOC", // Microsoft Word Document
  DOCX: "DOCX", // Microsoft Word Open XML Document
  PPT: "PPT", // Microsoft PowerPoint Presentation
  PPTX: "PPTX", // Microsoft PowerPoint Open XML Presentation
  XLS: "XLS", // Microsoft Excel Spreadsheet
  XLSX: "XLSX", // Microsoft Excel Open XML Spreadsheet
  CSV: "CSV", // Comma-Separated Values
  TXT: "TXT", // Plain Text File
  SPREADSHEET: "SPREADSHEET", // Generic for spreadsheet files not explicitly defined
  OTHER: "OTHER", // For any other file type not covered
} as const;

export type FileType = (typeof FileType)[keyof typeof FileType];

export const SubmissionStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type SubmissionStatus =
  (typeof SubmissionStatus)[keyof typeof SubmissionStatus];
