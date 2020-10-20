export const createState = () => {
  const store = {
    article: '题库列表',
  };

  return store;
};

export type wechatState = ReturnType<typeof createState>;
