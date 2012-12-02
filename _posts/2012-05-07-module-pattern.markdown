---
layout: post
title: Module pattern
summary: How the module pattern works in JavaScript
category: articles
tags: [javascript, patterns]
---

This simple pattern is extremely powerful. You can use it to create entirely independent
building-blocks for your application, all while minimizing global namespace pollution.

Let's start with a simple example, and define a `queue` module which provides four operations:

- `init(items)`: populate the queue with some data
- `enqueue(item)`: add a new item to the back of the queue
- `dequeue`: remove an item from the front of the queue
- `size`: return the current size of the queue

We start by writing an anonymous [immediately-invoked function expression][iife] (IIFE) which returns
an object.

```javascript
var queue = (function() {
  var mod = {};

  return mod;
}());
```

Our queue will will be based on top of a native `Array`, so let's define one. `data` will be
accessible to all functions within our module:

```javascript
var queue = (function() {
  var mod = {};
  var data = [];

  return mod;
}());
```

And now we can define our functions and assign them to properties of the `mod` object.

```javascript
var queue = (function() {
  var mod = {}, data = [];

  var enqueue = mod.enqueue = function(o) {
    data.push(o);
  };

  var dequeue = mod.dequeue = function() {
    return data.shift();
  };

  var size = mod.size = function() {
    return data.length;
  };
  
  mod.init = function(items) {
    items.forEach(enqueue);
  };

  return mod;
}());
```

JavaScript does not have block scope, only function scope: the scope of a variable is limited to the
function it is defined in. So in the example, `data` is essentially hidden from the environment, but
accessible to the functions in our module. (When speaking of our module functions, we say that `data`
is a _free_ variable because it is neither a local variable nor an argument.)

By returning the object we create closures. What this means is that the module functions
will keep a reference to `data` even after the IIFE returns. We have effectively made `data` private.

You may want to read more about [functions][mozfunctions] on MDN, and [closures][closures] in this
article by Nick Morgan.

Here is how you could use our queue:

```javascript
queue.init([1, 1, 2, 3, 5]);
queue.size() // 5
queue.enqueue(3.14);
queue.dequeue(); // 1
queue.size(); // 5
```

There are a few variations of the module pattern, which [Ben Cherry explores in great detail][indepth];
Addy Osmani also [talks about it][book] in his _fantastic_ book on design patterns.

## Note

In the code, notice how module functions are assigned to a property of `mod` but also to a local variable. As
I explain above, variables declared inside the module are private, so users of our module can only call
our functions through properties of the `queue`. Doing it this way means you can invoke functions by name
directly, instead of having to go through the property to which it is assigned.

[indepth]: http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth "JavaScript Module Pattern: In-Depth by Ben Cherry"
[book]: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript "Module Pattern, Essential JavaScript & jQuery Design Patterns by Addy Osmani"
[iife]: http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Immediately-Invoked Function Expression (IIFE) by Ben Alman"
[wikiclosure]: http://en.wikipedia.org/wiki/Closure_(computer_science) "Closure (computer science) on Wikipedia"
[closures]: http://skilldrick.co.uk/2011/04/closures-explained-with-javascript/ "Closures explained with JavaScript by Nick Morgan"
[module-playground]: http://javascriptplayground.com/blog/2012/04/javascript-module-pattern "The JavaScript Module Pattern on JavaScript Playground"
[mozfunctions]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function "Functions on MDN"
