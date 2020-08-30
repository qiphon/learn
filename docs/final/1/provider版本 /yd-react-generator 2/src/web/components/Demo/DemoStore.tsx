import { useRootData } from '@tools/useRootData';
import { createContext } from 'react';
import CreateStoreProvider from '@tools/StoreProvider';
import { observable } from 'mobx';
export interface ItoggleTodo {
  (index: string | number): void;
}
export interface Todo {
  completed: boolean;
  id: number;
  text: string;
}
// export interface IToDos {
//   id: number;
//   todos: Todo[];
//   remainingTodos: number;
//   test(): void;
//   toggleTodo: ItoggleTodo;
// }

function createTodosStore() {
  return {
    todos: [
      { id: 1, text: '完成React SSR配置', completed: true },
      { id: 2, text: '完成业务逻辑的基本开发', completed: false },
    ] as Todo[],
    id: 0,
    get remainingTodos() {
      return this.todos.filter((t) => !t.completed).length;
    },
    async test() {
      // const data = await fetch('/api/test');
      // const result = await data.json();
      // todosStore.id = result.id;
    },
    toggleTodo(index: string | number) {
      const _index = parseInt(index.toString(), 10);
      this.todos[_index].completed = !this.todos[_index].completed;
      console.log('🌲', this.todos[_index].completed);
    },
  };
}
export type IToDos = ReturnType<typeof createTodosStore>;

// export class TodosStore implements IToDos {
//   public todos: Todo[];
//   public id: number;
//   constructor() {
//     this.todos = [
//       { id: 1, text: '完成React SSR配置', completed: true },
//       { id: 2, text: '完成业务逻辑的基本开发', completed: false },
//     ];
//     this.id = 0;
//     this.toggleTodo = this.toggleTodo.bind(this);
//   }
//   public get remainingTodos() {
//     return this.todos.filter((t) => !t.completed).length;
//   }
//   public async test() {
//     const data = await fetch('/api/test');
//     const result = await data.json();
//     this.id = result.id;
//   }
//   public toggleTodo(index: string | number) {
//     const _index = parseInt(index.toString(), 10);
//     this.todos[_index].completed = !this.todos[_index].completed;
//     console.log('🌲', this.todos[_index].completed);
//   }
// }
// const todoStore = new TodosStore();
const todoStore = createTodosStore();
const storeContext = createContext<IToDos>(todoStore);
export const useDemoStore = useRootData<IToDos>(storeContext);
export const DemoStoreProvider = CreateStoreProvider(
  () => todoStore,
  storeContext
);
