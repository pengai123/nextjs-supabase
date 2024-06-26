"use client"
import { login } from '@/app/auth/actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginFormSchema, TloginFormData } from "@/lib/zodSchemas"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const form = useForm<TloginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (values: TloginFormData) => {
    setErrorMsg("")
    setIsLoading(true)
    try {
      const res = await login(values)
      if (res?.error) {
        setErrorMsg(res?.error)
      }
    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
  }

  return (
    <main className='flex-1 flex justify-center items-center'>
      <Card className="w-[350px] min-h-96">
        <CardHeader>
          <CardTitle className="text-xl">Log In</CardTitle>
          <CardDescription>Log in to your account to stay connected and make the most of your experience.</CardDescription>
        </CardHeader>
        <CardContent >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your email address.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your password.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>LOG IN</Button>
              <p className="text-sm text-destructive font-medium text-center">{errorMsg}</p>
              <p className='mt-4 text-xs text-right'>Don't have an account? <Link className='text-blue-500 underline' href="/auth/signup">Sign up</Link> now.</p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main >
  )
}