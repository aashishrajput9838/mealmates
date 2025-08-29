import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-foreground/70 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} MealMates — Share Food. Spread Happiness.</p>
        <div className="flex gap-4">
          <Link href="/impact" className="hover:text-foreground">
            Impact
          </Link>
          <Link href="/profile" className="hover:text-foreground">
            Profile
          </Link>
          <Link href="/explore" className="hover:text-foreground">
            Explore
          </Link>
        </div>
      </div>
    </footer>
  )
}
