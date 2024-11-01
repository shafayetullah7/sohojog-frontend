import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const profileLayout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default profileLayout;