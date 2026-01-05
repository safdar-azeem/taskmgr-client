import { useState, useCallback, useEffect } from 'react'
import { TeamService } from '@/modules/Teams/service/team.service'
import type { Team } from '@/types'
import type { PageInfo } from '@/components/ui/DataTable'

interface UseTeamsOptions {
  limit?: number
  page?: number
  sort?: string
  [key: string]: any
}

export const useTeams = (initialOptions: UseTeamsOptions = {}) => {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined)

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    ...initialOptions,
  })

  const fetchTeams = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await TeamService.getAll(filters)
      if (response && response.data) {
        setTeams(response.data.teams)
        setPageInfo(response.pageInfo)
      }
    } catch (error) {
      console.error('Failed to fetch teams', error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }))
  }, [])

  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => {
      if (prev.search === query) return prev
      return { ...prev, search: query, page: 1 }
    })
  }, [])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  return {
    teams,
    isLoading,
    pageInfo,
    refreshTeams: fetchTeams,
    handlePageChange,
    handleSearch,
  }
}
