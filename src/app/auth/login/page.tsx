import { login, signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function LoginPage() {
  return (
    <main className='min-h-[calc(100vh-3.6rem)] flex justify-center items-center'>
      <form>
        <Card className="w-[350px] min-h-96">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password:</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button formAction={login}>Log in</Button>
            <Button formAction={signup}>Sign up</Button>
          </CardFooter>
        </Card>
      </form>
    </main >
  )
}