import { Server, Cpu, HardDrive, Network, Activity, MoreVertical, Play, Square, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export default function ServerCard({ server }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'status-online'
      case 'offline':
        return 'status-offline'
      case 'error':
        return 'status-error'
      default:
        return 'status-warning'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return '在线'
      case 'offline':
        return '离线'
      case 'error':
        return '错误'
      default:
        return '警告'
    }
  }

  return (
    <div className="glass-card group rounded-2xl p-6 transition-all duration-300">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Server className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{server.name}</h3>
            <p className="text-sm text-white/60">{server.host}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(server.status)}`}>
            {getStatusText(server.status)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <Cpu className="h-4 w-4" />
            <span className="text-xs">CPU</span>
          </div>
          <div className="mb-1 flex items-end gap-1">
            <span className="text-2xl font-bold text-white">{server.cpu}</span>
            <span className="mb-1 text-sm text-white/60">%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
              style={{ width: `${server.cpu}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <Activity className="h-4 w-4" />
            <span className="text-xs">内存</span>
          </div>
          <div className="mb-1 flex items-end gap-1">
            <span className="text-2xl font-bold text-white">{server.memory}</span>
            <span className="mb-1 text-sm text-white/60">%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500"
              style={{ width: `${server.memory}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <HardDrive className="h-4 w-4" />
            <span className="text-xs">磁盘</span>
          </div>
          <div className="mb-1 flex items-end gap-1">
            <span className="text-2xl font-bold text-white">{server.disk}</span>
            <span className="mb-1 text-sm text-white/60">%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
              style={{ width: `${server.disk}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <Network className="h-4 w-4" />
            <span className="text-xs">网络</span>
          </div>
          <div className="mb-1 flex items-end gap-1">
            <span className="text-2xl font-bold text-white">{server.network}</span>
            <span className="mb-1 text-sm text-white/60">MB/s</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${Math.min(server.network * 20, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 gap-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
          disabled={server.status === 'offline'}
        >
          <Play className="h-3 w-3" />
          启动
        </Button>
        <Button
          size="sm"
          className="flex-1 gap-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
          disabled={server.status === 'offline'}
        >
          <Square className="h-3 w-3" />
          停止
        </Button>
        <Button
          size="sm"
          className="flex-1 gap-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
          disabled={server.status === 'offline'}
        >
          <RotateCw className="h-3 w-3" />
          重启
        </Button>
      </div>
    </div>
  )
}

