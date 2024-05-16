import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="grid h-[30rem] place-content-center space-y-4">
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
    </section>
  );
}
