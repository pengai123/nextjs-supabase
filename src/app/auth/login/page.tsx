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
    <main className='flex-1 flex justify-center items-center'>
      <form>
        <Card className="w-[350px] min-h-96">
          <CardHeader>
            <CardTitle className="text-xl">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-y-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" name="email" type="email" required />
                {/* <p className='text-xs text-muted-foreground'>This is your Email address.</p>
                <p className='text-xs text-red-600'>This must be a valid Email address.</p> */}
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