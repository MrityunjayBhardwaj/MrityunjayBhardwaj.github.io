---
layout: single
title : SVM with SMO:_CODE
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

In this tutorial we are going to be appliying what we have learned in part 1 of this series by implementing our own smo algorithm in Python or JavaScript.. if you have'nt checked out the first part yet,i suggest you to do so. but if you just need a referesher on svm then in the next paragraph we are going to take a brief look at it.

In svm, we are trying to fit a linear decision boundary which has a maximum margin and for that we developed a function which we need to optimize :-

$$ \min { {1 \over 2}{||\Theta||}^2 } + C{ \sum_{i=1}^{n}\zeta}$$
$$
 \text{subject to} \quad \zeta_i \geq 0, y_i(x_i^T\Theta + \Theta_0) \geq 1 - \zeta_i \forall_i
$$

but then we found out that instead of working with the function (1) its better to optimize the dual of that function :-

$$ L_P = { { 1 \over 2} {||\theta||^2} } + { C{\sum_{i=1}^{n}} \zeta - {\sum_{i=1}^{n}}\alpha_i[yi(x_i^T\Theta + \theta_0) - (1- \zeta)] -{\sum_{i=1}^{n}}\mu_i\zeta_i   }  $$

so by taking the partial derivative w.r.t the primal variables we get these three equations

$$
\Theta = \sum_{i=1}^{n}{\alpha_i y_i x_i} \tag{3}
$$

$$
\sum_{i=1}^{n}{\alpha_i y_i} = 0 \tag{4}
$$

$$
 0 \leq \alpha \leq C \tag{5}
$$

and if we use (3) (4) (5) in our primal form(2) we can have our objective function soley in terms of the dual variables:

$$
\max_{\alpha_i} \quad L(\alpha_i)={\sum_{i=1}^{n}\alpha_i} - {1 \over 2}{ {\sum_{j=1}^{n}\sum_{i=1}^{n}{ {\alpha_i \alpha_j} {y_i y_j} {x_i x_j} } } }\tag{6}\\
s.t. \quad \left \{ { {\alpha \geq 0};
{ {\sum_{i=1}^n} {\alpha_i y_i} = 0}  }\right.
$$


in which, 

$$ \epsilon $$ =  regularization parameter of our soft margin...

$$ C $$        = upper bound of our box constraint

$$ K $$        = our kernel function which makes our classifier non-linear
$$

and the reason why go though all this trouble is because this new formation will help us to integrate something called a kernel trick... which is a way for us to fit a non-linear decision boundary using a kernel function ($$ K $$)


now that we know what our objective is we just need to optimize it w.r.t $$ \alphas $$ and the way we are going to do that is by using an algorithm called smo... which we have planned to implement in this post, so lets get started,

first we are going to be importing all the necessary library

```python

from __future__ import division, print_function
import os
import numpy as np
import random as rnd
filepath = os.path.dirname(os.path.abspath(__file__))

```

```python
class SVM():
    """
        Simple implementation of a Support Vector Machine using the
        Sequential Minimal Optimization (SMO) algorithm for training.
    """
    def __init__(self, max_passes=10000, kernel_type='linear', C=1.0, tol=0.001):
        self.kernels = {
            'linear'    : self.kernel_linear,
            'quadratic' : self.kernel_quadratic
        }
        self.max_passes  = max_passes
        self.kernel_type = kernel_type
        self.C           = C       # C is the length of our box constraint.
        self.tol     = tol # tollerance value.

```

now, this is the most important method of our SVM class, because in this method we are going to be impementing our smo algorithm by following platt's original paper ... and break down every line of code. 

```python

    def fit(self, X, y):
        # Initialization
        n      = X.shape[0]
        alpha  = np.zeros((n))
        kernel_fn = self.kernels[self.kernel_type]
        count  = 0

```

so as we know, smo works by subdividing the original objective function in smaller more digestable chunks.the smo algorithm consist of 2 parts, one is to select the alphas and second is to use these alphas and optimize our objective function(3) w.r.t them simultaneously.

so for the first part we could either use a complicated heuristics to select those alphas or we could choose 2 alphas randomly. in this implimentation we are going with the latter one by creating a method called <span style=""> get_rnd_int() <span>


```python
        while True:
            count += 1
            alpha_prev = np.copy(alpha)
            for j in range(0, n):
                i   = self.get_rnd_int(0, n-1, j) # Get random int i~=j
                x_i, x_j, y_i, y_j = X[i,:], X[j,:], y[i], y[j]

```

now that we have choosen our alphas, we can worry about the second part, which is to optimize our objective function w.r.t them without volating the constraints... which turns our original objective function (6) into a simple quadratic equation.

$$

{1 \over 2}{K_{aa}\alpha_a^2}

$$

using some voodoo mathematics(see part 1) we came to the conclusion that we can find the value of $$ \alpha_j $$ using:


$$ \alpha_2^{(new)} = { \alpha_2^{ (new) } } - { {y_2(E_1 - E_2) } \over { \eta } } \tag{3}$$

where,
$$ \eta $$ is the second derivative of our simplified objective function, but if the second derivative is 0 that means that its already maximized so we should drop those pair and choose some other pair

$$ \eta = 2 K(x_1,x_2) - K(x_1,x_1) - K(x_2,x_2) \tag{4}$$



```python
                eta = kernel_fn(x_i, x_i) + kernel_fn(x_j, x_j) - 2 * kernel_fn(x_i, x_j)

                if eta == 0:
                    continue
```

but what if our optimial value violates our box constraint? in that case, we are just going to be clipping the values to its bounds but first we need to calcuate them ( let them be $$ H $$  and $$  L $$  respectively):-


if $$ y_1 \neq y_2$$


$$
\left \{
\begin{array}{ll}
H &=\max\{0, { \alpha_2^{(old)}}-{\alpha_1^{(old)}}\},\\
L &= \min\{C,{ C - { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}\tag{5}
\end{array}
\right.
$$

if $$y_1 = y_2$$

$$
\left \{
\begin{array}{ll}
H &=\max\{0,{ { \alpha_1^{(old)}}-{\alpha_2^{(old)}} - C } \},\\
L &= \min\{C,{ { \alpha_1^{(old)}}+{\alpha_2^{(old)}} } \}\tag{6}
\end{array}
\right.
$$


```python
                alpha_j, alpha_i = alpha[j], alpha[i]

                # cacluating bounds
                if(y_i != y_j):
                    L = max(0, alpha_j - alpha_i)
                    H = min(self.C, self.C - alpha_i + alpha_j)
                else:
                    L = max(0, alpha_i + alpha_j - self.C)
                    H = min(C, alpha_i + alpha_j)
```

another thing that is probabily confusing is the $$ E_i $$ ... this terms specify the error between the true y and the pridected y and we are pridicting the value of "y" using values of alphas we have calculated uptill now, and we are going to be calcuating the $$ \Theta$$ using (3) and for $$ \Theta_0 $$:

$$ \Theta_0 ={1 \over {n} } { { \sum_{i=0}^{n} } }{ y_i - \Theta x_i} \tag{7}$$

```python
                # Compute model parameters
                self.theta   = np.dot(X.T, np.multiply(alpha,y))
                self.theta_0 = np.mean(y - np.dot(self.theta.T, X.T))

                # predicted y using currently evaluated hyperplane parameters
                pred_yi = np.sign(np.dot(self.theta.T, x_i.T) + self.theta_0).astype(int)
                pred_yj = np.sign(np.dot(self.theta.T, x_j.T) + self.theta_0).astype(int)

                E_i = pred_yi - y_i
                E_j = pred_yj - y_j
```

and using (5) we can find $$ \alpha_j $$ and we can clip it if needed using (5) (6)


```python
                # Set new alpha values
                alpha[j] = alpha_j + float(y_j * (E_i - E_j))/eta

                # clipping the value to satisfy the box constraint
                alpha[j] = max(alpha[j], L)
                alpha[j] = min(alpha[j], H)

                # calculating the other alpha
                alpha[i] = alpha_i + y_i*y_j * (alpha_j - alpha[j])
```

now that we have calculated our alphas we can check if the difference b/w the previous value and the current one is less the a certain tollerance value and we can also check the convergence using the maximum number of passes ... these 2 methods prevents us from running the loop forever... because there might never be an optimal point which is ok.

```python
        # Check convergence
        diff = np.linalg.norm(alpha - alpha_prev)
        if diff  < self.tol:
            break

        if count >= self.max_passes:
            print("Iteration number exceeded the max of %d iterations" % (self.max_passes))
            return

```



```python
        # Compute final model parameters
        self.theta_0 = np.mean(y - np.dot(self.theta.T, X.T))
        if self.kernel_type == 'linear':
            self.theta = np.dot(X.T, np.multiply(alpha, y))

        # Get support vectors
        alpha_idx = np.where(alpha > 0)[0]
        support_vectors = X[alpha_idx, :]
        return support_vectors, count

    def predict(self, X):
        return np.sign(np.dot(self.theta.T, X.T) + self.theta_0).astype(int)

    def get_rnd_int(self, a,b,z):
        i = z
        count=0
        while i == z and count<1000:
            i     = rnd.randint(a,b)
            count = count+1
        return i

    # Kernel Functions 
    def kernel_linear(self, x1, x2):
        return np.dot(x1, x2.T)
    def kernel_quadratic(self, x1, x2):
return (np.dot(x1, x2.T) ** 2)
```