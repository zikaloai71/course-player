import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="container"
      style={{ padding: "64px 16px", textAlign: "center" }}
    >
      <h1>Course not found</h1>
      <p style={{ marginBlock: "12px 24px", color: "var(--muted)" }}>
        That course does not exist, or its link has changed.
      </p>
      <Link href="/courses" style={{ color: "var(--green)", fontWeight: 600 }}>
        Back to courses
      </Link>
    </main>
  );
}
