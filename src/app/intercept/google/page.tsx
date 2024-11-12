"use client";

import { Suspense, useEffect } from "react";
import { errorAlert } from "@/components/alerts/errorAlert";
import { LocalStorageService } from "@/_lib/helpers/access/Access";
import { redirect, useSearchParams } from "next/navigation";

const GooglePage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token && typeof token === "string") {
            LocalStorageService.getInstance().token = token;
            redirect("/sh");
        } else {
            errorAlert({ title: "Failed", description: "Unable to login." });
            redirect("/sign-in");
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-lg font-semibold text-gray-700">Redirecting...</p>
        </div>
    );
};

const GooglePageWithSuspense = () => (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><p>Loading...</p></div>}>
        <GooglePage />
    </Suspense>
);

export default GooglePageWithSuspense;
