import { Badge } from './badge'

type TimelineItem = {
  role: string
  company: string
  period: string
  achievements: string[]
}

type TimelineProps = {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps): JSX.Element {
  return (
    <ol className="relative space-y-8 border-l border-[#2f2f2f] pl-6">
      {items.map((item) => (
        <li key={`${item.role}-${item.company}-${item.period}`} className="relative">
          <span className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full bg-accent-lavender" />
          <div className="space-y-3 rounded-xl border border-[#2f2f2f] bg-[#141414] p-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
              <p className="text-sm text-muted">{item.company}</p>
              <Badge>{item.period}</Badge>
            </div>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  )
}
