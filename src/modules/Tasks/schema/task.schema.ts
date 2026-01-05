import { type IForm } from '@/types/form.types'

export const taskSchema: IForm[] = [
  {
    name: 'title',
    label: 'Task Title',
    type: 'text',
    placeholder: 'Enter task title',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter task description',
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'To Do', value: 'todo' },
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Review', value: 'review' },
      { label: 'Done', value: 'done' },
    ],
    value: 'todo',
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    required: true,
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
    ],
    value: 'medium',
  },
  {
    name: 'teamId',
    label: 'Assign Team',
    type: 'SelectTeam',
    required: true,
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
  },
]
