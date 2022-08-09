const imports = ['fs', 'node:fs', 'buffer', 'node:buffer', 'events', 'node:events', 'stream', 'node:stream', 'readable-stream', 'http', 'node:http', 'https', 'node:https', 'request', 'axios', 'superagent', 'whatwg-url', 'url-search-params', 'querystring', 'node:querystring', 'url', 'node:url', 'string_decoder', 'inherits', 'p-cancelable', 'p-timeout', 'promise-cancelable']

module.exports = {
  meta: {
    type: 'problem',
    messages: {
      'no-import-ununiversal': '{{ import }} is not allowed.'
    },
    docs: {
      recommended: true
    }
  },
  create (context) {
    return {
      ImportDeclaration (node) {
        if (imports.includes(node.source?.value)) {
          context.report({
            node,
            messageId: 'no-import-ununiversal',
            data: {
              import: node.source.value
            }
          })
        }
      }
    }
  }
}
