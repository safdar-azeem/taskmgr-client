import { useState, useMemo } from 'react'
import { DataTable } from '@/components/ui/DataTable'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { TeamForm } from '../components/TeamForm'
import { useTeams } from '../hooks/useTeams'
import { getTeamColumns } from '../components/TeamColumns'
import type { Team } from '@/types'

export const TeamList = () => {
  const { teams, isLoading, pageInfo, handlePageChange, handleSearch, refreshTeams } = useTeams()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const handleCreate = () => {
    setSelectedTeam(null)
    setIsModalOpen(true)
  }

  const handleEdit = (team: Team) => {
    setSelectedTeam(team)
    setIsModalOpen(true)
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    refreshTeams()
  }

  const columns = useMemo(() => getTeamColumns({ onEdit: handleEdit }), [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Teams</h2>
          <p className="text-gray-500">Manage collaborative teams and members.</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Team
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={teams}
        isLoading={isLoading}
        onRowClick={handleEdit}
        pageInfo={pageInfo}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        searchPlaceholder="Search teams..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTeam ? 'Edit Team' : 'Create New Team'}>
        <TeamForm team={selectedTeam} onSuccess={handleSuccess} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}
