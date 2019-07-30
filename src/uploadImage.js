
import { BASE_URL } from 'react-native-dotenv'
import axios from 'axios';

export default async function uploadImage(image, user, cb) {

    let URL = `${BASE_URL}:3000/users/${user}/missions/verify`;
 

    let uriParts = image.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
        uri: image,
        name: `photo-${user}.${fileType}`,
        type: `image/${fileType}`,
    });
    axios.put(URL, formData, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        }
    })
        .then((response) => {
            cb(response)
        }).catch((error) => {
            console.log('An error occurred:', error)
        });
}
