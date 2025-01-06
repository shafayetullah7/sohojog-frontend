export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  HALTED = "HALTED",
  ARCHIVED = "ARCHIVED",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum TaskAssignmentType {
  GROUP = "GROUP",
  INDIVIDUAL = "INDIVIDUAL",
}

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

export type FileType = typeof FileType[keyof typeof FileType];
