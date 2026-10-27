"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";
import { UserIdeaType, UserType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import ShortenAndCopy from "@/lib/ShortenAndCopy";
import ProtectedRoute from "../../ProtectedRoute";

export default function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [ideaData, setIdeaData] = useState<UserIdeaType[] | null>(null);
  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const router = useRouter();

  // Fetch user details when component mounts or when user ID changes
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const responseData = await sendRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setUser(responseData.user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {}
    }

    fetchUserDetails();
  }, [params.id, sendRequest, auth.token]);

  // Fetch idea for the user when component mounts
  useEffect(() => {
    async function fetchIdeas() {
      try {
        setIdeaData([]);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ideas/user/${user?.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Check if response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // Update ideaData with fetched data
        setIdeaData(responseData.ideasForUser || []);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setIdeaData([]);
      }
    }

    fetchIdeas();
    // eslint-disable-next-line
  }, [user?.id]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="center">
        <div>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // No user found state
  if (!user) {
    return <p>No information found for this user</p>;
  }

  // User details display
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Card className="p-8 mt-8 shadow space-y-2">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className="flex items-center gap-2">
          <strong>User ID:</strong>
          <span>
            {user.id ? <ShortenAndCopy id={user.id} /> : "Not available"}
          </span>
        </div>
        <p>
          <strong>Username:</strong> {user.username || "Not available"}
        </p>
        <p>
          <strong>Full Name:</strong>{" "}
          {user.profile.fullName || "Not available"}
        </p>
        <p>
          <strong>Role:</strong> {user.role === "admin" ? "Admin" : "User"}
        </p>
        <p>
          <strong>Language:</strong>{" "}
          {user.settings?.language === "fa"
            ? "Persian"
            : user.settings?.language === "en"
            ? "English"
            : "Not available"}
        </p>
        <p>
          <strong>Notifications:</strong>{" "}
          {user.settings?.notifications !== undefined
            ? user.settings.notifications
              ? "Enabled"
              : "Disabled"
            : "Not available"}
        </p>
        <p>
          <strong>Avatar:</strong>{" "}
          {user.profile.avatar ? (
            <Image
              src={user.profile.avatar}
              alt={`${user.username}'s avatar`}
              className="w-32 h-32 rounded-full mt-4"
            />
          ) : (
            "No image available"
          )}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "Not available"}
        </p>
        <div className="flex items-center gap-2">
          <strong>Reports:</strong>{" "}
          {user.reports && user.reports.length > 0 ? (
            <div className="flex space-x-2">
              {user.reports.map((report, index) => (
                <ShortenAndCopy key={index} id={report} />
              ))}
            </div>
          ) : (
            "Not available"
          )}
        </div>
        <div className="flex items-center gap-2">
          <strong>Ideas:</strong>{" "}
          {user.ideas && user.ideas.length > 0 ? (
            <div className="flex space-x-2">
              {user.ideas.map((idea, index) => (
                <ShortenAndCopy key={index} id={idea} />
              ))}
            </div>
          ) : (
            "Not available"
          )}
        </div>
        <p className="mb-8">
          <strong>Bio:</strong> {user.profile.bio || "Not available"}
        </p>

        <div>
          {/*********************************************************************
           *Refactor 1: Idea card is used here and on the /user-ideas page
           **********************************************************************/}
          {!isLoading && ideaData && ideaData?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 mb-6">
              {ideaData.map((idea, index) => (
                <div key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-lg shadow-md bg-white">
                    {/* First Row */}
                    <div>
                      <h2 className="font-bold text-lg">Idea Title</h2>
                      <p>{idea.ideaTitle}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Report ID</h2>
                      <p>
                        {idea.reportId ? (
                          <ShortenAndCopy id={idea.reportId} />
                        ) : (
                          "Not available"
                        )}
                      </p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Created At</h2>
                      <p>{formatDate(idea.createdAt)}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Full Name</h2>
                      <p>{auth.fullName}</p>
                    </div>

                    {/* Second Row */}
                    <div>
                      <h2 className="font-bold text-lg">Father&apos;s Name</h2>
                      <p>{idea.fatherName}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Partners</h2>
                      <p>{idea.associate}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Country</h2>
                      <p>{idea.country}</p>
                    </div>
                    {/* Third Row */}
                    <div>
                      <h2 className="font-bold text-lg">State / Province</h2>
                      <p>{idea.state}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">City</h2>
                      <p>{idea.city}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Occupation</h2>
                      <p>{idea.career}</p>
                    </div>
                    {/* Fourth Row */}
                    <div>
                      <h2 className="font-bold text-lg">Marital Status</h2>
                      <p>{idea.maritalStatus}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Gender</h2>
                      <p>{idea.gender}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Age</h2>
                      <p>{idea.age}</p>
                    </div>
                    {/* Fifth Row */}
                    <div>
                      <h2 className="font-bold text-lg">Mobile Number</h2>
                      <p>{idea.mobileNumber}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Field of Study</h2>
                      <p>{idea.branchOfStudy}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Specialization</h2>
                      <p>{idea.branchDetail}</p>
                    </div>
                    {/* Description Row */}
                    <div className="md:col-span-3">
                      <h2 className="font-bold text-lg">Description</h2>
                      <p>{idea.ideaDescription}</p>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-4">
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => {
                        router.push(
                          `/dashboard/users/${params.id}/estimate-cost?userId=${user.id}&reportId=${idea.reportId}`
                        );
                      }}
                    >
                      Estimate Cost
                    </Button>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => router.push("/dashboard/users")}
                    >
                      Back to Users
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-gray-500 mx-4">
                This user hasn&apos;t registered any ideas yet.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => router.push("/dashboard/users")}
              >
                Back to Users
              </Button>
            </>
          )}
        </div>
      </Card>
    </ProtectedRoute>
  );
}
