import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/abstract-profile.png" alt="Profile" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-[var(--font-poppins)] text-3xl">Alex Rivers</h1>
            <p className="text-foreground/80">Food lover and community helper.</p>
            <div className="mt-2 flex gap-2">
              <Badge className="bg-primary text-foreground">Top Donor</Badge>
              <Badge className="bg-accent text-foreground">Frequent Helper</Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-sm text-foreground/70">Meals Donated</div>
              <div className="font-[var(--font-poppins)] text-2xl">48</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-sm text-foreground/70">Meals Received</div>
              <div className="font-[var(--font-poppins)] text-2xl">12</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-sm text-foreground/70">Rating</div>
              <div className="inline-flex items-center gap-1">
                <Star className="h-5 w-5 text-accent-yellow" /> 4.9
              </div>
            </CardContent>
          </Card>
        </div>

        <section>
          <h2 className="font-[var(--font-poppins)] text-xl mb-3">Meal History</h2>
          <div className="space-y-3">
            {["Donated Veggie Pasta", "Received Fruit Basket", "Donated Soup"].map((it, i) => (
              <div key={i} className="rounded-2xl border p-3 text-sm">
                {it}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-[var(--font-poppins)] text-xl mb-3">Ratings & Reviews</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-4 text-sm">
                  <div className="inline-flex items-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-accent-yellow" />
                    <Star className="h-4 w-4 text-accent-yellow" />
                    <Star className="h-4 w-4 text-accent-yellow" />
                    <Star className="h-4 w-4 text-accent-yellow" />
                    <Star className="h-4 w-4 text-accent-yellow" />
                  </div>
                  Wonderful experience! Clear pickup and great communication.
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
