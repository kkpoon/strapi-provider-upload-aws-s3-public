# strapi-provider-upload-aws-s3-public

This file upload provider differ with official aws s3 provider in the following

- Upload to S3 with `public/` prefix. Allow to set origin `public/` via CloudFront
- Remove the config of AWS Access Key and Secret in plugin config
- Remove the config of region in plugin config
- AWSSDK default behavior to read environment variables or EC2 IAM role

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
