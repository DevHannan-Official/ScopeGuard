import Link from "next/link";
import Logo from "../shared/logo";
import { Mail } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row  items-center justify-center sm:justify-between bg-white gap-4 w-full px-4 py-2 lg:px-6">
      <div>
        <Logo />
        <div className="flex items-center gap-4 mt-2 sm:ml-4">
          <Link href={"policy"} className="text-xs hover:underline">
            Privacy Policy
          </Link>
          <Link href={"terms"} className="text-xs hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} SnapGuard. All rights reserved.
      </p>
      <div className="flex items-center gap-3">
        <Link href={"malto:hannandeveloper1@gmail.com"}>
          <Mail size={20} />
        </Link>
        <Link href={"https://facebook.com"}>
          <Image
            src={"/images/facebook.png"}
            alt="Facebook"
            width={20}
            height={20}
          />
        </Link>
        <Link href={"https://instagram.com"}>
          <Image
            src={"/images/instagram.png"}
            alt="Instagram"
            width={20}
            height={20}
          />
        </Link>
        <Link href={"https://tik-tok.com"}>
          <Image
            src={"/images/tik-tok.png"}
            alt="Tik-tok"
            width={20}
            height={20}
          />
        </Link>
        <Link href={"https://twitter.com"}>
          <Image
            src={"/images/twitter.png"}
            alt="Twitter"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
