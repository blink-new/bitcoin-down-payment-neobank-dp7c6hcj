import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Plus, Target, Home, Calendar, DollarSign, TrendingUp } from 'lucide-react'

export function SavingsGoals() {
  const goals = [
    {
      id: 1,
      title: 'Primary Home Down Payment',
      targetAmount: 80000,
      currentAmount: 45750,
      targetDate: '2026-06-01',
      monthlyContribution: 2500,
      status: 'active',
      homePrice: 400000,
      location: 'Austin, TX'
    },
    {
      id: 2,
      title: 'Investment Property',
      targetAmount: 50000,
      currentAmount: 12500,
      targetDate: '2027-12-01',
      monthlyContribution: 1000,
      status: 'paused',
      homePrice: 250000,
      location: 'Dallas, TX'
    }
  ]

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100
  }

  const calculateTimeToGoal = (current: number, target: number, monthly: number) => {
    const remaining = target - current
    const months = Math.ceil(remaining / monthly)
    return months
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">
            Track and manage your down payment savings goals
          </p>
        </div>
        <Button className="bitcoin-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Goals Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">
              {goals.filter(g => g.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all goals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {((goals.reduce((sum, goal) => sum + goal.currentAmount, 0) / goals.reduce((sum, goal) => sum + goal.targetAmount, 0)) * 100).toFixed(1)}% of total target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
          const monthsToGoal = calculateTimeToGoal(goal.currentAmount, goal.targetAmount, goal.monthlyContribution)
          const targetDate = new Date(goal.targetDate)
          
          return (
            <Card key={goal.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bitcoin-gradient rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{goal.title}</h3>
                    <p className="text-muted-foreground">{goal.location}</p>
                    <p className="text-sm text-muted-foreground">
                      Home Price: ${goal.homePrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Badge variant={goal.status === 'active' ? 'default' : 'secondary'}>
                  {goal.status}
                </Badge>
              </div>

              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {progress.toFixed(1)}% complete
                  </p>
                </div>

                {/* Goal Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-lg font-semibold">
                      ${(goal.targetAmount - goal.currentAmount).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Monthly DCA</p>
                    <p className="text-lg font-semibold">
                      ${goal.monthlyContribution.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Time to Goal</p>
                    <p className="text-lg font-semibold">
                      {monthsToGoal} months
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Target Date</p>
                    <p className="text-lg font-semibold">
                      {targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Adjust Schedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    One-time Investment
                  </Button>
                  <Button variant="outline" size="sm">
                    <Target className="w-4 h-4 mr-2" />
                    Edit Goal
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Goal Creation CTA */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Create Your Next Goal</h3>
          <p className="text-muted-foreground text-center mb-4 max-w-md">
            Set up a new down payment savings goal and start building wealth through Bitcoin investments.
          </p>
          <Button className="bitcoin-gradient text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create New Goal
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}