"use client";

import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import { useHttpClient } from "@/hooks/http-hook";
import { UserType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/auth-context";
import EditUserProfile from "@/components/users/EditUserProfile";

export default function AccountPage() {
  const [profileData, setProfileData] = useState<UserType>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);
  const userId = auth.userId;

  async function fetchUserProfile() {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${userId}`
      );

      setProfileData(responseData.user);
    } catch (err) {}
  }
  useEffect(() => {
    fetchUserProfile();
  }, [sendRequest, userId]);

  return (
    <div>
      <Toaster position="top-center" richColors />
      {isLoading && (
        <div className="center">
          <div>
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
          </div>
        </div>
      )}

      {/* Check if there is profile */}
      {!isLoading && profileData && (
        <div className="mb-6">
          <div className="p-4 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Row */}
              <div>
                <h2 className="font-bold text-lg">نام و نام خانوادگی</h2>
                <p>{profileData?.profile.fullName}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg">نام کاربری</h2>
                <p>{profileData?.username}</p>
              </div>

              {/* Second Row */}
              <div>
                <h2 className="font-bold text-lg">رايانامه</h2>
                <p>{profileData?.email}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg">رمز عبور</h2>
                <p>{profileData?.password}</p>
              </div>

              {/* Third Row */}
              <div className="md:col-span-2">
                <h2 className="font-bold text-lg">درباره من</h2>
                <p>{profileData?.profile.bio}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-start mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(true);
                }}
              >
                ویرایش رخ‌نما
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              >
                حذف حساب کاربری
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              آیا می‌خواهید حساب کاربری خود را حذف کنید؟
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            اگر دکمه حذف را فشار دهید، حساب کاربری شما همراه با تمامی ایده‌های
            ایجادشده و گزارش‌های مرتبط حذف خواهد شد.
          </DialogDescription>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              لغو
            </Button>
            <Button variant="destructive">حذف حساب کاربری</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[50%] max-w-[60%] mx-auto max-h-[calc(100vh-2rem)] overflow-y-auto rtl-scroll">
          <DialogHeader>
            <DialogTitle className="text-center">ویرایش رخ‌نما</DialogTitle>
          </DialogHeader>
          <EditUserProfile
            profileData={profileData}
            setProfileData={setProfileData}
            closeDialog={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
