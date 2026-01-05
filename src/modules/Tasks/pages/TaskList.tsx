import { useState, useMemo } from 'react'
import { DataTable } from '@/components/ui/DataTable'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { TaskForm } from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks'
import { getTaskColumns } from '../components/TaskColumns'
import type { Task } from '@/types'

export const TaskList = () => {
  const { tasks, isLoading, pageInfo, handlePageChange, handleSearch, handleFilterChange, refreshTasks, deleteTask } =
    useTasks()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  const handleCreate = () => {
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const handleEdit = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const confirmDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setTaskToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!taskToDelete) return
    const success = await deleteTask(taskToDelete)
    if (success) {
      setIsDeleteModalOpen(false)
      setTaskToDelete(null)
    }
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    refreshTasks()
  }

  const columns = useMemo(() => getTaskColumns({ onEdit: handleEdit, onDelete: confirmDelete }), [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Tasks</h2>
          <p className="text-gray-500">Manage and track your team's work across projects.</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={tasks}
        isLoading={isLoading}
        onRowClick={handleEdit}
        pageInfo={pageInfo}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        searchPlaceholder="Search tasks..."
        filterOptions={[
          { label: 'To Do', value: 'todo' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'Review', value: 'review' },
          { label: 'Done', value: 'done' },
        ]}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTask ? 'Edit Task' : 'Create New Task'}>
        <TaskForm task={selectedTask} onSuccess={handleSuccess} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Task">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
