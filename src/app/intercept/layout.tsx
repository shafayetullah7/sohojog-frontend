import { ReactNode } from "react";

type Tprops = {
    children: ReactNode
}
const InterceptLayout = ({ children }: Tprops) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default InterceptLayout;