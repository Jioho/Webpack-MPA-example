# Webpack-MPA-example

## 前言

本例子使用的是webpack `3.10.0`，由于webpack配置文件的写法版本各异，clone前请注意版本。



相比于很多的实例，本实例具有一下优点：

1. express和webpack相结合，实现源文件的热更新，前端开发流程更加流畅
2. 虽然文件结构相对复杂，但它反映生产的实际情况，使用者clone后即可投入生产
3. 支持html、css、js的模块化管理，而实例中包含相关代码，容易理解
4. 支持express的路由功能以及API，完美模拟浏览器访问
5. 适合中小型项目的开发




博客：http://www.vinsongeek.com/2018/01/19/webpack%E5%92%8Cexpress%E5%BC%80%E5%8F%91%E9%83%A8%E7%BD%B2/#1-express




## 开始

1. clone这个仓库
2. 安装依赖

```
$ npm install
$ npm install supervisor -g
```

3. 尝试一下代码

```
$ cnpm start // 开发时修改源文件即可实现热更新
$ cnpm build // 直接输出打包文件，以确认正确的输出路径
$ cnpm production // 以生产配置输出文件，并开启服务
```



## preface

This example USES webpack `3.10.0`, and because the webpack configuration file is written in different ways, please note the version before clone.



Compared with many instances, this example has the advantages:

1. Express and webpack combine to realize the hot update of source files, and the front-end development process is smoother.
2. Although the file structure is relatively complex, it reflects the actual situation of production, and users can put it into production after clone.
3. Support for modularity management of HTML, CSS, and js, while examples contain code that is easy to understand.
4. Support express for routing functions and apis, perfect for browser access.
5. Suitable for small and medium sized project development.




blog：http://www.vinsongeek.com/2018/01/19/webpack%E5%92%8Cexpress%E5%BC%80%E5%8F%91%E9%83%A8%E7%BD%B2/#1-express




## start

1. Clone this repo.
2. Install dependencies.

```
$ npm install
$ npm install supervisor -g
```

3. try this out.

```
$ cnpm start // to develop with full live reload.
$ cnpm build // Directly output the package file to confirm the correct output path.
$ cnpm production // Output files with production configuration and open service.
```

