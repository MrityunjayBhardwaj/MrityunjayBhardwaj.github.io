---
layout: post 
title : Optimization and Lagrange Multipliers
tags  : [ML,math,calculus,lagrange-multipliers, optimization, non-convex,convex]
title-seprator: "|"
categories: blog  Mathematics Calculus
permalink: /:categories/:title.html
mathjax: true
p5js: true   
comments: true
img: /posts_imgs/lagrange-multipliers/teaser/post-4.jpg
---

<audio id="onWinningAudio">
<source src="{{site.baseurl}}/assets/audio/posts/lagrange-multipliers/henryrichard__sfx-clear.wav">
NOPE
</audio>

<style>
    .VizContrainer{
        display: flex;
        flex-direction: row;

        margin-left: auto;
        margin-right: auto;

        /* padding: 1em; */
        position: relative;
    }

    

    #viz3{
        display: flex;
        flex-direction: row;
    }
    .winningOverlay{
        width: 50%;

        height: 50%;

        position: absolute;

        z-index: 9;

        /* opacity: 0.2; */



    }
    #winningOverlay1{
        display: none;
        margin: 15% 30%

    }
    #winningOverlay2{
        display: none;
        margin: 05% 30%;
    }

    .VizControls{

        /*  THIS IS UGLY, FIX IT */
        height: 600px;
        position: relative;
        margin-right: 50px;
        margin-left: -10px;
        margin-top: 100px;
        margin-bottom: 10px;
    }

    #viz3Controls{
        /*  THIS IS UGLY, FIX IT */
        height: 300px;
        position: relative;

    }


    .vizSketch{
        margin: auto;
        padding: 1em;
        position: relative;
    }

    .infoBlock{
        display: block ruby;
        color: red;

        width: max-content;
        border-radius: 1em;
        border-style: solid;
        padding: 2px 4px;
        margin: 20px 0px;

    }

    .infoBlock .mjx-chtml{
        display: inline-block;

    }



    .pt1{
        stroke-width: 2px;
    }
    .pt2{
        stroke-width: 2px;
    }

    .slider{
         height: inherit;
         /* padding: 1em; */
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
        width: 5%;
        padding: 0 5px;
    }
    .slidecontainer{
         height: inherit;
         position:inherit; 
         /* transform: translate(0%,25%) */
    }


    #viz3_2Sketch{
        /* margin: 50px */
    }


    .fig{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .figDiscription{
        text-align: center;
        
    }

    .asideSection{
        background: #f8f8f8;
    }

    .btn {
        border: none;
        background-color: inherit;
        padding: 14px 28px;
        font-size: 16px;
        cursor: pointer;
        display: inline-block;
    }

    /* On mouse-over */
    .btn:hover {background: #eee;}

    .success {color: green;}
    .info {color: dodgerblue;}
    .warning {color: orange;}
    .danger {color: red;}
    .default {color: black;}

    /* Blue */
    .info {
        color: dodgerblue
    }

    .info:hover {
        background:#f8f8f8;
        color: dodgerblue;
    }
        

    .contourFeasiblePoints{
        color: gray;
    }
    .dfx{
        color: magenta;
    }
    .dgx{
        color: purple;
    }

    .constraintRegion {
        color: orange;
    }

    .objectiveFunction{
        color: blue;
    }


    .dialog{
        font-family: monospace, monospace;
        font-size: 1em;
        color: var(--main-link-color);
        font-weight: 400;
        border: 1px solid #607D8B;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        padding: 0.1rem 0.5rem;
    }

</style>

<!-- <script src="{{site.baseurl}}/assets/js/dependency/plotlyJS/plotly-latest.min.js"></script> -->

<script src="{{site.baseurl}}/assets/js/dependency/tensorflowJS/tf.min.js"></script>

<script src="{{site.baseurl}}/assets/js/dependency/utils.js"></script>


<script src="{{site.baseurl}}/assets/js/dependency/d3.js"></script>

$$
\require{cancel}
$$

## Optimization 

Suppose, you want to buy a car. but you are a bit confused which one to buy as there are alot of options... but your mathematician wife knows you pretty well and she quickly constructed this preference function for you which tells you which car you'll prefer and which car you don't according to the looks or features of the car...

<div align="center">
<img class="fig" src="{{site.baseurl}}/assets/img/posts_imgs/lagrange-multipliers/carPlot.png"/>

</div>

<div class="figDiscription">
<p>
Fig 1: Car Plot :-
here, the <span style="color:red">'x'-axis</span> represents the price of the car and  <span style="color:rgb(100,0,100)">'y'-axis</span> denotes your preference for a particular car.</p>
</div>

As you can see, this function is non-linear(not a straight line) which makes sense because there might be some cars who's price is high but you did'nt like its design or maybe you are looking for a family car or something... 

now, if you have infinit budget then you don't even have to look at the price of the car, you can just choose a car with the highest preference value.. soo go ahead and find the best possible car by adjusting the slider below..

<div class="VizContrainer" id="viz1Container">

<div class="VizControls" id="viz1Controls">
    <div class="slidecontainer">
            <input type="range" orient="vertical" min="1" max="100" value="50" class="slider" id="contourSlider1">
    </div>
</div>
<div class="VizSketch" id="viz1Sketch"></div>
</div>
<div class="infoBlock" id="infoBlock1">
$$f(x)$$ = <span id="contourValue1">0</span>
</div>

<script src="{{site.baseurl}}/assets/js/my_js/lagrange-multipliers/viz1.js"></script>
<div class="figDiscription">
<p>Fig 2: find the best car by tweaking that slider on the left</p>
</div>
So, the line you just adjusted is called a <a href="https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/visualizing-scalar-valued-functions/v/contour-plots">contour line</a>. A contour line  of a function is a set of all points where the output of our function is equal to a constant i.e, $$f(x) = c$$... like in our case, when we adjust the contour line we essentially set $$f(x) = c$$ in-which we adjusted the value of c by moving that slider (as you can see in that red box at the bottom of the slider)... which gave us the set of all the cars whose preference function value is equal to $$c$$.


Now that you have found which car you want to buy, you head back to you wife again and unsurprisingly the conversation goes something like this:

`ME: hey, thankyou for that pereference function earlier, i finally know which car i am gonna buy`

`Wife: Oh that awesome, how much does it cost?`

`ME: its half a million`

`Wife: half a... what!!... what are you Bill Gates or something?`

After that "friendly" conversation with you wife, she gave you the budget and 2 bumps on your head.\\
You see, in real life we almost always have some constraints which we need to follow and try to find the best possible values of our function without volating these constraints.

So, you went back to your graph viz thingy and plot the function along with the feasible region a.k.a the region of the cars you can afford (denoted in <span class="constraintRegion">orange color</span> below) :

<div align="center" class="VizSketch" id="viz5Sketch"></div>

<div class="figDiscription">
<p>Fig 3: this plot shows the range of car we can afford in  <span class="constraintRegion">orange</span> along with the usual preference function values..
</p>
</div>


now, the <span class="constraintRegion">orange highlighted section</span> of our preference function curve represent the preference value of the cars which you can afford(<span class="constraintRegion">f(feasible points)</span>). which means, now you need to find the best possible value while remaining within this <span class="constraintRegion"> constraint region</span>... so you take that contour line again and search for the best possible value of your preference function but this time instead of searching for any car you like regrardless of the price, here, we restrict ourselves to only look for the best possible car which are in our budget ( coz ya would'nt wanna mess with ya wife again..)


<div class="VizContrainer" id="viz2Container">
    <div class="VizControls" id="viz2Controls">
        <div class="slidecontainer">
                <input type="range" orient="vertical" min="1" max="100" value="50" class="slider" id="contourSlider2">
        </div>
    </div>
    <div class="VizSketch" id="viz2Sketch"></div>
    <div class="winningOverlay" id="winningOverlay1">
        <iframe src="https://giphy.com/embed/xhz40U8Z40gla" width="480*.5" height="270*.5" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> 
    </div>

</div>
<div class="infoBlock" id="infoBlock2">
$$f(x)$$ = <span id="contourValue2">0</span>
</div>

<script src="{{site.baseurl}}/assets/js/my_js/lagrange-multipliers/viz2.js"></script>

<div class="figDiscription">
<p>
Fig 4: tweak the slider and try to find the best possible value which are still in your budget..
</p>
</div>

now, that you have found the best car which is still in your budget you went back to your wife with this result and guess what, she liked it too! 


What you just did above (by manually searching for the best possible car without violating your constraints) is exactly the reason why we need optimimzation for.

Imagine instead of a 1 dimensional function, you have a 10 or a 100 dimensional function ( for example, in this case suppose the openion/preference of the entire family matter not just yours. here, you can image a function with 5-6 dimensions each representing the preference function of all the members of the family)... you can't possibly be thinking of finding the optimal values manually right? that is where optimization comes in. its just a mathematical framework which can give you the most optimal value provided our functions and our constraints(if any).

<br>

Now before moving forward, lets make ourselves a bit familier with some of the termonologies(a.k.a mathematical jargon) used in this field...

* so, that preference function in our earlier example, is known as **objective function**... because our objective was to find the maximum value of that function right?

* the process by which we are finding the best possible value of our objective function without violating the constraints(if any) is known as **optimization**.. its same as adjusting that contour line...

* if we don't have any constraint its known as **unconstriant optimization**

* after performing optimization, the best value we get is known as **optimal value** and the best point is known as **optimal point** like in fig 3, our optimal value is `2.459` and our optimal point is `128.40k` which is just the price of our most prefered car.

* points which satisfy all of our constraints are known as **feasible points** like those point that are highlighted in <span class="constraintRegion">orange</span> (see fig 3)


## Lagrange Multipliers

In order to solidify our understanding even further and to observe what is really happening when we optimize a higher dimensional function not just a 1d function (like we saw before) lets look at one more example before looking at the mathematical framework of finding these optimal values..

Suppose, you have variables $$x_1$$ and $$x_2$$ and a function $$f$$ which takes this 2 variables as input and spits out a single value (mathematically we write this statement as $$f: R^2 -> R$$) for e.g. let $$f(x_1,x_2) = x_1 + x_2$$ and let $$x_1 = 2$$ and $$x_2 = 3$$ then $$f(2,3) = 5$$...this type of function is known as multi-variate function for obvious reasons\\
In context of our car example in the previous section, we can think of $$x_:w
$$ as fuel consumption of the car maybe?

Anyways, in this example we are going to be using a multivariate function:-

$$ f(x_1,x_2) = x_1^2 + x_2^2 \tag{1}$$

along with the equality constraint:-

$$ 
\begin{align}
g(x_1,x_2) &= 2x_1 + 3x_2 = 20 \\
{} &= 2x_1 + 3x_2 -20 \tag{2}
\end{align}
 $$

if we plot our objective function as well as our constraint region, it will look something like this:-

<div class="VizSketch" align="center" id="viz4Sketch"></div>
<script src="{{site.baseurl}}/assets/js/my_js/lagrange-multipliers/viz4.js"></script>

<div class="figDiscription">
<p>
Fig 5: this plot shows our objective function in (<span class="objectiveFunction">blue</span>) and our constraint region and there corresponding objective function values in (<span class="constraintRegion">orange</span>)
</p>
</div>

Now lets look at our final plot below. here, just like before, we can easily find the best feasible minimum value (as oppose to finding the maximum value ) by adjusting our contour line slider but here, along with the <span class="objectiveFunction">objective function</span>,<span class="constraintRegion">constraint</span> and our <span class="contourLine">contour line</span>...we have also shown the <span class="contourFeasiblePoints">feasible points within our contour line</span> $$f(x'_1,x'_2) = c,$$ where, $$x'_1,x'_2$$ are feasible points represented by those <span class="contourFeasiblePoints">gray dots</span>...\\ 
In the right-hand side plot, we have also, shown the <span class="dfx">gradient vector of the function</span> as well as <span class="dgx">the gradient vector of constraint</span> evalued at each of these gray points..Although, these information may seem overwhelming at first but the observation we get by playing with these plots will help us greatly in constructing our mathematical formulation for automatically detecting our optimal points which we can then use to find the optimal value/points of any function with equality constriants(i.e, $$g(x_1,x_2) = 20$$ in our case) in any number dimensions..

ASIDE: <button  class="btn info" onclick="toggleDiv1Fn()">What is a gradient Vector?</button>
<div class="asideSection" id="toggleDiv1" style="display:none;">
what is a gradient vector?

<p>
Ans: Think of it like a guide who always points to where steepest climb is.. 
</p>

<div align="center">
<img src="{{site.baseurl}}/assets/img/posts_imgs/lagrange-multipliers/gradientVector.png" />
</div>

<p>
but if you look closely, our gradient vector is pointing to the lowest point instead of highest point.. this is because we want to minimize this function instead of maximize it.. so we are technically using the negative gradient instead of gradient but these details are not that important for our purposes...
</p>

<p>
if you want to know more about gradients and vectors then you can check out these beautiful and amazing resources:
</p>

<p>
https://christopherolah.wordpress.com/2011/07/31/you-already-know-calculus-derivatives/
</p>
<p>
https://www.youtube.com/watch?v=WUvTyaaNkzM&list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr
</p>
<p>
and for a more formal mathematical treatment i really like this resource:
</p>
<p>
http://tutorial.math.lamar.edu/
</p>
<p>
https://www.khanacademy.org/math/differential-calculus
</p>

</div>





<div class="VizContrainer" id="viz3Container">
    <div class="VizControls" id="viz3Controls">
        <div class="slidecontainer">
                <input type="range" orient="vertical" min="1" max="100" value="50" step=".001" class="slider" id="contourSlider3">
        </div>
    </div>
    <div id="viz3">
    <div class="VizSketch" id="viz3Sketch"></div>
    <svg class="VizSketch" id="viz3_2Sketch"></svg>
    </div>
    <div class="winningOverlay" id="winningOverlay2">
        <iframe src="https://giphy.com/embed/tIeCLkB8geYtW" width="288" height="226.799" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>


</div>

<div align="center" >
<div class="infoBlock" id="infoBlock3">
    $$f(x_1,x_2)$$ = <span id="contourValue3">0</span>
</div>
</div>

<script src="{{site.baseurl}}/assets/js/my_js/lagrange-multipliers/viz3.js"></script>

<script src="{{site.baseurl}}/assets/js/my_js/lagrange-multipliers/viz3_2.js"></script>

<div class="figDiscription">
<p>
Fig 6: (left) along with the usual things we saw in the previous figure this one also shows the feasible points that are in our contour line ( we call them <span class="contourFeasiblePoints"> contour feasible points</span> which are represented by <span class="contourFeasiblePoints">gray dots</span> ), we have also shown the <span class="globalMinima">global minimum point</span> just for reference. <br/>
(right) here, we have shown the <span class="objectiveFunction">cross-section/slice of our objective function</span> which is made by our <span class="contourLine">contour line</span> and along with our <span class="contourFeasiblePoints">contour feasible points</span> we have also shown the <span class="dfx">gradient of our objective function</span> as well as our <span class="dgx">constraint function</span>.
</p>
</div>

while adjusting the contour line we can clearly see that when we get closer and closer to the minimum value while still satisfying our constriants. the <span class="dfx">gradient of both the objective function</span> and <span class="dgx">constraint function</span> of those <span class="contourFeasiblePoints">contour feasible points </span>, points at almost the same directions! and at the optimal point these gradient vectors points at exactly the same direction and differ only by there magnitude!...\\
we can leverage this observation to construct the mathematical equivalent of searching for optimal points i.e,...

> Mathematically, at optimal point, the gradient vector of the objective function points to the same direction as the gradient vector of the constraint function and differ only by a scaling factor...

$$ \nabla f  = \lambda \nabla g $$

$$ f_{x_1}(\star{x}_1, \star{x}_2) = \lambda g_{x_1}(\star{x}_1, \star{x}_2) $$

$$ f_{x_2}(\star{x}_1, \star{x}_2) = \lambda g_{x_2}(\star{x}_1, \star{x}_2) $$

where, $$(\star{x}_1, \star{x}_2)$$ are the coordinates of our optimal point and $$f_x$$ is the derivative of function w.r.t $$x$$ and $$f_y$$ is the derivative of the function w.r.t $$y$$ respectively...

that scaling factor $$\lambda$$ is known as the **lagrange multiplier**.

Now, lets use this discovery to find the optimal point for this optimization problem without manually searching them..

here, our objective function is:

$$ f(x_1,x_2) = x_1^2 + x_2^2 \tag{1}$$

and our constraint function:-

$$ g(x_1,x_2) = 3x_1 + 2x_2 -20 \tag{2}$$

and if we follow the textbook version of formulating an optimization problem it will look something like this:-

$$
\begin{array}\\
\min{}_{x_1,x_2}&{f(x_1,x_2) = x_1^2 + x_2^2} \\
\operatorname{subject to}&{g(x_1,x_2) = 3x_1 + 2x_2 -20 = 0}\\
\end{array}
$$

don't worry, i know it looks a bit scary, but there is nothing here that we haven't looked before. \\
Let's break it down! 

the first line

$$ \min{}_{x_1,x_2}\quad f(x_1,x_2)= x_1^2 + x_2^2$$

simply means that we want to minimize our objective function with respect to $$x_1$$ and $$x_2$$, we can think of it as manually searching for those points $$x_1$$ and $$x_2$$ which when gets inserted into our function $$f(x_1,x_2)$$ it produces the minimum possible value... (its simple, just pause and ponder :D )

Now, if we optimize just this first line we get the global minimum point from fig 6 because till this point we haven't introduced any contraints just like we saw in our first example where we were trying to find the best car without caring about the budget, and what have we learned from our expericence back there? in real life there are almost always going to be constaints which we need to satisfy. which is exactly what is written in the second line of this optimization problem formulation....


$$\operatorname{subject to}\quad{g(x_1,x_2) = 3x_1 + 2x_2 -20 = 0}$$

here, our $$x_1$$ and $$x_2$$ are subject to our constaint function... I always like to imagine 2 points $$\bar{x}_1$$ and $$\bar{x}_2$$ (from our domain) go to a courtroom and are **subjected to** the question of the judge like `do you satisfy this constraint or not`  or in our case, its going to be <span class="dialog"> judge: do you $$\bar{x}_1$$ and $$\bar{x}_2$$ combine in this form see (2) and equal to 0?</span> if both answers `yes`! then they both are considered for minimizing our objective function but
if one of them say `no` then these $$\bar{x}_1$$ and $$\bar{x}_2$$ are not even considered for the job and said to be infeasible for the rest of the there life....\\
sorry for that dark story (i am listening to heavy metal while writing this blog post :P) but I hope this will somewhat reduce your stress of seeing these weird mathematical symbols.

## Solving using CODE 

Instead of solving the optimization problem by hand we let computer do that work for us... \\
here, we will use a <a href="https://www.cvxpy.org/">python library</a> which solves our optimization problem for free... you just have to define your problem and thats it! it will automatically find optimal point as well as value for you ;D

```python
# constructing our optimization problem using cvxpy
import cvxpy as cp

def f(x_1,x_2):
    return x_1**2 + x_2**2

# initializing variables
x_1 = cp.Variable()
x_2 = cp.Variable()

#our objective
obj_fn = cp.Minimize(f(x_1, x_2))

# constraints
constraints = [3*x_1 + 2*x_2 -20 == 0]

# solving our optimization problem.
opt_prob = cp.Problem(obj_fn, constraints)
opt_prob.solve()

# printing important informations
print('status: ', opt_prob.status)
print('optimal function value', opt_prob.value)
print('optimal x_1 point', x_1.value)
print('optimal x_2 point', x_2.value)
```
```
>>  status:  optimal
>>  optimal function value 30.769230769230766
>>  optimal x_1 point 4.615384615384615
>>  optimal x_2 point 3.0769230769230775
```

Now, if you had enough math for the day and don't want any more of this weird language with weird symbols you can go ahead and skip the rest of the sections because now you know intuitively understand what lagrange multipliers are! and also know a bit about using CODE to solve our optimization problem! \\
but if your brain is still reeking for more maths then please, by all means, head over to our final section in which we are going to be solving our optimization problem by hand...


## Solving by hand


Now, in order to find our optimal point it needs to satisfy 2 things, 

* our constraints:
$$g(x_1,x_2) = 3x_1 + 2x_2 - 20 = 0 \tag{3}$$

* as well as our previous observation i.e,

$$ \nabla f(x_1,x_2)  = \lambda \nabla g(x_1,x_2) \tag{4}$$

which for our exmple means:

$$
\nabla{f} = 
\left [
\begin{matrix}
f_{x_1} \\
f_{x_2} \\
\end{matrix}
\right ]
=\left [
\begin{matrix}
2x_1 \\
2x_2 \\
\end{matrix}
\right ]
$$

and the gradient vector of the constraint function =>

$$
\nabla{g} = 
\left [
\begin{matrix}
g_{x_1} \\
g_{x_2} \\
\end{matrix}
\right ]
=\left [
\begin{matrix}
3 \\
2 \\
\end{matrix}
\right ]
$$

putting these gradient vectors in $$(4)$$, we get:

$$\nabla{f} = \lambda\nabla{g}$$

$$
\left [
\begin{matrix}
2x_1 \\
2x_2 \\
\end{matrix}
\right ]
=
\lambda
\left [
\begin{matrix}
3 \\
2 \\
\end{matrix}
\right ]
$$

$$
\begin{align}
    2x_1 &= \lambda3 \qquad{(5)}\\
    2x_2 &= \lambda2 \qquad{(6)}\\
\end{align}
$$

we have 3 equations and three unknowns which mean we can easily solve this using standard algebric manipulations, which are as follows:

if we rearrange (5), we get:

$$ 
\begin{align}
    2x_1 &= \lambda3\\
    x_1 &= \frac{3\lambda}{2} \tag{7}\\
\end{align}
$$

if we re-arrange (6), we get:

$$ 
\begin{align}
    2x_2 &= \lambda2\\
    x_2 &= \frac{\cancel{2}\lambda}{\cancel{2}} \\
    x_2 &= \lambda \tag{8}
\end{align}
$$

Now, putting both (7) and (8) in (3), we get the value of our $$\lambda$$:-

$$


\begin{align}
   3x_1 + 2x_2 - 20 &= 0  \\
   3 \left ( \frac{3\lambda}{2} \right ) + 2(\lambda) &= 20\\
   \left ( \frac{9\lambda}{2} \right ) + 2(\lambda) &= 20\\
   \left ( \frac{9\lambda + 4\lambda}{2} \right ) &= 20 \\
   \ 9\lambda + 4\lambda  &= 2\times 20 \\
    13\lambda &= 40 \\
    \lambda &= \frac{40}{13} \qquad{(9)}\\
\end{align}
$$

using (9) we can finally calculate our (7) as well as (8) i.e,

$$
\begin{align}\\
   x_1 &= \frac{3\lambda }{2}\\
   x_1 &= \frac{3 \left ( \frac{40}{13} \right ) }{2} \qquad{(\text{using (9)})}\\
   x_1 &= \frac{3 \times 40 }{2 \times 13} \\
   x_1 &= \frac{120}{26} = \frac{\cancel{120}}{\cancel{26}} = \frac{60}{13} = 4.615 \qquad{(10)} \\
\end{align}
$$

Now, $$x_2$$ is:


$$
\begin{align}
    x_2 &= \lambda \\
    x_2 &= \frac{40}{13} = 3.076\qquad{(\text{using 9})}\qquad{(11)}\\
\end{align}
$$

So, the point which minimize our objective function subjected to our constraint function is: **(4.615, 3.076)** and if we put this onto our objective function we get the most optimal value:-


$$
\begin{align}\\
f(x_1,x_2) &= x_1^2 + x_2^2\\
f(\left (\frac{60}{13} \right ),\left (\frac{40}{13} \right ))&= \left (\frac{60}{13} \right )^2 + \left (\frac{40}{13} \right )^2\quad{\text{(putting (10) and (11))}}\\
{} &= (4.615)^2 + (3.076)^2 \\
{} &= 21.301 + 9.467 \\
{} &= 30.769\\
\end{align}\\
$$


So, in short, our optimal point is **(4.615, 3.076)**, whereas, our optimal value is  **30.769**... which is exactly what we get if we manually toggle our contour line in fig 5 which means our math align 100% percent with our intuition!!.. which is quite beautiful don't you think? ( please, let me know what you think about it)


## Bonus

Now that we know everything there is to know about Lagrange Multipliers... we can  look at a much more complicated visualization of lagrange multiplier:
<div class="sketchfab-embed-wrapper" align="center">
    <iframe title="A 3D model" width="640" height="480" src="https://sketchfab.com/models/984091bb0602456088e7af43f5550c13/embed?preload=1&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_watermark=1&amp;ui_watermark_link=1" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
    <p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;">
        <a href="https://sketchfab.com/3d-models/lagrange-multiplier-visualization-984091bb0602456088e7af43f5550c13?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Lagrange Multiplier Visualization</a>
        by <a href="https://sketchfab.com/mrityunjaybhardwaj?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">mrityunjaybhardwaj</a>
        on <a href="https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a>
    </p>
</div>

here, instead of changing our function value  using contour line we are running along the constraint region and moving over each of the feasible points and calculate there gradient vectors... Play with this visualization and see if you could figure out all the optimal points (hint: there are more then 1 optimal points :D ) you can also find the optimal points using the power of mathematics like we did in our previous section... \\
All the information regarding this visualization is in the <a href="https://sketchfab.com/3d-models/lagrange-multiplier-visualization-984091bb0602456088e7af43f5550c13">description of this visualization</a>




If you are able to reach here... then congratulations you have mastered the art of lagrange multipliers!!... you can now use this newly found knowledge to solve many world problems or you can extend this knowledge even further by learning more on optimization... here are some of the resource which i love and i am sure you will to :D

* https://christopherolah.wordpress.com/2011/07/31/you-already-know-calculus-derivatives/
* https://www.youtube.com/watch?v=WUvTyaaNkzM&list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr
* and for a more formal mathematical treatment i really like this resource:
* http://tutorial.math.lamar.edu/
* https://www.khanacademy.org/math/differential-calculus
* if you want to dive much deeper into optimization you can check out this classic and beautiful book :- https://web.stanford.edu/~boyd/cvxbook/

Anyways, i hope you enjoyed this post and learned something cool. if there is anything you want me to impove upon then please, feel free to tell me in the comment section below, i would really love to hear any  critique or comments you might have!


Till then, Bye and Have a beautiful day ^_^
<script src="{{site.baseurl}}/assets/js/my_js/lagrange-multipliers/toggleDivs.js"></script>