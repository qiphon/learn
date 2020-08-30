import './demo.css';
import React, { FC, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TodoList from './TodoList';
import Footer from './Footer';
import { useRootData } from '@tools/useRootData';

import { useQuery } from 'react-query';

const DisplayRemoteData: FC = (): JSX.Element => {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
      (res) => res.json()
    )
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>😢</h1>;
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};

interface HomeRouterProps {
  id: string;
}
const Demo: FC<RouteComponentProps<HomeRouterProps>> = (routerProps: {
  match: { params: { id: any } };
}) => {
  console.log('重新渲染');
  console.log('传参', routerProps.match.params.id);
  const id = useRootData((store) => store.demo.id);
  const setid = useRootData((store) => store.demo.setid);
  return (
    <div className="components-demo ">
      <Suspense fallback={<span>Loading...</span>}>
        <DisplayRemoteData />
      </Suspense>
      {/* <h2 className="nav">{ydstore.str}</h2> */}
      <TodoList />
      <Footer />
      <h3>{id}</h3>
      <input
        type="button"
        value="测试异步请求"
        onClick={() => setid(Math.random())}
      />
    </div>
  );
};
export default Demo;
