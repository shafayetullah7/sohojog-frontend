import UserNav from "@/components/nav/UserNav";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode, useState } from "react";

type Props = {
    children: ReactNode
}


const UserLayout = ({ children }: Props) => {

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
};

export default UserLayout;