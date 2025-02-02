import { ReactNode } from 'react';
import InvitationsRightBar from './components/InvitationsRightBar';

interface InvitationLayoutProps {
    children: ReactNode;
}

const InvitationLayout = ({ children }: InvitationLayoutProps) => {
    return (
        <div className="flex gap-5 items-start justify-between h-full">
            <div className="flex-1 min-h-full">
                {children}
            </div>
            <div className="w-[30%]">
                <InvitationsRightBar></InvitationsRightBar>
            </div>
        </div>
    );
};

export default InvitationLayout;
