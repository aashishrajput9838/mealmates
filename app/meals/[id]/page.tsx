import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Bike, Hand } from "lucide-react"

export default function MealDetailPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden shadow-soft">
          <img src="/meal-detail.png" alt="Meal detail" className="w-full h-auto" />
        </div>
        <div className="space-y-4">
          <h1 className="font-[var(--font-poppins)] text-3xl">Veggie Pasta from Green Spoon</h1>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/donor-heart-hands.png" alt="Donor" />
              <AvatarFallback>GS</AvatarFallback>
            </Avatar>
            <div>
              <div className="">Green Spoon</div>
              <div className="text-sm text-foreground/70 inline-flex items-center gap-1">
                <Star className="h-4 w-4 text-accent-yellow" /> 4.8 (120)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="rounded-2xl">
              <CardContent className="p-3 text-sm">
                Freshly prepared, available until 7:00 PM. Vegetarian. Contains gluten.
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="p-3 text-sm">Pickup near Main St. or local delivery within 3 km.</CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-foreground flex-1">
              <Hand className="h-4 w-4 mr-2" />
              Request Meal
            </Button>
            <Button variant="outline" className="rounded-2xl flex-1 bg-transparent">
              <Bike className="h-4 w-4 mr-2" />
              Request Delivery
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
