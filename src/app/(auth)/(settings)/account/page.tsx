import { Separator } from "@/components/ui/separator";
import { redirect } from 'next/navigation'
import { getAuthData } from '@/app/actions'
import { UpdateEmail } from "@/components/UpdateEmail"
import { UpdatePassword } from "@/components/UpdatePassword"
import { DeleteAccount } from "@/components/DeleteAccount";

export default async function AccountPage() {
  const { error, authData } = await getAuthData()
  if (error || !authData) {
    redirect('/login')
    return
  }

  return (
    <div className="px-2 py-20 sm:px-4 md:px-8 lg:px-16 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <UpdateEmail authData={authData} />
        <UpdatePassword authData={authData} />
        <DeleteAccount authData={authData} />
      </div>
    </div>
  );
}