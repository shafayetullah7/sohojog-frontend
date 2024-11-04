'use client'
import { useGetManagerProjectQuery } from '@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi';
import { TerrorResponse } from '@/_lib/redux/data-types/responseDataType';
import React from 'react';
import MyProject from './myProject/MyProject';

const ManagerProjects = () => {
    // Use the hook to get the manager projects
    const { data, error, isLoading, isSuccess } = useGetManagerProjectQuery({});

    // Handle loading state
    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    // Handle error state
    if (error) {
        const resError = error as TerrorResponse;
        return <div className="text-red-500 text-center mt-4">Error fetching projects: {resError.message}</div>;
    }

    if (isSuccess) {
        if (!data) {
            return <div className="text-center mt-4">No data found</div>;
        } else {
            const { projects } = data.data;

            return (
                <div className="px-4 py-6 bg-white my-6">
                    {/* <h1 className="text-2xl font-bold text-center mb-6">Manager Projects</h1> */}
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {projects.length === 0 ? (
                            <p className="col-span-full text-center">No projects found.</p>
                        ) : (
                            projects.map((project) => (
                                <MyProject key={project.id} project={project} />
                            ))
                        )}
                    </div>
                </div>
            );
        }
    }

    return null; // Return null as a fallback
};

export default ManagerProjects;
