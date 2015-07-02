# toxiproxy-node

[Toxiproxy](https://github.com/shopify/toxiproxy) Node Client

## Install
`npm install toxiproxy-node`

## Usage Example
```js
var toxiproxy = require('toxiproxy-node');

//New Client
var client = new toxiproxy('localhost:8474');

//New Proxy
var redis = client.NewProxy({
  name: 'Redis',
  listen: '127.0.0.1:26375',
  upstream: '127.0.0.1:6375'
});

//Create redis Proxy
redis.Create(function(err, body) {
  if(!err) {
    //Set Latency
    redis.SetToxic('latency', 'downstream', {
      enabled: true,
      latency: 1000
    }, function(err, body) {
      //Show Redis downstream info
      proxy.Toxics('downstream', function(err, body) {
        if(!err) {
          console.log(body);
          //Delete Redis Proxy
          proxy.Delete(function(){});
        }
      });
    });
  }
});
```

## Author
* Domenico Luciani
* http://dlion.it
* domenicoleoneluciani@gmail.com

# License
MIT 2015 Domenico Luciani domenicoleoneluciani@gmail.com

