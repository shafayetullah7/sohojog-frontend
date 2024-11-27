import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const CreateTaskLayout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default CreateTaskLayout;