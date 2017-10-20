#!/bin/bash
export NODE_ENV=development
npm install --no-progress && npm run build:prod
