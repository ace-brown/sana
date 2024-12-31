"use client";

import { useContext, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

import RegisterIdeaForm from "@/components/ideas/RegisterIdeaForm";
import { RegisterIdeaType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHttpClient } from "@/hooks/http-hook";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { AuthContext } from "@/context/auth-context";

export default function IdeasPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading, error, sendRequest } = useHttpClient();
  const router = useRouter();
  const auth = useContext(AuthContext);

  // Handle form submission
  async function handleIdeaSubmission(formData: RegisterIdeaType) {
    const ownerId = auth.userId;
    try {
      await sendRequest(
        "http://localhost:5000/api/ideas",
        "POST",
        JSON.stringify({ ...formData, ownerId }),
        { "Content-Type": "application/json" },
        "ایده با موفقیت ایجاد شد"
      );

      setIsDialogOpen(false);
      router.push("/dashboard/user-ideas");
    } catch (err) {}
  }

  return (
    <div className="p-6">
      <Toaster position="top-center" richColors />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}

      {error && <p className="text-center text-red-500 mb-8">{error}</p>}

      {/* Register Idea Button */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full bg-blue-500 text-white mt-8"
      >
        ثبت ایده جدید
      </Button>

      {/* Modal for registering new Idea */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[80%] max-w-[90%] mx-auto max-h-[calc(100vh-2rem)] overflow-y-auto rtl-scroll">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-center">
              ثبت ایده جدید
            </DialogTitle>
          </DialogHeader>
          <RegisterIdeaForm onSubmit={handleIdeaSubmission} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
