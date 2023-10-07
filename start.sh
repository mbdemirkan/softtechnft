#!/bin/bash
touch ./api/.env
echo "*******************************************************"
echo Off-chain data stored on IPFS using Pinata Service.
echo For security reasons, service API keys are not included.
echo In order to use this application please enter your own
echo Pinata service API informations.
echo These information are saved on .env file in api folder.
echo "*******************************************************"
echo Please enter your Pinata API Key:
read varname
echo PINATA_API_KEY=$varname > ./api/.env
echo Please enter your Pinata API Secret:
read varname
echo PINATA_SECRET_KEY=$varname >> ./api/.env

npm i
npm start &
cd api
node backend.js &

