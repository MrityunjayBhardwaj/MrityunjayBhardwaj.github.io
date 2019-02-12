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
    teaser: /assets/imgs/posts_imgs/classical-ai/teaser/botvshuman.jpeg
---


In recent years, Aritificial Intelligence has recieved a lot of attention thanks to the re-birth of Neural Networks from <a style="color:#3399ff" target="_blank" href="https://en.wikipedia.org/wiki/Geoffrey_Hinton"><i>Geoffery Hinton</i></a> , and the advent of technologies such as Siri,alex,self-driving cars etc but the idea of AI is not new, infact it all started in 1960s with a guy name <a style="color:#3399ff" target="_blank" href="https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)"><i>Jhon McCarthy</i></a> when he published his paper called <a style="color:#3399ff" target="_blank" href="https://www.cs.cornell.edu/selman/cs672/readings/mccarthy-upd.pdf"><i>Programs with Common Sense</i></a>. after him there were sevral people from really diverse backgrounds which influences the methodoligies we use now....

{: .text-center}
<img src="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/fofai.jpg">
<i style="font-size:15px">image source: <a style="color:#3399ff" target="_blank" href="" >twitter</a></i>
{: .text-center}

if you want to dive deep into the beginnings of AI, there is a great series of interviews conducted by MIT which you might find intresting...
<a style="color:#3399ff" target="_blank" href="https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film"><i>https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film</i></a>

although it might be tempting to think that classical AI is useless now but it is still being utilize heavily(heavier then the new AI paradigms).... one of the most intresting field that utilize these algorithms are the games Indistry and in this post we are going to be learning about some of prominent algorithms and implement them in Javascript from scratch!

but before moving forward, i would like to clarify what we are trying to achieve, one of the most prominent trait of being intelligent is being able to slove problems and according to nature, **if you can solve it you can survive it** and like most of the problem solving tasks in real life, we tend to search for best possible route to get the most optimum solution...so this means most of the problems can be solved by searching for the optimum solution, and that is exactly what we are trying to do..

{: .text-center}
<div id="Lfig-1" style="width: inherit"></div>
<i>this is my game</i>
{: .text-center}

<script src="{{site.baseurl}}/assets/js/dependency/p5/p5.min.js"></script>
<script src="{{site.baseurl}}/assets/js/dependency/p5/addons/p5.dom.min.js"></script>

<script src="{{site.baseurl}}/assets/js/my_js/classical-ai/lfig-1_car-game.js"></script>


state space is what you see i.e, the physical configuration of our problem. whereas, search space is the abstract configuration usually represented by tree or a graph , which is necessary because search space helps us to quantify our problem in the language that computers can understand.

In this article, we are going to be looking at some of the most fundamentel <a style="color:#3399ff" target="_blank" href="https://en.wikipedia.org/wiki/Graph_traversal"> _graph-search algorithms_</a> and slowly understanding several AI search algorithms that can solve many real life problems!

so, search can be of 2 type, informed search and uninformed search

**Informed search**: In informed search, we have some information about our environment like for example in L-Fig 1.1 we can see where is our goal and we know how to reach there by steearing that car... which shows that we have full information about our environment

**Uninformed search** : In this type, we don't know anything about our environemnt which means that we have to search the entire space one by one in order to reach our goal,take a look at L-fig 1.2, here we dont know where is our goal so we are just **blindly** search the space in hope of reaching our goal.

now first lets take a look a uninformed search because most of the time in real life applications we don't know much about our search space. so the first algorithm that we are going to be looking at is probably the most used graph searching algorithm out there, its called DFS and its brother, BFS.

DFS stands for Depth First Search in this algorithm we 

BFS

IDDFS

Informed search-
    Heuristic search


