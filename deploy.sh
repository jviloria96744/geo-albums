#!/bin/bash
npm run build
aws s3 rm s3://geoalbums.com --recursive
aws s3 cp ./build s3://geoalbums.com --recursive