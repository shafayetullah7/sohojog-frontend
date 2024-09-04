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
    const { isError, isLoading, data
    } = useGetUser()
    const router = useRouter()

    console.log(data)

    if (isLoading) {
        return <div>
            <p>Loading...</p>
        </div>
    } else {
        if (!data) {
            router.replace('/sign-in')
            // redirect('/sign-in')
        } else {
            return (
                <div className="h-screen">
                    <div className=""><UserNav></UserNav></div>
                    {/* <div className="grid grid-cols-10 h-full">
                        <div className="col-span-2 h-full">
                            <div className="w-full border-r-2">
                                <Sidebar></Sidebar>
                            </div>
                        </div>
                        <div className="col-span-6">{children}</div>
                        <div className="col-span-2 bg-gray-200"></div>
                    </div> */}
                    <div className="flex h-full">
                        <Sidebar></Sidebar>

                        <div className="flex-1 bg-gray-50 rounded-2xl p-8">
                            <div className="bg-white w-full h-full rounded-xl p-5">{children}</div>
                        </div>
                        <div className="w-1/5"></div>
                    </div>
                </div>
            );
        }
    }




};

export default UserLayout;