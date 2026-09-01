import { cn } from '@/lib/utils'

type TooltipPayload = {
  color: string
  name: string
  value: number
  dataKey: string
}

type ChartTooltipProps = {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
  valueFormatter?: (value: number, name: string) => string
  className?: string
}

export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
  className,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div
      className={cn(
        'rounded-lg border bg-background px-3 py-2.5 text-sm shadow-xl',
        'animate-in fade-in-0 zoom-in-95',
        className
      )}
    >
      {label && (
        <p className='mb-1.5 font-medium text-muted-foreground'>{label}</p>
      )}
      <div className='flex flex-col gap-1'>
        {payload.map((item, index) => (
          <div key={`${item.dataKey}-${index}`} className='flex items-center gap-2'>
            <span
              className='size-2 shrink-0 rounded-full'
              style={{ backgroundColor: item.color }}
            />
            <span className='text-muted-foreground'>{item.name}</span>
            <span className='ml-auto font-semibold tabular-nums'>
              {valueFormatter
                ? valueFormatter(item.value, item.name)
                : item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
