---
layout: single
title : Understanding Research paper :- lasvm-nc part-0
tags  : [ML,AI,SVM,non-convex,online-learning,research-paper]
title-seprator: "|"
categories: blog MachineLearning
permalink: /:categories/:title.html
mathjax: true
author-bio: false
author_profile: false
header:
    teaser: /assets/imgs/posts_imgs/lasvm-nc/kernel_trick_svm.png
---


As i mentioned in my <a href="#">previous post</a> most research paper are like a rabbit hole and it depends on you, how deep you want to dive in...here,we try to go it modest depth without going too deep into crazy mathematics(CCCP).

so TL;DR:

SVM with SMO:-
SVM is a linear classifier which can also create a non-linear decision boundary by projecting the data points into high-dimensional space using something called kernel trick...after knowing about our objective function we solve it either using quadratic progamming solver or using SMO which is a iterative algorithm developed by a microsoft researcher( <a href="https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-98-14.pdf">platt et. al.</a> )

you can learn more about svm with smo here:-
https://www.youtube.com/watch?v=I73oALP7iWA

LASVM:

this is one of the first online svm algorithm... the advantage of online svm is that is extremely faster then the vanilla svm and can also fit on really large datasets.


CCCP:
CCCP stands for Convex-Concave Procedure which,for the sake of this paper, is a way to produce non-convex behivour by combining both convex and concave version of a function. we are going to be using this heavily to construct "LASVM-NC"


LASVM-G:
same as LASVM but instead use duality gap to its advantage which we are going to be learning in detail.

LASVM-NC:
The Non-Convex Version of LASVM


So, now that we have specified our road map we can move forward and and learning everything one by one in detail:-

SVM with SMO: <a href="#"> link </a>
LASVM: <a href="#"> link </a>
CCCP:  <a href="#"> link </a>
LASVM-G and NC : <a href="#"> link </a>
LASVM-I: <a href="#">link</a>