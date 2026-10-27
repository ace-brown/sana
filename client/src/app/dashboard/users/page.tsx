"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import ProtectedRoute from "@/app/dashboard/ProtectedRoute";
import Image from "next/image";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  profile: {
    fullName: string;
    avatar?: string;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const router = useRouter();

  async function fetchUsers(currentPage: number) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Card className="p-8 mt-8 shadow">
        {isLoading && (
          <div>
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-full mb-2" />
          </div>
        )}

        {error && <p className="text-red-500">Error: {error}</p>}

        {!isLoading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Avatar</TableHead>
                  <TableHead className="text-left">Username</TableHead>
                  <TableHead className="text-left">Full Name</TableHead>
                  <TableHead className="text-left">Email</TableHead>
                  <TableHead className="text-left">Role</TableHead>
                  <TableHead className="text-left">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.profile.avatar ? (
                        <Image
                          src={user.profile.avatar}
                          alt={`${user.username}'s avatar`}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <span>No avatar</span>
                      )}
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.profile.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() =>
                          router.push(`/dashboard/users/${user._id}`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                variant="outline"
              >
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Card>
    </ProtectedRoute>
  );
}
