import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const MyProjectDetailsLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            {children}
        </div>
    );
};

export default MyProjectDetailsLayout;