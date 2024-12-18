# 利用canvas 实现 textEllipsis

```ts
export const calcTextWidth = (value, font = 'normal 500 14px sans-serif') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.font = font;
  const { width } = context.measureText(value);
  return width;
};
/** 根据字号获取文字的宽度 默认fontsize：14、fontweight：500、fontfamily：sans-serif  */
export const calcTextWidthUseFontSize = (
  str: string,
  opts: { fontSize?: number; font?: string },
) => {
  if (!str) return 0;
  const fonts = opts.font || `normal 500 ${opts.fontSize || 14}px sans-serif`;
  return calcTextWidth(str, fonts);
};

/** 自动文字省略显示 */
export const textEllipsised = (
  text: string | number,
  maxWidth: number,
  fontSize?: number,
  fonts?: string,
) => {
  const font = fonts ?? `normal 500 ${fontSize ?? 14}px sans-serif`;
  const endSuffix = '...';
  const ellipsisWidth = calcTextWidth(endSuffix, font) || 0;
  const calcMaxWidth = Math.floor(maxWidth - ellipsisWidth);
  // 超出最小长度
  if (calcMaxWidth <= 0) return '';
  let newText = String(text);
  const textWidth = calcTextWidth(newText, font) ?? 0;
  let overSizeWidth = textWidth - calcMaxWidth;
  while (overSizeWidth > 0) {
    const overSizeRate = overSizeWidth / calcMaxWidth;
    const safeRate = 1.1;
    if (overSizeRate > safeRate) {
      newText = newText.slice(
        0,
        -1 *
          Math.floor(
            (newText.length / overSizeRate) * (overSizeRate - safeRate),
          ),
      );
      const newWidth = calcTextWidth(newText, font) ?? 0;
      overSizeWidth = Math.ceil(newWidth - calcMaxWidth);
    } else {
      newText = newText.slice(0, -1);
      const newWidth = calcTextWidth(newText, font) ?? 0;
      overSizeWidth = Math.ceil(newWidth - calcMaxWidth);
    }
  }
  return newText + endSuffix;
};


```