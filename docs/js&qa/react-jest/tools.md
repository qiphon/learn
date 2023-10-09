# jest 工具

- [npm install --save-dev @testing-library/jest-dom](https://github.com/testing-library/jest-dom)

  ```js 
  // tests/jest-setup.ts  setupEnv
  import '@testing-library/jest-dom'
  ```

  要在 tsconfig.json 里引入这个库的类型声明：

  ```json 
  {
    "compilerOptions": {
      "types": ["node", "jest", "@testing-library/jest-dom"]
    }
  }
  ```

  使用方式

  ```tsx 
  describe('AuthButton', () => {
    it('可以正常展示', () => {
      render(<AuthButton>登录</AuthButton>)

      expect(screen.getByText('登录')).toBeInTheDocument();
    });
  })
  ```

  >如果你的项目报了 Entry point of type library '@testing-library/jest-dom' specified in compilerOptions 这个错误， 可以按照 这个 [Issue](https://github.com/haixiangyan/jest-tutorial/issues/26)来修复。