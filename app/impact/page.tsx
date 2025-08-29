"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"

const impactData = [
  { month: "Jan", meals: 120, co2: 80 },
  { month: "Feb", meals: 180, co2: 120 },
  { month: "Mar", meals: 260, co2: 170 },
  { month: "Apr", meals: 340, co2: 220 },
  { month: "May", meals: 410, co2: 270 },
]

export default function ImpactPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <h1 className="font-[var(--font-poppins)] text-3xl">Our Impact</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-sm text-foreground/70">Meals Shared</div>
              <div className="font-[var(--font-poppins)] text-2xl">12,430</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-sm text-foreground/70">Food Waste Reduced (kg)</div>
              <div className="font-[var(--font-poppins)] text-2xl">8,210</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-sm text-foreground/70">CO₂ Saved (kg)</div>
              <div className="font-[var(--font-poppins)] text-2xl">15,980</div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl shadow-soft">
          <CardContent className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData}>
                <defs>
                  <linearGradient id="meals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="meals" stroke="#4CAF50" fill="url(#meals)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="rounded-2xl">
            <Share2 className="h-4 w-4 mr-2" />
            Share Impact
          </Button>
        </div>
      </div>
    </main>
  )
}
