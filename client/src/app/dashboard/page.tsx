"use client";

import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

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
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { AuthContext } from "@/context/auth-context";
import EditUserProfile from "@/components/users/EditUserProfile";
import ProtectedRoute from "./ProtectedRoute";

export default function AccountPage() {
  const [profileData, setProfileData] = useState<UserType>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const { isLoading: isDeleting, sendRequest: sendDeleteRequest } =
    useHttpClient();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const auth = useContext(AuthContext);
  const userId = auth.userId;

  // Delete user account
  async function handleDeleteAccount() {
    try {
      await sendDeleteRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token },
        "Your account was deleted successfully"
      );

      auth.logout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to delete your account. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  }

  // Fetch user profile
  async function fetchUserProfile() {
    try {
      const responseData = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );

      setProfileData(responseData.user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  }

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line
  }, [userId]);

  // Return the main content
  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <Toaster position="top-center" richColors />
      {isLoading && (
        <LoadingSpinner />
      )}

      {/* Check if there is profile */}
      {!isLoading && profileData && (
        <div className="mb-6">
          <div className="p-4 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Row */}
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Full Name</h2>
                <p>{profileData?.profile.fullName}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Username</h2>
                <p>{profileData?.username}</p>
              </div>

              {/* Second Row */}
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Email</h2>
                <p>{profileData?.email}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Password</h2>
                <div className="relative flex items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={profileData?.password}
                    readOnly
                    className="w-full bg-transparent py-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Third Row */}
              <div className="md:col-span-2">
                <h2 className="text-sm font-medium text-muted-foreground">About Me</h2>
                <p>{profileData?.profile.bio}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-start mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              >
                Delete Account
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
              Do you want to delete your account?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            If you press delete, your account will be deleted along with all
            the ideas you created and their related reports.
          </DialogDescription>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              loading={isDeleting}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Profile</DialogTitle>
          </DialogHeader>
          <EditUserProfile
            profileData={profileData}
            setProfileData={setProfileData}
            closeDialog={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
