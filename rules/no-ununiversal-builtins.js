const identifiers = ['fs', 'Buffer', 'EventEmitter', 'ReadableStream', 'WritableStream', 'Readable', 'Writable', 'Duplex', 'Transform', 'FileReader']

function checkGlobal (context, node, name) {
  if (!identifiers.includes(name)) return null
  const { variables } = context.getScope()
  if (variables.find(({ name }) => identifiers.includes(name))) return null
  context.report({
    node,
    messageId: 'no-ununiversal-builtins',
    data: {
      identifier: name
    }
  })
}
module.exports = {
  meta: {
    type: 'problem',
    messages: {
      'no-ununiversal-builtins': '{{ identifier }} is not allowed.'
    },
    docs: {
      recommended: true
    }
  },
  create (context) {
    return {
      MemberExpression (node) {
        if (node.object?.type === 'Identifier') {
          checkGlobal(context, node, node.object.name)
        }
      },
      NewExpression (node) {
        checkGlobal(context, node, node.callee?.name)
      },
      ClassDeclaration (node) {
        checkGlobal(context, node, node.superClass?.name)
      }
    }
  }
}
