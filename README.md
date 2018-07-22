# 准备工作
```
1. 代码和运行是jdk1.8，所以没有的就要去下载了
2. 下载gradle http://gradle.org/gradle-download/
3. 配置环境变量，类似 mvn 的一样
```
# 工程导入 eclipse
```
1. cd design
2. gradle eclipse
3. 执行到这里就已经生成了 .project .classpath .settings，在eclipse导入即可
```
# 工程导入 idea
```
在 idea 中 import... 弹出框中选中 build.gradle 就可以了
```
# 本地开发

## 开发步骤
```
1. 在eclipse、idea、vim 里面修改文件
2. cd design
3. gradle jettyRun
4. 浏览器 -> http://127.0.0.1:8080/
5. 回到步骤1
```
## 调试
```
1. 这么运行: gradle jettyRunDebug
2. 在 eclipse、idea 里面远程调试就可以了，默认端口：8000
3. 修改java文件：不修改方法名称不需要重启
4. 修改静态文件：实时生效
```

## nodejs 安装
```
wget https://nodejs.org/dist/v8.11.1/node-v8.11.1-win-x64.zip && export NODE_HOME
```

## 设置仓库和代理
```
npm config delete proxy && npm config delete http-proxy && npm config delete https-proxy && npm config delete strict-ssl && npm config delete registry
npm config set registry http://registry.npm.taobao.org
npm config set strict-ssl false
export HTTP_PROXY=""
export HTTPS_PROXY=""
export NO_PROXY=""
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

## 开发工具
```
建议使用 vscode
```

# www
## 初始化项目(不需要执行)
```
npm install autoprefixer babel-cli babel-core babel-loader babel-plugin-rewire babel-plugin-transform-class-properties babel-plugin-transform-decorators-legacy babel-plugin-transform-runtime babel-polyfill babel-preset-env babel-preset-flow babel-preset-react babel-preset-stage-0 babel-runtime consolidate copy-webpack-plugin cross-env css-loader extract-text-webpack-plugin file-loader html-loader json-loader lodash node-sass postcss-loader react-hot-loader sass-loader style-loader template-html-loader webpack webpack-cli webpack-dev-server --save-dev
npm install antd bootstrap react react-dom react-router react-router-dom jquery --save
```