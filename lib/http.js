// 通过 axios 获取结果
const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data;
})


/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  let obj = [
    { name: 'Vue3 + TypeScript' },
    { name: 'Vue2 + JavaScript' },
    { name: 'React18 + TypeScript' },
  ]
  return obj;
  // return axios.get('https://api.github.com/orgs/xadmin-cli/repos')
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo) {
  let list = [];
  if(repo === 'Vue3 + TypeScript') {
    list = [
      { name: 'Ant Design + Vite' },
      { name: 'Element Plus + Vite' },
    ]
  }else if(repo === 'Vue2 + JavaScript') {
    list = [
      { name: 'Element UI + Vue-Cli' },
    ]
  }else if(repo === 'React18 + TypeScript'){
    list = [
      { name: 'Ant Design + Vite + Zustand（simple）' },
      { name: 'Ant Design + Vite + Zustand' },
      { name: 'Ant Design + Umi + Dva' },
    ]
  }
  return list;
  // return axios.get(`https://api.github.com/repos/xadmin-cli/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}