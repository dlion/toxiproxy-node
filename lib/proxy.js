var request = require('request-json');

//Proxy
function NewProxy (obj, scope) {
  this.name = obj.name || "smagen";
  this.listen = obj.listen || "127.0.0.1:26379";
  this.upstream = obj.upstream || "127.0.0.1:6379";
  this.enabled = obj.enabled || true;
  this.upstream_toxics = obj.upstream_toxics || {};
  this.downstream_toxics = obj.downstream_toxics || {};
  this.client = scope;
}

// Create creates a new proxy.
NewProxy.prototype.Create = function (cb) {
  request.createClient(this.client.endpoint)
  .post('proxies', {
    name: this.name,
    listen: this.listen,
    upstream: this.upstream
  }, function (err, res, body) {
    return (!err && res.statusCode === 201) ? cb(null, body) : cb(err || res.statusCode,  body);
  });
};

// Save saves changes to a proxy such as its enabled status.
NewProxy.prototype.Save = function (cb) {
  request.createClient(this.client.endpoint)
  .post("proxies/" + this.name, {
    name : this.name,
    listen: this.listen,
    upstream: this.upstream,
    enabled: this.enabled,
    upstream_toxics: this.upstream_toxics,
    downstream_toxics: this.downstream_toxics
  }, function (err, res, body) {
    return (!err && res.statusCode === 200) ? cb(null, body) : cb(err || res.statusCode, "Save");
  });
};

// Delete a proxy which will cause it to stop listening and delete all
// information associated with it.
// If you just wish to stop and later enable a proxy, set the `Enabled` field to
// `false` and call `Save()`.
NewProxy.prototype.Delete = function (cb) {
  request.createClient(this.client.endpoint)
  .del("proxies/" + this.name, function (err, res, body) {
    return (!err && res.statusCode === 204) ? cb(null, body) : cb(err || res.statusCode, "Delete");
  });
};

// Toxics returns an object of all the toxics and their attributes for a direction.
NewProxy.prototype.Toxics = function (direction, cb) {
  request.createClient(this.client.endpoint)
  .get("proxies/" + this.name + "/" + direction + "/toxics",function (err, res, body) {
    return (!err && res.statusCode === 200) ? cb(null, body) : cb(err || res.statusCode, "Toxics");
  });
};

// SetToxic sets the parameters for a toxic with a given name in the direction.
// See https://github.com/Shopify/toxiproxy#toxics for a list of all Toxics.
NewProxy.prototype.SetToxic = function (name, direction, obj, cb) {
  request.createClient(this.client.endpoint)
  .post("proxies/" + this.name + "/" + direction + "/toxics/" + name, obj, function (err, res, body) {
    return (!err && res.statusCode === 200) ? cb(null, body) : cb(err || res.statusCode, "SetToxic");
  });
};

module.exports = NewProxy;
