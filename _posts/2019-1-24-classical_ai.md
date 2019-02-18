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


In recent years, Aritificial Intelligence has recieved a lot of attention thanks to the re-birth of Neural Networks from <a id="post_link" target="_blank" href="https://en.wikipedia.org/wiki/Geoffrey_Hinton"><i>Geoffery Hinton</i></a> , and the advent of technologies such as Siri,alex,self-driving cars etc but the idea of AI is not new, infact it all started in 1960s with a guy name <a id="post_link" target="_blank" href="https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)"><i>Jhon McCarthy</i></a> when he published his paper called <a id="post_link" target="_blank" href="https://www.cs.cornell.edu/selman/cs672/readings/mccarthy-upd.pdf"><i>Programs with Common Sense</i></a>. after him there were sevral people from really diverse backgrounds which influences the methodoligies we use now....

{: .text-center}
<img src="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/fofai.jpg">
<i style="font-size:15px">fig 1.1 : fields that influence A.I </i>
{: .text-center}

side note:if you want to dive deep into the beginnings of AI, there is a great series of interviews conducted by MIT which you might find intresting...
<a id="post_link" target="_blank" href="https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film"><i>https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film</i></a>

although it might be tempting to think that classical AI is useless now, but it is still being utilize heavily... one of the most intresting field that utilize these algorithms is the games Indistry and in this post we are going to be learning about some of prominent algorithms and implement them by creating our very own Game A.I.

one of the most prominent trait of being intelligent, is being able to slove problems correctly and according to nature, **if you can solve it you can survive it** and like most of the problem solving tasks in real life, we tend to search for best possible route to get the most optimum solution...so this means most of the problems can be solved by searching for the optimum solution, and that is exactly what we are trying to achieve using A.I.

let's take a simple problem (see L-fig (1.2)), suppose you have an appointment at a company and you are damn late, now, your objective is to reach there as fast as possible, so go ahead, and see if you could reach in time! :-

{: .text-center}
<div id="Lfig-1" style="width: inherit"></div>
<i>(L-fig (1.2)): this is my game</i>
{: .text-center}

<script src="{{site.baseurl}}/assets/js/dependency/p5/p5.min.js"></script>
<script src="{{site.baseurl}}/assets/js/dependency/p5/addons/p5.dom.min.js"></script>

<script src="{{site.baseurl}}/assets/js/my_js/classical-ai/lfig-1_car-game.js"></script>

Now, as you might have observed, in order to reach our destination we need to take the fastest route possible and for that we need to search the entire space.

**State Space and Search Space**

there are 2 types of space in classical A.I litrature, state space and search space,
state space is what you see i.e, the physical configuration of our problem.(like in L-fig 1.2) whereas, search space is the abstract configuration usually represented by tree or a graph data-structure , which is necessary because search space helps us to quantify our problem in the language that computers can understand and potentially use to solve the problem. it can be of many form,for e.g the search space of ( L-fig (1.2)) could be of the form (fig 1.3) or (fig 1.4).

<img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/graph_1.jpg">
{: .text-center}
<i>fig 1.3: graph 1</i>
{: .text-center}

<img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/graph_2.jpg">
{: .text-center}
<i>fig 1.4: graph 2</i>
{: .text-center}

 Search can be of 2 type, informed search and uninformed search:-

**Informed search**: In informed search, we have some information about our environment like for example in L-Fig 1.1 we can see where is our goal and we know how to reach there by steearing that car... which shows that we have full information about our environment.

**Uninformed search** : In this type, we don't know anything about our environemnt which means that we have to search the entire space one by one in order to reach our goal,take a look at L-fig 1.2, here we dont know where  our goal is. so we are just **blindly** search the entire space in hope of reaching our goal.

{: .text-center}
<div id="Lfig-2" style="width: inherit"></div>
<i>blind run</i>
{: .text-center}

<script src="{{site.baseurl}}/assets/js/my_js/classical-ai/lfig-2_car-game-blind.js"></script>

now first lets take a look at uninformed search because most of the time in real life applications we don't know much about our search space. so the first algorithms that we are going to be looking at are  know as DFS and BFS.

**Depth First Search**

In DFS we usually take a look...

{: .text-center}
style="color:#3399ff" <img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/dfs_viz_ss.png"/>

<i><a target="blank_" href="{{site.baseurl}}/assets/js/my_js/classical-ai/page/DFS_Viz/index.html">full-screen</a></i>
{: .text-center}

**BFS**

there is a great visualization of BFS from the guys of visualalgo do check it out.

**IDDFS**

its the same as DFS but we itertively increase the max-depth threshold which is helpfull because suppose our goal is in (L_1) see (fig-1.6) and we know the depth is infinite which means that we will never be able to reach L_1 because the way DFS works is by first reaching the end of the neighbours and then go to the next node.. which in this case, never going to happen, which leads to discovery of this algorithm

```javascript

function IDDFS(graph,itr){
    for(let depth=0;depth< itr;depth++)
        DFS(graph,depth);
}

```

Now suppose we know about our search space, just like in (L-fig 1.2) i.e, we know where are goal is inside our search space, which means that we no longer have to blindly search the space, we can make the informed decision about our search, every step of the way and this type of search is known as Informed Search

**Informed Search**:

In Informed Search we take decision based on certain _heuristics_ which reflects the infromation we have about our environment and our goal state, this method prevents us from having to search the entire space which is extremely usefull if the search space is huge, like in the case of chess where it has more then 100 million configurations in the typical game.

Evaluation function:

something ....

Heuristic  function:

a heuristic function calcuate the best way to reach from this current state to our goal state and different heuristics function leads to different behivour which leads to the formation of different heuristic search algorithms.


**Best First Search**

this algorithm selects a node for expansion according to an evaluation function.

GBFS expands nodes with minimal h(n). it is not optimal but is often efficient.

$$f(x) = h(x)$$



**A* Search**

A* expands nodes with minimal f(n) = g(n) + h(n). A* is complete and optimal, provided that h(n) is admissible or consistent (for GRAPH_SEARCH).The space complexity of A* is stilll prohibitive.

$$f(x) = h(x) + g(x)$$