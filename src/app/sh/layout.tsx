"use client";

import { errorAlert } from "@/components/alerts/errorAlert";
import { LocalStorageService } from "@/_lib/helpers/access/Access";
import { useSendOtpMutation } from "@/_lib/redux/api/api-features/common/auth-api/authApi";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType";
import { useGetUser } from "@/hooks/getUser";

type Props = {
    children: ReactNode;
};

const HomeLayout = ({ children }: Props) => {
    const { data: user, isLoading: isUserLoading, error: userError } = useGetUser();
    const [sendOtp, { isLoading: isOtpLoading }] = useSendOtpMutation();
    const LocalStorage = LocalStorageService.getInstance();
    const router = useRouter();
    const pathname = usePathname();
    const [otpSent, setOtpSent] = useState(false);

    // Redirect to sign-in if no token is available
    useEffect(() => {
        if (!LocalStorage.token) {
            router.replace("/sign-in");
        }
    }, [LocalStorage.token, router]);

    // Handle user verification and OTP logic
    useEffect(() => {
        if (isUserLoading || !user) return;

        if (!user.verified && !otpSent) {
            sendOtp({ email: user.email })
                .unwrap()
                .then(() => {
                    setOtpSent(true);
                    router.replace("/verify-user");
                })
                .catch((err) => {
                    const axiosError = err as { data: TerrorResponse; status: number };
                    errorAlert({
                        title: "Failed",
                        description: axiosError.data.message || "Failed to send OTP to verify user",
                    });
                    router.replace("/sign-in");
                });
        }
    }, [isUserLoading, user, router, sendOtp, otpSent]);

    // Redirect verified users to `/sh` if on an incorrect route
    useEffect(() => {
        if (!isUserLoading && user?.verified && !pathname.startsWith("/sh")) {
            router.replace("/sh");
        }
    }, [isUserLoading, user, pathname, router]);

    // Show loading state while fetching user or sending OTP
    if (isUserLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Render children when user is verified
    return <div className="min-h-screen">{children}</div>;
};

export default HomeLayout;
