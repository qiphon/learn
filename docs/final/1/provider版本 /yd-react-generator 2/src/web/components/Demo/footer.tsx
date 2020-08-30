import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useDemoStore } from './DemoStore';

const Footer = observer(() => {
  const store = useDemoStore((store) => store);
  const remaining: number = store.remainingTodos;
  const total: number = store.todos.length;
  return (
    <p>
      {remaining.toString()} / {total.toString()} left
    </p>
  );
});

export default Footer;
