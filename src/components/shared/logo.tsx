import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1.5">
      <Image
        src={"/images/icon.png"}
        width={36}
        height={36}
        alt="ScopeGuard's Logo"
      />
      <span className="font-semibold text-2xl">ScopeGuard</span>
    </Link>
  );
};

export default Logo;
