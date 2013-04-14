---
title : Headspace
tags: project, javascript, ruby
---

Why we built Headspace, a simple link sharing app, and how

READMORE

Recently, [Mike][mike] and I have been talking about building a little app
to help us keep track of all the links we share with each other daily.

We debated whether we should simply use [Pinboard][pinboard] or [Delicious][delicious], but we decided to build our own as a way *learn*. It's one thing to read about new techniques and tools, but learning to use them appropriately can only come with practice. It's easy to take things for granted.

![][screenshot]

## Building blocks

The back end was built with [Sinatra][sinatra]. It's simple, flexible and fun. It provides a powerful DSL for defining routes (ie. HTTP endpoints), and leaves the rest up to me. I do not believe I have reached the point where I can comfortably hand off control to a big framework quite yet. Also, the [source][sinatra-gh] is very readable and the community is awesome: that's great because I can quickly look behind the covers (and discover some new Ruby tricks).

Data is stored on [PostgreSQL][pg]. I am using [Sequel][sequel], a flexible database toolkit/ORM, to work with the data directly from Ruby. It's very easy to setup, the documentation is excellent, and Jeremy Evans (the creator) is usually available for discussion on IRC.

Because we couldn't be bothered with creating a new username and password, users authenticate using their Google account. Most of the grunt work for this is handled by the [OmniAuth][omniauth] gem, which makes it a pinch to use any of the large OAuth providers out there.

The last piece of the puzzle is a simple API for accessing links, built to integrate seamlessly with [Backbone][backbone]. I recently worked on a large [Dojo][dojo] project at work, and was curious about Backbone, which provides a simple and flexible structure for web applications. When I started with Dojo, I wished there were a few more hints or guidelines for organizing large Javascript applications. Thankfully there are [many][large-scale-js] [great][essential-js-patterns] [resources][scalable-js-arch] [available][lessons-from-rewrite]. And let's not forget that Backbone's documentation is excellent and the community is very constructive and helpful.

The entire UI is built on the client, using [Underscore][_] templates. This is extremely convenient. No more building HTML using concatenation.

Working with Dojo also exposed me to AMD (Asynchronous Module Definition). I recommend reading ["Why Web Modules?"][require-why-modules] and ["Why AMD?"][require-why-amd], as well as Addy Osmani's [excellent article][modular-js] on the subject. For this project I used [RequireJS][require].

Organizing code into modules is essential for any application. I remember writing monolithic spaghetti JavaScript code and how painful it was to maintain. Even though splitting such a piece of code across multiple files helped, making sure the order among these "modules" remained coherent was painful. And while using a script loader currently introduces a dependency, I found the gain in clarity and maintainability to be well worth the extra step.

As a side note, RequireJS provides an optimizer (r.js) to concatenate and minimize all the modules into one file for production (great for reducing bandwidth usage). Setting up a build is straightforward and [well documented][require-optimization].

## One Step Forward

I deployed Headspace on a Sunday, and on Monday we already had 5 new ideas. This was probably the most rewarding part in all of this: using something we've created and discovering new things we could do with it.

There are already many things that I am in the progress of rewriting to accommodate new features. Being able to quickly iterate is key to making Headspace useful for us.

I have a beta instance running [here][hs], and you can also check out the [source][hs-gh]. Feel free to share any comments or suggestions.

[hs]: http://headspace.squid.io "Headspace"
[hs-gh]: https://github.com/apucacao/headspace "Headspace on GitHub"
[screenshot]: /images/headspace.png "Headspace: starred links"
[mike]: http://michaelmartin.ca "Michael Martin – Designer"
[addy]: http://addyosmani.com/blog/ "Addy Osmani"
[james]: http://tagneto.blogspot.com/ "James Burke"
[require]: http://requirejs.org/ "RequireJS"
[backbone]: http://documentcloud.github.com/backbone/ "Backbone.js"
[dojo]: http://dojotoolkit.org/ "Dojo"
[_]: http://documentcloud.github.com/backbone/ "Underscore.js"
[sinatra]: http://www.sinatrarb.com/ "Sinatra: A DSL for creating web applications in Ruby"
[sinatra-gh]: https://github.com/sinatra/sinatra "Sinatra on GitHub"
[omniauth]: https://github.com/intridea/omniauth "OmniAuth"
[sequel]: http://sequel.rubyforge.org/ "Sequel"
[pg]: http://www.postgresql.org/ "PostgreSQL"
[pinboard]: http://pinboard.in "Pinboard"
[delicious]: http://delicious.com "Delicious"

[large-scale-js]: http://addyosmani.com/largescalejavascript/ "Patterns For Large-Scale JavaScript Application Architecture by Addy Osmani"

[essential-js-patterns]: http://addyosmani.com/resources/essentialjsdesignpatterns/book/ "Essential JavaScript Design Patterns by Addy Osmani"

[scalable-js-arch]: http://www.slideshare.net/nzakas/scalable-javascript-application-architecture "Scalable JavaScript Application Architecture by Nicholas Zakas"

[lessons-from-rewrite]: http://rmurphey.com/blog/2011/07/06/lessons-from-a-rewrite/ "Lessons from a Rewrite by Rebecca Murphey"

[require-why-modules]: http://requirejs.org/docs/why.html "RequireJS: Why Web Modules?"

[require-why-amd]: http://requirejs.org/docs/whyamd.html "RequireJS: Why AMD?"

[modular-js]: http://addyosmani.com/writing-modular-js/ "Writing Modular JavaScript With AMD, CommonJS & ES Harmony by Addy Osmani"

[require-optimization]: http://requirejs.org/docs/optimization.html "RequireJS: Optimization"