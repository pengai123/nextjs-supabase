"use client"
import { forgotPasswordForEmail } from '@/app/actions'
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

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("")
  const form = useForm<TforgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })
  const { isSubmitting } = form.formState
  const onSubmit = async (values: TforgotPasswordFormData) => {
    setMessage("")
    const { email } = values
    console.log('email:', email)

    try {
      const res = await forgotPasswordForEmail(email)
      if (res?.error) {
        setMessage(res.error)
      }
    } catch (error: any) {
      console.log('error:', error.message)
      setMessage(error.message)
    }
  }

  return (
    <main className='flex justify-center items-center'>
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
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the email address for the account for which you want to reset the password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='mt-6' type="submit" disabled={isSubmitting}>CONTINUE</Button>
              {message && <p className='text-sm text-red-600 text-center p-2 bg-red-300/20'>{message}</p>}
              <p className='mt-4 text-xs text-right'>Remember your password? <Link className='text-custom-blue underline' href="/login">Log in</Link> now.</p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main >
  )
}