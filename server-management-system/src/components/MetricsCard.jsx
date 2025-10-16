export default function MetricsCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:scale-105">
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
      
      <h3 className="mb-1 text-sm font-medium text-white/70">{title}</h3>
      <p className="mb-2 text-3xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/60">{subtitle}</p>
    </div>
  )
}

