#!/bin/bash

export PATH=/usr/local/n/versions/node/6.2.1/bin:$PATH

help()
{
  echo "\nUsage: build.sh type"
  echo "Packing前端工程的编译命令"
  echo "type参数:"
  echo "  dev\t开发环境"
  echo "  beta\t测试环境"
  echo "  prod\t线上环境"
}

if [ ! -n "$1" ]; then
  echo "[build.sh][Error]缺少参数type"
  help
elif [[ "dev" != "$1" && "beta" != "$1" && "prod" != "$1" ]]; then
  echo "[build.sh][Error]参数type错误"
  help
else
  echo type: $1

  # 选择 node 编译类型时，jenkins 会自动安装依赖
  # 为了确保依赖包成功安装，此处再检查一下 packing 依赖包是否安装
  if [ ! -d node_modules/packing ]; then
    npm install --production --registry https://registry.npm.taobao.org
  fi

  # 开始编译工程
  npm run build:$1

  # 调整编译产物的目录结构
  rm -rf assets
  mv prd/assets assets
  mkdir prd/assets/nocache
  mv prd/assets/index.html prd/assets/sw.js prd/assets/nocache
fi
