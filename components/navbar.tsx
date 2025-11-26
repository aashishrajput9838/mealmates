"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HandHeart, Utensils, LogOut, User, LogIn, UserPlus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <header className="w-full sticky top-0 z-40 bg-background/90 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <HandHeart className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="font-[var(--font-poppins)] font-semibold text-lg">MealMates</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/explore" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link href="/impact" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Impact
          </Link>
          <Link href="/profile" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Profile
          </Link>
          <Link href="/chat" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Chat
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild className="rounded-2xl bg-accent hover:bg-accent/90 text-foreground font-semibold">
                <Link href="/dashboard">
                  <Utensils className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || user.email || ""} />
                      <AvatarFallback>
                        {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : getUserInitials(user.email || "")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.displayName && (
                        <p className="font-medium">{user.displayName}</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/read-database" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Read Database
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="rounded-2xl bg-transparent">
                <Link href="/auth?role=receiver">
                  <Utensils className="h-4 w-4 mr-2" />
                  Find Food
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl bg-transparent">
                <Link href="/auth?role=donor">
                  <HandHeart className="h-4 w-4 mr-2" />
                  Donate Food
                </Link>
              </Button>
              <Button asChild className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/auth?tab=signup">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
