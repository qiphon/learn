export const createState = () => {
  const store = {
    tableData: [
      {
        date: '',
        name: '',
        address: '',
      },
    ],
    loading: true,
  };

  return store;
};

export type userState = ReturnType<typeof createState>;
