export const createState = () => {
  const store = {
    article: '文章列表',
  };
  return store;
};

export type wechatState = ReturnType<typeof createState>;
