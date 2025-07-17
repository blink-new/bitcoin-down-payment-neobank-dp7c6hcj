import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bitcoin, TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3, PieChart } from 'lucide-react'

export function BitcoinPortfolio() {
  // Mock portfolio data
  const portfolio = {
    totalValue: 45750.32,
    totalBTC: 0.6804,
    totalInvested: 42000,
    unrealizedGain: 3750.32,
    gainPercentage: 8.93,
    averageBuyPrice: 61764.50,
    currentPrice: 67234.50
  }

  const holdings = [
    { date: '2024-01-15', amount: 2500, btc: 0.0572, price: 43700, type: 'DCA' },
    { date: '2024-02-01', amount: 2500, btc: 0.0543, price: 46050, type: 'DCA' },
    { date: '2024-02-15', amount: 2500, btc: 0.0521, price: 47980, type: 'DCA' },
    { date: '2024-03-01', amount: 2500, btc: 0.0456, price: 54820, type: 'DCA' },
    { date: '2024-03-15', amount: 5000, btc: 0.0789, price: 63400, type: 'One-time' },
    { date: '2024-04-01', amount: 2500, btc: 0.0372, price: 67200, type: 'DCA' },
  ]

  const monthlyPerformance = [
    { month: 'Jan 2024', invested: 5000, value: 6200, gain: 24.0 },
    { month: 'Feb 2024', invested: 10000, value: 11800, gain: 18.0 },
    { month: 'Mar 2024', invested: 17500, value: 19600, gain: 12.0 },
    { month: 'Apr 2024', invested: 20000, value: 21200, gain: 6.0 },
    { month: 'May 2024', invested: 22500, value: 24800, gain: 10.2 },
    { month: 'Jun 2024', invested: 25000, value: 26500, gain: 6.0 },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bitcoin Portfolio</h1>
          <p className="text-muted-foreground">
            Track your Bitcoin investments and performance
          </p>
        </div>
        <Button className="bitcoin-gradient text-white">
          <DollarSign className="w-4 h-4 mr-2" />
          Buy Bitcoin
        </Button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Bitcoin className="h-4 w-4 text-[hsl(var(--bitcoin-orange))]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolio.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {portfolio.totalBTC.toFixed(4)} BTC
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolio.totalInvested.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Cost basis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unrealized Gain</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +${portfolio.unrealizedGain.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              +{portfolio.gainPercentage}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Buy Price</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolio.averageBuyPrice.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Current: ${portfolio.currentPrice.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Views */}
      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bitcoin Holdings</CardTitle>
              <CardDescription>
                Your Bitcoin purchase history and current holdings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding, index) => {
                  const currentValue = holding.btc * portfolio.currentPrice
                  const gain = currentValue - holding.amount
                  const gainPercentage = (gain / holding.amount) * 100

                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bitcoin-gradient rounded-full flex items-center justify-center">
                          <Bitcoin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{new Date(holding.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {holding.btc.toFixed(4)} BTC at ${holding.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${holding.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Now: ${currentValue.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={holding.type === 'DCA' ? 'default' : 'secondary'}>
                          {holding.type}
                        </Badge>
                        <p className={`text-sm ${gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {gain > 0 ? '+' : ''}${gain.toFixed(0)} ({gainPercentage.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>
                Track your portfolio growth over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyPerformance.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{month.month}</p>
                        <p className="text-sm text-muted-foreground">
                          Invested: ${month.invested.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${month.value.toLocaleString()}</p>
                      <p className={`text-sm ${month.gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {month.gain > 0 ? '+' : ''}{month.gain}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Investment Strategy</CardTitle>
                <CardDescription>
                  Your dollar-cost averaging performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">DCA Frequency</span>
                  <span className="font-medium">Bi-weekly</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Investment</span>
                  <span className="font-medium">$2,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Purchases</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">DCA vs Lump Sum</span>
                  <span className="font-medium text-green-600">+2.3% better</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
                <CardDescription>
                  Portfolio risk and volatility analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">30-day Volatility</span>
                  <span className="font-medium">12.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Max Drawdown</span>
                  <span className="font-medium text-red-600">-18.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sharpe Ratio</span>
                  <span className="font-medium">1.34</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Risk Score</span>
                  <Badge variant="outline">Moderate</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}