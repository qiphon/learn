# flutter 中的文件引入

我们可以创建一个文件夹 `lib/images`，针对不同倍率的图片可以创建单独的文件夹（`lib/images/2.0x  lib/images/3.0x`），然后 flutter 会根据手机系统自动选择图片的倍率(单倍率的和多倍率的图片名称要相同),然后把图片放入其中

然后修改 `pubspec.yaml` 文件，添加 `assets:` 配置，添加 `lib/images` 目录下的所有图片

```yaml
assets:
  - lib/images/a.png
  - lib/images/b.png

# 如果图片太多，可以直接写到文件夹
assets:
  - lib/images/
```

之后就可以使用了

```dart

class MyApp extends StatelessWidget {
    build(BuildContext context) {
        return Image(
            width: 100,
            height: 100,
            image: AssetImage('lib/images/a.png'),
        )
    }
}
```
