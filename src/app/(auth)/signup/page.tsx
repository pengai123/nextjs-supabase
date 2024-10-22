"use client"
import { signup } from '@/app/actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signupFormSchema, TsignupFormData } from "@/lib/zodSchemas"
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

export default function SignupPage() {
  const [errorMsg, setErrorMsg] = useState('')
  const form = useForm<TsignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const { isSubmitting } = form.formState
  const onSubmit = async (values: TsignupFormData) => {
    setErrorMsg("")
    try {
      const res = await signup(values)
      if (res?.error) {
        setErrorMsg(res.error)
      }
    } catch (error: any) {
      setErrorMsg(error.message)
    }
  }

  return (
    <main>
      <Card className="w-[350px] min-h-96">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Sign up to stay connected and make the most of your experience.</CardDescription>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" type="password" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your password.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>SIGN UP</Button>
              {errorMsg && <p className="text-sm text-red-600 font-medium text-center p-2 bg-red-200/20">{errorMsg}</p>}
              <p className='mt-4 text-xs text-right'>Already have an account? <Link className='text-custom-blue underline' href="/login">Log in</Link> now.</p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main >
  )
}