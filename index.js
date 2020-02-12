const utils = require('./utils/utils')
const fetch = require('node-fetch')
const inquirer = require('inquirer')

const args = process.argv.slice(2)
const params = Object.assign({}, args)
utils.renameKey(params, 0, 'token')
const url = 'https://api.github.com/user/repos'

inquirer
  .prompt([
    { name: 'user',
      message: 'Please enter your username'
    } ,
    {
      name: 'name',
      message: 'enter repo name'
    }
  ])
  .then(answers => {
    
    const body = {
      name: answers.name,
      homepage: `https://github.com/${answers.user}`,
      auto_init: true
    }

    createRepo(url, body)
  });

const createRepo = async (url, body) => {
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
    console.log(error)
  }
}

