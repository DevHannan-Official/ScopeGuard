import Logo from "@/components/shared/logo";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="w-full flex-col min-h-screen p-4 flex items-center justify-center bg-muted gap-4">
      <Logo />
      <div className="flex items-center justify-between text-center flex-col mt-8">
        <h2 className="text-4xl mb-3">Your client just asked for more.</h2>
        <p>Paste your project scope and the new request.</p>
        <p>Get an instant answer. Protect your time. Protect your income.</p>
      </div>
      <Badge
        variant={"outline"}
        className="h-12 px-4 bg-background py-2 w-full max-w-fit flex items-center justify-between gap-8"
      >
        <div>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>HA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>KR</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </div>
        <span>Join 2,500+ freelancers who protect their scope</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
          </div>
          <span>4.9/5 from 120+ reviews</span>
        </div>
      </Badge>
    </div>
  );
};

export default HeroSection;
