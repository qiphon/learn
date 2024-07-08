# flutter 组件 overview

组件风格

- iOS 风格 cupertino
- Android 风格 material, 大多数时候会使用这个风格，根据不同的平台展示不同的动画

## 常用组件

Text 文本渲染

Row、Column 垂直、水平布局 (flex 布局)

Stack、Positioned 层叠布局,像 css 中的定位

Container 矩形容器

### Row Column

MainAxisAlignment 主轴对齐方式

CrossAxisAlignment 侧轴对齐方式

### 弹性布局

#### Expanded 弹性布局

按比例扩展

```dart

class Example1  extends StatelessWidget {
    build(BuildContext context) {
        return Flex(
            direction: Axis.horizontal,
            children: <Widget>[
                Expanded(
                    flex: 2,
                    child: Text('我占 2/3')
                ),
                Expanded(
                    flex: 1,
                    child: Text('我占 2/3')
                )
            ]
        )
    }
}

```

#### Stack、Positioned

positioned 是基于 Stack 容器的位置来定位

```dart
body: Stack(
        children: <Widget>[
          Container(
              child: Column(
            children: [
              Text(
                'You have pushed the button this many times:',
              ),
              Text(
                '$_counter',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const Image(
                  image: AssetImage(
                      'lib/assets/images/1201719979123_.pic_thumb.jpg'),
                  width: 100,
                  height: 100),
            ],
          )),
          const Positioned(
            left: 100,
            top: 30,
            child: Text('positions'),
          )
        ],
      ),
```

#### flex 弹性布局

水平或垂直方向布局

### button

RiasedButton 凸起按钮

FlatButton 平坦按钮,点击会有背景变化

OutlineButton 线框按钮

### [icon](https://fonts.google.com/icons)

## 容器类组件

### 填充组件

可以通过 padding 添加填充 通过 EdgeInsets

### 尺寸限制组件

ConstrainedBox 对子组件添加额外的约束,限制最大最小值

```dart

const BoxConstraints({
    this.minWidth = 0.0,
    this.maxWidth = double.infinity,
    this.minHeight = 0.0,
    this.maxHeight = double.infinity,
  });
```

SizedBox 设置固定宽高

```dart
const SizedBox({ super.key, this.width, this.height, super.child });
```

Transform 平移、旋转、缩放、镜像 组件

Container 矩形容器,继承了上面的属性
