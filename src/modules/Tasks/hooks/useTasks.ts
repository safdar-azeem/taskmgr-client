import { useState, useCallback, useEffect } from 'react'
import { TaskService } from '@/modules/Tasks/service/task.service'
import type { Task } from '@/types'
import type { PageInfo } from '@/components/ui/DataTable'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined)

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
  })

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await TaskService.getAll(filters)
      if (response && response.data) {
        setTasks(response.data.tasks)
        setPageInfo(response.pageInfo)
      }
    } catch (error) {
      console.error('Failed to fetch tasks', error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const deleteTask = async (id: string) => {
    try {
      await TaskService.delete(id)
      await fetchTasks()
      return true
    } catch (error) {
      console.error('Failed to delete task', error)
      return false
    }
  }

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }))
  }, [])

  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => {
      if (prev.search === query) return prev
      return { ...prev, search: query, page: 1 }
    })
  }, [])

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prev) => {
      if (prev[key as keyof typeof prev] === value) return prev
      return { ...prev, [key]: value, page: 1 }
    })
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    isLoading,
    pageInfo,
    filters,
    refreshTasks: fetchTasks,
    deleteTask,
    handlePageChange,
    handleSearch,
    handleFilterChange,
  }
}
