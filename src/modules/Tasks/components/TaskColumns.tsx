import { type Column } from '@/components/ui/DataTable'
import { type Task } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Trash2, Edit } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { TASK_STATUS_COLORS, TASK_PRIORITY_COLORS } from '@/constants'

interface GetTaskColumnsProps {
  onEdit: (task: Task) => void
  onDelete: (e: React.MouseEvent, id: string) => void
}

export const getTaskColumns = ({ onEdit, onDelete }: GetTaskColumnsProps): Column<Task>[] => [
  {
    header: 'Task Details',
    cell: (task) => (
      <div className="group py-1">
        <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{task.title}</p>
        {task.description && <p className="line-clamp-1 text-xs text-gray-500 mt-0.5">{task.description}</p>}
      </div>
    ),
  },
  {
    header: 'Status',
    cell: (task) => (
      <Badge className={cn('capitalize px-2.5 py-1 rounded-full', TASK_STATUS_COLORS[task.status])}>
        {task.status.replace('-', ' ')}
      </Badge>
    ),
  },
  {
    header: 'Priority',
    cell: (task) => (
      <span
        className={cn(
          'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide',
          TASK_PRIORITY_COLORS[task.priority]
        )}>
        <span
          className={cn(
            'h-2 w-2 rounded-full',
            task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
          )}></span>
        {task.priority}
      </span>
    ),
  },
  {
    header: 'Assignee',
    cell: (task) =>
      task.assignedTo ? (
        <div className="flex items-center gap-2">
          <Avatar
            src={task.assignedTo.avatar}
            fallback={task.assignedTo.name}
            className="h-7 w-7 ring-1 ring-gray-100"
          />
          <span className="text-sm font-medium text-gray-700">{task.assignedTo.name}</span>
        </div>
      ) : (
        <span className="text-gray-400 italic text-sm">Unassigned</span>
      ),
  },
  {
    header: 'Due Date',
    cell: (task) =>
      task.dueDate ? (
        <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          {format(new Date(task.dueDate), 'MMM d, yyyy')}
        </span>
      ) : (
        '-'
      ),
    className: 'whitespace-nowrap',
  },
  {
    header: 'Actions',
    className: 'text-right',
    cell: (task) => (
      <div className="flex justify-end gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(task)
          }}
          className="h-8 w-8 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50">
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => onDelete(e, task._id)}
          className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]
