"use client"

import { MealCard, type Meal } from "@/components/meal-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const meals: Meal[] = [
  {
    id: "1",
    name: "Veggie Pasta",
    cuisine: "Italian",
    veg: true,
    donor: "Green Spoon",
    distanceKm: 1.2,
    pickupTime: "5:00 PM",
    imageUrl: "/veggie-pasta.png",
  },
  {
    id: "2",
    name: "Chicken Curry",
    cuisine: "Indian",
    veg: false,
    donor: "Spice Hub",
    distanceKm: 2.8,
    pickupTime: "6:15 PM",
    imageUrl: "/flavorful-chicken-curry.png",
  },
  {
    id: "3",
    name: "Tofu Bowl",
    cuisine: "Asian",
    veg: true,
    donor: "Zen Kitchen",
    distanceKm: 0.9,
    pickupTime: "4:30 PM",
    imageUrl: "/tofu-bowl.png",
  },
]

export default function ExplorePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="font-[var(--font-poppins)] text-3xl">Explore Meals Nearby</h1>
          <Button variant="outline" className="rounded-2xl bg-transparent">
            <MapPin className="h-4 w-4 mr-2" />
            Use my location
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="Enter city or ZIP" className="rounded-2xl" />
          </div>
          <div className="space-y-2">
            <Label>Cuisine</Label>
            <Select>
              <SelectTrigger className="rounded-2xl">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Urgency</Label>
            <Select>
              <SelectTrigger className="rounded-2xl">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="soon">Expiring soon</SelectItem>
                <SelectItem value="today">Today</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Veg Only</Label>
            <div className="h-10 flex items-center">
              <Switch />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {meals.map((m) => (
            <MealCard key={m.id} meal={m} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border p-4 h-80 flex items-center justify-center text-foreground/60">
          Map coming soon (nearby availability)
        </div>
      </div>
    </main>
  )
}
