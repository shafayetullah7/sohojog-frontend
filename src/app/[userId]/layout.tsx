import UserNav from "@/components/nav/UserNav";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const UserLayout = ({ children }: Props) => {
    return (
        <div className="border">
            <UserNav></UserNav>

            <div className="grid grid-cols-12">
                <div className="col-span-3 ">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-span-6">{children}</div>
                <div className="col-span-3 bg-gray-200"></div>
            </div>
        </div>
    );
};

export default UserLayout;