import { ReactNode } from "react";
import Conversations from "./components/Conversations";
import Conversations2 from "./components/Conversations2";

type Props = {
    children: ReactNode
}
const InboxLayout = ({ children }: Props) => {
    return (
        <div className="flex gap-6 justify-between  h-full">
            {children}
            <Conversations2></Conversations2>
        </div>
    );
};

export default InboxLayout;