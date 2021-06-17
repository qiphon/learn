/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * @file mouseEvent Hook 实现了鼠标的 wheel 事件和点击拖动，还有部分的 touch 功能,
 *       这个hook主要为imgEditor定制，后期可以适当修改
 * @returns
 * defaultAction = {
 *   scale: 1,         wheel 事件执行的放大缩小
 *   moveX: 0,         X 轴上的移动
 *   moveY: 0,         Y 轴上的移动
 *   touches: {        touchstart/mouseclick 起始点
 *     clientX: 0,
 *     clientY: 0,
 *   },
 *   removeListener: () => { },  事件移除函数
 *
 *   addListener: (el:element) => { },     事件添加函数
 *   clear: () => {}             清空所有的修改值
 * };
 */

import React, { useState, useEffect, useRef } from "react";

const defaultAction = {
  scale: 1,
  moveX: 0,
  moveY: 0,
  touches: {
    clientX: 0,
    clientY: 0,
  },
};

const isTouchEvent = (event: any): event is TouchEvent =>
  event?.touches?.length !== undefined ||
  event?.changedTouches?.length !== undefined ||
  event?.targetTouches?.length !== undefined;

export type Actions = typeof defaultAction & {
  setVal: (action: Partial<Actions>, changeTouches?: boolean) => void;
  removeListener: () => void;
  addListener: (el: HTMLElement) => void;
  clear: () => void;
};

const defaultTouchse = {
  clientX: 0,
  clientY: 0,
  scale: 1,
  moveX: 0,
  moveY: 0,
};

let isCanMoveTimer: ReturnType<typeof setTimeout> | null;

type TouchList = {
  start: TouchEvent["changedTouches"] | [];
  end: TouchEvent["changedTouches"] | [];
};
const defaultTouchList: TouchList = {
  start: [],
  end: [],
};

let touchList: TouchList = { ...defaultTouchList };

// 临时存储 touch 点和 scale
let touches: typeof defaultTouchse = {
  ...defaultTouchse,
};

let box: HTMLElement | undefined;

function get2TouchesLength(
  touch1: TouchEvent["changedTouches"][0],
  touch2: TouchEvent["changedTouches"][1]
) {
  if (!touch1?.clientX || !touch2?.clientX) {
    touchList = { ...defaultTouchList };
    return null;
  }

  // 计算两个直角边的长度
  const x = touch2.clientX - touch1.clientX; // 水平方向的距离
  const y = touch2.clientY - touch1.clientY; // 垂直方向的距离
  // 计算两个触点的距离（斜边的长度）
  return Math.sqrt(x * x + y * y);
}

/**
 * @fileoverview 计算放大的倍数
 * @param touch   touch 点数组（起始点或结束点）
 * @param clear 是否清除记录点起始点
 */
function getScale(touch: TouchEvent["changedTouches"], clear?: boolean) {
  const touch1 = touchList.start[0];
  const touch2 = touchList.start[1];
  const touch3 = touch[0];
  const touch4 = touch[1];
  let { scale } = touches;
  const oldMoveLength = get2TouchesLength(touch1, touch2);
  const newMoveLength = get2TouchesLength(touch3, touch4);
  if (oldMoveLength !== null && newMoveLength !== null) {
    scale = newMoveLength / oldMoveLength;
  }

  if (clear) {
    touchList = { ...defaultTouchList };
    touches.scale = scale;
  }

  return scale;
}

export const useMouse = () => {
  const [userAction, setAction] = useState<Actions>({
    ...defaultAction,
    addListener,
    removeListener,
    clear: clearFn,
    setVal,
  });

  const actionRef = useRef<typeof defaultAction>({
    ...defaultAction,
  });

  // reset all change
  function clearFn() {
    // clear touch
    touches = { ...defaultTouchse };
    const { moveX, moveY, clientX, clientY, scale } = touches;

    // clear state
    setAction({
      ...userAction,
      scale,
      moveY,
      moveX,
      touches: {
        clientX,
        clientY,
      },
    });
  }

  function setVal(val: Partial<Actions>, changeTouches?: boolean) {
    const r = { ...actionRef.current, ...val };
    actionRef.current = r;
    setAction({ ...userAction, ...r });
    // 目前只针对 scale 做了处理，以后可以根据需要修改
    if (changeTouches) touches = { ...touches, ...val };
  }

  function startListen() {
    if (!box) return null;
    box.addEventListener("wheel", wheelFun, { passive: false });
    box.addEventListener("touchstart", touchstartFn);
    box.addEventListener("mousedown", touchstartFn);
    // remove mousemove & touchmove
    box.addEventListener("touchend", touchendFn);
    box.addEventListener("mouseup", touchendFn);
    box.addEventListener("mouseleave", removeListener);
    return null;
  }

  function mouseEnter() {
    if (box) startListen();
  }

  // 移动事件 touchmove/mouseDownMove
  function moving(ev: TouchEvent | MouseEvent, move?: "move" | "end") {
    let touch;
    let clientX;
    let clientY;
    let { moveX, moveY, scale } = touches;

    if (
      // 双指滑动
      isTouchEvent(ev) &&
      (ev.changedTouches?.length >= 2 || ev.targetTouches?.length >= 2)
    ) {
      const t =
        ev.changedTouches.length >= 2 ? ev.changedTouches : ev.targetTouches;

      if (touchList.start.length < 2) {
        touchList.start = t;
      } else {
        touchList.end = t;
        scale = touches.scale + getScale(touchList.end) - 1;
      }

      if (isCanMoveTimer) {
        clearTimeout(isCanMoveTimer);
      }

      isCanMoveTimer = setTimeout(() => {
        isCanMoveTimer = null;
      }, 1000);
    } else if (
      // 执行拖动
      touchList.end.length <= 0 &&
      touchList.start.length <= 0 &&
      !isCanMoveTimer // 防止双指时候误触发
    ) {
      if (isTouchEvent(ev) && ev.touches?.length) {
        touch = ev.touches;
        clientX = touch[0].clientX;
        clientY = touch[0].clientY;
      } else if (isTouchEvent(ev) && ev.changedTouches?.length) {
        // 双指滑动结束
        touch = ev.changedTouches;
        clientX = touch[0].clientX;
        clientY = touch[0].clientY;
      } else {
        // 鼠标事件
        touch = ev as MouseEvent;
        clientX = (ev as MouseEvent).clientX;
        clientY = (ev as MouseEvent).clientY;
      }

      moveX += ((touches.clientX || 0) - (clientX || 0)) / scale;
      moveY += ((touches.clientY || 0) - (clientY || 0)) / scale;
    }

    // touch end | mouse up
    if (move === "end") {
      if (touchList.end.length >= 2) {
        scale =
          touches.scale +
          getScale(touchList.end as unknown as globalThis.TouchList) -
          1;

        touches.scale = scale;
        touchList = { ...defaultTouchList };
      } else if (!isCanMoveTimer) {
        // 防止双指时候误触发
        touches = { ...touches, moveX, moveY };
      }
    }

    setVal({
      scale,
      moveX,
      moveY,
    });
  }

  // move 事件
  function touchmoveFn(ev: TouchEvent | MouseEvent) {
    window.requestAnimationFrame(() => {
      moving(ev, "move");
    });
  }

  function touchendFn(ev: TouchEvent | MouseEvent) {
    if (!box) return;
    moving(ev, "end");
    box.removeEventListener("touchmove", touchmoveFn);
    box.removeEventListener("mousemove", touchmoveFn);
  }

  // 拖动
  function touchstartFn(ev: TouchEvent | MouseEvent | React.MouseEvent) {
    if (!box) return;
    let clientX = 0;
    let clientY = 0;
    let touch;
    if (isTouchEvent(ev) && ev.touches) {
      touch = ev.touches;
      if (touch.length) {
        clientX = touch[0].clientX;
        clientY = touch[0].clientY;
      }
    }
    // mouse
    else {
      touch = ev as MouseEvent;
      clientX = touch.clientX;
      clientY = touch.clientY;
    }

    touches = { ...touches, clientX, clientY };
    const { moveX, moveY } = touches;
    setVal({
      scale: touches.scale,
      moveY,
      moveX,
      touches: { clientX, clientY },
    });

    // 防止点击的时候因为移除事件而报错
    box?.addEventListener("touchmove", touchmoveFn);
    box?.addEventListener("mousemove", touchmoveFn);
  }

  // 鼠标事件
  function wheelFun(ev: WheelEvent) {
    ev.preventDefault();
    window.requestAnimationFrame(() => {
      // wheel zoom
      touches.scale -= ev.deltaY / 300;
      touches.scale = touches.scale > 0.2 ? touches.scale : 0.2;
      // wheel moveX
      touches.moveX += ev.deltaX / 2;
      setVal({
        scale: touches.scale,
        moveX: touches.moveX,
        moveY: touches.moveY,
      });
    });
  }

  function removeListener(ev?: MouseEvent) {
    if (!box) return;
    box.removeEventListener("wheel", wheelFun);
    box.removeEventListener("touchstart", touchstartFn);
    box.removeEventListener("mousedown", touchstartFn);
    // remove mousemove & touchmove
    box.removeEventListener("touchend", touchendFn);
    box.removeEventListener("mouseup", touchendFn);
    box.removeEventListener("touchmove", touchmoveFn);
    box.removeEventListener("mousemove", touchmoveFn);
    box.removeEventListener("mouseleave", removeListener);
    box.removeEventListener("mouseenter", mouseEnter);
    // mouseleave 做兼容处理
    if (ev?.type === "mouseleave") {
      box.addEventListener("mouseenter", mouseEnter);
      return;
    }

    box = undefined;
  }

  function addListener(el: HTMLElement) {
    if (box) return; // 避免重复添加监听
    if (el) {
      box = el;
    } else {
      box = document.body;
    }

    startListen();
  }

  // 是否默认开启 hook
  useEffect(
    () => () => {
      removeListener();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return userAction;
};
