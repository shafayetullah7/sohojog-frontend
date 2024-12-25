'use client'

import UserNav from "@/components/nav/UserNav";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const StartLayout = ({ children }: Props) => {

    return (
        <div className=" text-gray-900 flex flex-col h-screen">
            <div className=""><UserNav></UserNav></div>
            <div className="flex flex-1 h-full">
                <Sidebar></Sidebar>

                <div className="flex-1 flex-grow  bg-slate-50 p-6">
                    <div className="w-full h-full">{children}</div>
                </div>
                {/* <div className="w-1/5"></div> */}
            </div>
        </div>
    );
};

export default StartLayout;