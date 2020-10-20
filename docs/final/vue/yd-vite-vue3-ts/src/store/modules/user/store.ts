export const createState = () => {
  const store = {
    tableData: [
      {
        data: '',
        name: '',
        age: 0,
      },
    ],
    loading: true,
  };
  return store;
};

export type userState = ReturnType<typeof createState>;
