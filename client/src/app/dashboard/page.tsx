import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  return (
    <div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <form className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="shadcn"
                  className="w-full"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  This is your public display name. You can only change this
                  once every 30 days.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  className="w-full"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Manage your email settings in your account settings.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us a little bit about yourself"
                  className="w-full"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  You can @mention other users to link to them.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urls">URLs</Label>
                <Input
                  id="urls"
                  name="urls"
                  value="https://shadcn.com"
                  className="w-full"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Add links to your website, blog, or social media profiles.
                </p>
              </div>

              <Button variant="outline" className="w-full mt-2">
                Add URL
              </Button>

              <Button className="w-full mt-4">Update Profile</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
