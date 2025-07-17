import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, Target, Calendar, ArrowUpRight } from 'lucide-react'

export function Dashboard() {
  // Mock data - in real app this would come from API/database
  const portfolioValue = 45750.32
  const totalInvested = 42000
  const bitcoinPrice = 67234.50
  const priceChange = 2.34
  const savingsGoal = 80000
  const goalProgress = (portfolioValue / savingsGoal) * 100
  const monthlyDCA = 2500
  const nextInvestment = "Jan 20, 2025"

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your Bitcoin down payment savings progress
          </p>
        </div>
        <Button className="bitcoin-gradient text-white">
          <DollarSign className="w-4 h-4 mr-2" />
          Invest Now
        </Button>
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
              {priceChange > 0 ? '+' : ''}{priceChange}% today
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