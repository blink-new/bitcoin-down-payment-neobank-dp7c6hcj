import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bitcoin, ArrowUpRight, ArrowDownLeft, Search, Filter, Download, Calendar } from 'lucide-react'

export function Transactions() {
  const transactions = [
    {
      id: 'tx_001',
      date: '2025-01-15',
      type: 'buy',
      description: 'DCA Investment',
      amount: 2500,
      btc: 0.0372,
      price: 67200,
      status: 'completed',
      fee: 12.50
    },
    {
      id: 'tx_002',
      date: '2025-01-01',
      type: 'buy',
      description: 'DCA Investment',
      amount: 2500,
      btc: 0.0381,
      price: 65600,
      status: 'completed',
      fee: 12.50
    },
    {
      id: 'tx_003',
      date: '2024-12-15',
      type: 'buy',
      description: 'DCA Investment',
      amount: 2500,
      btc: 0.0395,
      price: 63300,
      status: 'completed',
      fee: 12.50
    },
    {
      id: 'tx_004',
      date: '2024-12-01',
      type: 'buy',
      description: 'One-time Investment',
      amount: 5000,
      btc: 0.0789,
      price: 63400,
      status: 'completed',
      fee: 25.00
    },
    {
      id: 'tx_005',
      date: '2024-11-15',
      type: 'buy',
      description: 'DCA Investment',
      amount: 2500,
      btc: 0.0412,
      price: 60700,
      status: 'completed',
      fee: 12.50
    },
    {
      id: 'tx_006',
      date: '2024-11-01',
      type: 'buy',
      description: 'DCA Investment',
      amount: 2500,
      btc: 0.0425,
      price: 58800,
      status: 'completed',
      fee: 12.50
    },
  ]

  const pendingTransactions = [
    {
      id: 'tx_pending_001',
      date: '2025-01-20',
      type: 'buy',
      description: 'Scheduled DCA Investment',
      amount: 2500,
      status: 'scheduled'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'scheduled':
        return 'outline'
      case 'failed':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'buy' ? ArrowDownLeft : ArrowUpRight
  }

  const getTypeColor = (type: string) => {
    return type === 'buy' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage your Bitcoin investment history
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Transaction Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Bitcoin className="h-4 w-4 text-[hsl(var(--bitcoin-orange))]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${transactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Excluding fees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${transactions.reduce((sum, tx) => sum + tx.fee, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average: ${(transactions.reduce((sum, tx) => sum + tx.fee, 0) / transactions.length).toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bitcoin Acquired</CardTitle>
            <Bitcoin className="h-4 w-4 text-[hsl(var(--bitcoin-orange))]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactions.reduce((sum, tx) => sum + tx.btc, 0).toFixed(4)}
            </div>
            <p className="text-xs text-muted-foreground">
              BTC total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy">Buy Orders</SelectItem>
                <SelectItem value="sell">Sell Orders</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Tabs */}
      <Tabs defaultValue="completed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">
            Pending & Scheduled
            {pendingTransactions.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingTransactions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Transactions</CardTitle>
              <CardDescription>
                Your transaction history and investment records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => {
                  const TypeIcon = getTypeIcon(transaction.type)
                  
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'buy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-medium">{transaction.btc.toFixed(4)} BTC</p>
                        <p className="text-sm text-muted-foreground">
                          @ ${transaction.price.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-medium ${getTypeColor(transaction.type)}`}>
                          {transaction.type === 'buy' ? '-' : '+'}${transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Fee: ${transaction.fee.toFixed(2)}
                        </p>
                      </div>
                      
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending & Scheduled Transactions</CardTitle>
              <CardDescription>
                Upcoming and processing transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingTransactions.length > 0 ? (
                <div className="space-y-4">
                  {pendingTransactions.map((transaction) => {
                    const TypeIcon = getTypeIcon(transaction.type)
                    
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              Scheduled for {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            Amount to invest
                          </p>
                        </div>
                        
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Pending Transactions</h3>
                  <p className="text-muted-foreground">
                    All your transactions have been completed successfully.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}