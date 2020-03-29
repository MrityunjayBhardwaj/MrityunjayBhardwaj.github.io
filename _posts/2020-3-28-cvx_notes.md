---
layout: post 
title : Convex Optimization Notes
tags  : [ML,math,calculus, optimization, non-convex,convex, book]
title-seprator: "|"
categories: blog  Mathematics Calculus
permalink: /:categories/:title.html
mathjax: true
p5js: true   
comments: true
img: /posts_imgs/cvx_opt_book_notes/teaser/cvx_opt_book.jpeg
---

During my sabbatical, one of the book that I want to finish is this beauty by stephen boyd and Lieven Vandenberghe :-

<div align="center">
<img src="{{site.baseurl}}/assets/img/posts_imgs/cvx_opt_book_notes/teaser/cvx_opt_book.jpeg">
<p>source: <a href="https://sg.carousell.com/p/convex-optimization-stephen-boyd-lieven-vandenberghe-200347223/">carousell.com</a></p>
</div>

and I gotta tell you that it was one of the toughest book I have read but at the same time it was one of the most rewarding... that's why I have compiled some of my notes, resources and interactive notebooks which might ease your pain a little bit while going through this beautiful book yourself.


<!-- Why Should I read this?

To be honest, I can't say anything about why you should read this book but I can only share why I chose to read this book and how it helped me in imporoving my understanding of certain concepts ( mostly ML concepts ). \\

* because of this book I was able to understand why regularization acutally helps us in imporoving the generalization of the model. 
* because of this book I came accross a really great method which is anyday better then simple use of L1,L2 norms when it comes to improve the robustness of the model...
* because of this book I was finally able to understand why we observe the zig-zag like behaviour in gradient descent and I was able to understand why do we need xavier or He initialization. 
* this book gives me enough great vocabulary to intimitly understand the research paper of the optimization techinques like ADAM, momentum etc..
* but most importantly, because of this book I was finally able to formulate problems into optimization problem which may not sounds that dazzling but often times then not, using these techinques (SOCP,SDP etc) we can get a much better results then using machine leanring teachinques (neural nets are not the key to every thing) that is why alot of latest papers still use this classical convex optimization and get great results like this <a href="https://www.dgp.toronto.edu/projaects/cubic-stylization/">beautiful paper</a> also, funfact, alot of research institution still uses these classical methods instead of SOTA deep learning methods (because they get alot more control in the classical methods) :D
 -->

**Disclaimer:** Here, I have only created notes on part I of this book, mainly becuase I think the rest of the book doesn't really need them. for example, part II only focuses on the application of the methods (which we have learned in part I) in different domains and part III focus on the implementation details and the algorithms used to solve our optimization problem... but at the same time I also think that I should give a brief overview of each of the parts. which is exactly the kind of format I chose to proceed with... I hope that's fine..


Also, If you are new to optimization and don't want to read the entire book then I recommend you to first go through this <a href="">blog post</a> then quickly head over to the Chapter 4 interactive notebook which will get 60% of the job done when it comes to effectively using Convex optimization.

Ok, enough fooling around, lets dive straight into the notes....

<!-- # Summary -->

## Part 1 : Theory

Part I gives you an introduction to the facinating world of covex optimization, it first go over what are convex sets and how to tell the difference between convex and non-convex using jensen's inquality then it go over generalized inequality which essentially generalize all the concepts reguarding the 1-d convex optimization into mutliple dimensions. in chapter 3 we will first forumlate convex optimization problems and understand what are convex functions and what are some of the operations which when applied to these functions would still gives us a convex function for example if we take the summation of 2 convex-function the resulatant set will be convex. we also looked at another import concept called cojugate functions which gives us the lower bound over our original convex functions we will also touch this concept of lower bound in the last chapter of part I in which, we will talk about the dual function and duality. chapter 4 introduces us the different types of convex optimization problems like Second-order cone programming(LP), linear programming (LP), geometric programming (GP), some of which may not be convex in its natural formulation but can be cast to convex optimization problems which can then be solved using different convex optimizaiton package, one of which is the CVXPY which we will use it in our interactive notebook...


### Chapter 2: Convex Sets:-

* <a href="https://www.youtube.com/embed/KaAjiLQDNgQ" >Lecture (by Stanford)</a>

* Personally I like <a href="https://www.youtube.com/embed/P3W_wFZ2kUo" >this one</a> a bit more

* <a href="https://github.com/MrityunjayBhardwaj/Notes/blob/master/ConvexOptimization/Ch2.ipynb"><img src="{{site.baseurl}}/assets/img/posts_imgs/cvx_opt_book_notes/body/ch2_scrst.png" width="500"></a>
* <a href="https://lagunita.stanford.edu/assets/courseware/v1/9ce60e8351dec2dc556f1adbb63ea86f/c4x/Engineering/CVX101/asset/hw1sol.pdf">Practice Problems (by Stanford)</a>


### Chapter 3: Convex Functions:-

* <a href="https://www.youtube.com/embed/G4G7dWBi3II" >Lecture (by Stanford)</a>
* <a href="https://github.com/MrityunjayBhardwaj/Notes/blob/master/ConvexOptimization/Ch3.ipynb"><img src="{{site.baseurl}}/assets/img/posts_imgs/cvx_opt_book_notes/body/ch3_scrst.png" width="500"></a>

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/af2318fc6f0b1c9a46ba5f593b9f74d8/c4x/Engineering/CVX101/asset/hw2sol.pdf">Practice Problems (by Stanford)</a>

### Chapter 4: Convex Optimization Problems \\
<a href="https://colab.research.google.com/drive/1pdVXgEhGinBcPqQR03TBvV1h1pu78G7c?authuser=1#scrollTo=YlMiImpCthDc">Notebook</a>


* <a href="https://www.youtube.com/embed/GFpi8OqRgIw" >Lecture (by Stanford)</a>

* <a href="https://drive.google.com/file/d/1pdVXgEhGinBcPqQR03TBvV1h1pu78G7c/view?usp=sharing"><img src="{{site.baseurl}}/assets/img/posts_imgs/cvx_opt_book_notes/body/scroll.gif" width="500" /></a>

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/3af6fa848fdf3de0b21537f1cb96dfcf/c4x/Engineering/CVX101/asset/hw3sol.pdf">Practice Problems (by Stanford)</a>

### Chapter 5: Duality

* <a href="https://www.youtube.com/embed/rnweWxPvnfU" >Lecture (by Stanford)</a>
* <a href="https://github.com/MrityunjayBhardwaj/Notes/blob/master/ConvexOptimization/Ch5.ipynb"><img src="{{site.baseurl}}/assets/img/posts_imgs/cvx_opt_book_notes/body/ch5_scrst.png" width="500"></a>

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/1c4433c8343544f614abeff62cf67dcf/c4x/Engineering/CVX101/asset/hw4sol.pdf">Practice Problems (by Stanford)</a>

## Part 2 : Application

Part II focuses on the Application of all the theory we have read in the Part I of this book. here, we first look at how to use convex optimization to solve curve fitting/ regression problems (in some sense), one of the techinques that really intrigue me is the concept of Huber-panelty function which we will use to define many robust approximation models in the next chapter we will go throught MLE and MAP estimation from the perspective of statistics as well as convex optimization we also looked at the hypothesis testing and how to formulate our assumptions into cvx problem lastly we looked at 2 of the most important bounds in statistical estimation Chebyshev and Chernoff bounds. in chapter 8 we looked at different geometric problems like analytic centric ( which is used in almost every field), classification (we will also look at QDE and even SVM!) lastly, we will look at the problem of floor planning which essientally finds best dimensions of each of the rooms given the maximum dimension of the land, this techinques is also being used in VLSI design(circuit design) inwhich we have to design the circuit using the resources as optimally as possible..

### Chapter 6: Approximatation and Fitting

* <a href="https://www.youtube.com/embed/jwzTpzx75bA" >Lecture (by Stanford)</a>

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/50b621fa901e516b8919b175aae34f32/c4x/Engineering/CVX101/asset/hw5sol.pdf">Practice Problems (by Stanford)</a>

### Chapter 7: Statistical Estimation 

* <a href="https://www.youtube.com/embed/3Tsz4kbvL5k" >Lecture (by Stanford)</a>

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/50b621fa901e516b8919b175aae34f32/c4x/Engineering/CVX101/asset/hw5sol.pdf">Practice Problems (by Stanford)</a>

### Chapter 8: Geometric problems

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/0e2d73c4bdf11d323bf2f8c954b3e4c4/c4x/Engineering/CVX101/asset/hw6sol.pdf">Practice Problems (by Stanford)</a>

## Part 3 : Algorithms

Part III go over some of the most important algorithm which are the workhorses behind these covex optimization packages like CVXOPT, CVXPY, APOPT etc in chapter 9 we looked at several gradient based methods to solve unconstrained minimiztion problems like our good o'l  gradient descent and also looked at methods which uses second order methods like newton's methods etc. we also looked at the theory of self concordence which helps us to analyse newton's method also the method we will look at in later chapters, in chpater 10 we again use newton's method to solve equality constaint minimization problem we also looked at some of the implementation details which might prove useful if you are using this to create your own library or wanna understand how other library implements these concepts... lastly, in the final chapter we looked at on of the most important method in the modern convex optimization litrature is the concept of interior point method which helps us to solve the inequality constriant minimization problem by recursively solving the equaltiy constraint problem using the method called 'barrier method' although one might agruge that the explaination of interior-point methods isn't complete enough in this book but more like an introduction and that would be correct so please don't take this chapter as end all be all of this methods (if you want to dive deep into this concept then I really like this <a href="https://www.amazon.in/Numerical-Optimization-Jorge-Nocedal/dp/0387303030" >book by Nocedal & Wright</a>. by the way, there is also a <a href="https://youtu.be/7CMWdO5dgdQ">video</a> about it which you might find useful while going through that book ) also, one more thing, I bet by the end of this chapter you will start respecting the least-sqares methods again.. :D


### Chapter 9: Unconstrained Minimization

* <a href="https://www.youtube.com/embed/_vm61FXe9Ho" >Lecture (by Stanford)</a>

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/3c3c9888c2b61ff19d336d087da3a1d4/c4x/Engineering/CVX101/asset/hw7sol.pdf">Practice Problems (by Stanford)</a>


### Chapter 10: Equality constrained minimization
* <a href="https://www.youtube.com/embed/zqMUBtczjUw" >Lecture (by Stanford)</a>

* <a href="https://lagunita.stanford.edu/assets/courseware/v1/978334926a6a136b5320ec6e2d567a83/c4x/Engineering/CVX101/asset/hw8sol.pdf">Practice Problems (by Stanford)</a>

### Chapter 11: Interior-point methods

* <a href="https://www.youtube.com/embed/OGi0l7R-wSA" >Lecture (by Stanford)</a>


### Appendices:

* <a href="https://www.youtube.com/embed/EMZMFOtTyUE" >Lecture (by Stanford)</a>


Also, I really liked the Playlist by Ahemed Bazzi:-
https://www.youtube.com/watch?v=SHJuGASZwlE&list=PL-DDW8QIRjNOVxrU2efygBw0xADVOgpmw

and this course by CMU (ryan tibshirani is awesome! ) which also, covers a bit more then this book as to offer :-
https://www.youtube.com/playlist?list=PLRPU00LaonXQ27RBcq6jFJnyIbGw5azOI


Anyways, thats it from my side, I hope these resource was somewhat helpful to you, if you have any questions, suggestions regarding any of these notes or wanted share some awesome resource yourself then please feel to let me and others know about them in the comments below, I would really love to hear your thoughts.

Untill next time, Have a great day!


<hr>


References:-

* convex optimization book (https://web.stanford.edu/~boyd/cvxbook/)
* The unlisted stanford video is taken from now closed stanford lagunita course(https://lagunita.stanford.edu/courses/Engineering/CVX101/Winter2014/about)

