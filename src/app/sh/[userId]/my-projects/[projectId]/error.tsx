'use client'; // <-- This line is required for Client Components
import React from 'react';
import { AlertTriangleIcon } from "lucide-react";

const ProjectErrorPage = ({ error }: { error: any }) => {
    return (
        <div className="flex justify-center items-center w-full h-full p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangleIcon className="w-10 h-10 text-red-500 mr-3" />
                    <h2 className="text-2xl font-semibold text-red-500">Error Loading Project</h2>
                </div>
                <p className="text-lg text-gray-700 mb-4">
                    Oops! Something went wrong while fetching the project details.
                </p>
                <p className="text-sm text-gray-500">{error?.message || "Please try again later."}</p>
            </div>
        </div>
    );
};

export default ProjectErrorPage;
