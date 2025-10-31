"use client"

import { MealCard } from "@/components/meal-card"

interface Meal {
  id: string
  title: string
  description: string
  location: string
  time: string
  image: string
}
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const meals: Meal[] = [
  {
    id: "1",
    title: "Veggie Pasta",
    description: "Delicious vegetarian pasta with fresh vegetables",
    location: "Green Spoon",
    time: "5:00 PM",
    image: "/veggie-pasta.png",
  },
  {
    id: "2",
    title: "Chicken Curry",
    description: "Flavorful chicken curry with rice",
    location: "Spice Hub",
    time: "6:15 PM",
    image: "/flavorful-chicken-curry.png",
  },
  {
    id: "3",
    title: "Tofu Bowl",
    description: "Healthy tofu bowl with vegetables",
    location: "Zen Kitchen",
    time: "4:30 PM",
    image: "/tofu-bowl.png",
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
            <MealCard 
              key={m.id} 
              id={m.id}
              title={m.title}
              description={m.description}
              location={m.location}
              time={m.time}
              image={m.image}
            />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border p-4 h-80 flex items-center justify-center text-foreground/60">
          Map coming soon (nearby availability)
        </div>
      </div>
    </main>
  )
}
