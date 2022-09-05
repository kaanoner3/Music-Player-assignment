# skoove-assignment
Welcome to the music player assignment!
# Demo

https://user-images.githubusercontent.com/32056713/188339704-358cdfae-a927-49a4-9e85-fa4142b0fd1c.mov

# Getting Started
This project uses [Expo dev client](https://docs.expo.dev/development/introduction/) and configured for iOS. 


Rest of the document assumes that you have mobile environment setup ready. [React Native Setup Guide](https://reactnative.dev/docs/environment-setup)

# Clone and Install
```
  git clone https://github.com/kaanoner3/skoove-assignment.git 
  cd skoove-assignment 
  yarn install 
  npx pod-install
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
<img width="719" alt="Screen Shot 2022-09-05 at 02 45 13" src="https://user-images.githubusercontent.com/32056713/188338181-578065e1-0862-49f5-90ec-c273fd3498b9.png">


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

### Things to improve on 

- Due to time limitations e2e tests have not been implemented. 

- When we play a song, it continues to play even if we close the music player screen. However, we don't have any control to stop the music on the HomeScreen. This is obviously not desirable. Another thing to add would be extending the app functionality to control the music on HomeScreen.

- react-native-track-player supports background event listeners but the current implementation does not use it. Implementing these listeners would provide the users a better control over the music player.

- There are some unhandled rejections throwed from TrackPlayer. Displaying the alert banners would improve the user experience.

## Note
The implementation of the music player screen is a little different from the assignment's description. I preferred implementing play/pause/next/prev buttons. The main reason for it was that the images has play icon on itself. 
