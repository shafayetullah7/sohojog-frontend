import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const MyProjectDetailsLayout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default MyProjectDetailsLayout;