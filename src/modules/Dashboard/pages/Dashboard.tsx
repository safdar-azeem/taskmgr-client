import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { useEffect, useState, useCallback } from 'react'
import { TaskForm } from '@/modules/Tasks/components/TaskForm'
import { TeamForm } from '@/modules/Teams/components/TeamForm'
import { TaskService } from '@/modules/Tasks/service/task.service'
import { TeamService } from '@/modules/Teams/service/team.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { CheckSquare, Users, Clock, CheckCircle, AlertCircle, TrendingUp, MoreHorizontal, Plus } from 'lucide-react'

interface StatItem {
  label: string
  value: number
  icon: any
  description: string
  color: string
  bg: string
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<StatItem[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)

  const fetchDashboardData = useCallback(async () => {
    try {
      const taskStats = await TaskService.getStats()
      const teamsResponse = await TeamService.getAll({ limit: 5, sort: '-updatedAt' })
      const teams = teamsResponse?.data?.teams || []

      const totalTasks = taskStats.reduce((acc: number, curr: any) => acc + curr.count, 0)
      const inProgress = taskStats.find((s: any) => s._id === 'in-progress')?.count || 0
      const done = taskStats.find((s: any) => s._id === 'done')?.count || 0
      const review = taskStats.find((s: any) => s._id === 'review')?.count || 0

      setStats([
        {
          label: 'Total Tasks',
          value: totalTasks,
          icon: CheckSquare,
          description: '+12% from last month',
          color: 'text-primary',
          bg: 'bg-primary-light',
        },
        {
          label: 'In Progress',
          value: inProgress,
          icon: Clock,
          description: 'Currently active',
          color: 'text-info',
          bg: 'bg-info-light',
        },
        {
          label: 'Review',
          value: review,
          icon: AlertCircle,
          description: 'Needs attention',
          color: 'text-warning-fg',
          bg: 'bg-warning-light',
        },
        {
          label: 'Completed',
          value: done,
          icon: CheckCircle,
          description: 'Tasks finished',
          color: 'text-success',
          bg: 'bg-success-light',
        },
      ])

      setRecentActivity(teams)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const handleTaskSuccess = () => {
    setIsTaskModalOpen(false)
    fetchDashboardData()
  }

  const handleTeamSuccess = () => {
    setIsTeamModalOpen(false)
    fetchDashboardData()
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">Overview of your projects and team performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">
            Download Report
          </Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            View Insights
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200 border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <div className={cn('p-2 rounded-lg', stat.bg)}>
                    <Icon className={cn('h-4 w-4', stat.color)} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-full lg:col-span-4 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Teams</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">No teams found.</p>
              ) : (
                recentActivity.map((team: any) => (
                  <div key={team._id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 font-bold border border-gray-200">
                        {team.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors cursor-pointer">
                          {team.name}
                        </p>
                        <p className="text-xs text-gray-500">{team.members.length} members • Updated recently</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-gray-50 text-gray-600">
                      Active
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3 border-none shadow-sm bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-300">Streamline your workflow with these shortcuts.</p>
            <div className="grid gap-3">
              <Button
                variant="secondary"
                onClick={() => setIsTaskModalOpen(true)}
                className="w-full justify-start text-gray-900 hover:bg-gray-100 border-none">
                <CheckSquare className="mr-2 h-4 w-4" /> Create New Task
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsTeamModalOpen(true)}
                className="w-full justify-start text-gray-900 hover:bg-gray-100 border-none">
                <Users className="mr-2 h-4 w-4" /> Create New Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Modals */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Create New Task">
        <TaskForm onSuccess={handleTaskSuccess} onCancel={() => setIsTaskModalOpen(false)} />
      </Modal>

      <Modal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} title="Create New Team">
        <TeamForm onSuccess={handleTeamSuccess} onCancel={() => setIsTeamModalOpen(false)} />
      </Modal>
    </div>
  )
}
