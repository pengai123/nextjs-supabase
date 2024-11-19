"use client"
import { signup } from '@/app/actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signupFormSchema, TsignupFormData } from "@/lib/zodSchemas"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { COUNTRY_CODES } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
      fullName: "",
      phoneCountryCode: "1",
      phoneNumber: "",
    },
  })
  const { isSubmitting } = form.formState
  const onSubmit = async (values: TsignupFormData) => {
    console.log('values:', values)
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
    <main className='flex justify-center items-center'>
      <Card className="w-full max-w-md min-h-96 border-0 shadow-none md:border md:shadow">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your details below to create your account.</CardDescription>
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
                      <Input placeholder="••••••••" type="password" {...field} />
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
                      <Input placeholder="••••••••" type="password" {...field} />
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>Phone Number (Optional)</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="phoneCountryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {COUNTRY_CODES.map((code) => (
                                <SelectItem key={code.value} value={code.value}>
                                  {code.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Phone Number (Optional)</FormLabel> */}
                        <FormControl>
                          <Input
                            className="flex-1"
                            type="tel"
                            placeholder="1234567890"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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