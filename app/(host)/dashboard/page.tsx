import { CreateGameForm } from "@/components/games/create-game-form";
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
          Ready to bring everyone together? Set up a game and get your friends
          in the room.
        </BodyText>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <Eyebrow>NEW GAME</Eyebrow>
          <SectionTitle>Set up your game</SectionTitle>
          <BodyText>
            Choose your game mode and customize the settings before inviting
            everyone to play.
          </BodyText>
        </div>

        <CreateGameForm />
      </section>
    </main>
  );
}
