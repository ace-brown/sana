"use client";

import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Lightbulb, Plus } from "lucide-react";

import { useHttpClient } from "@/hooks/http-hook";
import { RegisterIdeaType, UserIdeaType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import RegisterIdeaForm from "@/components/ideas/RegisterIdeaForm";
import ShortenAndCopy from "@/lib/ShortenAndCopy";
import { AuthContext } from "@/context/auth-context";
import ProtectedRoute from "../ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";

export default function UserIdeas() {
  const [ideaData, setIdeaData] = useState<UserIdeaType[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [ideaToEdit, setIdeaToEdit] = useState<UserIdeaType | null>(null);
  const [ideaToDelete, setIdeaToDelete] = useState<number | null>(null);
  // Separate request states: loading the list vs. saving changes
  const { isLoading, sendRequest } = useHttpClient();
  const {
    isLoading: isSaving,
    error: saveError,
    sendRequest: sendSaveRequest,
    clearError: clearSaveError,
  } = useHttpClient();
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  // Register a new idea, then refresh the list
  async function handleRegisterIdea(formData: RegisterIdeaType) {
    try {
      const responseData = await sendSaveRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas`,
        "POST",
        JSON.stringify({ ...formData, ownerId: userId }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        "Idea created successfully"
      );

      setIsRegisterDialogOpen(false);
      auth.getReportId(responseData.idea.reportId);
      fetchIdeas();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  }

  // Update idea handler
  async function handleUpdateIdea(updatedIdea: RegisterIdeaType) {
    try {
      await sendSaveRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas/${ideaToEdit?.id}`,
        "PATCH",
        JSON.stringify(updatedIdea),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        "Idea updated successfully"
      );

      setIdeaData((prev) =>
        prev.map((idea) =>
          idea.id === ideaToEdit?.id ? { ...idea, ...updatedIdea } : idea
        )
      );
      fetchIdeas();
      setIsEditDialogOpen(false);
      setIdeaToEdit(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  }

  // Delete Idea Handler
  async function handleDeleteIdea() {
    if (ideaToDelete !== null) {
      const idea = ideaData[ideaToDelete];

      try {
        await sendSaveRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/ideas/${idea.id}`,
          "DELETE",
          null,
          { Authorization: "Bearer " + auth.token },
          "Idea deleted successfully"
        );

        // Update the state to remove the deleted idea
        setIdeaData((prev) =>
          prev.filter((_, index) => index !== ideaToDelete)
        );

        // Reset dialog state
        setIdeaToDelete(null);
        setIsDeleteDialogOpen(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {}
    }
  }

  async function fetchIdeas() {
    try {
      const responseData = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas/user/${userId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );

      setIdeaData(responseData.ideasForUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  }

  useEffect(() => {
    fetchIdeas();
    // eslint-disable-next-line
  }, [sendRequest, userId]);

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <Toaster position="top-center" richColors />
      {/* Header with Register New Idea */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          Register a new idea or manage the ones you&apos;ve submitted.
        </p>
        <Button
          onClick={() => {
            clearSaveError();
            setIsRegisterDialogOpen(true);
          }}
        >
          <Plus /> Register New Idea
        </Button>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && ideaData?.length == 0 && (
        <div className="flex flex-col items-center rounded-xl border border-dashed p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No ideas yet</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Register your first idea and we&apos;ll put together a plan to help
            you bring it to life.
          </p>
        </div>
      )}
      {/*********************************************************************
       *Refactor 1: Idea card is used here and on the dashboard/user/[id]/deail
       **********************************************************************/}
      {/* Check if there are ideas */}
      {!isLoading && ideaData?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mb-6">
          {ideaData.map((idea, index) => (
            <Card key={index} className="p-6 shadow-md">
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Header: title and copiable report ID */}
                <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between md:col-span-3">
                  <h3 className="text-lg font-semibold">{idea.ideaTitle}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Report ID</span>
                    {idea.reportId ? (
                      <ShortenAndCopy id={idea.reportId} />
                    ) : (
                      <span className="text-muted-foreground">Not available</span>
                    )}
                  </div>
                </div>
                {/* First Row */}
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Created At</h2>
                  <p>{formatDate(idea.createdAt)}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Full Name</h2>
                  <p>{auth.fullName}</p>
                </div>
                {/* Second Row */}
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">First Name</h2>
                  <p>{idea.firstName}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Last Name</h2>
                  <p>{idea.lastName}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Country</h2>
                  <p>{idea.country}</p>
                </div>
                {/* Third Row */}
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">State / Province</h2>
                  <p>{idea.state}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">City</h2>
                  <p>{idea.city}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Occupation</h2>
                  <p>{idea.career}</p>
                </div>
                {/* Fourth Row */}
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Gender</h2>
                  <p>{idea.gender}</p>
                </div>
                {/* Fifth Row */}
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Mobile Number</h2>
                  <p>{idea.mobileNumber}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Field of Study</h2>
                  <p>{idea.branchOfStudy}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Specialization</h2>
                  <p>{idea.branchDetail}</p>
                </div>
                {/* Description Row */}
                <div className="md:col-span-3">
                  <h2 className="text-sm font-medium text-muted-foreground">Description</h2>
                  <p>{idea.ideaDescription}</p>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2 justify-end md:col-span-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIdeaToEdit(idea);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIdeaToDelete(index);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              Are you sure you want to delete this?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            If you delete this idea, its related reports will be deleted too.
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
              onClick={handleDeleteIdea}
              loading={isSaving}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Register Idea Modal */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register New Idea</DialogTitle>
          </DialogHeader>
          {saveError && <p className="text-sm text-destructive">{saveError}</p>}
          <RegisterIdeaForm
            onSubmit={handleRegisterIdea}
            isSubmitting={isSaving}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Idea Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Idea</DialogTitle>
          </DialogHeader>
          {ideaToEdit && (
            <RegisterIdeaForm
              onSubmit={(data) => handleUpdateIdea(data)}
              isSubmitting={isSaving}
              defaultValues={{
                firstName: ideaToEdit.firstName,
                lastName: ideaToEdit.lastName,
                country: ideaToEdit.country,
                state: ideaToEdit.state,
                city: ideaToEdit.city,
                career: ideaToEdit.career,
                gender: ideaToEdit.gender,
                mobileNumber: ideaToEdit.mobileNumber,
                branchOfStudy: ideaToEdit.branchOfStudy,
                branchDetail: ideaToEdit.branchDetail,
                ideaTitle: ideaToEdit.ideaTitle,
                ideaDescription: ideaToEdit.ideaDescription,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
