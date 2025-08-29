"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Utensils, Leaf, Users } from "lucide-react"

type Stat = {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
}

const initial: Stat[] = [
  { label: "Meals shared today", value: 1248, icon: Utensils },
  { label: "KG of food saved", value: 876, icon: Leaf },
  { label: "Active MealMates", value: 312, icon: Users },
]

export function StatsCounters() {
  const [stats, setStats] = useState(initial)

  useEffect(() => {
    const t = setInterval(() => {
      setStats((prev) => prev.map((s) => ({ ...s, value: s.value + Math.floor(Math.random() * 3) })))
    }, 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s, idx) => {
        const Icon = s.icon
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="h-full"
          >
            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-4 flex items-center gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-2xl font-[var(--font-poppins)] font-semibold">{s.value.toLocaleString()}</div>
                  <div className="text-sm text-foreground/70">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
