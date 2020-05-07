<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/styles/index.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
          <h3>{{ helper.relativeTime(item.time) }}</h3>
        </li>
      {% endfor %}
    </ul>

    <script src="/public/scripts/index.js"></script>
  </body>
</html>