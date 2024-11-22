import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const InvitationDetailsLayout = ({ children }: Props) => {
    return (
        <div className="min-h-full">
            {children}
        </div>
    );
};

export default InvitationDetailsLayout;