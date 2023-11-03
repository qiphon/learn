# eslint 推荐

### 工具

- eslint 
- airbnb 
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-config-prettier 放到最后，可以overide其它规则
- eslint-plugin-import
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-import-resolver-alias
- eslint-plugin-jsdoc

for react 

- eslint-plugin-react
- eslint-plugin-react-hooks

如果是 pnpm 遇到问题需要额外添加 

```
 "pnpm": {
    "overrides": {
      "@typescript-eslint/parser": "6.9.1"
    }
  },
```