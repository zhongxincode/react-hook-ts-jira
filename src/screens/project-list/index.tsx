import React from 'react'
import { useState, useEffect } from "react"
import { cleanObject, useDebounce, useMount } from 'utils'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from 'qs'
import { useHttp } from 'utils/http'

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
  }, [debounceParam])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}