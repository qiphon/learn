# state

Flutter 应用是 声明式 的，这也就意味着 Flutter 构建的用户界面就是应用的当前状态。

`UI = function(state)`

\_MyHomepageState 类的 \_index 变量中

```dart
class MyHomepage extends StatefulWidget {
  const MyHomepage({super.key});

  @override
  State<MyHomepage> createState() => _MyHomepageState();
}

class _MyHomepageState extends State<MyHomepage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _index,
      onTap: (newIndex) {
        setState(() {
          _index = newIndex;
        });
      },
      // ... items ...
    );
  }
}
```

## Provider

需要装包 `flutter pub add provider`

3 个需要知道的概念

- ChangeNotifier 它用于向监听器发送通知。换言之，如果被定义为 ChangeNotifier，你可以订阅它的状态变化。（这和大家所熟悉的观察者模式相类似）。

  ```dart
  // ChangeNotifier 是 flutter:foundation 的一部分，而且不依赖 Flutter 中任何高级别类。
  class CartModel extends ChangeNotifier {
      /// Internal, private state of the cart.
      final List<Item> _items = [];

      /// An unmodifiable view of the items in the cart.
      UnmodifiableListView<Item> get items => UnmodifiableListView(_items);

      /// The current total price of all items (assuming all items cost $42).
      int get totalPrice => _items.length * 42;

      /// Adds [item] to cart. This and [removeAll] are the only ways to modify the
      /// cart from the outside.
      void add(Item item) {
          _items.add(item);
          // This call tells the widgets that are listening to this model to rebuild.
          notifyListeners();
      }

      /// Removes all items from the cart.
      void removeAll() {
          _items.clear();
          // This call tells the widgets that are listening to this model to rebuild.
          notifyListeners();
      }
  }
  ```

- ChangeNotifierProvider : ChangeNotifierProvider widget 可以向其子孙节点暴露一个 ChangeNotifier 实例。它属于 provider package。

  ```dart
  void main() {
      runApp(
          ChangeNotifierProvider(
          create: (context) => CartModel(),
          child: const MyApp(),
          ),
      );
  }
  ```

- Consumer :Consumer widget 唯一必须的参数就是 builder。当 ChangeNotifier 发生变化的时候会调用 builder 这个函数。

  ```dart
  return Consumer<CartModel>(
      builder: (context, cart, child) {
          return Text('Total price: ${cart.totalPrice}');
      },
  );
  ```

Provider 和 Consumer 最好放在 widget 树尽量低的位置上，减少不必要的 rebuild。

- Provider.of 有的时候你不需要模型中的 数据 来改变 UI，但是你可能还是需要访问该数据。比如，ClearCart 按钮能够清空购物车的所有商品。它不需要显示购物车里的内容，只需要调用 clear() 方法。

所以这里我们可以使用 Provider.of，并且将 listen 设置为 false。

```dart
Provider.of<CartModel>(context, listen: false).removeAll();
```

[状态管理 demo](https://docs.flutter.cn/data-and-backend/state-mgmt/simple)
