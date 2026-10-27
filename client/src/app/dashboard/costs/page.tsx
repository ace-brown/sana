"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/context/auth-context";
import { CostType } from "@/types";
import { useHttpClient } from "@/hooks/http-hook";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedRoute from "../ProtectedRoute";

export default function CostsPage() {
  const [estimatedCosts, setEstimatedCosts] = useState<CostType[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // const [reportId, setReportId] = useState<string | undefined>();
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const handleCheckboxChange = (service: {
    serviceName: string;
    price: number;
  }) => {
    setSelectedServices((prev) => {
      const updatedSelected = prev.includes(service.serviceName)
        ? prev.filter((name) => name !== service.serviceName)
        : [...prev, service.serviceName];

      // Calculate total price based on selected services
      const selected = estimatedCosts
        .flatMap((item) => item.selectedServices || [])
        .filter((s) => updatedSelected.includes(s.serviceName));

      setTotalPrice(selected.reduce((sum, s) => sum + s.price, 0));

      return updatedSelected;
    });
  };

  // Get the costs when component mounted
  const fetchCosts = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/costs/user/${auth.userId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setEstimatedCosts(responseData.costsForUser);
      // if (responseData.costsForUser.length > 0) {
      //   setReportId(responseData.costsForUser[0].reportId);
      // }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
    // eslint-disable-next-line
  }, [auth.userId, auth.token]);

  useEffect(() => {
    fetchCosts();
  }, [fetchCosts]);

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className="space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            We have reviewed your idea and put together these services to help
            you achieve your goals.
          </p>
        </div>

        {/*********************************************************************
         *Refactor 2: This card is used here and on the [id]/estimate cost page
         **********************************************************************/}
        {/* Costs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Services</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Select</TableHead>
                  <TableHead className="text-left">Service</TableHead>
                  <TableHead className="text-left">Price (Toman)</TableHead>
                  <TableHead className="text-left">Assigned Expert</TableHead>
                  <TableHead className="text-left">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <LoadingSpinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  estimatedCosts.length > 0 &&
                  estimatedCosts.map((item, index) =>
                    item.selectedServices && item.selectedServices.length > 0
                      ? item.selectedServices.map((service, serviceIndex) => (
                          <TableRow key={`${index}-${serviceIndex}`}>
                            <TableCell>
                              <input
                                type="checkbox"
                                className={`${
                                  service.paid ? "" : "cursor-pointer"
                                } transform scale-125`}
                                disabled={service.paid}
                                onChange={() => handleCheckboxChange(service)}
                                checked={selectedServices.includes(
                                  service.serviceName
                                )}
                              />
                            </TableCell>
                            <TableCell>{service.serviceName}</TableCell>
                            <TableCell>
                              {service.price.toLocaleString("en-US")}
                            </TableCell>
                            <TableCell>{service.expert || "N/A"}</TableCell>
                            <TableCell
                              className={`font-medium ${
                                service.paid
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }`}
                            >
                              {service.paid ? "Paid" : "Unpaid"}
                            </TableCell>
                          </TableRow>
                        ))
                      : null
                  )
                )}
              </TableBody>
            </Table>
            <div className="mt-4 text-right text-lg font-bold">
              Total: {totalPrice.toLocaleString("en-US")} Toman
            </div>
          </CardContent>
        </Card>

        {/* Payment receipt */}
        <div className="flex flex-col items-start gap-4 rounded-xl border bg-muted/40 p-6 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Send className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold">Send your payment receipt</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Please send your payment receipt to the Telegram ID below.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="https://t.me/kad9312" target="_blank" rel="noreferrer">
              t.me/kad9312
            </a>
          </Button>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-8">
          <p className="text-lg text-muted-foreground mb-4">
            Once we receive your payment receipt, your report ID will be sent to you.
          </p>
          {/* <p>
          Report ID:{" "}
          {estimatedCosts[0]?.selectedServices[0]?.paid && reportId}
        </p> */}
          <Link href="/dashboard/reports">
            <Button className="px-8 py-4 text-lg">Go to Reports</Button>
          </Link>
        </div>

        {/* Additional Information */}
        <div className="space-y-8">
          {/* How It Works */}
          <div>
            <h2 className="text-2xl font-bold">
              How We Calculate Your Plan
            </h2>
            <p className="text-muted-foreground mt-2">
              Our team carefully reviews your idea, business goals and needs.
              Based on this assessment, we create a personalized plan with the
              essential services for your idea to succeed.
            </p>
          </div>

          {/* Contact/Support */}
          <div>
            <h2 className="text-2xl font-bold">Need Help?</h2>
            <p className="text-muted-foreground mt-2">
              Have a question about your plan or need more information?
              Please{" "}
              <Link href="/contact" className="text-primary underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
