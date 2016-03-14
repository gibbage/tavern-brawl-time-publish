var AWS = require('aws-sdk');
var Promise = require('promise');

function fetchJson(bucketName, key) {
  var promise = new Promise(function (resolve, reject) {
    var s3 = new AWS.S3({apiVersion: '2006-03-01'});
    s3.getObject({
        Bucket: bucketName,
        Key: key
    }, function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(data.Body.toString('utf8')));
        }
    });
  });
  return promise;
}

module.exports = fetchJson;
