import { type Column } from '@/components/ui/DataTable'
import { type Team } from '@/types'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Users, Edit } from 'lucide-react'

interface GetTeamColumnsProps {
  onEdit: (team: Team) => void
}

export const getTeamColumns = ({ onEdit }: GetTeamColumnsProps): Column<Team>[] => [
  {
    header: 'Team Name',
    cell: (team) => (
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onEdit(team)}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 group-hover:text-primary">{team.name}</p>
          <p className="text-xs text-gray-500">{team.description || 'No description'}</p>
        </div>
      </div>
    ),
  },
  {
    header: 'Members',
    cell: (team) => (
      <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
        {team.members.slice(0, 4).map((member) => (
          <Avatar
            key={member._id}
            src={member.avatar}
            fallback={member.name}
            className="h-9 w-9 border-2 border-white ring-1 ring-gray-100 transition-transform hover:scale-110 hover:z-10"
          />
        ))}
        {team.members.length > 4 && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-gray-500 ring-1 ring-gray-100">
            +{team.members.length - 4}
          </div>
        )}
      </div>
    ),
  },
  {
    header: 'Created By',
    cell: (team) => (
      <span className="text-sm text-gray-600">
        {typeof team.createdBy === 'object' ? team.createdBy.name : 'Unknown'}
      </span>
    ),
  },
  {
    header: 'Actions',
    className: 'text-right',
    cell: (team) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(team)}
        className="h-8 w-8 text-gray-400 hover:text-primary hover:bg-primary/10">
        <Edit className="h-4 w-4" />
      </Button>
    ),
  },
]
