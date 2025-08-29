"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { convertImageToBase64 } from "@/lib/firebase-services"

interface ImageUploadProps {
  onImageUpload: (file: File, imageData: string) => void
  onImageRemove?: () => void
  className?: string
  disabled?: boolean
}

export function ImageUpload({ onImageUpload, onImageRemove, className = "", disabled = false }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (2MB limit for base64 storage)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB for base64 storage')
        return
      }

      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewURL(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      // Convert image to base64
      const imageData = await convertImageToBase64(selectedFile)
      
      // Call the parent callback with the base64 data
      onImageUpload(selectedFile, imageData)
      
      // Clear the form after successful upload
      setSelectedFile(null)
      setPreviewURL(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreviewURL(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onImageRemove?.()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewURL(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <Label htmlFor="photo">Food Image</Label>
      
      {!previewURL ? (
        <div
          className="rounded-2xl border-2 border-dashed border-muted-foreground/25 p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-muted-foreground/60" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF up to 2MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border">
            <Image
              src={previewURL}
              alt="Food preview"
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleUpload}
              disabled={uploading || disabled}
              className="bg-white/90 hover:bg-white text-foreground"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 w-4 mr-2" />
                  Process
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              disabled={uploading || disabled}
              className="bg-red-500/90 hover:bg-red-500 text-white"
            >
              <X className="w-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
