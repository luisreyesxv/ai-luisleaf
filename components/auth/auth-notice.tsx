type AuthNoticeProps = {
  tone: "error" | "success";
  children: React.ReactNode;
};

export function AuthNotice({ tone, children }: AuthNoticeProps) {
  const styles = {
    error: "border-danger/30 bg-danger/10 text-danger",
    success: "border-success/30 bg-success/10 text-success",
  };

  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`border px-4 py-3 text-sm font-medium ${styles[tone]}`}
    >
      {children}
    </p>
  );
}
