import { Save, X, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { toast } from 'sonner'

interface SaveChangesBarProps {
  isSaving: boolean
  onSave: () => void
  onDiscard: () => void
}

export function SaveChangesBar({
  isSaving,
  onSave,
  onDiscard,
}: SaveChangesBarProps) {
  const handleSave = async () => {
    try {
      await onSave()
      toast.success('Budget changes saved successfully!')
    } catch (error) {
      toast.error('Failed to save changes. Please try again.')
    }
  }

  const handleDiscard = () => {
    onDiscard()
    toast.info('Changes discarded')
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <Card
        variant="glass"
        className="p-4 border-2 border-border-subtle backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          {/* Icon and Message */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10 border border-warning/20">
              <AlertCircle className="w-4 h-4 text-warning" />
            </div>
            <div>
              <p className="font-medium text-sm">You have unsaved changes</p>
              <p className="text-xs text-foreground-subtle">
                Save your budget updates to apply them
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDiscard}
              disabled={isSaving}
              className="h-9 px-4"
            >
              <X className="w-4 h-4 mr-2" />
              Discard
            </Button>

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="primary-gradient hover:primary-gradient-hover h-9 px-6"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
