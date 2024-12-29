"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";

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

// New type that extends RegisterIdeaType by adding trackingCode and createdAt
export type IdeaDataType = RegisterIdeaType & {
  trackingCode: string;
  createdAt: string;
};

export default function IdeasPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ideaData, setIdeaData] = useState<IdeaDataType[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState<number | null>(null);
  const { isLoading, error, sendRequest } = useHttpClient();

  // Handle Delete idea
  function handleDeleteIdea() {
    if (ideaToDelete !== null) {
      setIdeaData((prev) => prev.filter((_, index) => index !== ideaToDelete));
      setIdeaToDelete(null);
      setIsDeleteDialogOpen(false);
      toast.success("ایده با موفقیت حذف شد");
    }
  }

  // Handle form submission
  async function handleIdeaSubmission(formData: RegisterIdeaType) {
    const ownerId = "6771c47ef18c36052e06a2e0";
    const fullName = "Adam Smith";
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/ideas",
        "POST",
        JSON.stringify({ ...formData, ownerId, fullName }),
        { "Content-Type": "application/json" }
      );

      const newIdea: IdeaDataType = {
        ...formData,
        trackingCode: responseData.idea.trackingId,
        createdAt: responseData.idea.createdAt,
      };

      setIdeaData((prevIdeas) => [...prevIdeas, newIdea]);
      setIsDialogOpen(false);
      toast.success("ایده با موفقیت ایجاد شد");
      // history.push('/');
    } catch (err) {}
  }

  return (
    <div className="p-6">
      <Toaster position="top-center" richColors />
      {/* Check if there are ideas */}
      {ideaData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mb-6">
          {ideaData.map((idea, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-lg shadow-md bg-white"
            >
              {/* First Row */}
              <div>
                <h2 className="font-bold text-lg">عنوان ایده</h2>
                <p>{idea.ideaTitle}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg">کد پیگیری</h2>
                <p>{idea.trackingCode}</p>
              </div>
              <div>
                <h2 className="font-bold text-lg">تاریخ ایجاد</h2>
                <p>{idea.createdAt}</p>
              </div>

              {/* Second Row */}
              <div className="md:col-span-3">
                <h2 className="font-bold text-lg">توضیحات</h2>
                <p>{idea.ideaDescription}</p>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2 justify-end md:col-span-3">
                <Button variant="outline" onClick={() => alert("Update logic")}>
                  ویرایش
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIdeaToDelete(index);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  حذف
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mb-6">
          هنوز هیچ ایده‌ای ثبت نشده است. برای ثبت ایده جدید، روی دکمه زیر کلیک
          کنید.
        </p>
      )}

      {/* Register Idea Button */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full bg-blue-500 text-white"
      >
        ثبت ایده جدید
      </Button>

      {/* Dialog for Modal */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              آیا مطمئن هستید که می‌خواهید حذف کنید؟
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            اگر این ایده را حذف کنید، گزارش‌های مربوط به آن نیز حذف خواهند شد.
          </DialogDescription>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              لغو
            </Button>
            <Button variant="destructive" onClick={handleDeleteIdea}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
