---
sidebar_position: 1
---

# Setup
Clone Kalend repo

    git clone git@github.com:nibdo/kalend.git

Install packages

    npm i

## Usage

Either connect to your app or setup example app from this repo

## Building Kalend
After changing code build package 

    npm run build

To access locally build package, you have to link it. Navigate to dist folder and run

    npm link kalend

## Setup in your app
You might have to adjust your app and link react from kalend node_modules if you see errors in your app

Run from root of your app folder

    npm link YOUR_PATH/kalend/node_modules/react
    npm link YOUR_PATH/kalend/node_modules/react-dom
    npm link kalend

## Updating Kalend

After each change in Kalend, you will have to rebuild package.
