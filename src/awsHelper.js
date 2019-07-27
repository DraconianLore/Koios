import { RNS3 } from 'react-native-aws3';

import { S3_ACCESS } from 'react-native-dotenv';
import { S3_SECRET } from 'react-native-dotenv';



export default function uploadImage(image, cb) {

    // let uniqid = require('uniqid');
    const file = {
        // possibly change this prior to sending image in... depending on if showing doesnt work on ios
        uri: image,
        name: `image.png`,
        type: "image/png"
    }

    const options = {
        keyPrefix: "images/",
        bucket: "koiospics",
        region: "us-west-2",
        awsUrl: 's3.us-east-2.amazonaws.com',
        accessKey: S3_ACCESS,
        secretKey: S3_SECRET,
        successActionStatus: 201
    }

    console.log('###########################')
    RNS3.put(file, options).then(response => {
        if (response.status !== 201) throw new Error("Failed to upload image to S3")
        console.log('#####################', response.body);
        cb(response.body.postResponse.location) // Double check this is right
    });

}

