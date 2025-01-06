'use client'

interface Props {
    children: React.ReactNode;
}

const ParticipantProjectlayout = ({ children }: Props) => {
    return (
        <div>{children}</div>
    );
};

export default ParticipantProjectlayout;