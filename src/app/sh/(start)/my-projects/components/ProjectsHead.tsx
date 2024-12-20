'use client'
import { PlusIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CreateProject from './createProject/CreateProject';
import { useState } from 'react';


const ProjectsHead = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const updateOpenModal = (value: boolean) => {
        setOpenModal(value)
    }

    return (
        <div className='bg-white w-full py-5 px-6 rounded-3xl'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>Projects</h1>

                <Dialog open={openModal}>
                    <DialogTrigger>
                        <div className="flex items-center space-x-2 p-2 border-2 border-gray-500 rounded-lg font-semibold" onClick={() => updateOpenModal(true)}>
                            <PlusIcon className="size-4" strokeWidth={3} />
                            <span>Create New Project</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-auto max-w-[min(calc(100vw-2rem),600px)]">
                        <DialogHeader>
                            <DialogTitle><h2 className="text-2xl font-bold mb-6">Create new project</h2></DialogTitle>
                        </DialogHeader>
                        <div>
                            <CreateProject updateOpenModal={updateOpenModal}></CreateProject>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ProjectsHead;