"use client"
import { resetPasswordForEmail } from '@/app/(auth)/actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { forgotPasswordFormSchema, TforgotPasswordFormData } from "@/lib/zodSchemas"
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
  FormDescription
} from "@/components/ui/form"
import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<TforgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })
  const onSubmit = async (values: TforgotPasswordFormData) => {
    setMessage("")
    setIsLoading(true)
    const { email } = values
    console.log('email:', email)

    try {
      await resetPasswordForEmail(email)
      router.push("/success")
    } catch (error: any) {
      console.log('error:', error.message)
      setMessage(error.message)
    }
    setIsLoading(false)
  }

  return (
    <main>
      <Card className="w-[350px] min-h-96">
        <CardHeader>
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Fill in below info to reset your password.</CardDescription>
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
                    <FormDescription>
                      This is the email address for the account for which you want to reset the password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='mt-6' type="submit" disabled={isLoading}>CONTINUE</Button>
              {message && <p className='text-sm text-red-600 text-center p-2 bg-red-300/20'>{message}</p>}
              <p className='mt-4 text-xs text-right'>Remember your password? <Link className='text-blue-500 underline' href="/login">Log in</Link> now.</p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main >
  )
}