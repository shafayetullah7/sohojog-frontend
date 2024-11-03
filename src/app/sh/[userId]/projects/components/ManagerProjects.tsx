// import { useGetManagerProjectQuery } from '@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi';
// import React from 'react';

// const ManagerProjects = () => {
//   // Use the hook to get the manager projects
//   const { data, error, isLoading } = useGetManagerProjectQuery({});

//   // Handle loading state
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Handle error state
//   if (error) {
//     return <div>Error fetching projects: {error.message}</div>;
//   }

//   // Assuming data is structured with a property 'projects' containing the list of projects
//   const projects = data?.data?.projects || [];

//   return (
//     <div>
//       <h1>Manager Projects</h1>
//       {projects.length === 0 ? (
//         <p>No projects found.</p>
//       ) : (
//         <ul>
//           {projects.map((project) => (
//             <li key={project.id}>
//               <h2>{project.title}</h2>
//               <p>{project.description}</p>
//               <p>Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
//               {/* Add more project details as needed */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ManagerProjects;
