"use client"
import { validateAuth, updatePassword } from '@/app/(auth)/actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { updatePasswordFormSchema, TupdatePasswordFormData } from "@/lib/zodSchemas"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
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
  const [message, setMessage] = useState("")

  const form = useForm<TupdatePasswordFormData>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  })
  const { isSubmitting } = form.formState
  const onSubmit = async (values: TupdatePasswordFormData) => {
    console.log('values:', values)
    setMessage("")
    try {
      await updatePassword({ password: values.newPassword })
    } catch (error: any) {
      console.log('error:', error)
      setMessage(error.message)
    }
  }

  const checkAuth = async () => {
    const res = await validateAuth()
    if (res) { setIsLoggedIn(true) }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  if (!isLoggedIn) {
    return <p>Loading...</p>
  }


  return (
    <main>
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
                      <Input placeholder="New Password" type="password" {...field} />
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
                      <Input placeholder="Confirm New Password" type="password" {...field} />
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
              <p className='mt-4 text-xs text-right'>Remember your password? <Link className='text-blue-500 underline' href="/login">Log in</Link> now.</p>
            </form>
          </Form>
        </CardContent>
      </Card >
    </main >
  )
}