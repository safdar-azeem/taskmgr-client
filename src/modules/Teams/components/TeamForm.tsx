import { useState, useMemo } from 'react'
import { TeamService } from '@/modules/Teams/service/team.service'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/form/Form'
import { teamSchema } from '../schema/team.schema'
import type { Team } from '@/types'

interface TeamFormProps {
  team?: Team | null
  onSuccess: () => void
  onCancel: () => void
}

export const TeamForm = ({ team, onSuccess, onCancel }: TeamFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialValues = useMemo(() => {
    if (!team) return {}
    return {
      name: team.name,
      description: team.description || '',
    }
  }, [team])

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      if (team) {
        await TeamService.update(team._id, values)
      } else {
        await TeamService.create(values)
      }
      onSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form schema={teamSchema} initialValues={initialValues} onSubmit={handleSubmit}>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {team ? 'Update Team' : 'Create Team'}
        </Button>
      </div>
    </Form>
  )
}
