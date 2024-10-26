import { redirect } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CircleCheck, Mail, LockKeyhole } from "lucide-react"

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const from = searchParams.from
  const message = {
    isValid: false,
    title: "",
    subtitle: "",
    alert: "",
    alertIcon: ""
  }
  switch (from) {
    case "signup":
      message.isValid = true
      message.title = "Signup Successful!"
      message.subtitle = "Thank you for joining us. Your account has been created successfully."
      message.alert = "We've sent a confirmation email to your email address. Please check your inbox and confirm your email to activate your account."
      message.alertIcon = "email"
      break
    case "forgotpassword":
      message.isValid = true
      message.title = "Email Sent Successfully!"
      message.subtitle = "We've sent password reset instructions to your email address."
      message.alert = "Please check your inbox and follow the link in the email to reset your password. If you don't see the email, check your spam folder."
      message.alertIcon = "email"
      break
    case "updatepassword":
      message.isValid = true
      message.title = "Password Reset Successful!"
      message.subtitle = "Your password has been successfully reset. You can now use your new password to log in."
      message.alert = "Your account is now secured with your new password. Remember to use this new password for future logins."
      message.alertIcon = "lock"
      break
    default:
      message.isValid = false
      break
  }

  if (!message.isValid) {
    redirect("/")
  }

  return (
    <div className="text-center max-w-lg w-full p-8 rounded-lg">
      <CircleCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">{message.title}</h1>
      <p className="text-muted-foreground mb-4">
        {message.subtitle}
      </p>
      <div className="bg-green-50 text-green-600 border border-green-200 rounded-md p-4 mb-6">
        <div className="flex items-center">
          {message.alertIcon === "email" && <Mail className="w-5 h-5 flex-shrink-0 mr-4" />}
          {message.alertIcon === "lock" && <LockKeyhole className="w-5 h-5 flex-shrink-0 mr-4" />}
          <p className=" text-sm text-start">
            {message.alert}
          </p>
        </div>
      </div>
      <Button asChild className="w-full mb-2">
        <Link href="/">
          Go Home
        </Link>
      </Button>
      <Button asChild className="w-full" variant="outline">
        {from === "updatepassword" ?
          <Link href="/account/profile">
            Go To Profile
          </Link> :
          <Link href="/login">
            Return To Login
          </Link>
        }
      </Button>
    </div >
  )
}