'use client'
import Link from 'next/link';
import RecipientInvitationDetails from './components/RecipientInvitationDetails';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
  useGetSingleParticipantInvitationQuery,
  useUpdateInvitationSeenStatusMutation
} from '@/_lib/redux/api/api-features/roles/participant/invitation/my.invitations.api';
import SkeletonRecipientInvitationDetails from './components/SkeletonRecipientInvitationDetails';
import { useCallback, useEffect } from 'react';

const InvitationDetailsPage = () => {
  const params = useParams();
  const { invitationId } = params as { invitationId: string };

  const { data, isError, isLoading } = useGetSingleParticipantInvitationQuery({ id: invitationId });
  const [updateInvitationSeenStatus] = useUpdateInvitationSeenStatusMutation();

  const updateSeenStatus = useCallback(async (id: string) => {
    try {
      await updateInvitationSeenStatus({
        params: { id },
        body: { seen: true },
      }).unwrap(); // Unwrap for error handling
    } catch (error) {
      console.error("Failed to update invitation status:", error);
    }
  }, [updateInvitationSeenStatus]);

  useEffect(() => {
    if (data?.data.invitation && !data.data.invitation.seen) {
      updateSeenStatus(invitationId);
    }
  }, [data, invitationId, updateSeenStatus]);

  return (
    <div className='bg-white p-5 rounded-3xl h-full'>
      <div className='flex justify-between items-center border-b pb-2'>
        <h1 className='text-3xl font-bold'>Invitation Details</h1>
        <Link
          className='flex items-center w-fit gap-2 text-sm text-gray-500 hover:text-gray-800 duration-300'
          href={'/sh/invitations'}
        >
          <ArrowLeft className='size-5' />
          <span>Overview</span>
        </Link>
      </div>
      {isLoading ? (
        <SkeletonRecipientInvitationDetails />
      ) : isError ? (
        <div className="text-red-500 mt-4">Error loading invitation details. Please try again later.</div>
      ) : data ? (
        <RecipientInvitationDetails invitation={data.data.invitation} />
      ) : null}
    </div>
  );
};

export default InvitationDetailsPage;
