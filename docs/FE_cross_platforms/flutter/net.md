# [网络请求](https://docs.flutter.cn/data-and-backend/networking)

http package 提供了 http 请求最简单易用的方法。该 package 支持 Android、iOS、macOS、Windows、Linux 以及 Web。

android 和 ios 要修改对应的配置文件，可以参考官网

步骤：

1. 添加 http package。`flutter pub add http` , 通常使用 [dio](https://pub.dev/packages/dio)

2. 使用 http package 进行网络请求。

   ```dart
   import 'package:http/http.dart' as http;

   //  Future 是 Dart 用来处理异步操作的一个核心类，它通常代表一个可能的值或者将来或许会用到的错误。
   Future<http.Response> fetchAlbum() {
      return http.get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));
   }
   ```

3. 将返回的响应转换成一个自定义的 Dart 对象。

这中间涉及到 [json 序列化数据](https://docs.flutter.cn/data-and-backend/serialization/json)

4. 使用 Flutter 对数据进行获取和展示。

   ```dart
   // 首先，创建一个包含网络请求返回数据的 Album 类，而且这个类还需要一个可以利用 json 创建 Album 的工厂构造器。
   class Album {
       final int userId;
       final int id;
       final String title;

       const Album({
           required this.userId,
           required this.id,
           required this.title,
       });

       factory Album.fromJson(Map<String, dynamic> json) {
           return switch (json) {
           {
               'userId': int userId,
               'id': int id,
               'title': String title,
           } =>
               Album(
               userId: userId,
               id: id,
               title: title,
               ),
           _ => throw const FormatException('Failed to load album.'),
           };
       }
   }

   // 获取数据, 讲数据转换成 Album 对象。
   Future<Album> fetchAlbum() async {
       final response = await http
           .get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1'));

       if (response.statusCode == 200) {
           // If the server did return a 200 OK response,
           // then parse the JSON.
           return Album.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
       } else {
           // If the server did not return a 200 OK response,
           // then throw an exception.
           throw Exception('Failed to load album');
       }
   }

   // widget 中获取数据
   class _MyAppState extends State<MyApp> {
       late Future<Album> futureAlbum;

       @override
       void initState() {
           super.initState();
           futureAlbum = fetchAlbum();
       }
       // ···
   }
   ```

## debugger 网络请求

vscode 打开方式

- `CMD + SHIFT + P` ===> `dart: open devtool ...` ===> 应该就可以看到了
