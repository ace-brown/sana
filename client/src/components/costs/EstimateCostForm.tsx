"use client";

import React, { useContext, useState } from "react";
import { Toaster, toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";
import { Card } from "@/components/ui/card";

const predefinedServices = [
  { serviceName: "Brainstorming Session", price: 0, expert: "" },
  { serviceName: "Market Research", price: 0, expert: "" },
  { serviceName: "Competitor Analysis", price: 0, expert: "" },
  { serviceName: "Feasibility Study", price: 0, expert: "" },
  { serviceName: "Initial Design", price: 0, expert: "" },
  { serviceName: "Build Prototype", price: 0, expert: "" },
  { serviceName: "Prototype Testing", price: 0, expert: "" },
  { serviceName: "Unit Testing", price: 0, expert: "" },
  { serviceName: "Integration Testing", price: 0, expert: "" },
  { serviceName: "User Feedback", price: 0, expert: "" },
  { serviceName: "Website and Hosting Setup", price: 0, expert: "" },
  { serviceName: "Production Configuration", price: 0, expert: "" },
  { serviceName: "Product Launch", price: 0, expert: "" },
];

export default function EstimateCostForm({
  reportId,
  userId,
  fetchCosts,
}: {
  reportId: string | null;
  userId: string | null;
  fetchCosts: () => void;
}) {
  const [price, setPrice] = useState("");
  const [expert, setExpert] = useState("");
  const [serviceName, setServiceName] = useState("");
  const { error, isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  // Submit the estimate cost form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceName) {
      alert("Please select a service name");
      return;
    }

    if (isNaN(Number(price))) {
      alert("Please enter a valid price");
      return;
    }

    try {
      await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/costs`,
        "POST",
        JSON.stringify({
          userId,
          reportId,
          selectedServices: [
            {
              serviceName,
              price,
              expert,
            },
          ],
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        "Cost estimate created successfully"
      );
      fetchCosts();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error(error);
    }
  }

  return (
    <Card className="p-8">
      <Toaster position="top-center" richColors />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price
          </label>
          <Input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter the price"
            required
          />
        </div>

        <div>
          <label htmlFor="expert" className="block text-sm font-medium mb-2">
            Expert
          </label>
          <Input
            id="expert"
            value={expert}
            onChange={(e) => setExpert(e.target.value)}
            placeholder="Enter the expert's name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="serviceName"
            className="block text-sm font-medium mb-2"
          >
            Service Name
          </label>
          <Select onValueChange={(value) => setServiceName(value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {predefinedServices.map((service, index) => (
                <SelectItem key={index} value={service.serviceName}>
                  {service.serviceName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mt-4" loading={isLoading}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
