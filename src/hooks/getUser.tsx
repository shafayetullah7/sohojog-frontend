'use client'
import { errorAlert } from "@/components/alerts/errorAlert";
import { LocalStorageService } from "@/_lib/helpers/access/Access";
import { useGetMeQuery } from "@/_lib/redux/api/api-features/common/user-api/userAccountApi";
import { setUser } from "@/_lib/redux/features/user/userSlice";
import { RootState } from "@/_lib/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetUser = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    // const router = useRouter();

    // console.log('path', window.location.href)

    // console.log('user', !!user);

    const { data, isSuccess, isLoading, isError, error, isFetching, isUninitialized, status } = useGetMeQuery(undefined, {
        skip: !!user, // Skip query if user data is already present
    });

    useEffect(() => {
        if (!isLoading || !isFetching) {
            if (isSuccess) { // Handle success scenario only
                dispatch(setUser(data.data.user)); // Dispatch user data only on success
            } else if (isError) { // Handle error scenario
                console.log("Error fetching user data:", error, 'token', LocalStorageService.getInstance().token)
                // LocalStorageService.getInstance().token;
                console.log('caught the theif')
                errorAlert({ title: 'Failed', description: "Please login again" })
                // router.push('/sign-in');
            }
        }
    }, [data, isSuccess, isError, isLoading, isFetching, error, dispatch]); // Only include necessary dependencies

    const combinedData = user || data?.data.user;
    const combinedLoading = isLoading || isFetching;

    // console.log("on get user hook", {
    //     data: combinedData,
    //     isSuccess,
    //     isLoading: combinedLoading,
    //     error,
    //     isError,
    //     isFetching,
    //     isUninitialized,
    //     status,
    // });

    return {
        data: combinedData,
        isLoading: combinedLoading,
        error,
        isSuccess, // Keep isSuccess for potential usage
    };
};