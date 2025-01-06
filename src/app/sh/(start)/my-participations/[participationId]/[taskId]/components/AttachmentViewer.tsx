import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FileIcon, ImageIcon, VideoIcon, FileAudioIcon as AudioIcon, FileTextIcon, FileSpreadsheetIcon, FileIcon as FilePresentationIcon } from 'lucide-react'
import { FileType } from '@/_constants/enums/task.enums'

interface AttachmentViewerProps {
    file: {
        id: string;
        file: string;
        fileName: string;
        fileType: FileType;
        extension: string;
    };
}

const getFileIcon = (fileType: FileType) => {
    switch (fileType) {
        case FileType.IMAGE:
            return <ImageIcon className="h-6 w-6" />;
        case FileType.VIDEO:
            return <VideoIcon className="h-6 w-6" />;
        case FileType.AUDIO:
            return <AudioIcon className="h-6 w-6" />;
        case FileType.PDF:
        case FileType.DOCUMENT:
        case FileType.DOC:
        case FileType.DOCX:
        case FileType.TXT:
            return <FileTextIcon className="h-6 w-6" />;
        case FileType.SPREADSHEET:
        case FileType.XLS:
        case FileType.XLSX:
        case FileType.CSV:
            return <FileSpreadsheetIcon className="h-6 w-6" />;
        case FileType.PPT:
        case FileType.PPTX:
            return <FilePresentationIcon className="h-6 w-6" />;
        default:
            return <FileIcon className="h-6 w-6" />;
    }
};

export function AttachmentViewer({ file }: AttachmentViewerProps) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleDownload = () => {
        // Implement download logic here
        window.open(file.file, '_blank');
    };

    if (file.fileType === FileType.IMAGE) {
        return (
            <div className="relative group">
                <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                    <DialogTrigger asChild>
                        <div className="cursor-pointer">
                            <Image
                                src={file.file}
                                alt={file.fileName}
                                width={100}
                                height={100}
                                className="object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon className="text-white h-8 w-8" />
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                        <Image
                            src={file.file}
                            alt={file.fileName}
                            width={800}
                            height={600}
                            className="object-contain w-full max-h-screen"
                        />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            {getFileIcon(file.fileType)}
            <span className="text-sm truncate">{file.fileName}</span>
            <Button variant="outline" size="sm" onClick={handleDownload}>
                Download
            </Button>
        </div>
    );
}

