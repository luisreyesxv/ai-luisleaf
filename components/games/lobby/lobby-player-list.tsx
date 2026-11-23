type LobbyParticipant = {
  id: string;
  display_name: string;
  joined_at: string;
};

type LobbyPlayerListProps = {
  participants: LobbyParticipant[];
};

export function LobbyPlayerList({ participants }: LobbyPlayerListProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Players</h2>

        <p className="text-sm text-muted">
          1 host · {participants.length}{" "}
          {participants.length === 1 ? "guest" : "guests"}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {/* Host */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-background text-lg"
            >
              👑
            </span>

            <div>
              <p className="font-semibold text-foreground">You</p>
              <p className="text-sm text-muted">Game host</p>
            </div>
          </div>

          <span className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground">
            Host
          </span>
        </div>

        <div className="border-t border-border" />

        {/* Guests */}
        {participants.length > 0 ? (
          <ul className="space-y-4">
            {participants.map((participant) => (
              <li key={participant.id} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-background text-foreground"
                >
                  {participant.display_name.charAt(0).toUpperCase()}
                </span>

                <span className="font-medium text-foreground">
                  {participant.display_name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-5 text-center">
            <p className="font-medium text-foreground">Waiting for players</p>

            <p className="mt-1 text-sm text-muted">
              Share your game code to invite others.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
