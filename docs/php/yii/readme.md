# 安装 YII 

- [添加apache配置](https://www.yiiframework.com/doc/guide/2.0/en/start-installation#recommended-apache-configuration)

```sh
# 下载 composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# install YII
composer create-project --prefer-dist yiisoft/yii2-app-basic basic

```