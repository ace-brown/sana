import { useTranslations } from "next-intl";

import P from "@/components/common/ptag";
import Text from "@/components/common/text";
import ReadContainer from "@/components/common/read-container";
import Title from "@/components/common/title";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  return (
    <ReadContainer>
      <Title>{t("title")}</Title>
      <Text>
        <p>
          ما در [نام وبسایت یا شرکت شما] ،با هدف حمایت از کارآفرینان
          ایده‌پردازان و کسب‌وکارهای نوپا تأسیس شدیم. رسالت ما ایجاد بستری است
          که بتواند شما را در تمام مراحل توسعه استارتاپ همراهی کند؛ از
          .اعتبارسنجی ایده‌ها و برنامه‌ریزی گرفته تا راه‌اندازی و توسعه
        </p>
        <P>
          با همکاری بهترین دانشگاه‌ها و متخصصان، ابزارها و منابعی را ارائه
          می‌دهیم که به شما کمک می‌کند تصمیمات بهتری بگیرید و مسیر رشد خود را
          سریع‌تر و مطمئن‌تر طی کنید. ما به قدرت ایده‌ها و اهمیت اجرای آن‌ها
          .باور داریم و تمام تلاشمان را می‌کنیم تا شما به اهداف خود برسید
        </P>
      </Text>
    </ReadContainer>
  );
}
