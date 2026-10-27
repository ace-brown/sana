import Link from "next/link";
import { Mail, MessageCircleQuestion } from "lucide-react";

import PageHeader from "@/components/common/page-header";

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Have a question or need support? We're here to help."
      />
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <a
          href="mailto:contact@example.com"
          className="group rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">Email</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Send us a message and our team will get back to you.
          </p>
          <p className="mt-4 font-medium text-primary group-hover:underline">
            contact@example.com
          </p>
        </a>
        <div className="rounded-2xl border bg-card p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageCircleQuestion className="h-5 w-5" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">About your plan</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already registered an idea? Your reports and cost estimates are in
            your dashboard.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block font-medium text-primary hover:underline"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
