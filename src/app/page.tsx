'use client'

import React, { useState } from 'react'
import { ArrowRight, BarChart2, Lock, TrendingUp } from 'lucide-react'

// Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: 'default' | 'sm' | 'lg' }>(
  ({ className, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
    }
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// Input component
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

// Card components
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
)
Card.displayName = 'Card'

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)
CardContent.displayName = 'CardContent'

// Main component
export default function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission here
    console.log('Email submitted:', email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-8 h-8 text-green-400" />
          <span className="text-2xl font-bold">CryptoTrends</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-green-400 transition-colors">How It Works</a></li>
            <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Uncover Crypto Market Trends</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Upload your CSV data and instantly visualize cryptocurrency correlations. 
            Make informed decisions with our powerful analysis tools.
          </p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <BarChart2 className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-400">Powerful correlation analysis to identify market trends and opportunities.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <Lock className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Data Handling</h3>
                <p className="text-gray-400">Your data is processed securely and never stored on our servers.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-time Insights</h3>
                <p className="text-gray-400">Get instant visualizations of market trends and correlations.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div>
              <h3 className="text-xl font-semibold mb-2">Upload CSV</h3>
              <p className="text-gray-400">Upload your cryptocurrency data in CSV format.</p>
            </div>
            <ArrowRight className="hidden md:block w-8 h-8 text-green-400" />
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div>
              <h3 className="text-xl font-semibold mb-2">Process Data</h3>
              <p className="text-gray-400">Our system analyzes the data and calculates correlations.</p>
            </div>
            <ArrowRight className="hidden md:block w-8 h-8 text-green-400" />
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div>
              <h3 className="text-xl font-semibold mb-2">View Results</h3>
              <p className="text-gray-400">Explore the interactive heatmap of cryptocurrency correlations.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="container mx-auto px-4 py-20">
          <Card className="bg-gray-800 border-gray-700 max-w-md mx-auto">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Stay Updated</h2>
              <p className="text-gray-400 mb-4 text-center">Get notified about new features and crypto market insights.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 CryptoTrends. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}