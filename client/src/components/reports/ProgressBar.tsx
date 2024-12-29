import React from "react";

import Container from "../common/container";

export default function ProgressBar({
  trackingCode,
}: {
  trackingCode: string;
}) {
  const reports = [
    {
      trackingId: "TC-1001",
      ideaTitle: "فروشگاه مجازی",
      owner: "u1",
      stages: [
        {
          title: "ارزیابی ایده",
          status: "تکمیل شده",
          tasks: [
            { title: "تحلیل اولیه", completed: true },
            { title: "بررسی امکانات", completed: true },
            { title: "تخمین هزینه‌ها", completed: true },
            { title: "گزارش نهایی", completed: true },
          ],
        },
        {
          title: "نمونه‌سازی",
          status: "در حال انجام",
          tasks: [
            { title: "تحلیل اولیه", completed: true },
            { title: "بررسی امکانات", completed: false },
            { title: "تخمین هزینه‌ها", completed: false },
          ],
        },
        {
          title: "آزمایش",
          status: "در انتظار",
          tasks: [
            { title: "تحلیل اولیه", completed: false },
            { title: "بررسی امکانات", completed: false },
            { title: "تخمین هزینه‌ها", completed: false },
          ],
        },
        {
          title: "پیاده‌سازی",
          status: "در انتظار",
          tasks: [
            { title: "تحلیل اولیه", completed: false },
            { title: "بررسی امکانات", completed: false },
            { title: "تخمین هزینه‌ها", completed: false },
          ],
        },
      ],
    },
    {
      trackingId: "TC-1002",
      ideaTitle: "کتاب داستان",
      owner: "u2",
      stages: [
        {
          title: "ارزیابی ایده",
          status: "تکمیل شده",
          tasks: [
            { title: "تحلیل اولیه", completed: true },
            { title: "بررسی امکانات", completed: true },
            { title: "تخمین هزینه‌ها", completed: true },
            { title: "گزارش نهایی", completed: true },
          ],
        },
        {
          title: "نمونه‌سازی",
          status: "در حال انجام",
          tasks: [
            { title: "تحلیل اولیه", completed: true },
            { title: "بررسی امکانات", completed: false },
            { title: "تخمین هزینه‌ها", completed: false },
          ],
        },
        {
          title: "آزمایش",
          status: "در انتظار",
          tasks: [
            { title: "تحلیل اولیه", completed: false },
            { title: "بررسی امکانات", completed: false },
            { title: "تخمین هزینه‌ها", completed: false },
          ],
        },
        {
          title: "پیاده‌سازی",
          status: "در انتظار",
          tasks: [
            { title: "تحلیل اولیه", completed: false },
            { title: "بررسی امکانات", completed: false },
            { title: "تخمین هزینه‌ها", completed: false },
          ],
        },
      ],
    },
  ];

  // Helper function to check if the status is "Completed"
  const isStatusCompleted = (status: string) => status === "تکمیل‌شده";

  // Helper function to check if the status is "In Progress"
  const isStatusInProgress = (status: string) => status === "در حال اجرا";

  // Find the report for the given trackingCode
  const report = reports.find((report) => report.trackingId === trackingCode);

  if (!report) {
    return (
      <Container>
        <div className="container mx-auto p-6">
          <h2 className="text-3xl sm:text-2xl font-bold text-gray-800 mb-2">
            خط زمانی پیشرفت
          </h2>
          <p> خط زمانی پیشرفت پیدا نشد</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl sm:text-2xl font-bold text-gray-800 mb-2">
          خط زمانی پیشرفت
        </h2>
        <p>{`کد پیگیری : ${trackingCode}`}</p>
        <p className="mb-12">{`عنوان ایده : ${report.ideaTitle}`}</p>
        <div className="flex items-center justify-between relative">
          {report.stages.map((stage, index) => (
            <React.Fragment key={index}>
              {/* Node Title */}
              <div className="text-center w-1/4">
                <h3 className="font-bold text-lg mb-2">{stage.title}</h3>
                <div
                  className={`h-4 w-4 rounded-full mx-auto ${
                    isStatusCompleted(stage.status)
                      ? "bg-green-500"
                      : isStatusInProgress(stage.status)
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
              {/* Connecting Line */}
              {index < report.stages.length - 1 && (
                <div className="absolute top-10 w-full h-1 -z-10">
                  <div
                    className="h-1 bg-gray-300"
                    style={{
                      width: `${
                        ((index + 1) / (report.stages.length - 1)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Cards */}
        <div className="flex justify-between mt-4 gap-8">
          {report.stages.map((stage, index) => (
            <div
              key={index}
              className="w-1/4 p-4 border rounded-lg shadow-lg bg-white"
            >
              <h4
                className={`font-semibold  ${
                  isStatusCompleted(stage.status)
                    ? "text-green-500"
                    : isStatusInProgress(stage.status)
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                {stage.status}
              </h4>
              <ul className="mt-2 text-sm text-gray-600">
                {stage.tasks.map((task, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 ${
                      task.completed ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 flex-shrink-0 rounded-full border ${
                        task.completed
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {task.completed && (
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
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
