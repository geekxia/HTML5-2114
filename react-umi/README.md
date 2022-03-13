# 环境搭建

```
cnpm i yarn tyarn -g
后面文档里的 yarn 换成 tyarn
tyarn -v

mkdir react-umi
cd react-umi
yarn create @umijs/umi-app

cnpm i
npm start
```

# 如何学习umi？

- umi是基于配置的，它背后默认安装了很多umi插件（@umijs/*）
- umi路由有两种（约定式路由、配置式路由）配置式路由更常用。
- umi背后状态管理用是dva(redux、redux-saga、immer)非常简单。
- umi默认就支持TS、antd组件、Hooks编程都有非常好的支持。
- umi背后还有很多好用的功能：国际化。

# 关于TS

- TS知识：类型（TS项目中常用）、面向对象（用不到）
- 编辑器：为了更好地写TS项目，建议使用 VScode（因为VScode对TS有非常友好的支持）
- 说明一个TS环境：如果代码中有TS类型错误，你启动项目会报错；如果你的项目已经启动了，代码中再出现TS类型错误，这不会导致项目死掉。
- tsconfig.json 是TS指定的配置文件，里面的配置选项上百个（非常多），如果你要修改TS配置，务必百度查资料搞明白这个配置有什么用。
- TS项目中有很多 .d.ts 这种文件，这都是TS声明文件，只要丢在项目目录中，无论任何位置都有效的。这些声明文件，用于声明一些全局模块或类型的。
- 常用的TS类型：String、Number、Boolean、Array、Object、any、void。。。。
- 在TS中，还可以使用 interface 这个关键字定义新的类型。
- 在TS中，使用 type 这个关键字，可以指定类型的别名（alias）。
- 在TS中，大家要能够识别泛型， Array<Number> 这种数组中只能放Number元素。
- 最后一根救命稻草：any script，实在去不掉那根红色波浪线，any值得拥有。

- TS学习笔记：https://zhuanlan.zhihu.com/p/377754481
- TS(v3)中文文档：https://www.tslang.cn/docs/home.html
