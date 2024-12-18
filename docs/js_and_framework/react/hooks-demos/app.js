/**
 * hooks useState 模拟
 */
let isMount = true;
// 组件中正在运行的 hook
let workInProgressHook = null;

const App = () => {
  const [num, setNum] = useState(0);
  const [money, setMoney] = useState(5);

  console.log("isMount:", isMount);
  console.log("num:", num);
  console.log("money:", money);

  return {
    onclick1() {
      setNum((num) => num + 1);
    },
    changeMoney() {
      setMoney((money) => money + 3);
    },
  };
};

const fiber = {
  stateNode: App,
  // 用链表保存数据
  memorizeState: null,
};

const schedule = () => {
  workInProgressHook = fiber.memorizeState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
};

window.app = schedule;

/**
 * useState hook
 */
function useState(initialState) {
  // 确定归属的 hook
  let hook;

  // mount 时记录 hook
  if (isMount) {
    hook = {
      memorizeState: initialState,
      next: null,
      queue: {
        // 保存更新状态的 actions
        pendding: null,
      },
    };
    if (!fiber.memorizeState) {
      fiber.memorizeState = hook;
    } else {
      // 如果已经创建过 hook，通过 next 连接 hook
      workInProgressHook.next = hook;
    }
    // 记录hook指针
    workInProgressHook = hook;
  } else {
    // update  state 时，使用 hook
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memorizeState;
  if (hook.queue.pendding) {
    let firstUpdate = hook.queue.pendding.next;

    do {
      const action = firstUpdate.action;
      hook.memorizeState = baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pendding.next);
  }
  // 清空链表
  hook.queue.pendding = null;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

// 更新状态函数
function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };
  if (queue.pendding === null) {
    // 创建环状链表 q0 -> q0 -> q0
    update.next = update;
  } else {
    //  q0 -> q0 -> q0
    // 修改为 q1 -> q0 -> q1
    // queue.pendding 永远是最后一个
    update.next = queue.pendding.next;
    queue.pendding.next = update;
  }
  queue.pendding = update;
  schedule();
}
