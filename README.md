# UTS Curriculum Visualiser
A curriculum visualiser built for UTS Engineering Capstone.

Try it here -> [UTS Curriculum Visualiser](https://utscv.onrender.com/)

## How to Run Locally
Create a `.env` file in the root folder and add MongoDB Atlas URI and Server Port.
```
ATLAS_URI=
PORT=4000
```

Create another `.env` file in the client folder and add the Server URL.
```
REACT_APP_BASE_URL=http://localhost:4000
```

Start the server:
```
cd server
npm i
npm start
```

Start the client:
```
cd client
npm i
npm start
```