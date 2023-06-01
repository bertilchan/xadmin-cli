# Xadmin-Cli

`xadmin-cli` 是一款适用于中后台系统开发时使用的快速生成admin模板的脚手架工具，即可直接使用该脚手架拉取相应技术栈的中后台优质主流模板。

参考的主流模板如下：

* [Vue3 + TypeScript + Ant Design](https://github.com/vbenjs/vue-vben-admin)
* [Vue3 + TypeScript + Element Plus](https://github.com/lin-xin/vue-manage-system)
* [Vue2 + Element UI](https://github.com/PanJiaChen/vue-element-admin)
* [React18 + TypeScript + Ant Design](https://github.com/ant-design/ant-design-pro)

## ✨ 特点

📦 选择多样化，即模板对应的技术栈种类丰富

⚡️ 快速便捷，通过命令交互生成相应的主流amdin模板，无需调研对比

🔌 可扩展性强，支持直接修改源码来自定义属于你的admin脚手架

## 本地调试

```shell
$ npm install

$ node ./bin/cli create testProject

```
## 安装

```shell
# install it globally
$ npm install -g xadmin-cli

# or yarn
$ yarn global add xadmin-cli
```

## 使用 

#### Quick Start 

```shell
$ xa create <name> [-f|--force]
```

#### Options

- `-f, --force`: Overwrite if the target exists