require('dotenv').config();
const { PINATA_API_KEY, PINATA_SECRET_KEY } = process.env;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');

const app = express();
const port = 5000;

const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);

// 👇️ configure CORS & bodyParser
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Require the upload middleware
const upload = require('./upload');
// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file.filename);
  res.json({ message: req.file.filename });
});

app.get('/file/:name', function (req, res) {
    console.log(`./uploads/${req.params.name}`);
    res.sendFile(`./uploads/${req.params.name}`, { root: __dirname });
});

app.post('/mint', (req, res) => {
  if (req.body) {
    let data = req.body;
  
    //1-Resmi IPFS'e gönder
    let uploadedFileCid = null;
    const readableStreamForFile = fs.createReadStream('./uploads/' + data["uploadedFile"]);

    let metadata = {}
    data["metadata"].map(array => metadata[array[0]] = array[1] );

    const options = {
      pinataMetadata: {
          name: data["name"],
          keyvalues: metadata
      },
      pinataOptions: {
          cidVersion: 0,
      }
    }

    pinata.pinFileToIPFS(readableStreamForFile, options)
    .then(result => {
        uploadedFileCid = result["IpfsHash"];

        ipfsUrl = "ipfs://" + uploadedFileCid;

        //2-Metadata dosyasını hazırla
        metadataFile = {
          "name": data["name"],
          "description": "There is no description",
          "url": ipfsUrl
        }

        const content = JSON.stringify(metadataFile);
        fs.writeFile('./uploads/' + data["uploadedFile"] + '.txt', content, err => {
          if (err) {
            console.error(err);
          }
        });

        //3-Metadata dosyasını IPFS'e gönder
        const readableStreamForMetadataFile = fs.createReadStream('./uploads/' + data["uploadedFile"] + '.txt');
        pinata.pinFileToIPFS(readableStreamForMetadataFile, options)
        .then(result => {
          let metadataIPFSUrl = "ipfs://" + result["IpfsHash"];
          res.send({"metadataIPFSUrl": metadataIPFSUrl});
        }).catch(err => {
          console.log(err);
        });  
        //4-metadata cid'sini döndür    
    }).catch(err => {
        console.log(err);
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
