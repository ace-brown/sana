import React from "react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PageTitle from "@/components/common/page-title";
import P from "@/components/common/ptag";
import ReadContainer from "@/components/common/read-container";
import SubSectionTitle from "@/components/common/subsection-title";
import SubSection from "@/components/common/subsection";

export default function ResearchPage() {
  return (
    <>
      <ReadContainer>
        <PageTitle>ثبت ایده‌های </PageTitle>
        <P>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ. لورم ایپسوم
          متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ. این متن فقط برای پر
          کردن فضا قرار داده شده است و ارزش معنایی ندارد
        </P>
      </ReadContainer>
      <SubSection>
        <SubSectionTitle textAlign="center">
          تمام فرم‌های مورد نیاز
        </SubSectionTitle>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] pl-16 pr-16">
          <Card>
            <CardHeader>
              <CardTitle>گزارش</CardTitle>
            </CardHeader>
            <CardContent>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ. این متن
              برای پر کردن فضا قرار داده شده است
            </CardContent>
            <CardFooter>
              <Link
                href="/research/report"
                className="text-blue-500 font-medium hover:underline"
              >
                بیشتر بخوانید
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>ثبت ایده‌های شما</CardTitle>
            </CardHeader>
            <CardContent>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ. این متن
              برای پر کردن فضا قرار داده شده است
            </CardContent>
            <CardFooter>
              <Link
                href="/research/register-idea"
                className="text-blue-500 font-medium hover:underline"
              >
                بیشتر بخوانید
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>مسابقات علمی</CardTitle>
            </CardHeader>
            <CardContent>
              ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ. این متن
              برای پر کردن فضا قرار داده شده است
            </CardContent>
            <CardFooter>
              <Link
                href="/research/competitions"
                className="text-blue-500 font-medium hover:underline"
              >
                بیشتر بخوانید
              </Link>
            </CardFooter>
          </Card>
        </div>
      </SubSection>
    </>
  );
}
