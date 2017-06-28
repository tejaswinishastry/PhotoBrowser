________________________
PhotoBrowser App
________________________

___________
What is it?
___________

PhotoBrowser is a simple Photo Album App with content from [Flickr Public API](https://www.flickr.com/services/api/)

You can : 

* View latest public photos from Flickr (safe content enforced by Flickr by default for public photos)  

* Select a photo or photos from the list & create a new Album

* Add photos to an existing Album

* Search for photos by location/tag and add them to an album(for the purposes of this prototype, it does a text search)

___________________________
What was used to create it?
____________________________

# React + Redux + Dexie

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

*NOTE: This app uses a beta version of Dexie*

The [redux-thunk](https://github.com/gaearon/redux-thunk) middleware is used to handle the async calls of Dexie.

# React-bootstrap + React-masonry for UI


____________
Installation
____________

## Install dependencies

Before you can run the app in your browser, you will have to install its dependencies with:

```
npm install
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000`. The app will automatically reload if you change any of the source files. You will also see any lint errors in the console.

## Tests

Run `npm test` to run tests.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

## Further help

* [Create React App User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
* [Redux](http://redux.js.org/)
* [react-redux](https://github.com/reactjs/react-redux)
* To get more help on Dexie check out the [Dexie Wiki](https://github.com/dfahlander/Dexie.js/wiki)

_____________________
What can be improved?
_____________________

## Existing feature improvement

* Improve loading rendering lifecycle: show progress while loading, cache already loaded images etc 

* Use a standard design language like Material design, Ant design language or Fluent design language etc. for a more cohesive look and feel across the app

* Refactoring / Modularizing the code to have more streamlined action creators and reducers. 

* Additional testing for state-functions, components & snapshots.

## Additional features

* Addition of a login module for user authentication.

* User uploads and syncing of local photos with the app.

* Archiving of photos as the size grows.

* Support for picking locations using a geocoding API such as Google's geocoding API - https://developers.google.com/maps/documentation/geocoding/intro

* If backend with text search could be switched out to a more powerful search(using NLP) with an AI assistant for better UX.

* Archiving suggestions of least used pictures by an assistant to de-clutter UI.

* AI to help with grouping of pictures taken in a particular location & auto-tagging. 

* An assistant could auto-create albums from a large set of similar photos or create GIFs from bursts of photos.

* Facial recognition of people in the photos to allow user to tag albums & share.

...
