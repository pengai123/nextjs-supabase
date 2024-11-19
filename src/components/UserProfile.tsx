"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { updateProfile } from "@/app/actions";
import { formatPhoneNumber } from "@/lib/utils";
import { COUNTRY_CODES } from "@/lib/utils";
import { profileFormData, TprofileFormData } from "@/lib/zodSchemas";

export default function UserProfile({ user: { authData, profile } }: { user: { authData: any, profile: any } }) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<TprofileFormData>({
    resolver: zodResolver(profileFormData),
    defaultValues: {
      fullName: profile.full_name || "",
      phoneCountryCode: profile.phone_country_code || "",
      phoneNumber: profile.phone_number || "",
      company: profile.company || "",
      website: profile.website || "",
    },
  });
  const { isSubmitting } = form.formState

  const joinedDate = authData.created_at
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedJoinedDate = new Date(joinedDate).toLocaleDateString('en-US', options)

  async function onSubmit(values: TprofileFormData) {
    console.log('values:', values)
    try {
      const result = await updateProfile(values);
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
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  const DisplayField = ({
    icon: Icon,
    label,
    value
  }: {
    icon: React.ElementType;
    label: string;
    value: string | undefined;
  }) => (
    <div className="space-y-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center space-x-3">
        <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className={`text-base ${value ? "text-foreground" : "text-muted-foreground"}`}>{value || "Not set"}</span>
      </div>
    </div>
  );

  const values = form.getValues();
  const formattedPhone = values.phoneNumber
    ? `+${values.phoneCountryCode} ${formatPhoneNumber(values.phoneNumber)}`
    : undefined;

  return (
    <div className="px-2 py-20 sm:px-4 md:px-8 lg:px-16 space-y-8">
      {/* Profile header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information
          </p>
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
      <Separator />

      <div className="grid gap-6">
        <Card >
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 border-b pb-6">
                <DisplayField
                  icon={Mail}
                  label="Email Address"
                  value={authData.email}
                />
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
                                      placeholder="1234567890"
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
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
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
                    icon={Phone}
                    label="Phone Number"
                    value={formattedPhone}
                  />
                  <DisplayField
                    icon={Building2}
                    label="Company"
                    value={values.company}
                  />
                  <DisplayField
                    icon={Globe}
                    label="Website"
                    value={values.website}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card >
      </div >
    </div >
  );

}