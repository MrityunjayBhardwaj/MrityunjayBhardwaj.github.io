---
layout: archive
permalink: /blog/
title: "Blog Posts"
author-profile: true
---

{% for post in site.posts %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}