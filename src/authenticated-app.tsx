import { useAuth } from 'context/auth-context'
import React from 'react'
import styled from '@emotion/styled';
import { ProjectListScreen } from 'screens/project-list'

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用flex， 二维布局用grid
 * 2. 是从内容出发还是布局出发？
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容的大小决定自己占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再把元素填充
 * 从内容出发，用flex，
 * 从布局出发，用grid
 * @returns 
 */
export const AuthenticateApp = () => {
  const {logout} = useAuth();
  return <div>
    <PageHeader>
      <button onClick={logout} >登出</button>
    </PageHeader>
    <Main>
      <ProjectListScreen />
    </Main>
    
  </div>
}

const PageHeader = styled.header`
background-color: gray;
  height: 6rem;
`

const Main = styled.main`
  height: calc(100vh - 6rem);
`