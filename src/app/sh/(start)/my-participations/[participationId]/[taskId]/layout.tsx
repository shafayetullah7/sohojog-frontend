'use client'

import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const ParticipantTaskDetailsLayout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default ParticipantTaskDetailsLayout;