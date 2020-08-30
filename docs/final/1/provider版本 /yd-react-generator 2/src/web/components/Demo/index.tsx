import './demo.css';
import React, { FC, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDemoStore, IToDos, DemoStoreProvider } from './DemoStore';
import TodoList from './TodoList';
import Footer from './Footer';
import { observer } from 'mobx-react-lite';

// import { useQuery } from 'react-query';

// const DisplayRemoteData = () => {
//   const { isLoading, error, data } = useQuery('repoData', () =>
//     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
//       (res) => res.json()
//     )
//   );

//   // if (isLoading) return 'Loading...';
//   if (error) return <span>Error:{error}</span>;
//   if (!data) return null; // this is important
//   return <span>RemoteData:{data}</span>;
// };
interface HomeRouterProps {
  id: string;
}
const Demo: FC<RouteComponentProps<HomeRouterProps>> = (routerProps: {
  match: { params: { id: any } };
}) => {
  console.log('传参', routerProps.match.params.id);
  const todosStore = useDemoStore<IToDos>();
  const { id, test } = todosStore;
  return (
    <div>
      {/* <Suspense fallback={<span>Loading...</span>}>
        <DisplayRemoteData />
      </Suspense> */}
      {/* <h2 className="nav">{ydstore.str}</h2> */}
      <DemoStoreProvider>
        <TodoList />
        <Footer />
        <h3>{id}</h3>
        <input type="button" value="测试异步请求" onClick={() => test()} />
      </DemoStoreProvider>
    </div>
  );
};
export default Demo;
