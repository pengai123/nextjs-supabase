import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Building2, Mail, Phone, User, Cake } from "lucide-react"

export default async function UserProfile() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const created = new Date(data.user.created_at).toLocaleDateString('en-US', options)

  return (
    <div className="w-full max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* <Avatar className="w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar> */}
          <div className="text-center sm:text-left flex-grow">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-500">Software Engineer</p>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </div>

      <Separator />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500" />
              <Input id="name" value="John Doe" readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <Input id="email" value={data.user.email} readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <Input id="phone" value="+1 (555) 123-4567" readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Birthday</Label>
            <div className="flex items-center space-x-2">
              <Cake className="w-4 h-4 text-gray-500" />
              <Input id="phone" value="January 1, 1990" readOnly />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" value="Tech Innovations Inc." readOnly />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" value="www.johndoe.com" readOnly />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value="San Francisco, CA" readOnly />
          </div>
          <div>
            <Label htmlFor="joined">Joined</Label>
            <Input id="joined" value={created} readOnly />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bio</h2>
        <p className="text-gray-600">
          Passionate software engineer with 5+ years of experience in full-stack development.
          Specializing in Next.js, React.js, Node.js, and cloud technologies. Always eager to learn and
          contribute to innovative projects that make a difference.
        </p>
      </div>
    </div>
  )
}