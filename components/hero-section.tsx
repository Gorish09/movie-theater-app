import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      <div
        className="h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop')",
        }}
      >
        <div className="container relative flex h-full flex-col items-start justify-center space-y-4 text-white">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Experience Movies Like Never Before
          </h1>
          <p className="max-w-xl text-lg text-gray-200">
            Book your tickets now for the latest blockbusters and enjoy premium viewing experience in our
            state-of-the-art theaters.
          </p>
          <Button size="lg" asChild>
            <Link href="/movies">Book Tickets Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
