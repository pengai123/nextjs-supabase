"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User, Building2, Globe, Mail, Phone, Pencil, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { updateProfile } from "./actions";
import { formatPhoneNumber } from "@/lib/utils";
import { COUNTRY_CODES } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneCountryCode: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{1,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().optional(),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
})

export default function UserProfile({ user: { authData, profile } }: { user: { authData: any, profile: any } }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile.email,
      fullName: profile.full_name,
      phoneCountryCode: profile.phone_country_code,
      phoneNumber: profile.phone_number,
      company: "Example Corp",
      website: "https://example.com",
    },
  });

  const joinedDate = authData.created_at
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedJoinedDate = new Date(joinedDate).toLocaleDateString('en-US', options)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values:', values)
    // try {
    //   setIsLoading(true);
    //   const fullPhoneNumber = values.phoneNumber
    //     ? `+${values.phoneCountryCode}${values.phoneNumber}`
    //     : undefined;

    //   const result = await updateProfile({
    //     ...values,
    //     phoneNumber: fullPhoneNumber,
    //   });

    //   if (result.error) {
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: result.error,
    //     });
    //     return;
    //   }

    //   toast({
    //     title: "Success",
    //     description: "Your profile has been updated.",
    //   });
    //   setIsEditing(false);
    // } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Something went wrong. Please try again.",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  }

  const DisplayField = ({
    icon: Icon,
    label,
    value
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
  }) => (
    <div className="space-y-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center space-x-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-base">{value || "—"}</span>
      </div>
    </div>
  );

  const values = form.getValues();
  const formattedPhone = values.phoneNumber
    ? `+${values.phoneCountryCode} ${formatPhoneNumber(values.phoneNumber)}`
    : undefined;

  return (
    <div className="flex justify-center p-4 space-y-8">
      < Card className="p-8 w-full max-w-2xl border-0 shadow-none" >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account information
                </p>
              </div>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="border-b pb-6">
            <DisplayField
              icon={Calendar}
              label="Member Since"
              value={formattedJoinedDate}
            />
          </div>

          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="John Doe" {...field} />
                          </div>
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
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-9"
                              placeholder="you@example.com"
                              type="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2 md:col-span-2">
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="phoneCountryCode"
                        render={({ field }) => (
                          <FormItem className="w-[140px]">
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Code" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {COUNTRY_CODES.map((code) => (
                                  <SelectItem key={code.value} value={code.value}>
                                    {code.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  className="pl-9"
                                  type="tel"
                                  placeholder="(123) 456-7890"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-9"
                              placeholder="Company Name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-9"
                              placeholder="https://example.com"
                              type="url"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DisplayField
                icon={User}
                label="Full Name"
                value={values.fullName}
              />
              <DisplayField
                icon={Mail}
                label="Email"
                value={values.email}
              />
              <DisplayField
                icon={Phone}
                label="Phone Number"
                value={formattedPhone || ""}
              />
              <DisplayField
                icon={Building2}
                label="Company"
                value={values.company || ""}
              />
              <DisplayField
                icon={Globe}
                label="Website"
                value={values.website || ""}
              />
            </div>
          )}
        </div>
      </Card >
    </div >
  );

}