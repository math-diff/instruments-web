import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand">Page not found</h1>
      <p className="mt-2 text-ink-soft">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
      >
        Back to home
      </Link>
    </Container>
  );
}
