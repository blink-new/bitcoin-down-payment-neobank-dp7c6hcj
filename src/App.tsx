import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { Dashboard } from '@/components/pages/Dashboard'
import { SavingsGoals } from '@/components/pages/SavingsGoals'
import { BitcoinPortfolio } from '@/components/pages/BitcoinPortfolio'
import { Transactions } from '@/components/pages/Transactions'
import { Settings } from '@/components/pages/Settings'
import { Toaster } from '@/components/ui/toaster'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
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
        return <Dashboard />
    }
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