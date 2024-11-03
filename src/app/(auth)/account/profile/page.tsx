import { redirect } from 'next/navigation'
import { getUserData } from '@/app/actions'
import UserProfile from '@/components/UserProfile'

export default async function UserProfilePage() {
  const { error, authData, profile } = await getUserData()
  if (error) {
    redirect('/login')
    return
  }

  return <UserProfile user={{ authData, profile }} />
}