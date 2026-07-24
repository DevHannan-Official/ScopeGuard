import { Undo2 } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NotFoundComponent = () => {
  return (
    <div className="bg-muted w-screen min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-9xl font-semibold mb-2">404</h2>
      <h3 className="text-center text-2xl font-medium">Page Not Found!</h3>
      <p className="text-center text-sm max-w-96">
        We can't seem to find the page you're looking for. The link might be
        broken, or the URL may have changed
      </p>
      <Link
        href={"/"}
        className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
      >
        <Undo2 /> Return to HomePage
      </Link>
    </div>
  );
};

export default NotFoundComponent;
