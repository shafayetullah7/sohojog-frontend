import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const MyProjectslayout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default MyProjectslayout;