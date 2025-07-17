import { useState, useEffect } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { Dashboard } from '@/components/pages/Dashboard'
import { SavingsGoals } from '@/components/pages/SavingsGoals'
import { BitcoinPortfolio } from '@/components/pages/BitcoinPortfolio'
import { Transactions } from '@/components/pages/Transactions'
import { Settings } from '@/components/pages/Settings'
import LandingPage from '@/components/pages/LandingPage'
import { Toaster } from '@/components/ui/toaster'
import { blink } from '@/lib/blink'
import { TrendingUp } from 'lucide-react'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard')
    } else {
      blink.auth.login()
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />
      case 'dashboard':
        return <Dashboard />
      case 'savings-goals':
        return <SavingsGoals />
      case 'bitcoin-portfolio':
        return <BitcoinPortfolio />
      case 'transactions':
        return <Transactions />
      case 'settings':
        return <Settings />
      default:
        return <LandingPage onGetStarted={handleGetStarted} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bitcoin-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Loading BitcoinNest</h2>
          <p className="text-muted-foreground">Initializing your down payment savings...</p>
        </div>
      </div>
    )
  }

  // Show landing page by default or when explicitly requested
  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  // For authenticated app pages, require user to be logged in
  if (!user && currentPage !== 'landing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bitcoin-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to BitcoinNest</h1>
          <p className="text-muted-foreground mb-6">
            Accelerate your down payment savings through automated Bitcoin investments. 
            Sign in to start building wealth for your dream home.
          </p>
          <button 
            onClick={() => blink.auth.login()}
            className="bitcoin-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Sign In to Continue
          </button>
          <button 
            onClick={() => setCurrentPage('landing')}
            className="block w-full mt-4 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 flex flex-col overflow-hidden">
          {renderPage()}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

export default App