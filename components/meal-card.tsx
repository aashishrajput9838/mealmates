import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Timer, Utensils } from "lucide-react"
import Link from "next/link"

export function MealCard({ 
  id, 
  title, 
  description, 
  location, 
  time, 
  image 
}: { 
  id: string
  title: string
  description: string
  location: string
  time: string
  image: string
}) {
  return (
    <Card className="rounded-2xl overflow-hidden shadow-soft">
      <div className="relative aspect-[4/3]">
        <Image
          src={image || "/placeholder.svg?height=240&width=320&query=meal"}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 300px, 100vw"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge className="bg-primary text-primary-foreground">
            Available
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Timer className="h-4 w-4" />
            {time}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground w-full">
          <Link href={`/meals/${id}`}>
            <Utensils className="h-4 w-4 mr-2" />
            View details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
