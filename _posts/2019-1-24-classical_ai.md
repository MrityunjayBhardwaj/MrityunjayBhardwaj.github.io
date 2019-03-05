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

search_space:
    - url: /assets/imgs/posts_imgs/classical-ai/body/graph_1.jpg
      image_path : /assets/imgs/posts_imgs/classical-ai/body/graph_1.jpg
      alt: "some shit"
      title: "graph_1"
    - url: /assets/imgs/posts_imgs/classical-ai/body/graph_2.jpg
      image_path : /assets/imgs/posts_imgs/classical-ai/body/graph_2.jpg
      alt: "some shit2"
      title: "graph_2"
    - url: /assets/imgs/posts_imgs/classical-ai/body/graph_3.jpg
      image_path : /assets/imgs/posts_imgs/classical-ai/body/graph_3.jpg
      alt: "some shit3"
      title: "graph_3"

---
<script>

window.onload = function() {
  var x = document.getElementById("code-snippet");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 

function myFunction() {
  var x = document.getElementById("code-snippet");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 
</script>

In recent years, Aritificial Intelligence has recieved a lot of attention thanks to the re-birth of Neural Networks from <a id="post-link" target="_blank" href="https://en.wikipedia.org/wiki/Geoffrey_Hinton">Geoffery Hinton</a> , and the advent of technologies such as Siri,alex,self-driving cars etc but the idea of AI is not new, infact it all started in 1960s with a guy name <a id="post-link" target="_blank" href="https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)">Jhon McCarthy</a> when he published his paper called <a id="post-link" target="_blank" href="https://www.cs.cornell.edu/selman/cs672/readings/mccarthy-upd.pdf">Programs with Common Sense</a>. after him there were sevral people from really diverse backgrounds which influences the methodoligies we use now....

{: .text-center}
<a class="image-popup" href="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/fofai.jpg" title="classicalAI chart">
<img src="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/fofai.jpg">
</a>
<i id="discription">fig 1.1 : fields that influence A.I 
{: .text-center}

side note:if you want to dive deep into the beginnings of AI, there is a great series of interviews conducted by MIT which you might find intresting...
<a id="post-link" target="_blank" href="https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film">https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film</a>

although it might be tempting to think that classical AI is useless now, but it is still being used heavily... one of the most intresting field that utilize these algorithms is the games Indistry and in this post we are going to be learning about some of these algorithms by creating our very own self-driving car. but before that, we need to understand what it means to be intelligent. 

>one of the most prominent trait of being intelligent, is being able to slove problems correctly and efficiently. and like most of the problem solving tasks in real life, we tend to search for best possible route to get the best solution. so this means that most of the problems can be solved by "searching for the optimum solution", and that is exactly what we are trying to achieve using A.I.

let's take a simple problem (see L-fig (1.2)), suppose you have an appointment at a company and you are damn late, now, your objective is to reach there as fast as possible. so go ahead take the controller and see if you could find the fastest way to reach your destination....


>Instructions:
>
> use W,A,S,D keys to move the car
{: .notice--info}


{: .text-center}

<div id="Lfig-1" style="width: inherit"></div>
<span id="discription ">(L-fig (1.2)): this is my game</span>
{: .text-center}

<script src="{{site.baseurl}}/assets/js/my_js/classical-ai/lfig-1_car-game.js"></script>

in the above exercise, we are able to solve this problem pretty easily, because..... we are humans,but if we want our computer to solve this problem we first need to explain it, in a language that they can understand. which brings us to our next topic, state spaces(we can understand) and search spaces(what computers can understand).

**State Space and Search Space**

In classical A.I litrature, there are 2 types of spaces, state space and search space,
state space is what you see i.e, the physical configuration of our problem.(like the scene you see in L-fig 1.2) whereas, search space is the abstract configuration usually represented by tree or a graph data-structure , which is necessary because search space helps us to transform our problem in the language that computers can understand and potentially use it to solve the problem. it can be of many form,for e.g the search space of ( L-fig (1.2)) could be of the form (fig 1.3),(fig 1.4) or even fig 1.5. inwhich each node represent a specific state in our state space and each edge represent the path from one state to another(see fig 1.5).

{% include gallery id="search_space" caption="fig1.3(left) and fig 1.4(right)" %}

<a class="image-popup" href="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/search_space_disc.jpg">
<img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/search_space_disc.jpg" />
</a>

<span id="discription">fig 1.5: as mentioned earlier, each node represent a perticular state in the state space, here in this figure we expand some of these nodes in order to show what state these nodes represents. namely, state(b) represent the goal state of our problem and (a) and (c) represent some other states in our state space</span>

Now, these searches can broadly be categorised of 2 types, informed search and uninformed search:-

**Informed search**: In informed search, we have some information about our environment like for example in L-Fig 1.1 we can see where is our goal and we know how to reach there... which shows that, we have full information about our environment, which is the reason why we did'nt need to drive through every road in order to reach our goal because we already knew which road leads to our goal.

**Uninformed search** : on the other hand in un-informed search, we don't know anything about our environment which means that we have to search the entire space one by one in order to reach our goal,take a look at L-fig 1.2, here we don't know where our goal is. so we are just **blindly** searching the entire space in hopes of finding our goal.

<h1 style="border-bottom:5px solid black;">Uninformed Search Strategies</h1>

{: .text-center}
<div id="Lfig-2" style="width: inherit"></div>
blind run
{: .text-center}

<script src="{{site.baseurl}}/assets/js/my_js/classical-ai/lfig-2_car-game-blind.js"></script>

now first let's take a look at uninformed search because most of the time in real life applications we don't know much about our search space. so the first algorithms that we are going to be looking at are DFS and BFS.

**Depth First Search**

![image-right](/assets/imgs/posts_imgs/classical-ai/body/dfs.gif){: .align-right}
In Depth First Search, we search to the deepest end of the current branch before moving to the next one.

Techinically, in DFS we take the neighbours/childs of the current node and put it inside a stack(LIFO) and then take the last added node inside our stack and make that our current node, we repeat this process untill we reached our goal state or untill we exaust our search space.this method leads to a special behivour of searching depth-wise (which you can see on your right).


<a class="image-popup" href="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/dfs.jpg">
<img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/dfs.jpg"/>
</a>
<span id="discription">fig 1.5: psudo code of Depth-First Search</span>

for javascript implimentation, click <a id="post-link" target="_blank" href="https://github.com/MrityunjayBhardwaj/Classical_AI/blob/master/Classical_Search/DFS.js" >here</a>.

for dfs demo in graph
{: .text-center}
style="color:#3399ff" <img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/dfs_viz_ss.png"/>

<i><a target="blank_" href="{{site.baseurl}}/assets/js/my_js/classical-ai/page/DFS_Viz/index.html">full-screen</a></i>
{: .text-center}

**Breadth First Search**

![image-right](/assets/imgs/posts_imgs/classical-ai/body/bfs.gif){: .align-right}
BFS is exactly like DFS but here, instead of using Stack, we use Queue(FIFO) which leads to a special behivour of searching breadth-wise (hence, Breadth-First Search), and just like any algorithm, its better to see it in action(see, right).

<a class="image-popup" href="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/bfs.jpg">
<img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/bfs.jpg"/>
</a>
<span id="discription">fig 1.5: psudo code of Breadth-First Search</span>

for javascript implimentation, click <a id="post-link" target="_blank" href="https://github.com/MrityunjayBhardwaj/Classical_AI/blob/master/Classical_Search/BFS.js" >here</a>.

**IDDFS**
![image-right](/assets/imgs/posts_imgs/classical-ai/body/graph_with_simple_dfs.gif){: .align-right}
Here, We limit the depth of our dfs search using a threshold and then iteratively increase this threshold to our liking, the reason why we do this is because, suppose our search space is infinit in which case the depth is infinit as well, which suggest the fact that if our goal state is in the next branch then we will never be able to find it(see, right) but by using this iterative-deepning method we don't have to keep searching to the deepest end of the current branch, we can just skip to the next branch once we hit the threshold(see fig.1.6)

{: .text-center}
<a class="image-popup" href="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/iddfs.gif">
<img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/iddfs.gif" />
</a>
{: .text-center}

{: .text-center}
<span id="discription">fig.1.6: iddfs viz.</span>
{: .text-center}

<a class="image-popup" href="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/iddfs.jpg">
<img src="{{site.baseurl}}/assets/imgs/posts_imgs/classical-ai/body/iddfs.jpg"/>
</a>
<span id="discription">fig 1.5: psudo code of IDDFS</span>


```javascript

function IDDFS(graph,itr){
    for(let depth=0;depth< itr;depth++)
        DFS(graph,depth);
}

```

Now suppose, we have some information about our search space, just like in (L-fig 1.2) i.e, we know where are goal is, which means that we no longer have to search the entire space, instead we feed the information we have about our goal into our algorithm and we are done! , in the next section we are going to take a look at some of these algorithms.

<h1 style="border-bottom:5px solid black;">Informed Search Strategies</h1>

the most common informed search strategy is known as best-first search, here, instead of treating all the nodes as equal and expand them one by one(as we did in uninformed search algorithms above), we tend to prioritise nodes based on something called an evaluation function ($$ f(n) $$).
evaluation function construed as a cost estimate,so the node with the lowest evaluation is prioritised when expanding(which means here, we use priority queue) and the choice of $$ f(n) $$ determine the search strategy, in which most of them include something called a heuristic function ($$ h(n) $$) which is the cost of the cheapest path from a perticular state to our goal state.


**Greedy best-first search**

in this method we prioritise the nodes that is closest to the goal which means it evaluates the nodes by using just the heuristic function, this heuristic function can be the manhatten-distance b/w a perticular state and the goal state.

$$f(x) = h(x)$$

**A* search**

although GBFS is a pretty decent candidate for solving our problem, but it's not good enough, that is why we are going to be using the most widely used best-first search algoithm known as A* search to solve our problem, in this algorithm, we combine the cost of reaching the node "$$n$$" from the beginning "$$s$$" a.k.a ($$ g(n) $$) and the cost of going from "$$n$$" to our goal state "$$g$$ which leads to our final evaluation function:-

$$f(x) = h(x) + g(x)$$

and it turns out this evaluation function indeed gives us the estimated cost of the cheapest solution through a perticular node "$$n$$".


<!-- 
As discussed earlier, in informed search algorithms we feed the information about our goal and environment into these algorithms. and the most common way to do that is known as best-first search, inwhich we prioritise nodes that we closer to our goal state by using something called a evaluation function.

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

$$f(x) = h(x) + g(x)$$ -->