const { RuleTester } = require('eslint')
const noImports = require('../rules/no-import-ununiversal.js')
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
})
const imports = ['fs', 'node:fs', 'buffer', 'node:buffer', 'events', 'node:events', 'stream', 'node:stream', 'readable-stream', 'http', 'node:http', 'https', 'node:https', 'request', 'axios', 'superagent', 'whatwg-url', 'url-search-params', 'querystring', 'node:querystring', 'url', 'node:url', 'string_decoder', 'inherits', 'p-cancelable', 'p-timeout', 'promise-cancelable']

const invalid = []
for (const imp of imports) {
  invalid.push({ code: `import * as imp from '${imp}'`, errors: [{ messageId: 'no-import-ununiversal' }] })
}

ruleTester.run('no-import-ununiversal', noImports, {
  invalid,
  valid: [{ code: "import fetch from 'node-fetch'" }]
})
