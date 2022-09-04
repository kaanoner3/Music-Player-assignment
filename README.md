# skoove-assignment
Welcome to the music player assignment!

# Getting Started
This project uses [Expo dev client](https://docs.expo.dev/development/introduction/) and configured for iOS. 


Rest of the document assumes that you have mobile environment setup ready. [React Native Setup Guide](https://reactnative.dev/docs/environment-setup)

# Clone and Install
```
  git clone https://github.com/kaanoner3/skoove-assignment.git <br>
  cd skoove-assignment <br>
  yarn install <br>
  npx pod-install <br>
```
# Run on iOS
```
 yarn ios
 ```
# Run Tests
```
yarn test
```
To see the code coverage
```
yarn test --coverage
```
# Important pieces
## Packaging system
[Yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/) is being used on the Project as packaging architecture. 
It helps us to create structure in which we can draw strict lines in terms of responsibilities, so, every team can control its own territory.
It's especially important when lots of people starts working on the same codebase. Our music player assignment have 4 different packages (Potentially have 4 different teams).

## @skoove/design-system
Responsible for building widely used components like such as `button`, `text`, `image` etc. Also responsible of best UI-best practices and standarts such as theme support.
Due to limited time I implemented only spacing module which provide us consistency in margin and paddings.

## @skoove/platform
Responsible for vital packages and utilities like `http`, `cache manager`, `storage`, `performance tracking`, `i18n` etc. We have `http`, `error handling`, `screen hocs`,`redux`, and `navigation`

## @skoove/home
Responsbile for listing musics

## @skoove/music-player
This part is responsible for music player. Tech: [react-native-track-player](https://react-native-track-player.js.org/), [slider](https://github.com/callstack/react-native-slider). 






