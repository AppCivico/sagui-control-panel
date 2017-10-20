#!/bin/bash
export NODE_ENV=production
npm install --no-progress && npm run build:prod
