const { getRepoList, getTagList } = require('./http')
const ora = require('ora')
const inquirer = require('inquirer')
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo') // 从 Git 仓库下载模板文件。不支持 Promise
const chalk = require('chalk')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  }
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;

    // 改造 download-git-repo 支持 promise
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map(item => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    // 3）return 用户选择的名称
    return repo;
  }

  // 获取用户选择的版本
  // 1）基于 repo 结果，远程拉取对应的 tag 列表
  // 2）用户选择自己需要下载的 tag
  // 3）return 用户选择的 tag

  async getTag(repo) {
    // 1）基于 repo 结果，远程拉取对应的 tag 列表
    const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
    if (!tags) return;
    
    // 过滤我们需要的 tag 名称
    const tagsList = tags.map(item => item.name);

    // 2）用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: 'Place choose a tag to create project'
    })

    // 3）return 用户选择的 tag
    return tag
  }

  // 下载远程模板
  // 1）拼接下载地址
  // 2）调用下载方法
  async download(repo, tag){

    // 1）拼接下载地址
    // const requestUrl = `xadmin-cli/${repo}${tag?'#'+tag:''}`;
    let requestUrl;
    if(repo === 'Vue3 + TypeScript') {
      requestUrl = tag === 'Ant Design + Vite' ? 'vbenjs/vue-vben-admin#v3.0.0-alpha.1' : 'lin-xin/vue-manage-system#V5.0.0';
    }else if(repo === 'Vue2 + JavaScript') {
      requestUrl = 'PanJiaChen/vue-element-admin#4.4.0';
    }else if(repo === 'React18 + TypeScript') {
      requestUrl = tag === 'Ant Design + Vite + Zustand（simple）' ? 'bertilchan/template-admin-react-simple' :
        tag === 'Ant Design + Vite + Zustand' ? 'bertilchan/template-admin-react' : 'ant-design/ant-design-pro#v6.0.0-beta.1';
    }

    /**
     * v1.0.2参考的主流模板如下：
     * 1.Vue3+ts+antd
        https://github.com/vbenjs/vue-vben-admin

        2.Vue3+ts+element plus
        https://github.com/lin-xin/vue-manage-system

        3.Vue2+element ui
        https://github.com/PanJiaChen/vue-element-admin

        4.React18+ts+antd
        https://github.com/ant-design/ant-design-pro
     */

    /**
     * v1.1.0参考的主流模板如下：
     * 1.Vue3 + TypeScript + Vite + Ant Design
        https://github.com/vbenjs/vue-vben-admin

        2.Vue3 + TypeScript + Vite + Element Plus
        https://github.com/lin-xin/vue-manage-system

        3.Vue2 + JavaScript + Vue-Cli + Element UI
        https://github.com/PanJiaChen/vue-element-admin

        4.React18 + TypeScript + Vite + Antd + Zustand（simple）
        https://github.com/bertilchan/template-admin-react-simple

        5.React18 + TypeScript + Vite + Antd + Zustand
        https://github.com/bertilchan/template-admin-react

        6.React18 + TypeScript + Umi + Antd + Dva
        https://github.com/ant-design/ant-design-pro
     */

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create(){

    // 1）获取模板名称
    const repo = await this.getRepo()

    // 2) 获取 tag 名称
    const tag = await this.getTag(repo)

    // 3）下载模板到模板目录
    await this.download(repo, tag)

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('\r\n  npm install')
    console.log('  npm run dev\r\n')
  }
}

module.exports = Generator;