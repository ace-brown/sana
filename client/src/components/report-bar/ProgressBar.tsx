import React from "react";
import { useTranslations } from "next-intl";

import Container from "../common/container";
import SubSectionTitle from "../common/subsection-title";

export default function ProgressBar({
  trackingCode,
}: {
  trackingCode: string;
}) {
  const t = useTranslations();

  // Translations
  const completedTxt = t("progressBar.completed");
  const inProgressTxt = t("progressBar.inProgress");
  const pendingTxt = t("progressBar.pending");
  const ideaEvaluationTxt = t("progressBar.stages.ideaEvaluation.title");
  const prototypeTxt = t("progressBar.stages.prototype.title");
  const testTxt = t("progressBar.stages.test.title");
  const deployTxt = t("progressBar.stages.deploy.title");
  const ideaEvaluationP1Txt = t("progressBar.stages.ideaEvaluation.point1");
  const ideaEvaluationP2Txt = t("progressBar.stages.ideaEvaluation.point2");
  const ideaEvaluationP3Txt = t("progressBar.stages.ideaEvaluation.point3");
  const ideaEvaluationP4Txt = t("progressBar.stages.ideaEvaluation.point4");

  const stages = [
    {
      title: ideaEvaluationTxt,
      status: completedTxt,
      tasks: [
        { title: ideaEvaluationP1Txt, completed: true },
        { title: ideaEvaluationP2Txt, completed: true },
        { title: ideaEvaluationP3Txt, completed: true },
        { title: ideaEvaluationP4Txt, completed: true },
      ],
    },
    {
      title: prototypeTxt,
      status: inProgressTxt,
      tasks: [
        { title: ideaEvaluationP1Txt, completed: true },
        { title: ideaEvaluationP2Txt, completed: false },
        { title: ideaEvaluationP3Txt, completed: false },
      ],
    },
    {
      title: testTxt,
      status: pendingTxt,
      tasks: [
        { title: ideaEvaluationP1Txt, completed: false },
        { title: ideaEvaluationP2Txt, completed: false },
        { title: ideaEvaluationP3Txt, completed: false },
      ],
    },
    {
      title: deployTxt,
      status: pendingTxt,
      tasks: [
        { title: ideaEvaluationP1Txt, completed: false },
        { title: ideaEvaluationP2Txt, completed: false },
        { title: ideaEvaluationP3Txt, completed: false },
      ],
    },
  ];

  // Helper function to check if the status is "Completed"
  const isStatusCompleted = (status: string) =>
    status === completedTxt || status === "تکمیل‌شده";

  // Helper function to check if the status is "In Progress"
  const isStatusInProgress = (status: string) =>
    status === inProgressTxt || status === "در حال اجرا";

  return (
    <Container>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl sm:text-2xl font-bold text-gray-800 mb-2">
          {t("progressBar.title")}
        </h2>
        <p className="mb-12">{`${t(
          "report.trackingCode"
        )} : ${trackingCode}`}</p>
        <div className="flex items-center justify-between relative">
          {stages.map((stage, index) => (
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
              {index < stages.length - 1 && (
                <div className="absolute top-10 w-full h-1 -z-10">
                  <div
                    className="h-1 bg-gray-300"
                    style={{
                      width: `${((index + 1) / (stages.length - 1)) * 100}%`,
                    }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Cards */}
        <div className="flex justify-between mt-4 gap-8">
          {stages.map((stage, index) => (
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
