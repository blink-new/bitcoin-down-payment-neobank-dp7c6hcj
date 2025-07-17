import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, Target, Calendar, ArrowUpRight, RefreshCw } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { blink } from '@/lib/blink'

export function Dashboard() {
  const [bitcoinPrice, setBitcoinPrice] = useState(67234.50)
  const [priceChange, setPriceChange] = useState(2.34)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Mock data - in real app this would come from database
  const portfolioValue = 45750.32
  const totalInvested = 42000
  const savingsGoal = 80000
  const goalProgress = (portfolioValue / savingsGoal) * 100
  const monthlyDCA = 2500
  const nextInvestment = "Jan 20, 2025"

  // Portfolio growth chart data
  const portfolioData = [
    { month: 'Jan 2024', invested: 5000, value: 6200 },
    { month: 'Feb 2024', invested: 10000, value: 11800 },
    { month: 'Mar 2024', invested: 17500, value: 19600 },
    { month: 'Apr 2024', invested: 20000, value: 21200 },
    { month: 'May 2024', invested: 22500, value: 24800 },
    { month: 'Jun 2024', invested: 25000, value: 26500 },
    { month: 'Jul 2024', invested: 27500, value: 29800 },
    { month: 'Aug 2024', invested: 30000, value: 32100 },
    { month: 'Sep 2024', invested: 32500, value: 35600 },
    { month: 'Oct 2024', invested: 35000, value: 38900 },
    { month: 'Nov 2024', invested: 37500, value: 42300 },
    { month: 'Dec 2024', invested: 40000, value: 43800 },
    { month: 'Jan 2025', invested: 42000, value: 45750 },
  ]

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const fetchBitcoinPrice = async () => {
    setLoading(true)
    try {
      // Using a free API to get real Bitcoin price
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const data = await response.json()
      const price = parseFloat(data.bpi.USD.rate.replace(/,/g, ''))
      setBitcoinPrice(price)
      // Simulate price change (in real app, this would be calculated from historical data)
      setPriceChange((Math.random() - 0.5) * 10)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch Bitcoin price:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBitcoinPrice()
    // Update price every 30 seconds
    const interval = setInterval(fetchBitcoinPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your Bitcoin down payment savings progress
          </p>
          {user && (
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back, {user.email}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={fetchBitcoinPrice}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Price
          </Button>
          <Button className="bitcoin-gradient text-white">
            <DollarSign className="w-4 h-4 mr-2" />
            Invest Now
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <Bitcoin className="h-4 w-4 text-[hsl(var(--bitcoin-orange))]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +${(portfolioValue - totalInvested).toLocaleString()} total gain
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bitcoin Price</CardTitle>
            {priceChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${bitcoinPrice.toLocaleString()}</div>
            <p className={`text-xs ${priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}% today
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly DCA</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyDCA.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Next: {nextInvestment}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalProgress.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              ${(savingsGoal - portfolioValue).toLocaleString()} to go
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Savings Goal Progress */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Down Payment Goal</CardTitle>
            <CardDescription>
              Your progress toward your $80,000 down payment goal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  ${portfolioValue.toLocaleString()} / ${savingsGoal.toLocaleString()}
                </span>
              </div>
              <Progress value={goalProgress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Time to Goal</p>
                <p className="text-2xl font-bold">18 months</p>
                <p className="text-xs text-muted-foreground">At current rate</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Monthly Target</p>
                <p className="text-2xl font-bold">${monthlyDCA.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Auto-investing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your Bitcoin investments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="w-4 h-4 mr-2" />
              Make One-Time Investment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Adjust DCA Schedule
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Update Savings Goal
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Full Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest Bitcoin investments and transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'Jan 15, 2025', type: 'DCA Investment', amount: 2500, btc: 0.0372, status: 'completed' },
              { date: 'Jan 1, 2025', type: 'DCA Investment', amount: 2500, btc: 0.0381, status: 'completed' },
              { date: 'Dec 15, 2024', type: 'DCA Investment', amount: 2500, btc: 0.0395, status: 'completed' },
              { date: 'Dec 1, 2024', type: 'One-time Investment', amount: 5000, btc: 0.0789, status: 'completed' },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bitcoin-gradient rounded-full flex items-center justify-center">
                    <Bitcoin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.btc} BTC
                  </p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {transaction.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}