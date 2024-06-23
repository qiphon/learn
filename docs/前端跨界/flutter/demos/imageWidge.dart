import 'package:flutter/material.dart';

void main() {
  return runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'flutter title',
        home: Scaffold(
            appBar: AppBar(
              title: Text(
                'welcome to flutter1',
              ),
            ),
            body: Container(
              child: Image.network(
                'https://i0.hdslb.com/bfs/feed-admin/33dcc0722b4bc07970f77689669eb4fe3bdf1e49.jpg@336w_190h.webp',
                // 填充模式
                fit: BoxFit.contain,
                // 调整图片的对齐方式
                alignment: Alignment(-1, 0),
                // 背景色
                color: Colors.deepOrange,
                // 颜色的混合模式
                colorBlendMode: BlendMode.colorBurn,
                // 图片重复排列
                repeat: ImageRepeat.repeat,
              ),
              height: double.infinity,
              constraints: BoxConstraints(
                  // minHeight: 500,
                  ),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.blueAccent, width: 5),
                color: Colors.brown,
              ),
            )));
  }
}
