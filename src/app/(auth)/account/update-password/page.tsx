"use client"
import { getAuthData, updatePassword } from '@/app/actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { forgotPasswordUpdateForm, TForgotPasswordUpdateData } from "@/lib/zodSchemas"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
import Link from "next/link"

export default function UpdatePasswordPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const form = useForm<TForgotPasswordUpdateData>({
    resolver: zodResolver(forgotPasswordUpdateForm),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  })
  const { isSubmitting } = form.formState
  const onSubmit = async (values: TForgotPasswordUpdateData) => {
    console.log('values:', values)
    setMessage("")
    try {
      const res = await updatePassword({ password: values.newPassword })
      if (!res.success) {
        setMessage(res.message)
      }
    } catch (error: any) {
      console.log('error:', error)
      setMessage(error.message)
    }
  }

  const checkAuth = async () => {
    const { authData, error } = await getAuthData()
    if (error || !authData) {
      return router.push('/login')
    }
    setIsLoggedIn(true)
    setIsLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return <p className="min-h-[calc(100vh-74px)] flex justify-center items-center">Loading...</p>
  }


  return (
    <main className='flex justify-center items-center'>
      <Card className="w-[350px] min-h-96">
        <CardHeader>
          <CardTitle className="text-xl">Update Password</CardTitle>
          <CardDescription>Fill in below info to update your password.</CardDescription>
        </CardHeader>
        <CardContent >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your password.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='mt-6' type="submit" disabled={isSubmitting}>SUBMIT</Button>
              {message && <p className='text-sm text-red-600 text-center p-2 bg-red-300/20'>{message}</p>}
              <p className='mt-4 text-xs text-right'>Remember your password? <Link className='text-custom-blue underline' href="/login">Log in</Link> now.</p>
            </form>
          </Form>
        </CardContent>
      </Card >
    </main >
  )
}