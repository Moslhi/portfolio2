
export default function ArchitectureDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="arch-flow" role="img" aria-label={steps.join(' → ')}>
      {steps.map((s, i) => (
        <div key={s}>
          <div className="arch-node">
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <span>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="arch-connector">
              <span className="arch-packet" style={{ animationDelay: `${i * 0.45}s` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
