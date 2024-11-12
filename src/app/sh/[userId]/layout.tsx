"use client"
import UserNav from "@/components/nav/UserNav";
import Sidebar from "@/components/sidebar/Sidebar";
import { useGetUser } from "@/hooks/getUser";
// import { useGetMeQuery } from "@/lib/redux/api/api-features/userAccountApi";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

type Props = {
    children: ReactNode
}


const UserLayout = ({ children }: Props) => {

    // const { isLoading, isError, error, data, isSuccess, isFetching } = useGetMeQuery()
    const { error, isSuccess, isLoading, data
    } = useGetUser()
    const router = useRouter()

    // console.log(data)

    if (isLoading) {
        return <div>
            <p>Loading...</p>
        </div>
    } else {
        if (!data) {
            // console.log('caught the theif')
            router.replace('/sign-in')
            // redirect('/sign-in')
        } else {
            return (
                <div className="min-h-screen text-gray-900 flex flex-col">
                    <div className=""><UserNav></UserNav></div>
                    <div className="flex flex-1">
                        <Sidebar></Sidebar>

                        <div className="flex-1  bg-slate-50 p-6">
                            <div className="w-full h-full">{children}</div>
                        </div>
                        {/* <div className="w-1/5"></div> */}
                    </div>
                </div>
            );
        }
    }




};

export default UserLayout;