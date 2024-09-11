import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, User, Phone, Lock } from "lucide-react"

export default function SignUp() {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted', { name, mobile, password, confirmPassword })
  }

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D2B3F] p-4">
      <Card className="w-full max-w-md bg-[#3A3852] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-normal text-center">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#2D2B3F] border-none placeholder-gray-500 pl-10"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="tel"
                placeholder="Mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="bg-[#2D2B3F] border-none placeholder-gray-500 pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2D2B3F] border-none placeholder-gray-500 pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#2D2B3F] border-none placeholder-gray-500 pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <Button type="submit" className="w-full bg-[#7E3AF2] hover:bg-[#6E2AD2] text-white">
              Create Account
            </Button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-400">
            Already have an account? <a href="#" className="text-[#7E3AF2] hover:underline">Log in</a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}