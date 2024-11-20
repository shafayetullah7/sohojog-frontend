import Link from 'next/link'
import RecipientInvitationDetails from './components/RecipientInvitationDetails'
import { ArrowLeft } from 'lucide-react'



const InvitationDetailsDemo = () => {
  return (
    <div className='bg-white p-5 rounded-3xl'>
      <div className='flex justify-between items-center border-b pb-2'>
        <h1 className='text-3xl font-bold'>Invitation Details</h1>
        <Link className='flex items-center w-fit gap-2 text-sm text-gray-500 hover:text-gray-800 duration-300' href={'/sh/invitations'}><ArrowLeft className='size-5'></ArrowLeft><span>Overview</span></Link>
      </div>
      <RecipientInvitationDetails invitationId='sdf'></RecipientInvitationDetails>

    </div>
  )
}

export default InvitationDetailsDemo