const { RuleTester } = require('eslint')
const noBuiltin = require('../rules/no-ununiversal-builtins.js')
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest'
  }
})
const identifiers = ['Buffer', 'EventEmitter', 'ReadableStream', 'WritableStream', 'Readable', 'Writable', 'Duplex', 'Transform', 'FileReader']

const valid = [{ code: 'const fs = "something"' }]
const invalid = [
  { code: 'const something = fs.method()', errors: [{ messageId: 'no-ununiversal-builtins' }] },
  { code: 'const chunk = Buffer.from(source)', errors: [{ messageId: 'no-ununiversal-builtins' }] },
  { code: 'const stream = Readable.from(source)', errors: [{ messageId: 'no-ununiversal-builtins' }] }
]
for (const identifier of identifiers) {
  valid.push(
    { code: `const ${identifier} = new ${identifier.toLowerCase()}` },
    { code: `class ${identifier} {}; const obj = new ${identifier}(); ${identifier}.method()` }
  )
  invalid.push(
    { code: `const obj = new ${identifier}()`, errors: [{ messageId: 'no-ununiversal-builtins' }] },
    { code: `class Ext extends ${identifier}{}`, errors: [{ messageId: 'no-ununiversal-builtins' }] }
  )
}

ruleTester.run('no-ununiversal-builtins', noBuiltin, {
  valid,
  invalid
})
