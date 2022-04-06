---
path: /learning/react
title: Learning React
tag: learning
sortIndex: 10
---

There are many great resources available to learn react and its eco-system. We find some of them particularly important and we decided to list them on this site for the user convenience. For the smooth start with the react ecosystem, we grouped the resources into three categories: beginner, intermediate, and advanced. The boundaries are not strict by any means, just an indication.

## Starting up

In principle, React is just a JavaScript library for building user interfaces. This means that in order to build complete web apps you will need to complement React with a number of *things*. These *things* form something we will refer to as a React eco-system. In learning this eco-system, we find it extremely important that instead of throwing yourself at more or less complete eco-system all at once, you build your understanding gradually, so that you learn not only *how* to use various React eco-system elements, but you also learn *why* you need them in the first place.

Now, when learning React you will use React documentation, tutorials, blogs, video trainings, etc. We also did it and as long as we do not dare to disqualify any of the available resources out there, we found some of them especially useful.

And so, if you are new to React, we recommend that you start with the training from Wes Bos: [React For Beginners]. We recommend that you do the training in one go, so please reserve some time for it and just do it. Over time, when you begin using React in your own project, you may like to revisit (some parts of) the training - you will most certainly find new insights every time you do.

You do not need to be a JavaScript guru to become efficient with React, but feeling comfortable with modern JavaScript will help. So, complementary to the [React For Beginners] training, you may like to use another training from Wes Bos: [ES6 for Everyone].

Finally, after you are done with the training from Wes Bos, you may like to check out the training from Kent C. Dodds: [The Beginner's Guide to React]. This is where we learnt about CodeSandbox ;).

[React For Beginners]: https://reactforbeginners.com
[ES6 for Everyone]: https://es6.io
[The Beginner's Guide to React]: https://egghead.io/courses/the-beginner-s-guide-to-react

## Redux or not Redux?

Since the [context] API became stable in version `16.6.3` and since [React Hooks] are official in version `16.8.0` I encourage you to try not to use [Redux]. Redux is great, but while it simplify reasoning about data flow in the system, it also brings complexity to the code structure and some responsibilities with respect to the structure of the global state. In other words, there is cost associated with Redux, which becomes more visible when global state grows causing unexpected (re)rendering cycles. By its nature, Redux makes encapsulation and local reasoning harder. I would recommend the user to consult Kent C. Dodds post about [Application State Management].

Never used [Redux] before or need to refresh? I recommend two trainings from Redux's creator Dan Abramov: [Getting Started with Redux] and [Building React Applications with Idiomatic Redux].

[contex]: https://reactjs.org/docs/context.html
[Redux]: https://redux.js.org
[Getting Started with Redux]: https://egghead.io/courses/getting-started-with-redux
[Building React Applications with Idiomatic Redux]: https://egghead.io/courses/building-react-applications-with-idiomatic-redux

## React Hooks

There is no excuse as the benefits are significant. The official documentation on [React Hooks] is really good. Do not skip the [FAQ] part of it as it provides important insights when you are moving from classes to hooks. Then there is a great play list (again from Kent C. Dodds) that you really should watch: [React Hooks and Suspense] and you may like to consult [Simplify React Apps with React Hooks] from the same author.

[React Hooks]: https://reactjs.org/docs/hooks-intro.html
[FAQ]: https://reactjs.org/docs/hooks-faq.html
[React Hooks and Suspense]: https://egghead.io/playlists/react-hooks-and-suspense-650307f2
[Simplify React Apps with React Hooks]: https://egghead.io/courses/simplify-react-apps-with-react-hooks

## Testing React Components

There is one answer to that: [react-testing-library] and [react-hooks-testing-library]. Read [Introducing the react-testing-library] for more background and consider buying [Testing JavaScript] to learn how to test javascript in general and React components in particular and perhaps to adjust your testing habits.

[react-testing-library]: https://www.npmjs.com/package/react-testing-library
[react-hooks-testing-library]: https://www.npmjs.com/package/react-hooks-testing-library
[Introducing the react-testing-library]: https://kentcdodds.com/blog/introducing-the-react-testing-library
[Testing JavaScript]: https://testingjavascript.com

## Implicit vs explicit state, component composition

I recommend [Advanced React.js Full Course] from Ryan Florence. There is also a free version of this training if you cannot afford the full version: [Advanced React.js Free]. These are great resources and they are definitely worth the money.

We also recommend the [Advanced React Component Patterns] from Kent C. Dodds to have a slightly different but equally useful perspective.

Since the introduction of React Hooks, render props and Higher Order Components faded away a bit, but you will still most certainly enjoy the following great appearance from Michael Jackson: [Never Write Another HoC].

## One more thing

We are not selling:

> We have no affiliation with any of the authors of the resources mentioned on this site and neither we are compensated in any way. The presented resources are our own picks and we found them very important when mastering React and its eco-system.


[react-redux]: https://github.com/reduxjs/react-redux
[Advanced React.js Full Course]: https://courses.reach.tech/p/advanced-react
[Advanced React.js Free]: https://courses.reach.tech/p/advanced-react-free
[Advanced React Component Patterns]: https://egghead.io/courses/advanced-react-component-patterns
[Never Write Another HoC]: https://www.youtube.com/watch?v=BcVAq3YFiuc
