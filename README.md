# Client library for [TheCatAPI](https://thecatapi.com)

**Contents**

- [Client library for TheCatAPI](#client-library-for-thecatapihttpsthecatapicom)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Documentation](#documentation)
  - [Usage](#usage)
    - [Example: Fetching random images](#example-fetching-random-images)
    - [Handling Errors](#handling-errors)
    - [Typescript](#typescript)
    - [📙 Further Reading](#-further-reading)

Public API service, all about cats (or dogs), free to use when making your fancy new app, website or service

## Installation

This library is published on [npm](https://www.npmjs.com/package/@thatapicompany/thecatapi), you can add it as a dependency using the following
command

```bash
npm install @thatapicompany/thecatapi
# or
yarn add @thatapicompany/thecatapi
```

## Configuration

You'll need to configure the library with your `API key`, you can grab it from [TheCatAPI](https://thecatapi.com/).

### Imports

#### CommonJS

```javascript
const { TheCatAPI } = require("@thatapicompany/thecatapi");
```

#### ES Modules

```typescript
import { TheCatAPI } from "@thatapicompany/thecatapi";
```

initialize the client using your access key:

```javascript
const theCatAPI = new TheCatAPI("YOUR_API_KEY");
```

You can also provide a custom hook (useful if you want use the library with [TheDogAPI](https://thedogapi.com/)):

```javascript
const theCatAPI = new TheCatAPI("YOUR_API_KEY", {
  host: "https://api.thedogapi.com/v1",
});
```

## Documentation

The library documentation can be found in [docs](docs)

## Examples

More code samples can be found in [examples](examples)

## Usage

After initiating the client, you can access endpoint methods using the following pattern:
`[object instance].[endpoint].[method]`

For example, getting 5 random images would be: `theCatAPI.images.searchImages({ limit: 5 });`,

| endpoint    | attribute  | example                                                  |
| ----------- | ---------- | -------------------------------------------------------- |
| /images     | images     | `client.images.searchImages({ limit: 12 })`              |
| /favourites | favourites | `client.favourites.addFavourite('IMAGE_ID')`             |
| /votes      | votes      | `client.votes.addVote({ imageId: "IMAGE_ID", value: 1})` |

For details on each endpoint accepted values, please reference these docs: [docs.thecatapi.com](https://docs.thecatapi.com)

All methods return a promise containing the returned JSON as a javascript object. Each method of an endpoint maps HTTP methods to

| HTTP Method | method name      | example                               |
| ----------- | ---------------- | ------------------------------------- |
| POST        | add\* / upload\* | `client.images.uploadImage(image)`    |
| GET         | get\*            | `client.images.getImages()`           |
| DELETE      | delete\*         | `client.images.deleteImage("MY_KEY")` |

#### Example: Fetching random images

We will fetch six random images, by default the API returns only 1 image, unless we specify the `limit` option, to fetch six images we have
to pass `{ limit: 6 }` as an option when calling `searchImages`

```javascript
theCatAPI.images
  .searchImages({
    limit: 6,
  })
  .then((images) => {
    console.log(images);
  })
  .catch((error) => {
    // handle error
  });
```

**Using async/await**

```javascript
try {
  const images = await theCatAPI.images.searchImages({
    limit: 6,
  });
  console.log(images);
} catch (error) {
  // handle error
}
```

#### Example: Fetching random images of a specific bread

```js
try {
  const images = await theCatAPI.images.searchImages({
    limit: 10,
    breeds: [Breed.CHARTREUX],
  });
  console.log(images);
} catch (error) {
  // handle error
}
```

### Handling Errors

[comment]: <> (All methods that return a promise throw 3 types of errors)

##### ApiRequestError

Thrown when there's a network or a connectivity issue, for example, if the client didn't establish any network connection with the host

```
ApiRequestError: getaddrinfo EAI_AGAIN api.thecatapi.com
```

##### ApiResponseError

Thrown when the server responds with an HTTP status code not in the `2xx` range. `ApiRequestError` provides two properties to distinguish the type of the error

- `statusCode` HTTP status code
- `data` the message the server responded with in the body

This is the most common thrown error, you should expect and handle it each time you use any of the library methods

##### Example: Fetching an image throws ApiResponseError if the image doesn't exist

If we try to fetch an image that doesn't exist

```javascript
const image = await theCatAPI.images.getImage("BAD_IMAGE_ID");
```

`ApiResponseError` will be thrown

```
ApiResponseError: ApiResponseError (400)
    at ...
    at ...
    at ...
  statusCode: 400,
  data: "Couldn't find an image matching the passed 'id' of BAD_IMAGE_ID"
```

The server returns a 400 error with the string `"Couldn't find an image matching the passed 'id' of BAD_IMAGE_ID"` in its body.
You can access these properties using `error.statusCode` and `error.data` respectively

```javascript
try {
  const image = await theCatAPI.images.getImage("BAD_IMAGE_ID");
} catch (error) {
  if (error instanceof ApiResponseError) {
    console.log(error.statusCode); // 400
    console.log(error.data); // Couldn't find an image matching the passed 'id' of BAD_IMAGE_ID
  }
}
```

##### Error

Unknown error, just a normal javascript error

#### Handling Errors the Right Way

Since all the possible thrown errors are instances of classes, we can check the type of the thrown error and handle it accordingly

```javascript
try {
  const image = await theCatAPI.images.getImage("BAD_IMAGE_ID");
} catch (error) {
  if (error instanceof ApiResponseError) {
    // handle response error
  }
  if (error instanceof ApiRequestError) {
    // handle network error
  }
  // handle unknown error
  throw error;
}
```

### Typescript

This library is written in [Typescript](https://www.typescriptlang.org/), types are provided out of the box and
can be imported from `@thatapicompany/thecatapi/dist/types`

Example of usage with Typescript:

```typescript
import { TheCatAPI } from "@thatapicompany/thecatapi";
import { Image } from "@thatapicompany/thecatapi/dist/types";

const theCatAPI = new TheCatAPI("YOUR_API_KEY");

async function getImageUrls(): Promise<string[]> {
  const images: Image[] = await theCatAPI.images.searchImages({ limit: 10 });
  return images.map((image) => image.url);
}
```

### 📙 Further Reading

- Get your API key [https://thecatapi.com](https://thecatapi.com)
- Read our [API docs](https://docs.thecatapi.com)
- Meet the team behind The Cat API - [That API Company](https://thatapicompany.com/)
