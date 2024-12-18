# Mock Timer 

mock 定时器

### 通常的写法 

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export const after1000ms = (callback?: AnyFunction) => {
  console.log("准备计时");
  setTimeout(() => {
    console.log("timer ready");
    callback && callback();
  }, 1000);
};

```
```ts 
// test case 
describe("jest timer test", () => {
  // 这样写必须等到定时器执行完毕
  it("可以在 1000ms 后自动执行函数", (done) => {
    after1000ms(() => {
      expect("???");
      done();
    });
  });
});
```

为了省去等待的时间，我们可以这样写

```ts 
let globalSpy: jest.SpyInstance;
beforeEach(() => {
  jest.useFakeTimers();
  globalSpy = jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  globalSpy?.mockRestore();
});

describe("after1000ms", () => {
  it("可以在 1000ms 后自动执行函数", () => {
    after1000ms();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});

```
先用 jest.useFakeTimers Mock 定时器，并监听 setTimeout。执行 after1000ms 后， 对 setTimeout 的调用做了一些断言。

### 方法2，快进时间

上面这么测并不靠谱，因为 after1000ms 最重要的部分就是要看 1000ms 后是否真的执行了 callback。 因此，对 setTimeout 的断言只是一种间接测试的手段。 那该如何测函数是否被调用呢？

```ts 
let globalSpy: jest.SpyInstance;
beforeEach(() => {
  jest.useFakeTimers();
  globalSpy = jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  globalSpy?.mockRestore();
});
it("可以在 1000ms 后自动执行函数，可以在控制台看到打印", () => {
  const callback = jest.fn();

  expect(callback).not.toHaveBeenCalled();

  after1000ms(callback);

  jest.runAllTimers();

  expect(callback).toHaveBeenCalled();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
});
```
在这次的测试中，我们用 jest.fn 生成了一个监听函数（假函数），然后马上断言这个函数是没有被调用过的。然后， 在调用 after1000ms 之后，用 jest.runAllTimers 快进时间，最后来判断 callback 是否只被调用了 1 次。

[promise 的测试用例需要特别注意](https://stackoverflow.com/questions/52177631/jest-timer-and-promise-dont-work-well-settimeout-and-async-function)

```ts 
it("test promise sleep", async () => {
  const cb = jest.fn();

  const action = async (callback: () => any) => {
    await sleep(1000);
    callback();
  };
  const pro = action(cb);

  expect(cb).not.toBeCalled();
  jest.runAllTimers();

  // 等待 sleep 函数执行完毕
  await pro;

  expect(cb).toBeCalled();
  expect(cb).toBeCalledTimes(1);
});
```


- [useFakeTimers](https://jestjs.io/zh-Hans/docs/jest-object#jestusefaketimersfaketimersconfig)