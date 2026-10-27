import P from "@/components/common/ptag";
import Text from "@/components/common/text";
import ReadContainer from "@/components/common/read-container";
import PageTitle from "@/components/common/page-title";

export default function AboutPage() {
  return (
    <ReadContainer>
      <PageTitle>About Us</PageTitle>
      <Text>
        <p>
          Khayam Sana was founded to support entrepreneurs, innovators and
          early-stage businesses. Our mission is to build a comprehensive
          platform that accompanies you through every step, from the moment
          your idea comes to mind until your startup reaches growth and
          stability. That includes idea validation, strategic design and
          planning, funding, initial launch and continuous development. We
          believe every idea has the potential to become a successful business
          and only needs the right support.
        </p>
        <P>
          Working closely with leading universities, experts and
          entrepreneurship advisors, we provide tools and resources that help
          you make better-informed decisions and move along your growth path
          faster and more precisely. With years of experience across many areas
          of business, our team ensures you receive strong, expert support at
          every step of the way. We believe in the power of ideas and the
          importance of executing them well, and we do everything we can to
          help you reach your goals.
        </P>
      </Text>
    </ReadContainer>
  );
}
