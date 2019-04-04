---
layout: single
title : SVM with SMO
tags  : [ML,AI,SVM,non-convex,online-learning,research-paper]
title-seprator: "|"
categories: blog  Artificial-Intelligence MachineLearning
permalink: /:categories/:title.html
mathjax: true
author-bio: false
author_profile: false
p5js: true   
comments: true
header: 
    teaser: /assets/imgs/posts_imgs/svm-with-smo/teaser/svm_db.png
---

<!-- if you are unfimilier with those concepts or just need to brush up some of them,  Imperial Collage London has a great course on coursera,which you might find useful:
<a target="_blank" href="https://www.coursera.org/specializations/mathematics-machine-learning" target="_blank"><u>https://www.coursera.org/specializations/mathematics-machine-learning</u></a> -->

 In this tutorial, we are going to take a deep dive inside support vector machines, we are going to talk about what svm is and how it works (internally/mathematically) by deconstructing every single part that leads to it's final formulation and then, we are going to take a look at how to solve that formulation using an algorithm called SMO.... by the end of this article, you will have a solid understand of one of the most important Algorithm in Machine Learning.
 
 So as you might know, SVM stands for support vector machines.... its probably the most successful hyperplane based classifier out there...what it means is that, in svm you are classifing 2 classes by constructing a hyperplane(a.k.a decision boundary) which seperate both of them as clearly as possible.

In order to solidify what we are trying to achieve ...lets play a little game, in it, what i want you to do is to construct a hyperplane/decision-boundary which seprate these 2( "<font style="color: red">&#8226;</font>" and "<font style="color: blue">&#8226;</font>" ) classes as accurately as possible...so go ahead and see if you could figure out the best decision boundary!...

>**Info**: 
>
>  "orange-dot" = class 1
>  "blue-dot"   = class 2
>  "X"          =  missclassified points
{: .notice--info}

{: .text-center}
<div id="fit_hyperplane_yourself_0" style="width: inherit"></div>

<script src="{{site.baseurl}}/assets/js/dependency/p5/p5.min.js"></script>
<script src="{{site.baseurl}}/assets/js/dependency/p5/addons/p5.dom.min.js"></script>

<script src="{{site.baseurl}}/assets/js/my_js/svm-with-smo/fit_hype.js"></script>

<i style="font-size:15px">L-fig 1.1</i><br>
<i style="font-size:15px">fit the classifier by moving the gizmo(black arrow) of your hyperplane, make sure to have as less missclassification points(denoted by "X") as possible..good luck!!</i>
{: .text-center}




Ok, so what you just did in couple of seconds, is exactly what we are trying to accomplish using pure mathematical techniques... excited now? let's get started shall we.

now, as you might have observed,in order to solve this problem, we want a decision boundry which does'nt touch any data point i.e, which is farthest from both the classes... we can imagine that there is a **margin** which represent that **distance** b/w decision-boundry and data points and we need to **maximize** it in-order to seprate both the classes..this becomes more prominent when we look at the 
<a target="_blank" href="https://en.wikipedia.org/wiki/Generalization_error" style="color:#3399ff"><i>generalization error</i>
</a>
(which is what we are always trying to minimize in any ML scenario)... you can observe this in L-fig 1.2 , by placing your hyperplane near to any one of the classes and then generate new samples from that same distribution and see how it perform,as compare to the scenario where, if we place the hyperplane farthest from both the classes.... 

>**Note**: Click <button class="btn--primary " onclick="onclickreset()">reload</button> to generate new samples.
{: .notice--info}

{: .text-center}
<div id="fit_hyperplane_yourself_1" style="width: inherit"></div>


<script src="{{site.baseurl}}/assets/js/my_js/svm-with-smo/fit_hype_2.js"></script>
<i style="font-size:15px">L-fig 1.2</i>
<i style="font-size:15px">fit the classifier</i>
{: .text-center}

as you might have observed the margin is essentially just a line that sits on top of the nearest point of both the classes and
now, all we have to do is to compute this margin and for that we need to do some math... don't worry its all going to be simple: <button class="btn--primary " onclick="myFunction()">Click Me</button>
 
<!-- click here and lets get into it! -->

<script>
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 
</script>

<a target="_blank" href="#" class="btn btn--inverse">Link Text</a>


mathematically, we need to find the points that are nearest to our decision boundry and for that, we first need to calculate the perpendicular distance b/w hyperplane and any arbitary point(i.e, our margin)...we can do that by projecting the point onto the hyperplane and then calculate the distance...

$$\require{cancel}$$

Some Notation to be aware of:

$$ \Theta $$   = slope of hyperplane

$$ \Theta_0 $$ = intercept of the hyperplane

$$ x $$        = our data points


As we know that, if a point is **on the hyperplane** then its neither in class -1(orange class ) nor +1(blue class) we can exploit this property to conclude that the $$ \Theta $$ is orthogonal to decision boundry and we can derive it as follows :-

let $$ x_1 $$  and $$ x_2  $$ can be any 2 arbitry points that are on the hyperplane so,

$$ \Theta^Tx_1 + \cancel{\Theta_0} = \Theta^Tx_2 + \cancel {\Theta_0} = 0 $$

$$ {\Theta^Tx_1 - \Theta^Tx_2 = 0} $$

$$ \Theta^T(x_1 -x_2) = 0 $$

$$ {\Theta \bot (x_1-x_2)} \tag{1}$$

also, we observe that, for any point $$ x_0 $$ which is on the hyperplane :-

$$ 
\begin{align}

\Theta^Tx_0 + \Theta_0 &= 0 \\
 \Theta_0 & = -\Theta^Tx_0  \tag{2}
\end{align}
$$

<!-- 
$$
\left\{
\begin{array}{ll}
a_1x+b_1y+c_1z &=d_1+e_1 \\ 
a_2x+b_2y &=d_2 \\ 
a_3x+b_3y+c_3z &=d_3 
\end{array} 
\right.
$$

$$
\begin{alignat}{5}
  \max \quad        & z = &   x_1  & + & 12 x_2  &   &       &         && \\
  \mbox{s.t.} \quad &     & 13 x_1 & + & x_2     & + & 12x_3 & \geq 5  && \tag{constraint 1} \\
                    &     & x_1    &   &         & + & x_3   & \leq 16 &                   &\tag{2} \\
                    &     & 15 x_1 & + & 201 x_2 &   &       & =    14 && \tag{constraint 3} \\
                    &     & \rlap{x_i \ge 0, i = 1, 2, 3}
\end{alignat}
$$ -->

i am not going to go over projections but if you are a bit rusty about it then, i recommend you to watch this great lecture by legendry prof. gilbert strang
 <a target="_blank" href="https://www.youtube.com/watch?v=Y_Ac6KiQ1t0" style="color:#3399ff"><i>projection onto subspace</i></a> 
 or you can check its
<a target="_blank" href="https://ocw.mit.edu/courses/mathematics/18-06sc-linear-algebra-fall-2011/least-squares-determinants-and-eigenvalues/projections-onto-subspaces/MIT18_06SCF11_Ses2.2sum.pdf" style="color:#3399ff"> <i> notes </i></a> as well


<img src="{{site.baseurl}}/assets/imgs/posts_imgs/svm-with-smo/body/proj.jpg">
{: .text-center}
<i>fig. 1.3</i>
{: .text-center}

so, in order to compute the perpendicular distance from $$ x $$ to the hyperplane we can take an arbitary point on the hyperplane and compute the vector b/w $$ x_0$$ and any point $$ x $$ (blue vector in fig 1.3) . and then project that vector on the hyperplane in order to get the distance. by using the formula of projection we can find that,

$$
\begin{align}
d &= { {\Theta^T(x-x_0)}\over{||{\Theta}||}}\\
&= { {\Theta^T(x) - \Theta^T(x)}\over {||\Theta||} }
\end{align}
$$

*using (2) we get,* 

$$ d= { {\Theta^T(x) - \Theta_0}\over {||\Theta||} } \tag{3}$$

so the distance from an arbitary data point to the hyperplane can be written as:

$$ distance = { d_i*y_i \tag{ where,y_i = \{ 1,+1 \} } } $$

so the final expression of finding the best margin is:

$$ margin = \min||y_i*d_i|| $$

which means we need to find the point which has a minimum distance from hyper-plane and we have calculated the $$ d_i $$ before so, putting it all together we get our objective function:-

$$ \min { { y_i (\Theta^Tx_i + \Theta_0)}\over     ||\Theta||}  \tag{4}$$

now, as you can see, if the point is on hyperplane then it is 0 and if it is not then $$ d_i > 0 $$ i.e,

So, as we can see in order for its margin to expand it has to be greater then 0, now if it is > 0 then there has to be a lower bound let's call it "k"  i.e,

$$ (\Theta^Tx_i + \Theta_0) \geq k $$

so, by dividing both sides by k we get the following expression:

$$ {1\over k}(\Theta^Tx_i + \Theta_0) \geq {\cancel{k}\over \cancel{k}}  $$

and as we know, that if we divide the vector by a scaler its just change the magnitude of the vector not its direction which is what we are intrested in, so instead of multiplying l.h.s by 1/k we can leave it as it is.. which means:

$$ (\Theta^Tx_i + \Theta_0) \geq 1 \tag{5} $$

so, it means that we have to change $$\Theta$$ in such a way that the minimum distance b/w point and the decision-boundary mustbe atleast **1 unit** and as we know in (4) we have to minimize this function as well, so, we combine both the expression and get our final objective function:

$$ \min { { y_i (\Theta^Tx_i + \Theta_0)}\over     ||\Theta||}   = \min({1\over {|| \Theta || } }) \tag{6}$$

this means our margin only depends on the norm of the  $$ \Theta $$

we can re-write this as:

$$ \max \quad{1 \over 2}||\Theta||^2\tag{7}\\
\text{s.t.}\quad y_i(\Theta^Tx_i + \Theta_0) \geq 1 $$

but instead of finding the solution of this optimization function we are going to be optimizing the **dual of this objective function** the reason will be apperant when we will talk about the non-linear SVM

so just like in any dual optimization scenario we need to form a **legrangian** of the objective function and here let $$ \alpha $$ be our **legrange multiplier**

$$ L(\Theta,\Theta_0,\alpha) = {1 \over 2} ||\Theta||^2 - \sum_{i=1}^n\alpha [y_i(\Theta^Tx_i + \Theta_0)-1]$$ 
$$ where,\quad\quad \alpha\geq 0 \tag{8}$$

so, if we take the derivative of $$ L \quad  w.r.t \quad \Theta $$:-

$$
\begin{align}
{ {\partial L}\over {\partial \Theta} } &=
{ {\partial }\over {\partial \Theta} }
\left (
 {1 \over 2} ||\Theta||^2 - \sum_{i=1}^n\alpha_i[y_i(\Theta^Tx_i + \Theta_0)-1]
 \right ) \\
{ {\partial L}\over {\partial \Theta} } &=
\Theta - \sum_{i=1}^{n}{\alpha_iy_ix_i}=0 \tag{9}
\end{align}
$$

 using (9) we can imply that, 

$$
\Theta = \sum_{i=1}^{n}{\alpha_i y_i x_i} \tag{10}
$$

now, we need to find the derivative w.r.t our second primal variable i.e, $$ \Theta_0$$ i.e,

$$
\begin{align}
{ {\partial L}\over {\partial \Theta_0} } &=
{ {\partial }\over {\partial \Theta_0} }
\left (
 {1 \over 2} ||\Theta||^2 - \sum_{i=1}^n\alpha_i[y_i(\Theta^Tx_i + \Theta_0)-1]
 \right )  = 0\\
{ {\partial L}\over {\partial \Theta_0} } &=
0 - \sum_{i=1}^{n}{\alpha_i y_i} = 0\\ 
{ {\partial L}\over {\partial \Theta_0} } &=
\sum_{i=1}^{n}{\alpha_i y_i} = 0 
\end{align} 
$$

i.e,

$$
\sum_{i=1}^{n}{\alpha_i y_i} = 0 \tag{11}
$$

now using (10) and (11) we can re-write legrangian using only the dual-variable:

<!--
L(\alpha_i) &= {1 \over 2}|| \sum_{i=1}^{n}{\alpha_i y_i x_i} ||^2 - \sum_{i=1}^{n}(\alpha_iy_i)*\sum_{i=1}^{n}(\Theta^Tx_i + \Theta_0) - \sum_{i=1}^{n}\alpha_i \\
 L(\alpha_i) &= {1 \over 2}|| \sum_{i=1}^{n}{\alpha_i y_i x_i} ||^2 - 0 - \sum_{i=1}^{n}\alpha_i \tag{using (4)\\

L(\alpha_i) &= {1 \over 2}|| \sum_{i=1}^{n}{\alpha_i y_i x_i} ||^2 + \sum_{i=1}^{n}\alpha_i \tag{using  -->

$$
\begin{align}
L(\alpha_i) &={ {1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } }  - \sum_{i=1}^{n}[\alpha_iy_i(\Theta^Tx_i + \Theta_0) - \alpha_i] } \\
&= {1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } } - \Theta^T\sum_{i=1}^{n}(\alpha_iy_i x_i) - \Theta_0\sum_{i=1}^{n}(\alpha_i y_i ) + \sum_{i=1}^{n}\alpha_i \\
&= {1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } } - \Theta^T\sum_{i=1}^{n}(\alpha_iy_i x_i) + \sum_{i=1}^{n}\alpha_i \tag{using, (10)}\\
&= -{1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } } + {\sum_{i=1}^{n}\alpha_i}\\ 
&={\sum_{i=1}^{n}\alpha_i} - {1 \over 2}{ \left( {\left(\sum_{i=1}^{n}{\alpha_i y_i x_i} \right) }^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } \right) } \\ 
&={\sum_{i=1}^{n}\alpha_i} - {1 \over 2}{ \left( {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } \right) } \\ 
\end{align}
$$

so this is my final legrangian which only depend on the dual variables..

$$
L(\alpha_i)= {\sum_{i=1}^{n}\alpha_i}- {1 \over 2}{ {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } }\\ 
$$

now, our final objective function will become:

$$
\max_{\alpha_i} \quad L(\alpha_i)={\sum_{i=1}^{n}\alpha_i} - {1 \over 2}{ {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } }\\
s.t. \quad \left \{ { {\alpha \geq 0};
{ {\sum_{i=1}^n} {\alpha_i y_i} = 0}  }\right.
$$

why $$ \max{\alpha_i} $$ you may ask... because as discussed earlier we are optimizing the dual of our initial objective function which means that when we are maximizing the dual we are essentially, minimizing the primal function and vice-versa.

so essentially, if we can solve this optimization function we can find our $$ \alpha $$ and if we can find our alphas we can find our $$ \Theta $$ using(10) which is our unknown parameter of our decison-boundary... so essential we can get our decision-boundary by solving this optimization problem

for a point to be the most optimal, it need to satisfy some of the conditions, these conditions are known as <a target="_blank" href="https://en.wikipedia.org/wiki/Karush%E2%80%93Kuhn%E2%80%93Tucker_conditions" style="color:#3399ff">K.K.T condition</a>:

1), stationarity condition:
at x_star the derivative should be 0

2) primal feasiblity: primal constraints should'nt be violated. in our case its gidi >= 0

3) Dual feasibility: dual constraints shold'nt be violated .. in our case its $$ \alpha \geq 0 $$

4) Complementary slackness condition: at optimial point dual variable * primal constraints should be equal to 0

uptill now, we have covered 3 kkt conditions but now, we are going to be looking at the 4th one, that is  complementary slackness condition.

$$ \alpha_i*d_i = 0 \\ \alpha_i[y_i(\Theta^Tx_i + \Theta_0)]=0 \tag{13}$$

this means that if one of the term is greater then 0 then one of them has to be zero in order to satisfy (13)
which means that, there are only 2 possible scenarios i.e,


$$ if \quad \quad \alpha > 0$$

$$
\begin{align}
then,\quad y_i(\Theta^Tx_i+\Theta_0) -1 &= 0 \\
y_i(\Theta^Tx_i+\Theta_0) &= 1
\end{align}
$$

which means that,this perticular point is on the margin and _these points that are on the margin are called **support vectors**_, in other words,

>support vectors are those points whose $$ \alpha $$ are greater then 0

but what if the $$ \alpha $$ is equals to 0? then $$ y_i[\Theta^Tx_i+\Theta_0] > 1 $$ which means that, this point is not on the margin in other words,

>any points whose alpha is close to 0 is not on the margin, are not our support vectors

so by combining everything that we've learned so far,when we solve our optimization problem w.r.t $$ \alpha $$, we get the sparse matrix(full of zeros) martrix of alphas  and in that matrix we need to take out those alphas which are close to 1 and those points are going to be our support vectors.

because only the points that are on the margin have alpha > 0 which means when we calculate the parameters of our hyperplane using (10) only the points that are on the margin is going to affect the decision...


now that we know what support vectors are and we have derived our final optimization problem the only thing left for us to do is to actually solve our formulation, as you might have noticed, our problem is quadratic in nature, so eiter we can use prebuild QPSolvers to solve (12) or we can use a better and more faster approch by using an algorithm called SMO, we are going with the latter one,which will also help us to construct ground for our next article, so lets get started... 

# Sequential Minimal Optimizer

So,SMO stands for Sequential Minimal Optimization,it is an iterative algorithm which is going to help us calculate our $$ \alpha_s $$ by breaking down our quadratic progamming problem into smaller more tracktable sub-problems. the advantage of this technique is that, through smo we are able to avoide having to numerically optimize our QP problem entirely, which makes this method more efficient and faster to use. 

in smo, we optimize 2 alphas samultaniously by taking the rest as a constant, which makes our optimization problem, just a simple quadratic expression, which is great because optimizing this expression is much simpler and faster then optimizing (12)... this is the reason why smo is the primery choice for solving svm... but before moving forward we need to understand how there constraint behave and why we choose 2 alphas instead of 1??

let's take a look at our first constraint $$ \alpha \geq 0 $$,  we know that in this constraint, there is a lower bound "0" and we can assume that there is an upperbound (let it be "C"),which makes our constraint as follows: 

$$ 0 \leq \alpha \leq C \tag{14}$$

so, because we are optimizing 2 alphas together (let them be  $$ \alpha_1 $$ and $$ \alpha_2 $$) our constraint in expression (14) will become a box constraint which means that our alpha must reside inside this box of size C x C . which will look something like in fig 1.4:


{: .text-center}
<img src="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/svm-with-smo/body/smo_constraint_1.jpg">

<i style="font-size:15px">fig. 1.4 (box constraint)</i>
{: .text-center}


there is a another constaint which we have to keep in mind, which is:

$$ \sum_{i=0}^{n} { {\alpha_i} {y_i} } = 0 \tag{15}$$

<!-- 
as the name suggest, if we were to visualize this constaint this will construct a line... which both the alphas must follow, now if we were to combine both the constraint, our final constraint viz. will look like this. -->

<!-- |||||||||||||||||| Fig 1.5 ||||||||||||||||||| -->

and as discussed earlier, in smo we optimize our expression(12) by samultaniously optimizing 2 alphas and freeze the rest them, which modifies our constraint something like this:-

$$
\begin{align}
\sum_{i=1}^{n} { {\alpha_i} {y_i} } &= 0 \\
 { {\alpha_1} {y_1} } + { {\alpha_2} {y_2} } + { \sum_{i=2}^{n} { {\alpha_i} {y_i} } } &= 0 \\
{ {\alpha_1} {y_1} } + { {\alpha_2} {y_2} } &= -{ \sum_{i=2}^{n} { {\alpha_i} {y_i} } } 
\end{align}
$$

which suggest that because all the alphas accept 1 and 2 are frozen, our r.h.s is just a constant value let it be $$ \rho $$ 

$$
{ {\alpha_1} {y_1} } + { {\alpha_2} {y_2} } = \rho \tag{16}
$$

which, if we were to visualize, it construct a line, that is the reason why its also known as linear constraint (see, fig 1.5)....which also means that for $$ \alpha_2 $$ in order to satify both the constraints, there has to be an upper and lower bound for it , let those bounds be $$ H $$ and $$ L $$ in our case $$ L = 0 $$ which is not always the case, so the next thing left for us to do is to calcuate our $$ H $$ and $$ L $$ for our $$ \alpha_2 $:-

 $$ H \leq \alpha_2^{(new)} \leq L,\\  $$

  where, H and L are depend on the values of y(s) and are clipped accordingly in order to keep the alphas from violating the constraints.

if $$ y_1 \neq y_2$$


$$
\left \{
\begin{array}{ll}
H &=\max\{0, { \alpha_2^{(old)}}-{\alpha_1^{(old)}}\},\\
L &= \min\{C,{ C - { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}\tag{17}
\end{array}
\right.
$$

if $$y_1 = y_2$$

$$
\left \{
\begin{array}{ll}
H &=\max\{0,{ { \alpha_1^{(old)}}-{\alpha_2^{(old)}} - C } \},\\
L &= \min\{C,{ { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}\tag{18}
\end{array}
\right.
$$

{: .text-center}
<img src="{{site.baseurl}}/assets/imgs/posts_imgs/svm-with-smo/body/bounds_for_alpha2.png">
<i style="font-size:15px">fig 1.5 (bounds in $$ \alpha_2$$ </i>
{: .text-center}

using equation (16) we can also write $$ \alpha_1 $$ as a function of $$ \alpha_2 $$

$$
\begin{align}
{ {\alpha_1} {y_1} } + { {\alpha_2} {y_2} } &= \rho \\
{ {\alpha_1} {y_1} }  &= \rho - { {\alpha_2} {y_2} } \\
\text{Multiplying both sides by } y_1 \text{we get:} \\
{ {\alpha_1} { (y_1) }^2 }  &= y_1{ (\rho - { {\alpha_2} {y_2} } ) } \\
{ {\alpha_1} { (y_1) }^2 }  &= y_1{ (\rho - { {\alpha_2} {y_2} } ) } \\
\end{align}
$$

because, $$ y_i \in \{-1,+1 \},$$ our expression will become,

$$
{\alpha_1} = y_1{ (\rho - { {\alpha_2} {y_2} } ) } \tag{19}
$$

now, before moving any further lets look at a case where,instead of taking 2 alphas at a time, we take only one,which makes our second constraint something like this,

$$
\begin{align} 
\sum_{i=0}^{n} { {\alpha_i} {y_i} } &= 0 \\
 { { {\alpha_1} {y_i} } + { \sum_{i=1}^{n} { {\alpha_i} {y_i} } } } &= 0 \\
 { {\alpha_1} {y_i} }  &= - { \sum_{i=0}^{n} { {\alpha_i} {y_i} } } \\ \text{ multiplying both side by } y_1 \text{we get,}\quad \quad \\
 { {\alpha_1}  }  &= -{y_1} { \sum_{i=0}^{n} { {\alpha_i} {y_i} } }  \\
\end{align}
$$

which clearly suggest that, $$ \alpha_1 $$ is a function of all the alphas and because we have fixed all of them then its just a constant value which means we cannot change our $$ \alpha_1 $$ without violating our linear constraint, that is the reason why the minimal number of alphas we can use has to be atleast 2.

Now that we have understood about the constraints , let's now take a look at how it all comes together and optimize our expression (12) using smo algorithm....

smo algorithm has 2 parts, 1 is to choose the alphas based on a certain heuristics, and second is to optimize our objective function w.r.t these alphas.... although, you can choose the alphas randomly, but using heurisitics will help us to choose only the most promising one i.e, which can gives us the most improvement in our optimization, in this article we are not going to worry about the first one because it more of an implementation concern (which we will address in part 2)... for now, we suppose that we have already choose those alphas and all that left for us to do is to optimize our objective (12) w.r.t them....


 using equation (19) we can conclude that our final objective function will look something like this:-

$$ W(\alpha_1,\alpha_2,.....,\alpha_n) = W((\rho -\alpha_2y_2)y_1,\alpha_2,.....,\alpha_n)\tag{20}$$

and as discussed earlier, in smo we hold all the alphas, accept 2 of them, which convert our entire expression into a simple quadratic function in the form of $$ a(\alpha_2)^2 + b(\alpha_1) +c $$ for some appropriate $$a,$$ $$b$$ and$$ c $$ which we can easily maximize by putting 0 on the r.h.s and taking its second derivative ignoring the box constraints...gives us $$ \eta $$ which is less then zero and maximum along the  directions of the linear constraint.

$$ \eta = 2 K(x_1,x_2) - K(x_1,x_1) - K(x_2,x_2)$$

where, K is our kernel function.

now that we know our derivative, we can now use this to calculate the new values for our alphas using this formula:

$$ \alpha_2^{(new)} = { \alpha_2^{ (new) } } - { {y_2(E_1 - E_2) } \over { \eta } } \tag{21}$$

where, $$ E_i = f^{old}(x_i) - y_i $$ is the error on the ith training eample... but what if our optimal point is outside our box constraint??... if that the case then we can just clip our $$ \alpha_2 $$ to its bounds....  


$$
\alpha_2 = \left \{
\begin{align}
H,&\quad \text{if }\alpha_2 \geq H \\
\alpha_2,&\quad \text{if } L < \alpha_2 < H \\
L,&\quad \text{if }\alpha_2 \leq L \tag{22}\\
\end{align}
\right.
$$

now we know our new $$ \alpha_2 $$, we can find our $$ \alpha_1 $$ using equation (19):

$$ \alpha_1^{(new)} = \alpha_1^{(old)} + s{ ( \alpha_2^{(old)} - \alpha_2^{(new)} ) } \tag{23}$$

where, $$ s = y_1y_2 $$

and just like that, we are going to heuristically take 2 alphas and update them untill all the alphas stops changing within certian iteration. and after finding the value of all the alphas we are just going to be using equation (12) to calculate our hyperplane and thats it!

Now its a great time to summerise what we have just did, we first looked at what we are try to achieve using L-fig 1.1 and 1.2.. then we introduce the concept of margin and we clearify that we have to maximize it in order to find our best hyperplane, then we moved on and formulate this idea and came up with the objective function, but we realized that it would be more benificial to optimize its dual counterpart which introduces our final optimization function(12)... althought, we could use a black-box QPSolvers to solve our function but we instead go with SMO and layed out the entire algorithm and found the way to maximize our objective function using 2 alphas at a time, we disussed why we choose 2 alphas instead of one and then we take a look at our constraints and how is it going to change if we freeze all of the alphas accept 2 of them... which leads us to the final values of our alphas, which we can calcuate and update untill it converges, in the end we take a look at how are we going to be using these alphas to calculate our decision-boundary.

I hope that you enjoyed and learned something new... if there is any thing that you did'nt like please let me know, i am just a beginner in this stuff so i hope you could help me by critiquing it ( please be brutal)..

<!-- 




but we have to address some edge cases, suppose if our alpha is greater then C or


The way it works is by takes 2 \alpha_s saperatly and optimize them together, find the optimal values and then finally updating our expression to reflect these new values.



In order to compute these new values for these 2 multiplyers, we have to compute in such a way that the new values must be on the line, because of our linear constraints $$ \sum_{i=1}^n   { {\alpha_i} {y_i} }$$.


<br>


 which means that the search-space is a box of length C (see fig. 1.1)..but when we combine our box costraint with our linear equality constraint gives us a more strict constraint beacuse it makes the choice of alphas to follow the diagonal line  i.e,

 $$ U \leq \alpha_2^{(new)} \leq L,\\  $$

  where, U and L are depend on the values of y(s) and are clipped accordingly in order to keep the alphas from violating the constraints.

if $$ y_1 \neq y_2$$


$$
\left \{
\begin{array}{ll}
U &=\max\{0, { \alpha_2^{(old)}}-{\alpha_1^{(old)}}\},\\
L &= \min\{C,{ C - { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}
\end{array}
\right.
$$

if $$y_1 = y_2$$

$$
\left \{
\begin{array}{ll}
U &=\max\{0,{ { \alpha_1^{(old)}}-{\alpha_2^{(old)}} - C } \},\\
L &= \min\{C,{ { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}
\end{array}
\right.
$$

<br>
<br>
{: .text-center}
<img src="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/svm-with-smo/body/smo_constraint_2.jpg">
<i style="font-size:15px">image source: fig. 1.1 (box constraint)</i>
{: .text-center}

which is good because our search space is reduced even further and the reason why we choose 2 multipliers is beacuse this is the minimum number of multipliers which can satisfy both the constraints, if we have only one multiplyer to optimize, it will satify the box constraint but not linear equality constraint.

now that we have specified our constraints we can now move on and understand the full algorithm, so smo consist of 2 parts, first choose the best multiplyers to optimize, based on certain heuristics, and then by holding everything accept \alpha_1 and \alpha_2 we are going to optimize our objective function w.r.t these 2 alphas, while satifying all the constraints...

so by doing that we made our complex QP problem into a simple quadratic equation which we easily fit its minimum...

$$   \min \quad ax^2 + bx+c$$

and if we encounter a minimum point that violates our constraint we will just going to clip it! using U and L...

\image showing the clipping 

 -->



have a great day!

**References**:-

<a target="_blank" href="https://cosmolearning.org/video-lectures/support-vector-machines-kernels-soft-margin-smo-algorithm/" style="color:#3399ff">
https://cosmolearning.org/video-lectures/support-vector-machines-kernels-soft-margin-smo-algorithm/
</a>

<a target="_blank" href="https://cosmolearning.org/video-lectures/support-vector-machines-kernels-soft-margin-smo-algorithm/" style="color:#3399ff">
https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/smo-book.pdf
<a>
