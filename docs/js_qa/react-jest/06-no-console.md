# jest 运行时去除console

### 手动mock 

setupFilesAfterEnv 文件中写入

```ts 
jest.spyOn(console, 'log').mockReturnValue();
jest.spyOn(console, 'info').mockReturnValue();
jest.spyOn(console, 'warn').mockReturnValue();
jest.spyOn(console, 'error').mockReturnValue();
```

### 使用第三方库

使用 jest-mock-console 这个库，在 setupFilesAfterEnv file 中写入

```ts 
import mockConsole from "jest-mock-console";

mockConsole()
```

两种方法效果差不多。第一种比较轻量和简单，第二种的 jest-mock-console 功能更强大一些，大家按自己喜好来选择就好。

