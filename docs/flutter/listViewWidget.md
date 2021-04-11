# [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html) 

一个可滚动的列表

```js
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
            body: Center(
                child: Container(
              child: MyList(),
              height: 200,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.blueAccent, width: 5),
                color: Colors.brown,
              ),
            ))));
  }
}

class MyList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var mw = MediaQuery.of(context).size.width;
    return ListView(
      children: <Widget>[
        Container(
          width: mw,
          child: ListTile(
              title: Text('list tile'),
              leading: Icon(Icons.account_box_rounded)),
        ),
        Container(
          width: mw,
          decoration: BoxDecoration(
              border: Border.all(width: 2, color: Colors.deepOrange)),
          child: ListTile(
              title: Text('list tile'),
              leading: Icon(Icons.account_box_rounded)),
        ),
        Container(
          width: 56,
          child: Image.network(
            'https://i0.hdslb.com/bfs/feed-admin/33dcc0722b4bc07970f77689669eb4fe3bdf1e49.jpg@336w_190h.webp',
            height: 40,
            alignment: Alignment(-1, -1),
          ),
        ),
      ],
      // 如果是横向滚动，必须设置容器的宽度
      scrollDirection: Axis.horizontal,
    );
  }
}

```

## attribute