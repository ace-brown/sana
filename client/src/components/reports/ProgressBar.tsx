import React, { useState } from "react";

import { Report, SelectedTaskType } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskModalContent from "./TaskModalContent";

type ProgressBarType = {
  foundReport: Report | undefined;
};

export default function ProgressBar({ foundReport }: ProgressBarType) {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<
    SelectedTaskType | undefined
  >();

  // Helper function to check if the status is "Completed"
  function isStatusCompleted(status: string): boolean {
    return status === "Completed";
  }

  // Helper function to check if the status is "In Progress"
  function isStatusInProgress(status: string): boolean {
    return status === "In Progress";
  }

  // Helper function to get the display label for the status
  function translateStatus(status: string) {
    switch (status) {
      case "Completed":
        return "Completed";
      case "In Progress":
        return "In Progress";
      case "Not Started":
        return "Not Started";
      default:
        return "Unknown";
    }
  }

  // Check if any report found
  if (!foundReport) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <h2 className="text-lg font-semibold">Progress Timeline</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Progress timeline not found
        </p>
      </div>
    );
  }

  // Close the task modal
  const handleCloseTaskModal = () => {
    setIsTaskDialogOpen(false);
  };

  const allTasks = foundReport.stages.flatMap((stage) => stage.tasks);
  const completedTasks = allTasks.filter((task) =>
    isStatusCompleted(task.taskStatus)
  ).length;
  const percentComplete = allTasks.length
    ? Math.round((completedTasks / allTasks.length) * 100)
    : 0;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Progress Timeline</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {`Idea Title: ${foundReport.ideaTitle}`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Report ID: ${foundReport.id}`}
          </p>
        </div>
        <div className="md:w-64">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">
              {completedTasks} of {allTasks.length} tasks
            </span>
            <span className="font-semibold text-primary">
              {percentComplete}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>
      {/* Stage cards */}
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {foundReport.stages.map((stage, index) => (
          <li key={index} className="rounded-xl border bg-background p-4">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isStatusCompleted(stage.stageStatus)
                    ? "bg-green-500 text-white"
                    : isStatusInProgress(stage.stageStatus)
                    ? "bg-yellow-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </span>
              <h3 className="font-semibold leading-tight">
                {stage.stageTitle}
              </h3>
            </div>
            <span
              className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isStatusCompleted(stage.stageStatus)
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : isStatusInProgress(stage.stageStatus)
                  ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {translateStatus(stage.stageStatus)}
            </span>
            <ul className="mt-4 space-y-1 text-sm">
              {stage.tasks.map((task, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsTaskDialogOpen(true);
                    }}
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted ${
                      task.taskStatus === "Completed"
                        ? "text-green-600 dark:text-green-400"
                        : task.taskStatus === "In Progress"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 flex-shrink-0 rounded-full border ${
                        task.taskStatus === "Completed"
                          ? "bg-green-500 border-green-500"
                          : task.taskStatus === "In Progress"
                          ? "bg-yellow-500 border-yellow-500"
                          : "border-input"
                      } flex items-center justify-center`}
                    >
                      {task.taskStatus === "Completed" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    {task.taskTitle}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {/* Task Modal */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedTask?.taskTitle}
            </DialogTitle>
          </DialogHeader>
          <TaskModalContent
            task={selectedTask}
            foundReport={foundReport}
            closeTaskModal={handleCloseTaskModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
