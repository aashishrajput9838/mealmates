import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StatsCounters } from "@/components/stats-counters"
import { MealCard } from "@/components/meal-card"
import { AuthRedirect } from "@/components/AuthRedirect"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Share Food, <span className="text-primary">Share Hope</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with your community through food sharing. Donate surplus meals or find food when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth?role=donor"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Donate Food
            </a>
            <a
              href="/auth?role=receiver"
              className="inline-flex items-center justify-center rounded-full border border-input bg-background text-foreground px-8 py-3 text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Find Food
            </a>
          </div>
        </section>

        {/* Stats Section */}
        <StatsCounters />

        {/* Featured Meals Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Meals Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MealCard
              id="1"
              title="Homemade Lasagna"
              description="Fresh homemade lasagna with ground beef and ricotta cheese"
              location="Downtown"
              time="2 hours ago"
              image="/placeholder-meal-1.svg"
            />
            <MealCard
              id="2"
              title="Vegetarian Curry"
              description="Spicy vegetable curry with rice and naan bread"
              location="Westside"
              time="4 hours ago"
              image="/placeholder-meal-2.svg"
            />
            <MealCard
              id="3"
              title="Chicken Soup"
              description="Warm chicken soup perfect for cold days"
              location="North District"
              time="6 hours ago"
              image="/placeholder-meal-3.svg"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-muted/50 rounded-3xl px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Food</h3>
              <p className="text-muted-foreground">Post surplus meals or ingredients you'd like to share with your community.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Coordinate</h3>
              <p className="text-muted-foreground">Chat with others to arrange pickup times and locations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
              <p className="text-muted-foreground">Reduce food waste and help those in need in your neighborhood.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthRedirect />
    </div>
  )
}
