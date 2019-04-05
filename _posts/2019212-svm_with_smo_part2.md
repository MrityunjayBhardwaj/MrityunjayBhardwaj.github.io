---
layout: single
title : Extending SVM using kernel trick
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
    teaser: /assets/imgs/posts_imgs/svm-with-smo-part-2/teaser/kernel_trick_svm.jpg
---

In part 1 of this series, we have learned about the basics of SVM and also described how to solve it using SMO algorithm, althought we can go ahead and impliment what we have learned right away but only the knowledge of part1 is'nt enough. because in real life scenarios, most of the data does'nt get classified linearly which means that we need to find a way to create a non-linear decision boundary, but as discussed in our previous post, SVM is a linear classifier only, which means we can't make a non-linear classifier directly but in this post we are going to talk about a neat trick which will help us to do just that.

Think of it this way.. we can only fit a linear decision boundary but what if the decision boundary is in much higher-dimensional space then the original one? suppose we need to classify similar to the one in L-fig (1.1), using the venilla svm we can't fit a decision boundary because the data is not linearly seperable.

>L-fig 1.1

but if we somehow increase it's dimensionality, and then fit a hyperplane? then it might become linearly seperable in that dimension, so by transforming our original 2d-data into 3d space we might get a scenario something like in L-fig (1.2) which suggest that if we fit a decison-boundary in this space then we can easly seprate both the classes using a linear decision boundary...

>L-fig 1.2

now that we are convenced that by inscreasing the dimensionaly of our data points we can seprate them using our linear decision boundary, we can go ahead and see how can we go about doing that.....
so lets say we take our 2d data and take a 2nd order polynomial transformation($$ \phi(x) $$) which makes our $$ x = (x_1,x_2) $$ into (1).

$$ z = \phi(x) = \{ 1 , x_1 , x_2 , x_1^{2} , x_2^{2} , x_1x_2 \} \tag{1}$$

and then if we were to plug in the transformed version inside our objective function(2), we get something like (4)

$$
\max_{\alpha_i} \quad L(\alpha_i)={\sum_{i=1}^{n}\alpha_i} - {1 \over 2}{ {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } }\\\tag{2}
s.t. \quad \left \{ { {\alpha \geq 0};
{ {\sum_{i=1}^n} {\alpha_i y_i} = 0}  }\right.
$$

$$ \max_A \quad L(A) = A - {1 \over 2}{A^TA'Y^TY'x^Tx' } \tag{3}$$

$$ \max_A \quad L(A) = A - {1 \over 2}{A^TA'Y^TY'z^Tz' } \tag{4}$$

here, we just replaced $$x^Tx'$$ with $$z^Tz'$$ which is just the inner product of the transformed version of our x.
and if we were to expand $$z^Tz'$$ we get something like (5) which we call **kernel** :

$$K(x,x') = z^Tz' = { 1 + { z_1 {z'}_1 } + { z_2 {z'}_2 } + { z_1^{2} {z'}_1^{2} } + { z_2^{2} {z'}_2^{2} } + { z_1z_2 {z'}_1{z'}_2 } }\tag{5}$$

>kernel is just the inner product of the transformation of $$ x $$ and $$ x' $$

and using this new objective function(3) we can fit our linear-decision boundary in higher dimensional space and create a non-linear decision boundary in our original space!
so does that mean we are done?.... not quite, the problem with this technique is that it takes alot of time and space to calculate and store $$ \phi $$ although it may not look as inticing if we only transform using 2nd order polynomial but what if we need to transforme our original space into 10 or even 100 dimensional space!!! which is extremely expensive for even a decent standards and all we are doing with our $$ z $$ is to compute the dot product with $$ z' $$ which give us only a single value, which indicated the fact that, if only we are able to compute the dot product without explicitly going to  z-dimensional space, we can get away by fitting a hyper-plane, even in the infinit dimensional space without draining our resources and that is were kernel trick comes in the picture...

 >In **kernel-trick** we use a kernel-function which gives us the inner-product of x transformed in z-dimensional space without having to explicitly transforming $$ x $$ and $$ x' $$ z-dimensional space.
 
so let's take a simple kernel function (6), here, we can see that we are not transforming our x in any other space which suggest that its just a simple function

$$
\begin{align}
 K(x,x') &= (1+x^Tx')^2 \tag{6}\\
 &= (1 + x_1x'_1 + x_2x'_2)^2 \\
 &= 1 + x^2_1x'^2_1 +x^2_2x'^2_2 + 2x_1x'_1 + 2x_2x'_2 + 2x_1x'_1x_2x'_2 \tag{7}
\end{align}
 $$

now, the expansion (7) looks awefully similiar to (5) accept those "2"s which we can justify by saying that it is the inner production of the transformed $$ x $$ ,inwhich the transformed value of $$ x $$ and $$ x'$$ looks like (8) and (9) respectively.

$$ z  = \phi(x) = \{ 1 ,\sqrt{2} x_1 ,\sqrt{2} x_2 , x_1^{2} , x_2^{2} ,\sqrt{2} x_1x_2 \}      \tag{8}$$
$$ z' = \phi(x') = \{ 1 ,\sqrt{2} x'_1 ,\sqrt{2} x'_2 , x'_1^{2} , x'_2^{2} ,\sqrt{2} x'_1x_2 \}  \tag{9}$$

which clearly state that we can get away by using (6) without having to explicitly calculate the $ \phi(x$ $$
now let's take a look at the more general case, suppose we have $$ x $$ of dimension $$ d $$ and we want to take the inner-product by transforming it to "z" dimensional space which can be achieved by using the $$ Q^{th}$$ order polynomial transformation, so let's suppose equivalent kernel for this operation is going to be (10) which does make sense if we were to expand it like (11) and if we compare (11) and (5) we can conclude this expression is similar to the case above accept some constant terms, which can be compensate if we were to introduce a constant multiplyer of our own in the formulation (10).

$$
\begin{align}
K(x,x') &= (1 + x^Tx')^Q \tag{10}
&= (1 + x_1x'_1 + x_2x'_2 + ... + x_dx'_d)^Q \tag{11}
\end{align}
$$

this observation validates the fact that this function(10) is equivalent, if we were to first do the transformation explicitly and then take the inner product another function that you may want to add to your knowledge bag is the RBF kernel or Gaussian kernel which gives you the  _inner-product of the infinit-dimensionally transformed x_ which looks something like (12)

$$ exp(-\gamma { || x - x'|| }^2  ) \tag{12}$$

so does that mean we can create any costum function and declare it as a kernel function?... well, yes and no, we can sure create an arbitary function which doesn't really repressent the inner-product in any space... no body is stopping us from using that, but its going to be like shooting in the dark which is what the field mathematics is trying to enlighten, and the way we do that in this scenario by taking our function and see if our function satisfy the **mercer condition** and if it does then our function is a valid kernel function.

mercer condition state that :

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
this is awesome
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

now that we know that we can get away with using these kernel function without explicitly going to any $$ z $$ space, we need to see how it all comes together in the formulation in our SVM...

In SVM we maximize the objective function w.r.t $$ \alpha_s $$ and we do this either by feeding the entire expression to QPSolver or to use other algorithms like smo, these techniques gives use the value of alpha which we use to calculate the parameter of our hyperplane using (15). here, we modify our equation using our kernel function.

---
---
---

which suggest that using these new expression (18) (19) we can fit a non-linear decision boundary which is what we are trying to achieve in through this post.

in the next post , we are going to be using implementing what we have learned so far..
