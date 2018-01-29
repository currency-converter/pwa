#!/bin/bash

export PATH=/usr/local/n/versions/node/6.2.1/bin:$PATH

if [ ! -n "$1" ] ;then
  echo 参数错误
  echo usage: build.sh target_name
else
  yarn
  echo target_name: $1
  yarn build:$1
  mv prd/templates templates
fi
