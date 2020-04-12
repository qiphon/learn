# yii 实现增删改查

- MVC （model、view、controller）
    - model 数据模型，用于描述业务数据、
    - view  视图，展示给用户的
    - controller 控制器，负责处理业务逻辑

1. 基本知识
    - 目录权限确定
    - 目录所有者确定
    - Linux/apache 运行者确定

2. 修改配置

```php

// config/web.php

    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'qiphon', // (这里自定义的)
        ],


if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        'allowedIPs' => ['127.0.0.1', '::1', '192.168.0.*', '10.*.*.*', '172.16.*.*'],
    ];
}

// config/db.php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=books',
    //                   数据库地址；       数据库对应仓库名
    'username' => 'root',
    'password' => 'qiphon',
    'charset' => 'utf8',

    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];

```
- basic 目录权限递归 755 权限

3. 数据库

    - 整形  1个 --> 4个字节
    - float 1 --> 6个字节
    - double 1 --> 8个字节
    - 字符串
        - 定长字符串 char   （占据数据库的空间固定，跟数据无关）
        - 变长字符创 varchar (根据数据大小空间不等)
            - 变长字符在查找时不如定长字符串
    - 数值
        - decimal (指定精度)
    - id primary_key auto_increment

4. gii 入口  http://qiphon.cc/index.php?r=gii