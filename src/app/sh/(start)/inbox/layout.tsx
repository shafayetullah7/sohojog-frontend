import { ReactNode } from "react";
import Conversations from "./components/Conversations";


type Props = {
    children: ReactNode
}
const InboxLayout = ({ children }: Props) => {
    return (
        <div className="flex gap-6 justify-between h-full">
            <div className="flex-grow">
                {children}
            </div>
            <div className="w-96">
                <Conversations />
            </div>
        </div>

    );
};

export default InboxLayout;