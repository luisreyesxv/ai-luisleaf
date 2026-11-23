export function LobbyHeader() {
  return (
    <header className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted">
        Game lobby
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Your game is ready
      </h1>

      <p className="text-muted">Share your join code with your players.</p>
    </header>
  );
}
