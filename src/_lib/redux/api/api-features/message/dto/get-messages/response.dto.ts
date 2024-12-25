export const FileTypes = {
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

export type FileType = (typeof FileTypes)[keyof typeof FileTypes];

interface FileData {
  id: string;
  file: string;
  fileType: FileType;
  fileName: string;
  extension: string;
}

interface MessageFile {
  file: FileData;
}

interface Sender {
  id: string;
  name: string;
  profilePicture: {
    minUrl: string;
  };
}

export interface Message {
  id: string;
  content: string | null;
  createdAt: string;
  files: MessageFile[];
  sender: Sender;
}

interface Meta {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface MessageQueryResponse {
  messages: Message[];
  meta: Meta;
}
