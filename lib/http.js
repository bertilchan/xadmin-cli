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
    { name: 'Vue2' },
    { name: 'React18' },
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
      { name: 'Element Plus' },
      { name: 'Ant Design' },
    ]
  }else if(repo === 'Vue2') {
    list = [
      { name: 'Element' },
    ]
  }else {
    list = [
      { name: 'Ant Design' },
    ]
  }
  return list;
  // return axios.get(`https://api.github.com/repos/xadmin-cli/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}