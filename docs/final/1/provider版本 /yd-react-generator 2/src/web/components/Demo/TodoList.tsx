import React, { FC } from 'react';
// import { toggleTodo, Todo } from './DemoStore';
import { useDemoStore, Todo, IToDos, ItoggleTodo } from './DemoStore';
import { observer } from 'mobx-react-lite';
const TodoList: FC = observer(() => {
  const { todos, toggleTodo } = useDemoStore((store) => ({
    todos: store.todos,
    toggleTodo: store.toggleTodo,
  }));
  return (
    <ul style={{ listStyle: 'none' }}>
      {todos &&
        todos.map((t, i) => (
          <li
            onClick={() => toggleTodo(i)}
            style={{
              margin: 10,
              opacity: t.completed ? 0.5 : 1,
              cursor: 'pointer',
              textDecoration: t.completed ? 'line-through' : 'none',
            }}
            key={t.id}
          >
            {t.text}
          </li>
        ))}
    </ul>
  );
});

export default TodoList;
