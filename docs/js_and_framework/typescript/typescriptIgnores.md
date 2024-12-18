# How To Ignore Rules At The File Or Line Level
- `@ts-ignore`:  让ts忽略下一行的问题 Ignore a single line with @ts-ignore. This actually will ignore a statement, which may be more than a single line. However, it will not ignore an entire block.
```ts
// @ts-ignore
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "rowssss"
  }
}));
```
- `@ts-expect-error`:  TypeScript 3.9 brings a new feature. 和ts-ignore 相似，当这条语句不是必要条件时，编译器会提示让你删了这个注释 Tell the compiler to expect an error (and throw an error if no error actually occured) with @ts-expect-error . An example usage from the TypeScript docs: if your unit tests are written in TypeScript, but you actually want to write a ‘breaking’ test, you can’t…unless you tell the compiler to expect an error. Simply put, this directive is more specific than @ts-ignore.
- `@ts-nocheck` 告诉编译器不要检查整个文件，可以通过`@ts-check`来恢复eslint Tell the compiler to skip type checking for an entire file with @ts-nocheck . Interestingly, the opposite of this is @ts-check, which can be used to turn on type-checking for non-TypeScript files.
^^^Notice the syntax for the above directives did not change with the move from TSLint to typescript-eslint.
Ignore ‘normal’ (non-TypeScript) ESLint rules: ignore multiple lines with /* eslint:disable */ and /* eslint:enable */

```ts
/* eslint-disable  @typescript-eslint/no-unused-vars */
const str: string = "asda";
const str2: string = "asda2";
/* eslint-enable  @typescript-eslint/no-unused-vars */
```
Here I specified the no-unused-vars command to disable. Once the offending section is over, don’t forget to re-enable the rule.

- Also, eslint-disable can be used at the top of a file to turn off linting for the whole file. 也可以在页面的最上方使用 `/* eslint-disable */` 来让eslint不检查整个文件