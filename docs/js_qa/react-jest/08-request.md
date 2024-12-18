# mock request  

```tsx 
// tests/components/AuthButton/mockGetUserRole.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import AuthButton from "components/AuthButton";
// 注意：这里要写成 * as userUtils！！！
import * as userUtils from "apis/user";
import { AxiosResponse } from "axios";

// 也很偏向细节，效果也不好
describe("AuthButton Mock Axios", () => {
  it("可以正确展示普通用户按钮内容", async () => {
    jest.spyOn(userUtils, "getUserRole").mockResolvedValueOnce({
      // 其它的实现...
      data: { userType: "user" },
    } as AxiosResponse);

    render(<AuthButton>你好</AuthButton>);

    expect(await screen.findByText("普通用户你好")).toBeInTheDocument();
  });

  it("可以正确展示管理员按钮内容", async () => {
    jest.spyOn(userUtils, "getUserRole").mockResolvedValueOnce({
      // 其它的实现...
      data: { userType: "admin" },
    } as AxiosResponse);

    render(<AuthButton>你好</AuthButton>);

    expect(await screen.findByText("管理员你好")).toBeInTheDocument();
  });
});
``` 

参考链接 https://github.yanhaixiang.com/jest-tutorial/basic/component-test/#%E4%B8%89%E7%A7%8D-mock-%E6%80%9D%E8%B7%AF