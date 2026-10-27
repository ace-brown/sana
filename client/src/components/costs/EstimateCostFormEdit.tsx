"use client";

import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";

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
import { ServiceType } from "@/types";

const predefinedServices = [
  { serviceName: "Brainstorming Session" },
  { serviceName: "Market Research" },
  { serviceName: "Competitor Analysis" },
  { serviceName: "Feasibility Study" },
  { serviceName: "Initial Design" },
  { serviceName: "Build Prototype" },
  { serviceName: "Prototype Testing" },
  { serviceName: "Unit Testing" },
  { serviceName: "Integration Testing" },
  { serviceName: "User Feedback" },
  { serviceName: "Website and Hosting Setup" },
  { serviceName: "Production Configuration" },
  { serviceName: "Product Launch" },
];

type EstimateCostFormEditProps = {
  selectedService: ServiceType;
  costId: string | undefined;
  fetchCosts: () => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
};

export default function EstimateCostFormEdit({
  selectedService,
  costId,
  fetchCosts,
  setIsEditDialogOpen,
}: EstimateCostFormEditProps) {
  const [price, setPrice] = useState("");
  const [expert, setExpert] = useState("");
  const [paid, setPaid] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const { error, isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  // Initialize state with selectedService values
  useEffect(() => {
    setPrice(String(selectedService.price));
    setExpert(selectedService.expert || "");
    setPaid(selectedService.paid || false);
    setServiceName(selectedService.serviceName || "");
  }, [selectedService]);

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
        `${process.env.NEXT_PUBLIC_API_URL}/costs/${costId}`,
        "PATCH",
        JSON.stringify({
          selectedServices: [
            {
              serviceName,
              price: Number(price),
              paid,
              expert,
            },
          ],
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        "Cost estimate updated successfully"
      );
      fetchCosts();
      setIsEditDialogOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  }

  return (
    <>
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
          <Select
            onValueChange={(value) => setServiceName(value)}
            value={serviceName}
            required
          >
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

        <div className="flex items-center gap-2">
          <input
            id="paid"
            type="checkbox"
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}
          />
          <label htmlFor="paid" className="text-sm font-medium">
            Paid
          </label>
        </div>

        <Button type="submit" className="mt-4" loading={isLoading}>
          Submit
        </Button>
        {error && <p className="text-center text-red-500 mb-8">{error}</p>}
      </form>
    </>
  );
}
