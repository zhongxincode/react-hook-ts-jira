import React from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams()
  const {isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const {data: users} = useUsers()
  
  useDocumentTitle('项目列表', false)
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`