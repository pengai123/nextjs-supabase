"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { updateEmailFormSchema, TupdateEmailFormData } from "@/lib/zodSchemas";
import { updateEmail } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export function UpdateEmail({ authData }: { authData: any }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<TupdateEmailFormData>({
    resolver: zodResolver(updateEmailFormSchema),
    defaultValues: {
      currentEmail: authData.email,
      newEmail: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState

  async function onSubmit(values: TupdateEmailFormData) {
    console.log(values);
    try {
      const result = await updateEmail(values);
      console.log('result:', result)

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        return;
      }

      toast({
        title: "Success!",
        description: result.message,
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  }


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <CardTitle>Email Address</CardTitle>
        </div>
        <CardDescription>
          Manage your email address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
            {form.getValues("currentEmail")}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Change Email</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Email Address</DialogTitle>
                <DialogDescription>
                  Enter your new email address. A verification link will be sent.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="you@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="••••••••" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button variant="outline" type="button"
                      onClick={() => {
                        form.reset()
                        setOpen(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>Send Verification Email</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-sm text-muted-foreground">
          Your email address is verified
        </p>
      </CardContent>
    </Card>
  );
}