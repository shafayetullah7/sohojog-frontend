import { useGetMeQuery } from "@/lib/redux/api/api-features/userAccountApi";
import { setUser } from "@/lib/redux/features/user/userSlice";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useGetUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    // const { data: userData, isLoading, isError } = useGetUserQuery(undefined, {
    //     skip: !!user, // Skip the query if the user data is already in the store
    //   });

    const response = useGetMeQuery()
    const { data, isSuccess, isLoading, isError, isFetching, error } = response

    useEffect(() => {
        console.log('data', data);
        if (!isLoading || isFetching) {
            if (isSuccess && data) {
                dispatch(setUser(data.data.user))
            }
        }
    }, [data, isSuccess, isLoading, isFetching, dispatch])

    return { data: user || data?.data.user, isLoading, isError };

};
