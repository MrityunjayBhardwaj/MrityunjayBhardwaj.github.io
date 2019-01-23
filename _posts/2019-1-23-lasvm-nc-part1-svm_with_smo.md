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
    linear Algebra(EigenVectors)
    multi-variable calculus(legrange multipliers,duality,quadratic progarmming,optimization)

if you are unfimilier with those concepts,  Imperial Collage London has a great course on coursera,which you might find useful:
<a href="https://www.coursera.org/specializations/mathematics-machine-learning">https://www.coursera.org/specializations/mathematics-machine-learning</a>

ok,I hope that you are confident enough in those prerequisites;we can now go ahead and start learning about SVMs

so as you might know SVM stands for support vector machines.... its probabily the most successful hyperplane based classifier...what that really means is that you are classifing 2 classes by constructing a hyperplane which seperate both of them as much as possible.



{: .text-center}
<div id="fit_hyperplane_yourself" style="width: inherit"></div>


<script src="{{site.baseurl}}/assets/js/my_js/fit_hype.js"></script>
<i style="font-size:15px">L-fig 1.1</i>
<i style="font-size:15px">fit the classifier</i>
{: .text-center}

ok,I hope that you are confident enough in those prerequisites;we can now go ahead and start learning about SVMs

so as you might know SVM stands for support vector machines.... its probabily the most successful hyperplane based classifier...what that really means is that you are classifing 2 classes by constructing a hyperplane which seperate both of them as much as possible.
