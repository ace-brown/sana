// "use client";

// import RegisterIdeaForm from "@/components/ideas/RegisterIdeaForm";
// import { RegisterIdeaType } from "@/types";

// export default function IdeasPage() {
//   function handleIdeaSubmission(formData: RegisterIdeaType) {
//     console.log("Data received in parent:", formData);
//     alert("Form submitted successfully!");
//   }
//   return (
//     <div>
//       <RegisterIdeaForm onSubmit={handleIdeaSubmission} />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import RegisterIdeaForm from "@/components/ideas/RegisterIdeaForm";
import { RegisterIdeaType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function IdeasPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ideaData = {
    ideaTitle: "My Amazing Idea",
    trackingCode: "12345ABC",
    createdAt: "2024-12-29",
    ideaDescription: "This is a brief description of the amazing idea.",
  };

  function handleIdeaSubmission(formData: RegisterIdeaType) {
    console.log("Data received in parent:", formData);
    alert("Form submitted successfully!");
    setIsDialogOpen(false);
  }

  return (
    <div className="p-6">
      {/* Idea Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 border p-4 rounded-lg shadow-md">
        {/* First Row */}
        <div>
          <h2 className="font-bold text-lg">:عنوان ایده</h2>
          <p>{ideaData.ideaTitle}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">:کد پیگیری</h2>
          <p>{ideaData.trackingCode}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">:تاریخ ایجاد</h2>
          <p>{ideaData.createdAt}</p>
        </div>

        {/* Second Row */}
        <div className="col-span-2">
          <h2 className="font-bold text-lg">:توضیحات</h2>
          <p>{ideaData.ideaDescription}</p>
        </div>
      </div>

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
            {/* <DialogTitle className="text-lg font-bold text-center">
              ثبت ایده جدید
            </DialogTitle> */}
          </DialogHeader>
          <RegisterIdeaForm onSubmit={handleIdeaSubmission} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
