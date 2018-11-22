# FramerX

> Credits to Ivan Cruz who shows an inspiring example in
[Bringing Design System Components from Production into Framer X]. Please
check their original repo at https://github.com/shiftsave/framerx-build-system
or take a look at the fork at  https://github.com/marcinczenko/framerx-build-system
where we are adding some extra stuff. What we do at here at react-frontend-developer is
simply a refinement and showing how does it fit into a monorepo.

This workspace is a demonstration of how to expose production assets as
[FramerX] components. Here we have a monorepo. You can imagine that your monorepo
may have a number of react components that you would like to expose to FramerX
so that you can use them directly when designing.

In our example, we show how to share selected packages from one of our workspaces, we
show how to expose one of our packages that comes from a completely different repository,
yet published as an npm package, and for the dessert we add one example package that 
exposes a [semantic-ui] button.

## Bundling

We use [webpack] to create a bundle that we place in the `lib` folder that we then shift 
into the `react-frontend-developer.framerx` file. We have [emotion] and [semantic-ui] as 
dependencies even though we actually decided to mark them, together with `react`, 
`react-dom`, and `react-props` as externals in our `webpack.config.js`. Initially we were
bundling everything except react, but then we decided that putting those *common*
dependencies directly in the `package.json` of the `react-frontend-developer.framerx` 
file, is quite appealing. Both ways work. We can either have them there and have a 
lighter bundle with our production components, or create a heavier bundle (by removing 
some *externals*) and do not bother with putting dependencies directly inside the 
`package.json` of the `react-frontend-developer.framerx` file.

## Entry point

Our entry point is `index.js` (yes, we do not like TypeScript and so we got rid of it):

```javascript
export { SemanticButton } from './examples/SemanticButton'
export { ValueWrapper } from '@react-frontend-developer/react-layout-helpers'
export { CogitoConnector } from '@cogitojs/cogito-react-ui'
```

This is basically the list of things you want to bundle and make visible to FramerX project.

## yarn build

This target will remove the `lib` folder (so that we get a clean start), runs `webpack`
to create the bundle in the `lib` folder and then we shift the lib folder into
the `react-frontend-developer.framerx` file.

## yarn sync:lib

This is the above-mentioned *shifting* of the `lib` folder into the 
`react-frontend-developer.framerx` file.

## yarn sync:src

Bundling makes things available for FramerX, but the actual FrameX components that are 
wrappers around your production components (or some other fancy stuff you create with 
them) will be kept inside FramerX project. If you want to extract them nicely and also 
version  control in the repo just run `yarn sync:src`. This will extracts all relevant 
stuff and put in the `src` folder. You can version it and then have a good tracking of 
your FramerX components. One may consider a hook, but in a monorepo it does not feel
a good solution - we are still searching for something nice here.

## yarn sync:framerx

The extracted `src` folder and the generated `lib` is all you need to restore your 
FramerX project file. Just run `yarn sync:framerx` and you will be given a fresh new
`react-frontend-developer.framerx` project package.

## Is there a better way?

Trying [FramerX Teams] should make things a lot easier. But knowing how to share
your production code with FramerX may still turn out handy and, who knows, maybe it
will cover some cases, where FramerX team are not the best option.
We will keep it here for the reference.

[Bringing Design System Components from Production into Framer X]: https://blog.prototypr.io/bringing-design-system-components-from-production-into-framer-x-786e89be2250
[semantic-ui]: https://react.semantic-ui.com
[FramerX Teams]: https://framer.com/teams/
[FramerX]: https://framer.com
[webpack]: https://webpack.js.org
