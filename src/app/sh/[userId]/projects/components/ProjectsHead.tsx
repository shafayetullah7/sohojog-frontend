import { PlusIcon } from 'lucide-react';
import React from 'react';

const ProjectsHead = () => {
    return (
        <div className='bg-white w-full p-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>Projects</h1>
                <button className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded">
                    <PlusIcon className="w-4 h-4" />
                    <span>Create New Project</span>
                </button>
            </div>
        </div>
    );
};

export default ProjectsHead;