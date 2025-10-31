"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  // Add environment variable check
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Firebase API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Loaded' : 'Missing');
      console.log('Firebase Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Loaded' : 'Missing');
      console.log('Firebase Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Loaded' : 'Missing');
    }
  }, []);

  const params = useSearchParams()
  const router = useRouter()
  const { signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth()
  const defaultRole = (params.get("role") || "receiver") as "donor" | "receiver"
  const defaultTab = params.get("tab") || "login"
  
  const [role, setRole] = useState<"donor" | "receiver">(defaultRole)
  const [isLogin, setIsLogin] = useState(defaultTab === "login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log('Form submitted with data:', formData);
      console.log('Login mode:', isLogin);
      if (isLogin) {
        await signIn(formData.email, formData.password)
      } else {
        await signUp(formData.email, formData.password)
        // Store the user's role in localStorage upon signup
        if (typeof window !== 'undefined') {
          localStorage.setItem('userRole', role)
        }
      }
      // Redirect to dashboard or appropriate page
      router.push("/dashboard")
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: "google" | "facebook") => {
    setLoading(true)
    setError("")

    try {
      if (provider === "google") {
        await signInWithGoogle()
      } else {
        await signInWithFacebook()
      }
      router.push("/dashboard")
    } catch (error: any) {
      console.error('Social authentication error:', error);
      setError(error.message || "Social authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )

  const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-md px-4 py-12">
        <Card className="rounded-2xl shadow-soft">
          <CardHeader>
            <CardTitle className="font-[var(--font-poppins)] text-2xl">Welcome to MealMates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>I am signing up as</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as "donor" | "receiver")} 
                className="mt-2 grid grid-cols-2 gap-2"
              >
                <div className="border rounded-2xl p-3 flex items-center gap-2">
                  <RadioGroupItem id="donor" value="donor" />
                  <Label htmlFor="donor">Donor</Label>
                </div>
                <div className="border rounded-2xl p-3 flex items-center gap-2">
                  <RadioGroupItem id="receiver" value="receiver" />
                  <Label htmlFor="receiver">Receiver</Label>
                </div>
              </RadioGroup>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <Tabs value={isLogin ? "login" : "signup"} onValueChange={(value) => setIsLogin(value === "login")}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="rounded-2xl"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      className="rounded-2xl"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-2xl bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400"
                    onClick={() => handleSocialSignIn("google")}
                    disabled={loading}
                  >
                    <GoogleIcon />
                    <span className="ml-2">Continue with Google</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] text-white border-[#1877F2] hover:border-[#166FE5]"
                    onClick={() => handleSocialSignIn("facebook")}
                    disabled={loading}
                  >
                    <FacebookIcon />
                    <span className="ml-2">Continue with Facebook</span>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="rounded-2xl"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email2">Email</Label>
                    <Input 
                      id="email2" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="rounded-2xl"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password2">Password</Label>
                    <Input 
                      id="password2" 
                      type="password" 
                      className="rounded-2xl"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-2xl bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400"
                    onClick={() => handleSocialSignIn("google")}
                    disabled={loading}
                  >
                    <GoogleIcon />
                    <span className="ml-2">Continue with Google</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] text-white border-[#1877F2] hover:border-[#166FE5]"
                    onClick={() => handleSocialSignIn("facebook")}
                    disabled={loading}
                  >
                    <FacebookIcon />
                    <span className="ml-2">Continue with Facebook</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}