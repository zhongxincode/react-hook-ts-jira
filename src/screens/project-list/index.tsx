import React from 'react'
import { useState, useEffect } from "react"
import { cleanObject, useDebounce, useMount } from 'utils'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from 'qs'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const client = useHttp()

  const debounceParam = useDebounce(param, 200)
  useEffect(() => {
    client(`projects`, {data: cleanObject(debounceParam)}).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`