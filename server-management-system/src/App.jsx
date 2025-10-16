import { useState } from 'react'
import { Moon, Sun, Server, Activity, HardDrive, Cpu, Network, Terminal, Settings, Bell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import ServerCard from '@/components/ServerCard.jsx'
import MetricsCard from '@/components/MetricsCard.jsx'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  // Mock server data
  const servers = [
    {
      id: 1,
      name: 'Web Server 01',
      host: '192.168.1.100',
      type: 'Linux',
      status: 'online',
      cpu: 45,
      memory: 62,
      disk: 78,
      network: 1.2
    },
    {
      id: 2,
      name: 'Database Server',
      host: '192.168.1.101',
      type: 'Linux',
      status: 'online',
      cpu: 72,
      memory: 85,
      disk: 45,
      network: 0.8
    },
    {
      id: 3,
      name: 'Docker Host',
      host: '192.168.1.102',
      type: 'Docker',
      status: 'online',
      cpu: 38,
      memory: 54,
      disk: 62,
      network: 2.5
    },
    {
      id: 4,
      name: 'Backup Server',
      host: '192.168.1.103',
      type: 'Windows',
      status: 'offline',
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0
    }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen gradient-bg">
        {/* Header */}
        <header className="glass-card mx-4 mt-4 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">服务器管理系统</h1>
                <p className="text-sm text-white/70">Server Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="glass-card h-10 w-10 rounded-xl text-white hover:text-white"
                onClick={toggleDarkMode}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="glass-card h-10 w-10 rounded-xl text-white hover:text-white"
              >
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="glass-card h-10 w-10 rounded-xl text-white hover:text-white"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4">
          {/* Overview Metrics */}
          <div className="mb-6 mt-6">
            <h2 className="mb-4 text-xl font-semibold text-white">系统概览</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricsCard
                icon={<Server className="h-6 w-6" />}
                title="总服务器"
                value="4"
                subtitle="3 在线 · 1 离线"
                color="from-blue-500 to-cyan-500"
              />
              <MetricsCard
                icon={<Cpu className="h-6 w-6" />}
                title="平均CPU"
                value="51%"
                subtitle="正常运行"
                color="from-purple-500 to-pink-500"
              />
              <MetricsCard
                icon={<HardDrive className="h-6 w-6" />}
                title="平均内存"
                value="67%"
                subtitle="良好状态"
                color="from-orange-500 to-red-500"
              />
              <MetricsCard
                icon={<Network className="h-6 w-6" />}
                title="网络流量"
                value="4.5 MB/s"
                subtitle="实时监控"
                color="from-green-500 to-teal-500"
              />
            </div>
          </div>

          {/* Server List */}
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">服务器列表</h2>
              <Button className="glass-card gap-2 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Plus className="h-4 w-4" />
                添加服务器
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {servers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold text-white">快速操作</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <button className="glass-card flex flex-col items-center gap-3 rounded-2xl p-6 text-white transition-all hover:scale-105">
                <Terminal className="h-8 w-8" />
                <span className="text-sm font-medium">批量执行</span>
              </button>
              <button className="glass-card flex flex-col items-center gap-3 rounded-2xl p-6 text-white transition-all hover:scale-105">
                <Activity className="h-8 w-8" />
                <span className="text-sm font-medium">性能监控</span>
              </button>
              <button className="glass-card flex flex-col items-center gap-3 rounded-2xl p-6 text-white transition-all hover:scale-105">
                <Settings className="h-8 w-8" />
                <span className="text-sm font-medium">系统设置</span>
              </button>
              <button className="glass-card flex flex-col items-center gap-3 rounded-2xl p-6 text-white transition-all hover:scale-105">
                <Bell className="h-8 w-8" />
                <span className="text-sm font-medium">告警规则</span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="glass-card mx-4 mb-4 rounded-2xl p-4 text-center">
          <p className="text-sm text-white/70">
            Server Management System © 2025 · Open Source on GitHub
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App

