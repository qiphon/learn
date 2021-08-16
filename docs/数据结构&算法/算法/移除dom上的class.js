//数据结构大致如此，如果有误不必纠结，可以尝试用TS来写代码
const baseRoot = {
  tagName: "div",
  children: [
    "this is a span",
    {
      tagName: "span",
      children: [
        "hello world!",
        {
          tagName: "input",
          children: ["this is a input"],
          attribute: [
            {
              key: "class",
              value: "Input",
            },
            {
              key: "value",
              value: "something",
            },
          ],
        },
      ],
      attribute: [
        {
          key: "style",
          value: "xxx",
        },
      ],
    },
  ],
  attribute: [
    {
      key: "class",
      value: "button",
    },
    {
      key: "data-text",
      value: "demo",
    },
  ],
};
const resultRoot = {
  tagName: "div",
  children: [
    "this is a span",
    {
      tagName: "span",
      children: [
        "hello world!",
        {
          tagName: "input",
          children: ["this is a input"],
          attribute: [
            {
              key: "value",
              value: "something",
            },
          ],
        },
      ],
      attribute: [
        {
          key: "style",
          value: "xxx",
        },
      ],
    },
  ],
  attribute: [
    {
      key: "data-text",
      value: "demo",
    },
  ],
};

function removeClass(root) {
  //TO DO
  const removeClassAttr = (attr) => {
    let newArr = [];
    if (attr?.length) {
      attr.forEach((item) => {
        if (item.key !== "class") newArr.push(item);
      });
    }
    return newArr;
  };

  root.attribute = removeClassAttr(root.attribute);
  if (root.children) {
    root.children = root.children.map(removeClass);
  }

  return root;
}
const res = removeClass(baseRoot);
debugger;

console.log(res);
