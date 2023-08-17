import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="flex gap-4">
        <Link
          href="/trtpmf-u"
          className={buttonVariants({ variant: "outline" })}
        >
          TRT MFPagination - Update
        </Link>
        <Link
          href="/test-modal"
          className={buttonVariants({ variant: "secondary" })}
        >
          Test Modal
        </Link>
        <Button asChild variant="secondary" className="pl:3">
          <Link href="/forms/bottle-card">Card bottle</Link>
        </Button>
        <Button asChild variant="secondary" className="pl:3">
          <Link href="/wine">Wine</Link>
        </Button>{" "}
        <Button asChild variant="secondary" className="pl:3">
          <Link href="/cellar">Cellar</Link>
        </Button>
      </div>
    </div>
  );
}
