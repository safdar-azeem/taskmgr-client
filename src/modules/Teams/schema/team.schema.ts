import { type IForm } from '@/types/form.types'

export const teamSchema: IForm[] = [
    {
        name: 'name',
        label: 'Team Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Engineering'
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'What is this team about?'
    }
]