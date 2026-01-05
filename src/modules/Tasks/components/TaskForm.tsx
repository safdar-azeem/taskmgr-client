import { useState, useMemo } from 'react'
import { type Task } from '@/types'
import { TaskService } from '@/modules/Tasks/service/task.service'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/form/Form'
import { taskSchema } from '../schema/task.schema'

interface TaskFormProps {
  task?: Task | null
  onSuccess: () => void
  onCancel: () => void
}

export const TaskForm = ({ task, onSuccess, onCancel }: TaskFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues = useMemo(() => {
    if (!task) return {}
    return {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      teamId: typeof task.teamId === 'object' && task.teamId ? task.teamId._id : task.teamId,
    }
  }, [task])

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      if (task) {
        await TaskService.update(task._id, values)
      } else {
        await TaskService.create(values)
      }
      onSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form schema={taskSchema} initialValues={initialValues} onSubmit={handleSubmit}>
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </Form>
  )
}
