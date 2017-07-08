proxy-rc
==========

## What is it ?

Proxy-rc is a simple rest client that use Proxy for dynamic method generation.

## Installation

npm
```
    npm install proxy-rc --save
```
## Including package in your project

There are two ways to include js-form-validator in your project:

- You can include rc-proxy in your page. After this you get access to "createRCBuilder" function:
```HTML
    <script src="node_modules/rc-proxy/proxy-rest-client.min.js"></script>
```

- You can include rc-proxy like module in your project:
```javascript
    import createRCBuilder from 'rc-proxy';
```
or
```javascript
    var createRCBuilder = require('rc-proxy');
```
if you use es5 syntax

## Usage

1. create rest client builder:

``` js
 const rcBuilder = createRCBuilder();
``` 

2. set config to your builder and "build" rest client:

``` js
const rc = rcBuilder.baseUrl('www.test.com')
                    .suffix('json')
                    .on('request', (req) => req.headers.auth = 'yourToken')
                    .build();
```

3. user rest client for requesting :)

``` js
    /* GET request to www.test.com/users */
    rc.users().get().then((res) => /* your res handler */)
    
    /* create new project for user with id = 1 (POST request) */
    rc.users(1)
      .projects()
      .post({/* your project */})
      .then((res) => /* your res handler */)
    
    /* creating cashed object for user/1/projects requests */
    const firstUserProjects = rc.users(1).projects();
    
    /* now we can user cached object for requests*/
    /* GET request for /users/1/projects with params and custom header */
    firstUserProjects
        .get({ param1: 'param1' }, { headers: { someHeader: '123' } })
        
    /* also we can add unique request handler for request */
    firstUserProjects.post({/* your data */}, {
        handlers: { response: (res) => /* some res handler */ }
    })
```
