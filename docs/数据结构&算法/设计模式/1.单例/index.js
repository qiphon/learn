
/**
 * Mask 蒙层单例
 */
 class Mask {
  static instance: Mask;
  private isShow: boolean;
  private maskDom: HTMLDivElement;

  static getInstance() {
    if (!Mask.instance) {
      Mask.instance = new Mask();
    }
    return Mask.instance;
  }

  constructor() {
    this.isShow = false;
    this.maskDom = this.init();
  }

  /**
   * 创建蒙层DOM
   */
  private init() {
    const dom = document.createElement("div");
    dom.setAttribute(
      "style",
      "z-index: 99999; position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: none; pointer-events: all; user-select: none; cursor: not-allowed;"
    );
    document.body.appendChild(dom);
    return dom;
  }

  /**
   * show 显示蒙层
   */
  public show() {
    if (this.isShow) return;
    this.maskDom.style["display"] = "block";
    this.isShow = true;
  }

  /**
   * hide 隐藏蒙层
   */
  public hide() {
    if (!this.isShow) return;
    this.maskDom.style["display"] = "none";
    this.isShow = false;
  }
}

// 直接导出实例
export default Mask.getInstance();