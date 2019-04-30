# FramerX

> Previously, we were using more complicated setup, inspired by the work of Ivan Cruz who shows an inspiring example in [Bringing Design System Components from Production into Framer X]. Please
check their original repo at https://github.com/shiftsave/framerx-build-system
or take a look at the fork at  https://github.com/marcinczenko/framerx-build-system
where we are adding some extra stuff.
>
> Since FramerX also provides the *folder* format of serializing the project, all this complex zipping and unzipping should not be needed. Therefore, here, you can find a refined version. Please refer to the commit history, to see the previous version with zipping/unzipping.

In this workspace we show how to use production components in the [FramerX]. It is an early demo, where we demonstrate the use our own external production components as well as popular [semantic-ui].

Adding your own components happens in two steps:

1. Add the package you want to use to `package.json` in the framerx project folder and run `yarn` there.
2. Create a typescript wrapper around your own components to make it suitable for the framer rendering system and to expose your component's props that you want to be accessible from the level of FrameX user interface. See for example [SemanticButton.tsx], [ValueWrapper.tsx], and [CogitoConnector.tsx].

[SemanticButton.tsx]: https://github.com/Charterhouse/react-frontend-developer/tree/master/workspaces/framerx/react-frontend-developer.framerfx/code/SemanticButton.tsx
[ValueWrapper.tsx]: https://github.com/Charterhouse/react-frontend-developer/tree/master/workspaces/framerx/react-frontend-developer.framerfx/code/ValueWrapper.tsx
[CogitoConnector.tsx]: https://github.com/Charterhouse/react-frontend-developer/tree/master/workspaces/framerx/react-frontend-developer.framerfx/code/CogitoConnector.tsx

## Is there a better way?

Trying [FramerX Teams] should make things a lot easier. But knowing how to share
your production code with FramerX may still turn out handy and, who knows, maybe it
will cover some cases, where FramerX teams are not the best option.
We will keep it here for the reference.

[Bringing Design System Components from Production into Framer X]: https://blog.prototypr.io/bringing-design-system-components-from-production-into-framer-x-786e89be2250
[semantic-ui]: https://react.semantic-ui.com
[FramerX Teams]: https://framer.com/teams/
[FramerX]: https://framer.com
