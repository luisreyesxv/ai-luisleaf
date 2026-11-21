import { Card } from "@/components/ui/card";
import {
  BodyText,
  Eyebrow,
  PageTitle,
  SectionTitle,
} from "@/components/ui/typography";

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-3">
        <Eyebrow>HOST DASHBOARD</Eyebrow>
        <PageTitle>Welcome back.</PageTitle>
        <BodyText className="max-w-2xl text-muted">
          Your hosting space is ready. When you're ready, you can create a room
          and invite your friends to play.
        </BodyText>
      </section>

      <Card variant="sticky" className="max-w-xl space-y-3">
        <Eyebrow>COMING NEXT</Eyebrow>
        <SectionTitle>Your first game</SectionTitle>
        <BodyText>
          Room creation and guest joining are the next features we'll build.
        </BodyText>
      </Card>
    </main>
  );
}
