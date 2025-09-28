import { useState } from 'react'
import {
  Target,
  Calendar,
  DollarSign,
  Clock,
  Tag,
  Loader2,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Wallet,
  Shield,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Goal } from './goals'
import { toast } from 'sonner'

interface CommitGoalModalProps {
  open: boolean
  onClose: () => void
  onCommit: (goal: Partial<Goal>) => void
}

type CommitStep = 'form' | 'confirm' | 'blockchain' | 'success'

export function CommitGoalModal({
  open,
  onClose,
  onCommit,
}: CommitGoalModalProps) {
  const [step, setStep] = useState<CommitStep>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState<string>('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    cadence: 'monthly' as 'daily' | 'weekly' | 'monthly',
    startDate: '',
    category: '',
    commitmentAmount: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { value: 'emergency', label: 'Emergency Fund', icon: '🛡️' },
    { value: 'investment', label: 'Investment', icon: '📈' },
    { value: 'real-estate', label: 'Real Estate', icon: '🏠' },
    { value: 'travel', label: 'Travel', icon: '✈️' },
    { value: 'education', label: 'Education', icon: '🎓' },
    { value: 'debt', label: 'Debt Payoff', icon: '💳' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'other', label: 'Other', icon: '🎯' },
  ]

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Goal title is required'
    }
    if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
      newErrors.targetAmount = 'Target amount must be greater than 0'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    if (
      !formData.commitmentAmount ||
      parseFloat(formData.commitmentAmount) <= 0
    ) {
      newErrors.commitmentAmount = 'Commitment amount must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      setStep('confirm')
    }
  }

  const handleCommitToBlockchain = async () => {
    setStep('blockchain')
    setIsLoading(true)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 40)
      setTxHash(mockTxHash)

      // Create goal object
      const selectedCategory = categories.find(
        (cat) => cat.value === formData.category
      )
      const goalData: Partial<Goal> = {
        title: formData.title,
        description: formData.description,
        targetAmount: parseFloat(formData.targetAmount),
        cadence: formData.cadence,
        startDate: formData.startDate,
        category: selectedCategory?.label || 'Other',
        icon: selectedCategory?.icon || '🎯',
        commitmentAmount: parseFloat(formData.commitmentAmount),
        txHash: mockTxHash,
        txStatus: 'confirmed',
        isOnChain: true,
        totalMilestones: Math.ceil(
          parseFloat(formData.targetAmount) /
            parseFloat(formData.commitmentAmount)
        ),
      }

      onCommit(goalData)
      setStep('success')
      toast.success('Goal committed to blockchain successfully!')
    } catch (error) {
      toast.error('Failed to commit goal to blockchain')
      setStep('confirm')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep('form')
    setFormData({
      title: '',
      description: '',
      targetAmount: '',
      cadence: 'monthly',
      startDate: '',
      category: '',
      commitmentAmount: '',
    })
    setErrors({})
    setTxHash('')
    onClose()
  }

  const getStepContent = () => {
    switch (step) {
      case 'form':
        return (
          <div className="space-y-6">
            {/* Goal Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Emergency Fund"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className={errors.title ? 'border-error' : ''}
                />
                {errors.title && (
                  <p className="text-xs text-error">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount ($)</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="10000"
                    value={formData.targetAmount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        targetAmount: e.target.value,
                      }))
                    }
                    className={errors.targetAmount ? 'border-error' : ''}
                  />
                  {errors.targetAmount && (
                    <p className="text-xs text-error">{errors.targetAmount}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commitmentAmount">
                    Commitment Amount ($)
                  </Label>
                  <Input
                    id="commitmentAmount"
                    type="number"
                    placeholder="500"
                    value={formData.commitmentAmount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        commitmentAmount: e.target.value,
                      }))
                    }
                    className={errors.commitmentAmount ? 'border-error' : ''}
                  />
                  {errors.commitmentAmount && (
                    <p className="text-xs text-error">
                      {errors.commitmentAmount}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cadence">Contribution Frequency</Label>
                  <Select
                    value={formData.cadence}
                    onValueChange={(value: any) =>
                      setFormData((prev) => ({ ...prev, cadence: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className={errors.startDate ? 'border-error' : ''}
                  />
                  {errors.startDate && (
                    <p className="text-xs text-error">{errors.startDate}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger
                    className={errors.category ? 'border-error' : ''}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-error">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="primary-gradient hover:primary-gradient-hover"
              >
                Review Goal
              </Button>
            </div>
          </div>
        )

      case 'confirm':
        const selectedCategory = categories.find(
          (cat) => cat.value === formData.category
        )
        const estimatedMilestones = Math.ceil(
          parseFloat(formData.targetAmount) /
            parseFloat(formData.commitmentAmount)
        )

        return (
          <div className="space-y-6">
            {/* Goal Summary */}
            <Card variant="glass" className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{selectedCategory?.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{formData.title}</h3>
                  {formData.description && (
                    <p className="text-sm text-foreground-subtle mt-1">
                      {formData.description}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-foreground-muted">
                        Target Amount
                      </p>
                      <p className="font-semibold">
                        ${parseFloat(formData.targetAmount).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-muted">
                        Contribution
                      </p>
                      <p className="font-semibold">
                        $
                        {parseFloat(formData.commitmentAmount).toLocaleString()}{' '}
                        {formData.cadence}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-muted">
                        Start Date
                      </p>
                      <p className="font-semibold">
                        {new Date(formData.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-muted">
                        Est. Completion
                      </p>
                      <p className="font-semibold">
                        {estimatedMilestones} milestones
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Blockchain Info */}
            <Card variant="glass" className="p-4 border-primary/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Blockchain Commitment</h4>
                  <p className="text-xs text-foreground-subtle">
                    Your goal will be secured on-chain for transparency and
                    accountability
                  </p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('form')}>
                Back to Edit
              </Button>
              <Button
                onClick={handleCommitToBlockchain}
                className="primary-gradient hover:primary-gradient-hover"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Commit on-chain
              </Button>
            </div>
          </div>
        )

      case 'blockchain':
        return (
          <div className="space-y-6 text-center">
            <div className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Committing to Blockchain
              </h3>
              <p className="text-sm text-foreground-subtle">
                Please confirm the transaction in your wallet and wait for
                blockchain confirmation...
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span>Transaction submitted</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Loader2 className="w-2 h-2 animate-spin" />
                <span>Waiting for confirmation...</span>
              </div>
            </div>
          </div>
        )

      case 'success':
        return (
          <div className="space-y-6 text-center">
            <div className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Goal Committed Successfully!
              </h3>
              <p className="text-sm text-foreground-subtle">
                Your goal has been secured on the blockchain and is now active.
              </p>
            </div>

            {txHash && (
              <Card variant="glass" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-xs text-foreground-muted">
                      Transaction Hash
                    </p>
                    <p className="text-sm font-mono">
                      {txHash.slice(0, 20)}...
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            <Button
              onClick={handleClose}
              className="w-full primary-gradient hover:primary-gradient-hover"
            >
              View My Goals
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            {step === 'form'
              ? 'Commit New Goal'
              : step === 'confirm'
                ? 'Confirm Goal'
                : step === 'blockchain'
                  ? 'Blockchain Transaction'
                  : 'Goal Created'}
          </DialogTitle>
          <DialogDescription>
            {step === 'form'
              ? 'Create a new savings goal with blockchain-backed commitment'
              : step === 'confirm'
                ? 'Review your goal details before committing to the blockchain'
                : step === 'blockchain'
                  ? 'Processing your goal commitment on the blockchain'
                  : 'Your goal has been successfully committed to the blockchain'}
          </DialogDescription>
        </DialogHeader>
        {getStepContent()}
      </DialogContent>
    </Dialog>
  )
}
