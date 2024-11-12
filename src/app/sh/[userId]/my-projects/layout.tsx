import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const MyProjectslayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            {children}
        </div>
    );
};

export default MyProjectslayout;