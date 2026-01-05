import React, { useMemo } from 'react'
import { Select } from './Select'
import { useTeams } from '@/modules/Teams/hooks/useTeams'
import { type IForm, type IFormOption } from '@/types/form.types'

interface SelectsProps extends IForm {
  onChange: (value: any) => void
}

export const SelectTeam: React.FC<SelectsProps> = (props) => {
  const { teams, isLoading } = useTeams({ limit: 100, sort: 'name' })

  const options: IFormOption[] = useMemo(() => {
    if (!teams) return []
    return teams.map((team) => ({
      label: team.name,
      value: team._id,
    }))
  }, [teams])

  return <Select {...props} options={options} disabled={props.disabled || isLoading} />
}
