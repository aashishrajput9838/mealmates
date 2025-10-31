"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, History, User, Loader2, X, Calendar, Package, MapPin, RefreshCw } from "lucide-react"
import Image from "next/image"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"
import { ImageUpload } from "@/components/ImageUpload"
import { useState, useEffect } from "react"
import { 
  addDonation, 
  getUserDonations, 
  getAvailableDonations, 
  updateDonationStatus,
  deleteDonation,
  type DonationWithId 
} from "@/lib/firebase-services"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [donations, setDonations] = useState<DonationWithId[]>([])
  const [availableDonations, setAvailableDonations] = useState<DonationWithId[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedDonation, setSelectedDonation] = useState<DonationWithId | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [userRole, setUserRole] = useState<"donor" | "receiver">("donor")
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expiryTime: '',
    quantity: 1,
    imageData: ''
  })

  // Load user role and donations on component mount
  useEffect(() => {
    if (user) {
      // Get user role from localStorage
      const storedRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null
      if (storedRole === 'donor' || storedRole === 'receiver') {
        setUserRole(storedRole)
      } else {
        // Default to donor if no role is stored
        setUserRole('donor')
      }
      
      loadDonations()
      loadAvailableDonations()
    }
  }, [user])

  const loadDonations = async () => {
    try {
      setLoading(true)
      const userDonations = await getUserDonations()
      setDonations(userDonations)
    } catch (error) {
      console.error('Failed to load donations:', error)
      alert('Failed to load donations. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableDonations = async () => {
    try {
      const available = await getAvailableDonations()
      setAvailableDonations(available)
    } catch (error) {
      console.error('Failed to load available donations:', error)
    }
  }

  const handleImageUpload = (file: File, imageData: string) => {
    setFormData(prev => ({ ...prev, imageData }))
  }

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, imageData: '' }))
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.imageData) {
      alert('Please fill in all required fields and upload an image')
      return
    }

    setSubmitting(true)
    try {
      // Add donation to Firestore
      await addDonation({
        title: formData.title,
        description: formData.description,
        imageData: formData.imageData,
        expiryTime: formData.expiryTime,
        quantity: formData.quantity,
        status: 'available',
        userId: user!.uid,
        userEmail: user!.email || '',
        userName: user!.displayName || '',
      })
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        expiryTime: '',
        quantity: 1,
        imageData: ''
      })
      
      // Reload donations
      await loadDonations()
      await loadAvailableDonations()
      
      alert('Food donation published successfully!')
    } catch (error) {
      console.error('Failed to publish donation:', error)
      alert('Failed to publish donation. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleViewDonation = (donation: DonationWithId) => {
    setSelectedDonation(donation)
    setShowViewModal(true)
  }

  const closeViewModal = () => {
    setShowViewModal(false)
    setSelectedDonation(null)
  }

  const handleStatusUpdate = async (donationId: string, newStatus: 'available' | 'claimed' | 'expired') => {
    try {
      await updateDonationStatus(donationId, newStatus)
      await loadDonations()
      await loadAvailableDonations()
      alert('Status updated successfully!')
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update status. Please try again.')
    }
  }

  const handleDeleteDonation = async (donationId: string) => {
    if (!confirm('Are you sure you want to delete this donation? This action cannot be undone.')) {
      return
    }

    try {
      await deleteDonation(donationId)
      await loadDonations()
      await loadAvailableDonations()
      alert('Donation deleted successfully!')
    } catch (error) {
      console.error('Failed to delete donation:', error)
      alert('Failed to delete donation. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'claimed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-[var(--font-poppins)] text-3xl">Dashboard</h1>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logout()}
                className="rounded-2xl"
              >
                Sign Out
              </Button>
            </div>
          </div>
          
          {userRole === 'donor' ? (
            // Donor view - show only donor section
            <div className="space-y-6">
              <Card className="rounded-2xl shadow-soft">
                <CardHeader>
                  <CardTitle className="font-[var(--font-poppins)]">Add Surplus Food</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <ImageUpload
                      onImageUpload={handleImageUpload}
                      onImageRemove={handleImageRemove}
                    />
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Food Title *</Label>
                        <Input 
                          id="title"
                          placeholder="e.g., Homemade Lasagna, Fresh Bread"
                          className="rounded-2xl"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea 
                          id="description"
                          rows={4} 
                          className="rounded-2xl" 
                          placeholder="Describe the meal, ingredients, allergens, etc."
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="expiryTime">Expiry Time *</Label>
                          <Input 
                            id="expiryTime"
                            type="datetime-local" 
                            className="rounded-2xl"
                            value={formData.expiryTime}
                            onChange={(e) => handleInputChange("expiryTime", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity *</Label>
                          <Input 
                            id="quantity"
                            type="number" 
                            min={1} 
                            className="rounded-2xl"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange("quantity", parseInt(e.target.value))}
                            required
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={submitting || !formData.title || !formData.description || !formData.imageData}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                          </>
                        ) : (
                          "Publish Donation"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-1 gap-6">
                <Card className="rounded-2xl shadow-soft">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-[var(--font-poppins)] flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Donation History
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={loadDonations}
                      disabled={loading}
                      className="h-8 w-8 p-0"
                    >
                      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {loading ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Loader2 className="h-8 w-8 mx-auto mb-3 animate-spin" />
                        <p>Loading donations...</p>
                      </div>
                    ) : donations.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Upload className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No donations yet</p>
                        <p className="text-sm">Your food donations will appear here</p>
                      </div>
                    ) : (
                      donations.map((donation) => (
                        <div key={donation.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="relative h-12 w-16 overflow-hidden rounded-lg">
                            <Image
                              src={donation.imageData}
                              alt={donation.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{donation.title}</div>
                            <div className={`text-xs px-2 py-1 rounded-full border inline-block ${getStatusColor(donation.status)}`}>
                              {donation.status === 'available' ? 'Available' : 
                               donation.status === 'claimed' ? 'Claimed' : 'Expired'}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="rounded-xl bg-transparent hover:bg-primary hover:text-primary-foreground"
                              onClick={() => handleViewDonation(donation)}
                            >
                              View
                            </Button>
                            {donation.status === 'available' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="rounded-xl bg-transparent hover:bg-red-500 hover:text-white hover:border-red-500"
                                onClick={() => handleDeleteDonation(donation.id)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Receiver view - show only receiver section
            <Card className="rounded-2xl shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-[var(--font-poppins)]">Available Meals</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadAvailableDonations}
                  className="h-8 px-3"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableDonations.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No meals available</p>
                    <p className="text-sm">Check back later for new donations</p>
                  </div>
                ) : (
                  availableDonations.map((donation) => (
                    <div key={donation.id} className="rounded-2xl border p-4 hover:shadow-md transition-shadow">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3">
                        <Image
                          src={donation.imageData}
                          alt={donation.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-[var(--font-poppins)] font-medium mb-1">{donation.title}</div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {donation.userName || 'Anonymous'} • {donation.quantity} serving{donation.quantity > 1 ? 's' : ''}
                      </div>
                      <Button 
                        className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => handleViewDonation(donation)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* View Donation Modal */}
        {showViewModal && selectedDonation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-[var(--font-poppins)]">Donation Details</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeViewModal}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={selectedDonation.imageData}
                      alt={selectedDonation.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title and Status */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{selectedDonation.title}</h3>
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(selectedDonation.status)}`}>
                      {selectedDonation.status === 'available' ? 'Available' : 
                       selectedDonation.status === 'claimed' ? 'Claimed' : 'Expired'}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="mt-2 text-foreground">{selectedDonation.description}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="text-xs text-muted-foreground">Quantity</Label>
                        <p className="text-sm font-medium">{selectedDonation.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="text-xs text-muted-foreground">Expires</Label>
                        <p className="text-sm font-medium">{formatDate(selectedDonation.expiryTime)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-xs text-muted-foreground">Created</Label>
                      <p className="text-sm font-medium">{formatDate(selectedDonation.createdAt?.toDate?.() || selectedDonation.createdAt)}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={closeViewModal}
                      className="flex-1"
                    >
                      Close
                    </Button>
                    {selectedDonation.status === 'available' && selectedDonation.userId === user?.uid && (
                      <Button 
                        className="flex-1"
                        onClick={() => handleStatusUpdate(selectedDonation.id, 'expired')}
                      >
                        Mark as Expired
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  )
}
