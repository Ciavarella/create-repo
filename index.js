const utils = require('./utils/utils')
const fetch = require('node-fetch')

const args = process.argv.slice(2)
const params = Object.assign({}, args)
utils.renameKey(params, 0, 'token')
utils.renameKey(params, 1, 'user')
utils.renameKey(params, 2, 'name')


const url = 'https://api.github.com/user/repos'

const body = {
  name: params.name,
  auto_init: true,
  homepage: `https://github.com/${params.user}`
}

const createRepo = async url => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `token ${params.token}`,
      },
      body: JSON.stringify(body)
    });
    const res = await response.json();
    console.log('Set your remote upstream with SSH')
    console.log('Copy following line:')
    console.log(`git remote add origin ${res.ssh_url}`)
  } catch (error) {
    console.log(error);
  }
}

createRepo(url)
