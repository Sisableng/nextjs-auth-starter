import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
const FormAuth = dynamic(() => import("@/components/auth/FormAuth"), {
  ssr: false,
  loading: () => (
    <div>
      <LoaderCircle size={60} className="animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
      <div className="flex h-80 flex-col justify-center gap-4 md:h-[30rem]">
        <Image
          src={"/next.svg"}
          width={320}
          height={320}
          alt="next-svg"
          className="dark:invert"
        />
        <div className="leading-loose">
          <h2>StarterKit</h2>
          <p className="text-muted-foreground">
            By{" "}
            <Link href={"/"} className="text-primary">
              Sisableng
            </Link>
          </p>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center pb-10">
        <FormAuth />

        <div className="absolute -z-10 h-80 w-80 rounded-full bg-primary/20 blur-xl max-sm:-top-10 md:-bottom-0 md:-left-4" />
      </div>
    </section>
  );
}
