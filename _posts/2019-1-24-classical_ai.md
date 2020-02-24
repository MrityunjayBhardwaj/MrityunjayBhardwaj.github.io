---
layout: post 
title : Classical AI in JavaScript
tags  : [AI,classical-AI,A*,]
title-seprator: "|"
categories: blog Artificial-Intelligence
permalink: /:categories/:title.html
mathjax: true
p5js: true   
img: /posts_imgs/classical-ai/teaser/mccarthy.jpeg

---

In recent years, Aritificial Intelligence has recieved a lot of attention thanks to the re-birth of Neural Networks, and the advent of technologies like Siri,alex and self-driving cars. but the idea of AI is not new, infact it all started in 1960s, when a guy name <a id="post-link" target="_blank" href="https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)">Jhon McCarthy</a>  published his first paper on A.I called <a id="post-link" target="_blank" href="https://www.cs.cornell.edu/selman/cs672/readings/mccarthy-upd.pdf">Programs with Common Sense</a>. after him there were sevral people from really diverse backgrounds which influences the methodologies we use today....

<div align="center">
<a class="image-popup" href="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/fofai.jpg" title="classicalAI chart">
<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/fofai.jpg">
</a>

<span id="discription">fig 1.1 : fields that influence A.I </span>
</div>

side note:if you want to dive deep into the beginnings of AI, there is a great series of interviews conducted by MIT which you might find intresting...
<a id="post-link" target="_blank" href="https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film">https://techtv.mit.edu/videos/10268-the-thinking-machine-1961---mit-centennial-film</a>

although it might be tempting to think that classical AI is useless now, but it is still being used heavily... one of the most intresting field that utilize these algorithms is the games Industry and in this post we are going to be learning about some of these algorithms by creating our very own self-driving car(.....kind of). but before that, we need to understand what it really means to be intelligent, afterall our goal is to create an intelligent algorithm which can drive our car.

>one of the most prominent trait of being intelligent, is being able to slove problems correctly and efficiently. and like most of the problem solving tasks in real life, we tend to search for best possible route to get the best solution. so this means that most of the problems can be solved by "searching for the optimum solution", and that is exactly what we are trying to achieve in the field of A.I.

let's take a simple problem (see, L-fig (1.2)), suppose you have an appointment at a company and you are damn late, now, your objective is to reach there as fast as possible. so go ahead take the controller and see if you could find the fastest way to reach your destination....


{: .text-center}

<div id="Lfig-1" style="position: relative; z-index: 1; width: 400px; height: 400px; margin-left: auto; margin-right: auto; background-color: gray;">

</div>
{: .text-center}

<span id="discription">L-fig 1.2: use W,A,S,D keys to move the car and reach the destination (red marker)</span>
{: .text-center}

<script src="{{site.baseurl}}/assets/js/my_js/classical-ai/lfig-1_car-game.js"></script>

in the above exercise, we are able to solve this problem pretty easily, because..... we are humans,but if we want our computer to solve this problem we first need to explain it, in a language that they can understand. which brings us to our next topic, "spaces"...

**State Space and Search Space**

In classical A.I litrature, there are 2 types of spaces, state space and search space,
state space is what you see i.e, the physical configuration of our problem.(like the scene you see in L-fig-1.2 or driving a physical car and reaching your office on time (by the way, next time, set alarm! ) whereas, search space is the abstract configuration usually represented by <a id="post-link" traget="_blank" href="https://en.wikipedia.org/wiki/Tree_(data_structure)">tree</a> or a <a id="post-link" traget="_blank" href="https://en.wikipedia.org/wiki/Tree_(data_structure)">graph</a> data-structure , which is necessary because search space helps us translate our problem-environment(city-map in our case) in the language that computers can understand and potentially use it to solve the problem. it can be of many form,for e.g the search space of  L-fig (1.2) could be of the form fig-1.3(a),fig-1.3(b) or even fig-1.3(c)(which is a tree). inwhich each node represent a specific state in our state space and each edge represent the path from one state to another(see fig-1.4).

<div style="float: right" >
<img src="/assets/img/posts_imgs/classical-ai/body/graph_1.jpg" width="300px"/>
<img src="/assets/img/posts_imgs/classical-ai/body/graph_2.jpg" width="300px"/>
<img src="/assets/img/posts_imgs/classical-ai/body/graph_3.jpg" width="300px"/>

</div>

<span id="discription">fig-1.3(a)(left),fig1.3(b)(center) and fig 1.3(c)(right): where, green node represent start state and red node represent the goal state (we will learn more about this later in this blog post.) </span>
{: .text-center}

<a class="image-popup" href="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/search_space_disc.jpg">
<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/search_space_disc.jpg" />
</a>

<span id="discription">fig 1.4: as mentioned earlier, each node represent a perticular state in the state space, here in this figure, we expand some of these nodes in order to show what state these nodes represents. namely, state(b) represent the goal state of our problem and (a) and (c) represent some other states in our state space</span>

Now, these searches can broadly be categorised into 2 types, informed search and uninformed search:-

**Informed search**: In informed search, we have some information about our environment like for example in L-fig-1.2 we can see where our goal is! and we know how to reach there... which shows that, we have full information about our environment, which is the reason why we did'nt need to drive through every single road in order to find our goal because we already knew which road/path leads to our destination.

**Uninformed search** : on the other hand in un-informed search, we don't know anything about our environment which means that we have to search the entire space(roads/streets in our case) one by one in order to find our goal. 
In the next section we are first going to take a deep dive into uninformed search and its algorithm and after that we will take a look at some of the informed search stratigy. 


<h1 style="border-bottom:5px solid black;">Uninformed Search Strategies</h1>

As mentioned above, in uninfomed search, we have little to no information about our environment and it turns out that, in most of the real life problems we don't know much about our environment either. which is the reason why these algorithms are much more common in daily CS works then the informed ones.In our case, we can think of uninformed search as if we were **blindly** searching the entire space in hopes of finding our destination as illustrated in L-fig 1.5 :-

<div align="center" >
<div id="Lfig-2" style="width: inherit"></div>
<span id="discription">L-fig 1.5: drive the car and find your destination</span>
</div>

<script src="{{site.baseurl}}/assets/js/my_js/classical-ai/lfig-2_car-game-blind.js"></script>

now that we know what it feels like to blindly searching the space, lets take a look at how our computers search in this environment by looking at some of these algorithms...

**Depth First Search**

![image-right](/assets/img/posts_imgs/classical-ai/body/dfs.gif){: .align-right}
Now, suppose that our search space is a rectangular shaped coloney/street/block and we have to meet all our neighbours ,so instead of first visiting our adjecent-horizontal neighbours (the ones that are on the left and right of us) we first went-a-head and visit the neighbours that are "in-front" of us and we keep doing that untill we reach the end of our street and then we visit the horizontal neigbours(see fig.1.7), in-other words, we are searching depth-wise instead of breadth wise.


More-Techinically, in DFS we take the neighbours/childs of the current node and put it inside a stack(LIFO) and then take the last added node inside our stack and make that our current node, we repeat this process untill we reached our goal state or untill we exaust our search space.this method leads to a special behivour of searching depth-wise (which you can see on your right).


<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/dfs_pc.jpg"/>

for javascript implimentation, click <a id="post-link" target="_blank" href="https://github.com/MrityunjayBhardwaj/Classical_AI/blob/master/Classical_Search/DFS.js" >here</a>.

<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/dfs_viz_2.gif" width="300px" />
{: .text-center}

{: .text-center}
<span id="discription">
fig 1.6: dfs in action, see how it works <i><a id="post-link" target="blank_" href="{{site.baseurl}}/assets/js/my_js/classical-ai/page/DFS_Viz/index.html"> under the hood </a></i>.
</span>
{: .text-center}

**Breadth First Search**

![image-right](/assets/img/posts_imgs/classical-ai/body/bfs.gif){: .align-right}
BFS is really similar to DFS but here, instead of using Stack, we use Queue(FIFO) which leads to another special behivour of searching breadth-wise (hence, Breadth-First Search), and just like any algorithm, its better to see it in action(see, right).

<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/bfs_pc.jpg"/>


for javascript implimentation, click <a id="post-link" target="_blank" href="https://github.com/MrityunjayBhardwaj/Classical_AI/blob/master/Classical_Search/BFS.js" >here</a>.

**IDDFS**
![image-right](/assets/img/posts_imgs/classical-ai/body/graph_with_simple_dfs.gif){: .align-right}
Here, We limit the depth of our dfs search using a threshold and then iteratively increase this threshold to our liking, the reason why we do this is because, suppose our search space is infinit in which case the depth is infinit as well, which suggest the fact that if our goal state is in the brach horizontally adjecent to the current one then we will never be able to find it(see, right) but by using this iterative-deepning method we don't have to keep searching to the deepest end of the current branch, we can just skip to the next branch once we hit the threshold(see fig.1.8)

{: .text-center}
<a class="image-popup" href="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/iddfs.gif">
<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/iddfs.gif" />
</a>
{: .text-center}

{: .text-center}
<span id="discription">fig.1.7: visualization of iddfs</span>
{: .text-center}

<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/iddfs_pc.jpg"/>


<!-- ```javascript

function IDDFS(graph,itr){
    for(let depth=0;depth< itr;depth++)
        DFS(graph,depth);
}

``` -->

Now suppose, we have some information about our search space, just like in (L-fig 1.2) i.e, we know where are goal is, which means that we no longer have to search the entire space, instead we feed the information we have about our goal into our algorithm and we are done! , in the next section we are going to take a look at some of these algorithms.

<h1 style="border-bottom:5px solid black;">Informed Search Strategies</h1>

the most common informed search strategy is known as best-first search, here, instead of treating all the nodes as equal and expand them one by one(as we did in uninformed search algorithms above), we tend to prioritise nodes based on something called an evaluation function ($$ f(n) $$). for example, in our problem, we have to reach our destination as fast as possible, in other words, we need to find the "shortest path" from our home to our office and for that,we can search the space by choosing the roads(nodes) that are closer to our destination using this evaluation function. which inturn, leads to finding our shortest path!


**Greedy best-first search**

In Greedy best-first search we choose the evaluation function to just be the distance( euclideon or manhatten ) between a perticular node "n" to our goal node "w" (which is also known as heuristic function $$h(x)$$ ) and prioritise the ones that evaluates least value(i.e, neighbours that are closes to our goal). and if we examine the outputs of our evaluation function  on our problem(see, fig-1.8), we can see that the nodes that are closer to our goal node has less value then the ones that are far... you can also observe that alot of nodes has same value which suggest the fact that there are more then one best path to reach our goalstate.

$$f(x) = h(x)$$

{: .text-center}
<a class="image-popup" href="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/Greedy_bfs_weight_map.jpg">
<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/Greedy_bfs_weight_map.jpg" width="400px"/>
</a>
{: .text-center}

<span id="discription">fig 1.8:Weight map of Greedy Best-first Search</span>
{: .text-center}

**A* search**

apart from calculating the distance from a perticular state to our goal state ($$h(x)$$ )in order to find our best path, we can also add another layer of assurity by calculating the distance from our start state to that perticular state($$e(x)$$ ). which ensure that we not only find the best path relative to our goal node but also to our start node which inturn helps us to find the shortest path from our start state to our goal state. and this is exactly the technique that we use to solve our problem!(fig-1.6).

$$f(x) = h(x) + e(x)$$


{: .text-center}

<a class="image-popup" href="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/Astar_weight_map.jpg">
<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/Astar_weight_map.jpg" width="400px"/>
</a>
{: .text-center}

<span id="discription">fig 1.9 : Weight map of A* Search : 
Question: why most of the values are the same??  (Hint: see the formula!!)
</span>
{: .text-center}

<a class="image-popup" href="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/Astar_search.gif">
<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/Astar_search.gif" width="400px" />
</a>
{: .text-center}

<span id="discription">fig 1.10 : using A* search on our problem</span>
{: .text-center}

<img src="{{site.baseurl}}/assets/img/posts_imgs/classical-ai/body/A_star_pc.png" />
{: .text-center}

although there are several other algorithms for finding the shortest paths (like dijkstra,prims etc) but the reason why we choose A* star above all other is because of its speed which is the reason why it is been used heavily in the games industry espicially in creating enemy A.I which can track you down without bumping into the walls... so every time you get trapped by enemies you can curse astar for that ;) .


so thats all folks! we have covered a lot of ground today, we went from knowing nothing about A.I to creating our own self driving car, now i dare you to create something cool with it... like a self driving helicopter, or a zombie game inwhich you act as a destination for zombie so that they chaze you in your map....so go ahead and create some thing cool with these techniques, and don't forget to share the fun with us!

And if you sill want to learn more and try some fun interactive demos on Classical A.I algorithms I recommend to try these:-

Basically I plagerize this book xD: <a id="post-link" target="_blank" href="https://www.cin.ufpe.br/~tfl2/artificial-intelligence-modern-approach.9780131038059.25368.pdf" id="post-link">Artificial Intelligence: A Modern Approach Book a.k.a bible of A.I<a>

Source code of all the algorithms and more:<a id="post-link" target="_blank" href="https://github.com/aimacode/aima-javascript" id="post-link">https://github.com/aimacode/aima-javascript<a>

Another Great collection of article coverning ai used in games: <a id="post-link" target="_blank" >https://github.com/libgdx/gdx-ai</a>

Fun:-
Great Playground:-   <a id="post-link" target="_blank" href="https://qiao.github.io/PathFinding.js/visual/">https://qiao.github.io/PathFinding.js/visual/</a>

<!--
As discussed earlier, in informed search algorithms we feed the information about our goal and environment into these algorithms. and the most common way to do that is known as best-first search, inwhich we prioritise nodes that we closer to our goal state by using something called a evaluation function.

Evaluation function :

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