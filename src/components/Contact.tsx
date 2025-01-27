"use client"

import { Check, Mail, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { contactFormSchema, TcontactFormData } from "@/lib/zodSchemas"
import { useState } from 'react'
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
import { submitContactMessage } from '@/app/actions'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const [errorMsg, setErrorMsg] = useState('')
  const { toast } = useToast()
  const form = useForm<TcontactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
    },
  })
  const { isSubmitting } = form.formState
  const onSubmit = async (values: TcontactFormData) => {
    setErrorMsg("")
    try {
      const res = await submitContactMessage(values)
      if (!res.success) {
        return setErrorMsg(res.message)
      }
      toast({
        title: "Success",
        description: res.message,
        action: (
          <ToastAction altText="Close">Close</ToastAction>
        ),
      })
      form.reset()
    } catch (error: any) {
      console.error(error)
      setErrorMsg(error.message)
    }
  }
  return (
    <div className="w-full py-16 lg:py-32">
      <div className="container mx-auto flex justify-center">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <Badge className="text-custom-blue" variant="outline">Contact</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Get in touch
                </h4>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                  Let's Build Something Great Together – Website Design, Development, and Hosting Solutions Tailored for You!
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-[1fr_3fr] gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" /> Email
                </div>
                <div>contact@hotlinkstudio.com</div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" /> Phone
                </div>
                <div>(602) 732-9615</div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Contact us</CardTitle>
              <CardDescription>We will get back to you asap via email.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Type your message here." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>Submit</Button>
                  {errorMsg && <p className="text-sm text-red-600 font-medium text-center p-2 bg-red-200/20">{errorMsg}</p>}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}