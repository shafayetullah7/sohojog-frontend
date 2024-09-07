'use client'
import { errorAlert } from "@/components/alerts/errorAlert";
import { useGetUser } from "@/hooks/getUser";
// import { LocalStorageService } from "@/lib/helpers/access/Access";
import { LocalStorageService } from "@/lib/helpers/access/Access";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode
}
const HomeLayout = ({ children }: Props) => {
    const { data, isLoading, error, isSuccess } = useGetUser()
    const LocalStorage = LocalStorageService.getInstance()
    const router = useRouter()
    useEffect(() => {
        // console.log('on sh layout', { data, isLoading, error, isSuccess })
        console.log('on sh', LocalStorage.token)
        // if(data || )
        if (LocalStorage.token) {
            if (isLoading) {
                if (data) {
                    if (!data.verified) {
                        router.replace('/verify-user');
                    }
                    else if (data.id) {
                        // console.log('sh redirect 5')
                        router.replace(`/sh/${data.id}`)
                    }
                }
            } else {
                if (data?.id) {
                    // console.log('sh redirect 4')
                    if (!data?.verified) {
                        // console.log('sh redirect 4')
                        router.replace(`/verify-user`);
                    } else {
                        router.replace(`/sh/${data.id}`);
                    }

                } else {
                    if (isSuccess && data) {
                        if (!data.verified) {
                            router.replace('/verify-user')
                        } else {
                            // console.log('sh redirect 3')
                            router.replace(`/sh/${data.id}`);
                        }

                    } else {
                        // console.log('sh redirect 2')
                        router.replace('/sign-in');
                    }
                }
            }
            // if (data) {
            //     router.replace(`/sh/${data.id}`)
            // }
            // else {
            //     if (!isLoading) {
            //         if (isSuccess && data) {
            //             router.replace(`/sh/${data.id}`);
            //         } else {
            //             router.replace('/sign-in');
            //         }
            //     }
            // }
        } else {
            console.log('sh redirect 1')
            // router.replace('/sign-in');

        }
        // if (isSuccess || data) {
        //     if (LocalStorage.token) {
        //         console.log('here 1');
        //         if (!isFetching && !isLoading) {
        //             console.log('here 2');
        //             if (isError) {
        //                 errorAlert({ title: "Failed", description: "Please login again." });
        //                 console.log('sh redirect 4');
        //                 redirect('/sign-in')
        //             } else if (data) {
        //                 console.log('sh redirect 3');
        //                 redirect(`/sh/${data.id}`)
        //             } else {
        //                 console.log('sh redirect 2');
        //                 redirect('/sign-in');
        //             }
        //         }
        //     } else {
        //         // redirect('/sign-in', RedirectType.replace);
        //         console.log('sh redirect 1');
        //         redirect('/sign-in');
        //     }
        // }
    }, [isLoading, error, data, isSuccess, LocalStorage, router])


    return (
        <div>
            {children}
        </div>
    );
};

export default HomeLayout;