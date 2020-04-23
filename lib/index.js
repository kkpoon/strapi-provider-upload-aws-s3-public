'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Public node modules.
const AWS = require('aws-sdk');

module.exports = {
  provider: 'aws-s3-public',
  name: 'AWS S3 as public folder',
  auth: {
    bucket: {
      label: 'Bucket',
      type: 'text'
    }
  },
  init: (config) => {
    const S3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: config.bucket
      }
    });

    return {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.upload({
            Key: `public/${path}${file.hash}${file.ext}`,
            Body: new Buffer(file.buffer, 'binary'),
            ContentType: file.mime,
            ACL: 'public-read'            
          }, (err, data) => {
            if (err) {
              return reject(err);
            }
             // set the bucket file url
            file.url = data.Location;
            
            resolve();
          });
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.deleteObject({
            Key: `public/${path}${file.hash}${file.ext}`
          }, (err, data) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      }
    };
  }
};
