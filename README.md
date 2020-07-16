# GeoAlbums

This is the repo behind the [GeoAlbums](https://d2cndobv2blzcj.cloudfront.net/) web application.

This application is meant to view your photos by location (GPS Coordinates) and provide filters based on the content of the photos (Amazon Rekognition).

Upon load, there are references to pre-loaded images that the user can interact with to get an idea behind application functionality.

When making an account, account data is stored in Amazon DynamoDB and any images that are uploaded are stored in an Amazon S3 bucket. All image processing is done using AWS Lambda ([functions](https://github.com/jviloria96744/geo-albums-poc-lambda-functions)) through an Amazon API Gateway Endpoint. Everything sits behind two Amazon CloudFront distributions; one for the static site, one for the images. I haven't purchased a custom domain to use in front of the CloudFront distributions simply because I am not yet set on the name of the application.

## Example Activity

![Gif-Goes-Here](https://s3-us-west-2.amazonaws.com/assets.jayviloria.com/geoalbums-app-activity-resized.gif)

## Next-Ups

These are the following enhancements I want to make, in no particular order:

- **Alerts/Dialogs**: More helper messages/dialog boxes for the user, especially in regards to creating/deleting an account and uploading/filtering photos

- **Interactive Map Functionality**: More functionality and customization with regards to components on the map, e.g. custom map markers.

- **3rd party identification**: I want to enable Federated Identities for account creation.

- **Direct Photo Upload to S3 Through AWS SDK**: This is related to the previous point. I originally intended for all traffic between the client and "server"/back-end to be through API Gateway. Unfortunately, API Gateway only allows a max payload of 6MB to AWS Lambda. This restricts uploads on many images. A way around this is to upload directly to S3 using the AWS SDK. Using the 3rd party identification allows for simple token generation for temporary access.

- **Mobile Platform/Responsiveness**: Currently, the site is not responsive and needs some mobile specific styling. In fact the UI in general is very much in a work-in-progress state. I want to do two things; (1) make a simple version that can be viewed on the browser of a mobile device, (2) Mobile App that offers slightly different functionality, e.g. camera integration

- **Public Account Access**: By offering account creation functionality, I would like to add the ability to make the user's map/profile public (with added granularity of controls) to other accounts of the user's choosing.

- **CI/CD**: I would like to use a combination of CloudFormation/SAM/GitHub Actions to make this reproducible and build a good CI/CD Pipeline for future development
