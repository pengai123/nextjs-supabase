"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="px-2 py-20 sm:px-4 md:px-8 lg:px-16 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">
          Manage how you receive notifications
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>Email Notifications</CardTitle>
            </div>
            <CardDescription>
              Manage your email notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications about account activity
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and updates
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}