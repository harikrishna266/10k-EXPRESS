#!/bin/zsh

echo "re-building"
rm -rf build

npx tsc

echo "Copying env"
cp .env build/


cp package*.json build/

cd build

npm install
