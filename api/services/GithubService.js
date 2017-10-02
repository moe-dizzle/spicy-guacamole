'use strict'

const Service = require('trails/service')

const _ = require('lodash')

const github = require('../../lib/index').GithubClient

/**
 * @module GithubService
 * @description get Github data
 */

module.exports = class GithubService extends Service {
  async getAllRepoIssues(owner, repo) {
    github.authenticate({
      type: 'oauth',
      key: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET
    })
    let issues = []
    let res = await github.issues.getForRepo({
      owner,
      repo,
      state: 'all',
      per_page: 100
    })
    issues.push(...res.data)
    /*while (github.hasNextPage(res)) {
      res = await github.getNextPage(res)
      issues.push(...res.data)
    }*/

    if (issues) {
      issues = issues.map(function(i) {
        return {
          id: i.id,
          number: i.number,
          title: i.title,
          body: i.body,
          labels: i.labels
        }
      })
    }

    return issues
  }
}
