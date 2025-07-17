import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Home, Calculator, Calendar, DollarSign, Target } from 'lucide-react'

interface GoalCreationModalProps {
  trigger?: React.ReactNode
  onGoalCreated?: (goal: any) => void
}

export function GoalCreationModal({ trigger, onGoalCreated }: GoalCreationModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    homePrice: '',
    downPaymentPercent: '20',
    location: '',
    targetDate: '',
    monthlyContribution: '',
    description: ''
  })

  const downPaymentAmount = formData.homePrice ? 
    (parseFloat(formData.homePrice) * parseFloat(formData.downPaymentPercent) / 100) : 0

  const monthsToGoal = formData.monthlyContribution && downPaymentAmount ? 
    Math.ceil(downPaymentAmount / parseFloat(formData.monthlyContribution)) : 0

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    const newGoal = {
      id: Date.now(),
      title: formData.title,
      targetAmount: downPaymentAmount,
      currentAmount: 0,
      targetDate: formData.targetDate,
      monthlyContribution: parseFloat(formData.monthlyContribution),
      status: 'active',
      homePrice: parseFloat(formData.homePrice),
      location: formData.location,
      description: formData.description,
      downPaymentPercent: parseFloat(formData.downPaymentPercent)
    }

    onGoalCreated?.(newGoal)
    setOpen(false)
    setStep(1)
    setFormData({
      title: '',
      homePrice: '',
      downPaymentPercent: '20',
      location: '',
      targetDate: '',
      monthlyContribution: '',
      description: ''
    })
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title && formData.homePrice && formData.location
      case 2:
        return formData.targetDate && formData.monthlyContribution
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bitcoin-gradient text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[hsl(var(--bitcoin-orange))]" />
            Create New Savings Goal
          </DialogTitle>
          <DialogDescription>
            Set up a new down payment savings goal with automated Bitcoin investments
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 py-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  step > stepNumber ? 'bg-orange-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Step 1: Home Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Tell us about your dream home</h3>
                <p className="text-sm text-muted-foreground">
                  We'll help you calculate the perfect savings plan
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Name</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Primary Home in Austin"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="homePrice">Home Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="homePrice"
                        type="number"
                        placeholder="400000"
                        className="pl-10"
                        value={formData.homePrice}
                        onChange={(e) => handleInputChange('homePrice', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="downPaymentPercent">Down Payment %</Label>
                    <Select 
                      value={formData.downPaymentPercent} 
                      onValueChange={(value) => handleInputChange('downPaymentPercent', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="15">15%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                        <SelectItem value="25">25%</SelectItem>
                        <SelectItem value="30">30%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Austin, TX"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                {downPaymentAmount > 0 && (
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-orange-800">
                          Down Payment Target:
                        </span>
                        <span className="text-lg font-bold text-orange-900">
                          ${downPaymentAmount.toLocaleString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Savings Plan */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Set your savings timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Choose when you want to buy and how much you can invest monthly
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetDate">Target Purchase Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="targetDate"
                      type="date"
                      className="pl-10"
                      value={formData.targetDate}
                      onChange={(e) => handleInputChange('targetDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Investment</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="monthlyContribution"
                      type="number"
                      placeholder="2500"
                      className="pl-10"
                      value={formData.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This amount will be automatically invested in Bitcoin bi-weekly
                  </p>
                </div>

                {monthsToGoal > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-900">
                            {monthsToGoal}
                          </div>
                          <div className="text-sm text-blue-700">
                            Months to Goal
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-900">
                            ${(parseFloat(formData.monthlyContribution) * monthsToGoal).toLocaleString()}
                          </div>
                          <div className="text-sm text-green-700">
                            Total Investment
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Review your savings goal</h3>
                <p className="text-sm text-muted-foreground">
                  Confirm the details and start your Bitcoin savings journey
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Goal Name:</span>
                    <span className="font-medium">{formData.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Home Price:</span>
                    <span className="font-medium">${parseFloat(formData.homePrice).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Down Payment:</span>
                    <span className="font-medium">
                      ${downPaymentAmount.toLocaleString()} ({formData.downPaymentPercent}%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Target Date:</span>
                    <span className="font-medium">
                      {new Date(formData.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Investment:</span>
                    <span className="font-medium">${parseFloat(formData.monthlyContribution).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Timeline:</span>
                    <span className="font-medium">{monthsToGoal} months</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Notes (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Any additional details about your home buying goals..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-orange-900">Investment Strategy</div>
                    <div className="text-sm text-orange-800 mt-1">
                      Your ${formData.monthlyContribution} will be split into bi-weekly ${(parseFloat(formData.monthlyContribution) / 2).toFixed(0)} 
                      investments, automatically purchasing Bitcoin through dollar-cost averaging to reduce volatility impact.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bitcoin-gradient text-white"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bitcoin-gradient text-white"
              >
                Create Goal
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}