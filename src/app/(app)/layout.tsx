import Footer from "@/components/layout/footer";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children} <Footer />
    </>
  );
}
