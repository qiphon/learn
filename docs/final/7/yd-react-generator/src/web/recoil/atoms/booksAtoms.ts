import { atom } from 'recoil';

export const currentBookIDState = atom({
  key: 'currentBookID',
  default: '222',
});

export const todoList = atom({
  key: 'todoList',
  default: [
    {
      key: 1,
      val: 'recoil',
    },
    {
      key: 2,
      val: 'react',
    },
    {
      key: 3,
      val: 'ssr',
    },
    {
      key: 4,
      val: 'typescript',
    },
    {
      key: 5,
      val: 'webpack5',
    },
    {
      key: 6,
      val: 'gulp',
    },
  ],
  dangerouslyAllowMutability: true
})