"use client";

import React, { useEffect, useState } from "react";
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

  async function fetchUsers(currentPage: number) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/users?page=${currentPage}&limit=10`
      );
      if (!response.ok) {
        throw new Error("دریافت کاربران با شکست مواجه شد");
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته‌ای رخ داد");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <Card className="p-8 mt-8 shadow">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

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
                <TableHead>Avatar</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    {user.profile.avatar ? (
                      <img
                        src={user.profile.avatar}
                        alt={`${user.username}'s avatar`}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <span>No Avatar</span>
                    )}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.profile.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
