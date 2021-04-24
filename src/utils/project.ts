import React from 'react'
import { useEffect } from "react"
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'

import { useAsync } from 'utils/use-async'
import { useHttp } from './http'

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()
  useEffect(() => {
    run(client(`projects`, { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}