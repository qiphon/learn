import 'package:flutter/material.dart';

void main() {
  return runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override 
  Widget build (BuildContext context) {
    return MaterialApp(
      title: 'flutter title',
      home: Scaffold(
        appBar: AppBar(
          title: Text('welcome to flutter',),
        ),
      body: Container(
          child: Text('container demos', style: TextStyle(color: Colors.white, fontSize: 20),),
          // 对齐方式 （x, y）(取值范围 -1 ~ 1 之间，1为最右，-1为最左, 中心点为 0，0)
          alignment: Alignment(-1, -1),
          // 默认会占满一个容器
          // height: 400,
          // width: 400,
          // 背景色
          // color: Colors.blue[50],
          padding: EdgeInsets.fromLTRB(10, 20, 0, 0),
          margin: EdgeInsets.fromLTRB(50, 60, 0, 0),
          decoration: new BoxDecoration(
            // 渐变背景色
            // gradient: LinearGradient(
            //   colors: [Colors.blue, Colors.deepOrange, Colors.grey]
            // )
            color: Colors.blue,
            border: Border(top: BorderSide(color:const Color(0xaFAAFFFF),width: 5)),
          ),
        )
      )
    );
  }
}