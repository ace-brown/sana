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
                <Label htmlFor="username">نام کاربری</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="shadcn"
                  className="w-full"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  این نام نمایش عمومی شماست. شما فقط می توانید این را تغییر دهید
                  هر روز
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  className="w-full"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  تنظیمات ایمیل خود را در تنظیمات حساب خود مدیریت کنید.
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
                  برای لینک دادن به کاربران دیگر می توانید به آنها اشاره کنید.
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
                  پیوندهایی را به وب سایت، وبلاگ یا پروفایل های رسانه های
                  اجتماعی خود اضافه کنید.
                </p>
              </div>

              <Button variant="outline" className="w-full mt-2">
                URL را اضافه کنید
              </Button>

              <Button className="w-full mt-4">به روز رسانی پروفایل ها</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
