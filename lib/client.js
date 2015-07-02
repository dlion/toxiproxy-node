var proxy = require('./proxy'),
    request = require('request-json');

// NewClient creates a new client which provides the base of all communication
// with Toxiproxy.
// Endpoint is the address to the proxy (e.g. localhost:8474 if not overriden)
function NewClient (endpoint) {
  this.endpoint = "http://" + (endpoint || 'localhost:8474') + "/";
}

// Proxies returns an object with all the proxies and their toxics.
NewClient.prototype.Proxies = function (cb) {
  request.createClient(this.endpoint)
  .get('proxies', function (err, res, body) {
    return (!err && res.statusCode === 200) ? cb(null, body) : cb(err || res.statusCode, "Proxies");
  });
};

// Proxy returns a proxy by name.
NewClient.prototype.Proxy = function (name, cb) {
  request.createClient(this.endpoint)
  .get("proxies/" + name, function (err, res, body) {
    return (!err && res.statusCode === 200) ? cb(null, body) : cb(err || res.statusCode, "Proxy");
  });
};

// ResetState resets the state of all proxies and toxics in Toxiproxy.
NewClient.prototype.ResetState = function (cb) {
  request.createClient(this.endpoint)
  .get("reset", function (err, res, body) {
    return (!err && res.statusCode === 204) ? cb(null, body) : cb(err || res.statusCode, "ResetState");
  });
};

// NewProxy instantiates a new proxy instance.
// Note Create() must be called on it to create it.
// The Enabled field must be set to true, otherwise the Proxy
// will not be enabled when created.
NewClient.prototype.NewProxy = function (obj) {
  return (new proxy(obj, this));
};

module.exports = NewClient;
