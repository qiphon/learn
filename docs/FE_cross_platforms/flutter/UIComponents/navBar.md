# flutter navBar

## bottom bar

```dart
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:tv_flutter/pages/homePage.dart';
import 'package:tv_flutter/pages/settings.dart';

class HomeWithNav extends StatefulWidget {
  const HomeWithNav({super.key});

  @override
  State<StatefulWidget> createState() {
    return _HomeWithNavState();
  }
}

class _HomeWithNavState extends State<HomeWithNav> {
  int _currentTab = 0;
  PageController _pageController = PageController();

  void _onTabChange(int value) {
    _pageController.animateToPage(value,
        duration: const Duration(milliseconds: 300), curve: Curves.bounceIn);
    setState(() {
      _currentTab = value;
      _pageController.jumpToPage(value);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.settings),
              label: 'settings',
            ),
          ],
          currentIndex: _currentTab,
          onTap: _onTabChange,
        ),
        body: PageView(
          controller: _pageController,
          children: <Widget>[Homepage(), SettingsPage()],
        ));
  }
}
```

## topBar

```dart

class _HomepageState extends State<Homepage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return (Scaffold(
        appBar: (TabBar(
          padding: const EdgeInsets.only(top: 30),
          controller: _tabController,
          tabs: const [
            Tab(
              icon: Icon(Icons.home),
              text: '首页',
            ),
            Tab(
              icon: Icon(Icons.settings),
              text: '设置',
            ),
            Tab(
              icon: Icon(Icons.help),
              text: '帮助',
            ),
          ],
        )),
        body: SafeArea(
          child: TabBarView(
            controller: _tabController,
            children: const [
              Text('data1'),
              Text('data2'),
              Text('data3'),
            ],
          ),
        )));
  }
}
```
