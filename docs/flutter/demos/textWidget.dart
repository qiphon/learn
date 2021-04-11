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
      body: Center(
        child: 
          Text(
            'hello fluttersldfl十六分零四的距离是垃圾吝啬鬼报价发我i上了飞机数量单价fluttersldfl十六分零四的距离是垃圾吝啬鬼报价发我i上了飞机数量单价fluttersldfl十六分零四的距离是垃圾吝啬鬼报价发我i上了飞机数量单价', 
            textAlign: TextAlign.justify,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 25.0,
              color: Color.fromARGB(80, 3, 55, 8),
              decoration: TextDecoration.lineThrough,
              decorationColor: Color.fromARGB(100, 255, 0, 0),
              decorationStyle: TextDecorationStyle.dashed
            ),
          ),
        )
      )
    );
  }
}