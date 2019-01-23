---
layout: single
title : SVM with SMO
tags  : [ML,AI,SVM,non-convex,online-learning,research-paper]
title-seprator: "|"
categories: blog MachineLearning
permalink: /:categories/:title.html
mathjax: true
author-bio: false
author_profile: false
p5js: true   
header: 
    teaser: /assets/imgs/posts_imgs/lasvm-nc/kernel_trick_svm.png
---

In this tutorial we are going to be going deep inside Support Vector Machines...before moving forward i first would like to address few pre-requisites:-
- linear Algebra(EigenVectors)
-   multi-variable calculus(legrange multipliers,duality,quadratic progarmming,optimization)

if you are unfimilier with those concepts or just need to brush up some of them,  Imperial Collage London has a great course on coursera,which you might find useful:
<a href="https://www.coursera.org/specializations/mathematics-machine-learning" target="_blank">https://www.coursera.org/specializations/mathematics-machine-learning</a>

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

now in order to find the best decision boundry i want a line that is farthest from each of the classes(you might have observed it)...so, when we extend the line in-both the direction we get 2 line which are parallel to each other and the distance(in l-fig 1.1 the distance is represented by pink arrow) from decision boundry is also equal.(and those extended dotted-lines are called "margin"), SO, in order to get the best boundary we have to *maximize* the distance of those margin because that is the only way we can be sure that are (db) is farthest from both the classes and hence we found our best margin and inturn our decision boundary.

now, all we have to do is to compute those margin and for that we first need to take a look at some of the useful mathematical tools:

**Projection onto a hyperplane**

$$ \Theta^Tx_1 + \cancel{\Theta_0} = \Theta^Tx_2 + \cancel{\Theta_0} = 0$$

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

$$ \min { { y_i (\Theta^Tx_i + \Theta_0)}\over     ||\Theta||}   = min({1\over {|| \Theta || } })$$



