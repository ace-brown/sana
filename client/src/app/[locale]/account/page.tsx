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
        {/* <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/account/demo"
            >
              Profile
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/account"
            >
              Account
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/appearance"
            >
              Appearance
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/notifications"
            >
              Notifications
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/display"
            >
              Display
            </Link>
          </nav>
        </aside> */}

        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>

            <Separator className="bg-border h-[1px] w-full" />

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
// export default function AccountPage() {
//   return (
//     <div>
//       <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
//         <aside className="-mx-4 lg:w-1/5">
//           <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
//             <Link
//               className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
//               href="/account/demo"
//             >
//               Profile
//             </Link>
//             <Link
//               className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
//               href="/account"
//             >
//               Account
//             </Link>
//             <Link
//               className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
//               href="/appearance"
//             >
//               Appearance
//             </Link>
//             <Link
//               className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
//               href="/notifications"
//             >
//               Notifications
//             </Link>
//             <Link
//               className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
//               href="/display"
//             >
//               Display
//             </Link>
//           </nav>
//         </aside>

//         <div className="flex-1 lg:max-w-2xl">
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium">Profile</h3>
//               <p className="text-sm text-muted-foreground">
//                 This is how others will see you on the site.
//               </p>
//             </div>

//             <Separator className="bg-border h-[1px] w-full" />

//             <form className="space-y-8">
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   name="username"
//                   placeholder="shadcn"
//                   className="w-full"
//                 />
//                 <p className="text-[0.8rem] text-muted-foreground">
//                   This is your public display name. You can only change this
//                   once every 30 days.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   placeholder="email@example.com"
//                   className="w-full"
//                 />
//                 <p className="text-[0.8rem] text-muted-foreground">
//                   Manage your email settings in your account settings.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="bio">Bio</Label>
//                 <Textarea
//                   id="bio"
//                   name="bio"
//                   placeholder="Tell us a little bit about yourself"
//                   className="w-full"
//                 />
//                 <p className="text-[0.8rem] text-muted-foreground">
//                   You can @mention other users to link to them.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="urls">URLs</Label>
//                 <Input
//                   id="urls"
//                   name="urls"
//                   value="https://shadcn.com"
//                   className="w-full"
//                 />
//                 <p className="text-[0.8rem] text-muted-foreground">
//                   Add links to your website, blog, or social media profiles.
//                 </p>
//               </div>

//               <Button variant="outline" className="w-full mt-2">
//                 Add URL
//               </Button>

//               <Button className="w-full mt-4">Update Profile</Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
