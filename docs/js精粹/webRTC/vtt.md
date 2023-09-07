# [WebVTT](https://w3c.github.io/webvtt/) 

- 支持多个字幕
- 支持修改字母颜色
  - CSS中有专门的伪元素::cue可以控制字幕的样式。
    可以控制的CSS属性(可以根据标签或者类名设置样式)包括：
    - color
    - opacity
    - visibility
    - text-decoration及相关属性
    - text-shadow
    - background及相关属性
    - outline及相关属性
    - font及相关属性，包括line-height
    - white-space
    - text-combine-upright
    - ruby-position
  - 除此之外，WebVTT还支持一些HTML标签进行样式控制，常见的有声音`<v>`标签，颜色`<c>`，加粗`<b>`标签，倾斜`<i>`标签，下划线`<u>`标签，还有`<ruby>`和`<lang>`标签等。
  
```vtt
WEBVTT

00:00:00.001 --> 00:00:01.000
请把你的锅

00:00:01.001 --> 00:00:03.500
带回你的虾

00:00:03.501 --> 00:00:07.000
请把你的微笑留下……

00:00:07.501 --> 00:00:10.000
请把你的锅

00:00:10.001 --> 00:00:12.000
带回你的虾

00:00:12.001 --> 00:00:15.000
请把你的微笑留下
```

.vtt文件的MIME type是text/vtt。在Chrome和Firefox浏览器下，.vtt字幕是可以无障碍加载显示的，但是对于IE10+浏览器，虽然也支持.vtt字幕，但是，却需要定义MIME type，否则会无视WebVTT格式。比较简单方式就是在字幕所在文件夹下面添加个.htaccess文件，里面写上AddType text/vtt .vtt。

## 参考

- [w3c](https://w3c.github.io/webvtt/)
- [张新旭](https://www.zhangxinxu.com/wordpress/2018/03/html5-video-webvtt-subtitle/)