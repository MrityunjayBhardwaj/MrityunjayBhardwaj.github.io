---
layout: single
title : Classical AI in JavaScript
tags  : [AI,classical-AI,A*,]
title-seprator: "|"
categories: blog Artificial-Intelligence
permalink: /:categories/:title.html
mathjax: true
author-bio: false
author_profile: false
p5js: true   
header: 
    teaser: /assets/imgs/posts_imgs/classical_ai/teaser/botvshuman.jpeg
---


In recent years, Aritificial Intelligence has recieved a lot of attention thanks to the re-birth of Neural Networks from <a target="_blank" href="https://en.wikipedia.org/wiki/Geoffrey_Hinton"><i>Geoffery Hinton</i></a> , and the advent of technologies such as Siri,alex,self-driving cars etc but the idea of AI is not new, infact it all started in 1960s with a guy name <a target="_blank" href="https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)"><i>Jhon McCarthy</i></a> when he published his paper called <a target="_blank" href="https://www.cs.cornell.edu/selman/cs672/readings/mccarthy-upd.pdf"><i>Programs with Common Sense</i></a>. after him there were sevral people from really diverse backgrounds which influences the methodoligies we use now....

{: .text-center}
<img src="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/classical_ai/body/fofai.jpg">
<i style="font-size:15px">image source: <a target="_blank" href="" >twitter</a></i>
{: .text-center}

if you want to dive deep into the beginnings of AI, there is a great series of interviews conducted by MIT which you might find intresting...
<a target="_blank" href="https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film"><i>https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film</i></a>

although it might be tempting to think that classical AI is useless now but it is still being utilize heavily(heavier then the new AI paradigms).... one of the most intresting field that utilize these algorithms are the games Indistry and in this post we are going to be learning about some of prominent algorithms and implement them in Javascript from scratch!

but before moving forward, i would like to clarify what we are trying to achieve, one of the most prominent trait of being intelligent is being able to slove problems and according to nature, **if you can solve it you can survive it** and like most of the problem solving tasks in real life, we tend to search for best possible route to get the most optimum solution...so this means most of the problems can be solved by searching for the optimum solution, and that is exactly what we are trying to do..


In this article, we are going to be looking at some of the most fundamentel <a target="_blank" href="https://en.wikipedia.org/wiki/Graph_traversal"> _graph-search algorithms_</a> and slowly building an AI that can solve many real life problems!

the first algorithm that we are going to be covering are DFS and BFS, they are the 2 most popular graph search algorithms