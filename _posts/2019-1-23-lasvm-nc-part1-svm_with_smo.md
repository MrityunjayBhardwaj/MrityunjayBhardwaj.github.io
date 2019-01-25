---
layout: single
title : SVM with SMO
tags  : [ML,AI,SVM,non-convex,online-learning,research-paper]
title-seprator: "|"
categories: blog  Artificial Intelligence MachineLearning
permalink: /:categories/:title.html
mathjax: true
author-bio: false
author_profile: false
p5js: true   
comments: true
header: 
    teaser: /assets/imgs/posts_imgs/svm-with-smo/teaser/svm_db.png
---

In this tutorial we are going to be going deep inside Support Vector Machines...before moving forward i first would like to address few pre-requisites:-
- linear Algebra(EigenVectors)
-   multi-variable calculus(legrange multipliers,duality,quadratic progarmming,optimization)

if you are unfimilier with those concepts or just need to brush up some of them,  Imperial Collage London has a great course on coursera,which you might find useful:
<a href="https://www.coursera.org/specializations/mathematics-machine-learning" target="_blank"><u>https://www.coursera.org/specializations/mathematics-machine-learning</u></a>

ok,I hope that you are confident enough with those prerequisites;we can now go ahead and start learning about SVMs

so as you might know SVM stands for support vector machines.... its probabily the most successful hyperplane based classifier...what it means is that you are classifing 2 classes by constructing a hyperplane which seperate both of them as clearly as possible.


now what i want you to do is to construct a decision boundry which seprate 2 of the given classes as clearly as possible,using this Live-Figure(L-Fig 1.1)below...so,go-ahead,play with it! and see, if you could figure our the best possible decision boundary for this dataset;keep in mind that it doesnt have to be 100% perfect because in real life we dont generally have a perfectly seprable data.

{: .text-center}
<div id="fit_hyperplane_yourself" style="width: inherit"></div>


<script src="{{site.baseurl}}/assets/js/my_js/fit_hype.js"></script>
<i style="font-size:15px">L-fig 1.1</i>
<i style="font-size:15px">fit the classifier</i>
{: .text-center}

Ok, so what you just did in couple of seconds, is exactly what we are trying to accomplish using pure mathematical techniques... excited now? let's get started shall we.

we have 2 classes 1 "orange" other is "blue",for conveinience sake: let "blue" = -1 & "orange" = +1
and we need to construct the best decsion boundary, as you might have observed while playing with (l-fig 1.1) above, constructing a good classifier is hard because you have a lot of freedom i.e, you can rotate the decision boundary in any angle so the search space is kinda infinit

now in order to find the best decision boundry i want a line that is farthest from each of the classes(you might have observed it)...so, when we extend the line in-both the direction we get 2 line which are parallel to each other and the distance (in l-fig 1.1 the distance is represented by pink arrow) from decision boundry is also equal.(and those extended dotted-lines are called "margin"), SO, in order to get the best boundary we have to *maximize* the distance of those margin because that is the only way we can be sure that are (db) is farthest from both the classes and hence we found our best margin and inturn our decision boundary.

now, all we have to do is to compute those margin and for that we first need to take a look at some of the useful mathematical tools: <button class="btn--primary " onclick="myFunction()">Click Me</button>
 


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

<a href="#" class="btn btn--inverse">Link Text</a>

$$\require{cancel}$$




**Projection onto a hyperplane**

we know that if a point is on the hyperplane/decision boundary then its neither in class -1 nor +1. we can exploit this property to conclude that the $$ \Theta $$ is orthogonal to decision boundry

$$ \Theta^Tx_1 + \cancel{\Theta_0} = \Theta^Tx_2 + \cancel {\Theta_0} = 0 $$


$$ {\Theta^Tx_1 - \Theta^Tx_2 = 0} {2} $$

$$ \Theta^T(x_1 -x_2) = 0 $$

$$ {\Theta \bot (x_1-x_2)} \tag{1}$$

also,

$$ 
\begin{align}

\Theta^Tx_0 + \Theta_0 &= 0 \\
 \Theta_0 & = -\Theta^Tx_0 
\end{align}
$$


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
$$

We need to find the distance from hyperplane to an arbitry point and for that we first need to construct a right angled triangle onto hyperplane

x_3 = original point
x_2 = projection of x_3 onto hyperplane
x_1 = any point on hyperplane

using the formula of projection our formula for finding "b" is :

$$ b = { {\Theta^T(x_3-x_1)}\over{||{\Theta}||}}$$

so the distance from an arbitary point to our margin can be written as:

:$$ d_i*y_i $$ $$ where,y_i = {-1,+1} $$

so, we can mold our previous expression like this,we can anchor our margin onto a point which has a minimum distance b/w our decision boundary i.e,

$$ margin = \min||y_i*d_i|| $$

and we have calculated the $$ d_i $$ before so, putting it all together we get our objective function:-

$$ \min { { y_i (\Theta^Tx_i + \Theta_0)}\over     ||\Theta||}  $$

now, as you can see if the point is on hyperplane then it is 0 and it it is off the decision-boundary then $$ d_i > 0 $$ i.e,

$$ (\Theta^Tx_i + \Theta_0) > 0$$

So, as we can see in order for its margin to expand it has to be greater then 0, now if it is > 0 then there has to be a constant "k" from which it is greater then equals to i.e,

$$ (\Theta^Tx_i + \Theta_0) \geq k $$

so, by dividing both sides by k we get the following expression:

$$ {1\over k}(\Theta^Tx_i + \Theta_0) \geq {\cancel{k}\over \cancel{k}}  $$

and as we know, that if we divide the vector by a scaler its just change the magnitude of the vector not its direction which is what we are intrested in so instead of multiplying l.h.s by 1/k we can leave it as it is.. which means:

$$ (\Theta^Tx_i + \Theta_0) \geq 1  $$

so, it means that we have to change $$\Theta$$ in such a way that the minimum distance b/w point and the decision-boundary mustbe atleast 1

this also measn that the minimum distance must be 1 and as we know in 6 we have to minimize this function as well, so, we combine both the expression and get our final objective function:

$$ \max { { y_i (\Theta^Tx_i + \Theta_0)}\over     ||\Theta||}   = max({1\over {|| \Theta || } })$$

we can re-write this as:

$$ \min \quad{1 \over 2}||\Theta||^2\\
\text{s.t.}\quad y_i(\Theta^Tx_i + \Theta_0) \geq 1$$

but instead of finding the solution of this optimization function we are going to be optimizing the dual of this objective function the reason will be apperant when we will talk about the non-linear SVM

so just like in any dual optimization scenario we need to form a legrangian of this optimization function

$$ L(\Theta,\Theta_0,\alpha) = {1 \over 2} ||\Theta||^2 - \sum_{i=1}^n\alpha [y_i(\Theta^Tx_i + \Theta_0)-1]$$ 
$$ where,\quad\quad \alpha\geq 0$$

so, if i take the derivative of $$ L  w.r.t \Theta $$:-

$$
\begin{align}
{ {\partial L}\over {\partial \Theta} } &=
{ {\partial }\over {\partial \Theta} }
\left (
 {1 \over 2} ||\Theta||^2 - \sum_{i=1}^n\alpha_i[y_i(\Theta^Tx_i + \Theta_0)-1]
 \right ) \\
{ {\partial L}\over {\partial \Theta} } &=
\Theta - \sum_{i=1}^{n}{\alpha_iy_ix_i}=0 \tag{2}
\end{align}
$$

using (2) we can imply that
$$
\Theta = \sum_{i=1}^{n}{\alpha_i y_i x_i} \tag{3}
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
\sum_{i=1}^{n}{\alpha_i y_i} = 0 \tag{4}
\end{align} 
$$

i.e,
$$
\sum_{i=1}^{n}{\alpha_i y_i} = 0 \tag{4}
$$

now using (3) and (4) i can re-write legrangian using only the dual-variable:

<!--
L(\alpha_i) &= {1 \over 2}|| \sum_{i=1}^{n}{\alpha_i y_i x_i} ||^2 - \sum_{i=1}^{n}(\alpha_iy_i)*\sum_{i=1}^{n}(\Theta^Tx_i + \Theta_0) - \sum_{i=1}^{n}\alpha_i \\
 L(\alpha_i) &= {1 \over 2}|| \sum_{i=1}^{n}{\alpha_i y_i x_i} ||^2 - 0 - \sum_{i=1}^{n}\alpha_i \tag{using (4)\\

L(\alpha_i) &= {1 \over 2}|| \sum_{i=1}^{n}{\alpha_i y_i x_i} ||^2 + \sum_{i=1}^{n}\alpha_i \tag{using  -->

So,

$$
\begin{align}
L(\alpha_i) &={ {1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } }  - \sum_{i=1}^{n}[\alpha_iy_i(\Theta^Tx_i + \Theta_0) - \alpha_i] } \\
&= {1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } } - \Theta^T\sum_{i=1}^{n}(\alpha_iy_i x_i) - \Theta_0\sum_{i=1}^{n}(\alpha_i y_i ) + \sum_{i=1}^{n}\alpha_i \\
&= {1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } } - \Theta^T\sum_{i=1}^{n}(\alpha_iy_i x_i) + \sum_{i=1}^{n}\alpha_i \tag{see, (4)}\\
&= -{1 \over 2} { {\Theta}^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } } + {\sum_{i=1}^{n}\alpha_i}\\ 
&={\sum_{i=1}^{n}\alpha_i} - {1 \over 2}{ \left( {\left(\sum_{i=1}^{n}{\alpha_i y_i x_i} \right) }^T{\sum_{i=1}^{n}{\alpha_i y_i x_i} } \right) } \\ 
&={\sum_{i=1}^{n}\alpha_i} - {1 \over 2}{ \left( {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } \right) } \\ 
\end{align}
$$

so this is my final legrangian which only depend on the dual variables..

$$
L(\alpha_i)={ {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } } - {\sum_{i=1}^{n}\alpha_i}\\ 
$$

so our final objective function will become:

$$
\max_{\alpha_i} \quad L(\alpha_i)={ {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } } - {\sum_{i=1}^{n}\alpha_i}\\
s.t. \quad \left \{ { {\alpha \geq 0};
{ {\sum_{i=1}^n} {\alpha_i y_i} = 0}  }\right.
$$

why $$ \max{\alpha_i} $$ you may ask... because as discussed earlier we are optimizing the dual of our initial objective function which means that when we are maximizing the dual we are essentially, minimizing the primal function and vice-versa.

so essentially if we can solve this optimization function we can find our \alpha and if we can find our alphas we can find our \Theta using(4) which is our unknown parameter of our decison-boundary... so essential we can get our decision-boundary by solving this optimization problem


for a point to be the most optimal it need to satisfy some of the conditions these conditions are known as K.K.T condition:

1, stationarity condition:
at x_star the derivative should be 0

2) primal feasiblity: primal constraints should'nt be violated. in our case its gidi >= 0
3) Dual feasibility: dual constraints shold'nt be violated .. in our case its $$ \alpha \geq 0 $$
4) Complementary slackness condition: at optimial point dual variable * primal constraints should be equal to 0

so, what that complementary slackness really means??

$$ \alpha_i[y_i(\Theta^Tx_i + \Theta_0)]=0 $$

$$ if \alpha > 0 \\ then, yi(\Theta^Tx_i+\Theta_0) = 1$$

then this perticular point is on the margin and these points that are on the margin are called support vectors, in other words,

support vectors are those points whose alphas are equals to 0

but what if the alpha is not equals to zero then y_i > 1 which means this point is not on the margin in other words,

any points whose alpha is close to 0 is not on the margin, hence, they are not our support vectors!!

so by combining everything that we've learned so far, we get the martrix of alphas and it is going to be a sparse matrix and in that matrix we need to take out those alphas which are close to 1 and those points are going to be our support vectors

so because only the points that are on the margin have alpha > 0 which means when we optimize our expression (5) only the points that are on the margin is going to affect the decision of the construction of our hyperplane..



<p style="background-color: gray; padding: 20px "><font color="white">
so as you can see (6) is a quadratic programming problem so either we can solve using qp solvers or we can use another method called SMO.. we are going for SMO because our goal is to understand the online svm later in this series and SMO plays a big role in constructing them.
</font>
</p>

# Sequential Minimal Optimizer

So,SMO stands for Sequential Minimal Optimization,it is an iterative algorithm which is going to help us calclate our $$ \alpha_s $$ by breaking down our quadratic progamming problem into smaller more tracktable sub-problems,the advantage of this technique is that, through smo we are able to avoide having to numerically optimize our QP problem entirely, which makes this method more efficient and faster to use. 

The way it works is by takes 2 \alpha_s saperatly and optimize them together, find the optimal values and then finally updating our expression to reflect these new values.



In order to compute these new values for these 2 multiplyers, we have to compute in such a way that the new values must be on the line, because of our linear constraints $$ \sum_{i=1}^n   { {\alpha_i} {y_i} }$$.


<br>

{: .text-center}
<img src="{{site.url}}{{site.baseurl}}/assets/imgs/posts_imgs/svm-with-smo/body/smo_constraint_1.jpg">

<i style="font-size:15px">image source: fig. 1.1 (box constraint)</i>
{: .text-center}

 which means that the search-space is a box of length C (see fig. 1.1)..but when we combine our box costraint with our linear equality constraint gives us a more strict constraint beacuse it makes the choice of alphas to follow the diagonal line  i.e,

 $$ U \leq \alpha_2^{(new)} \leq V,\\  $$

  where, U and V are depend on the values of y(s) and are clipped accordingly in order to keep the alphas from violating the constraints.

if $$ y_1 \neq y_2$$


$$
\left \{
\begin{array}{ll}
U &=\max\{0, { \alpha_2^{(old)}}-{\alpha_1^{(old)}}\},\\
V &= \min\{C,{ C - { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}
\end{array}
\right.
$$

if $$y_1 = y_2$$

$$
\left \{
\begin{array}{ll}
U &=\max\{0,{ { \alpha_1^{(old)}}-{\alpha_2^{(old)}} - C } \},\\
V &= \min\{C,{ { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}
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

and if we encounter a minimum point that violates our constraint we will just going to clip it! using U and V...

\image showing the clipping

Atlast, we came to an end! what a great journey... now you know what svm is, how it was derived and how it really works internally/mathematically and you also know how to optimize our dual objective function and then find out the parameters of our decision-boundary, in the next article we are going to be implementing everything we've learned so far!!.. but for now congratulate yourself, you now know one of the prominiment algorithm of Machine Learning!!

have a great day!

References:-

<a href="https://cosmolearning.org/video-lectures/support-vector-machines-kernels-soft-margin-smo-algorithm/"><u>
https://cosmolearning.org/video-lectures/support-vector-machines-kernels-soft-margin-smo-algorithm/</u></a>







