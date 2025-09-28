'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from './utils'

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  value?: number
}

function Progress({
  className,
  value,
  color = 'primary',
  ...props
}: ProgressProps) {
  const colorClasses = {
    primary: 'bg-primary/20',
    secondary: 'bg-secondary/20',
    success: 'bg-success/20',
    warning: 'bg-warning/20',
    error: 'bg-error/20',
  }

  const indicatorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  }

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full',
        colorClasses[color],
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full w-full flex-1 transition-all',
          indicatorClasses[color]
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
