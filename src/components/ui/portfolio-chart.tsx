import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react'

interface PortfolioChartProps {
  data: Array<{
    month: string
    invested: number
    value: number
  }>
  className?: string
}

export function PortfolioChart({ data, className }: PortfolioChartProps) {
  const [timeframe, setTimeframe] = useState<'3M' | '6M' | '1Y' | 'ALL'>('1Y')
  const [chartType, setChartType] = useState<'line' | 'area'>('area')

  // Calculate performance metrics
  const totalInvested = data[data.length - 1]?.invested || 0
  const currentValue = data[data.length - 1]?.value || 0
  const totalGain = currentValue - totalInvested
  const gainPercentage = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0

  // Filter data based on timeframe
  const getFilteredData = () => {
    const monthsToShow = {
      '3M': 3,
      '6M': 6,
      '1Y': 12,
      'ALL': data.length
    }[timeframe]

    return data.slice(-monthsToShow)
  }

  const filteredData = getFilteredData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const invested = payload.find((p: any) => p.dataKey === 'invested')?.value || 0
      const value = payload.find((p: any) => p.dataKey === 'value')?.value || 0
      const gain = value - invested
      const gainPercent = invested > 0 ? ((gain / invested) * 100) : 0

      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Invested:</span>
              <span className="font-medium">${invested.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Value:</span>
              <span className="font-medium">${value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Gain:</span>
              <span className={`font-medium ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gain >= 0 ? '+' : ''}${gain.toLocaleString()} ({gainPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[hsl(var(--bitcoin-orange))]" />
              Portfolio Growth
            </CardTitle>
            <CardDescription>
              Track your Bitcoin investment performance over time
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border p-1">
              {(['3M', '6M', '1Y', 'ALL'] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className="h-7 px-3 text-xs"
                >
                  {period}
                </Button>
              ))}
            </div>
            <div className="flex rounded-lg border p-1">
              <Button
                variant={chartType === 'area' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('area')}
                className="h-7 px-3 text-xs"
              >
                Area
              </Button>
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
                className="h-7 px-3 text-xs"
              >
                Line
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Performance Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              ${currentValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Current Value</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
              totalGain >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalGain >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              {totalGain >= 0 ? '+' : ''}${totalGain.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Gain</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              gainPercentage >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {gainPercentage >= 0 ? '+' : ''}{gainPercentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Return</div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--bitcoin-orange))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--bitcoin-orange))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="invested"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  fill="url(#investedGradient)"
                  name="Invested"
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--bitcoin-orange))"
                  strokeWidth={3}
                  fill="url(#valueGradient)"
                  name="Portfolio Value"
                />
              </AreaChart>
            ) : (
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="invested"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Invested"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--bitcoin-orange))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--bitcoin-orange))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--bitcoin-orange))', strokeWidth: 2 }}
                  name="Portfolio Value"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted-foreground rounded-full opacity-60"></div>
            <span className="text-sm text-gray-600">Amount Invested</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bitcoin-gradient rounded-full"></div>
            <span className="text-sm text-gray-600">Portfolio Value</span>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="font-medium text-orange-900">Performance Insight</div>
              <div className="text-sm text-orange-800 mt-1">
                {gainPercentage >= 0 ? (
                  <>Your dollar-cost averaging strategy has generated a {gainPercentage.toFixed(1)}% return, 
                  outperforming traditional savings accounts by {(gainPercentage - 0.5).toFixed(1)} percentage points.</>
                ) : (
                  <>While your portfolio is currently down {Math.abs(gainPercentage).toFixed(1)}%, 
                  dollar-cost averaging helps reduce volatility impact over time. Stay consistent with your strategy.</>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}