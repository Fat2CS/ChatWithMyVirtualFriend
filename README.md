# ChatWithMyVirtualFriend

# Friend in My Pocket - ChatApp OpenAi & firebase

<p align="center">
  <img src="https://i.ibb.co/8rRfkVC/image.png" alt="ChatWithMyVirtualFriend">
</p>


<p align="center">
<a href="https://ibb.co/9HcDjq1"><img src="https://i.ibb.co/RTYFWCs/mokup.png" alt="mokup" border="0"></a> </p>

Hello, this small mobile application allows you to chat with a virtual friend, benevolent and sympathetic he will give you advice and comfort you! 

how to clone , https://github.com/Fat2CS/ChatWithMyVirtualFriend

cd into the just created project and install dependencies with yarn

cd ChatApp && yarn
Add OpenAi API apiKey

Add your firebase backend config in the firebase.js file

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL
};

Run the project


yarn start 



## API openAi and Firebase 

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Tech Stack

**Client:** React Native

**Server:** Node, Express


<p align="center">
  <img src=["https://ibb.co/9HcDjq1/image.png" alt="mokup">
</p>
