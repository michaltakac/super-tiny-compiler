/**
 * Now let's move onto our last phase: The Code Generator.
 *
 * Our code generator is going to recursively call itself to print each node in
 * the tree into one giant string.
 */
function codeGenerator(node) {
  switch(node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    case 'ExpressionStatement':
      return (codeGenerator(node.expression) + ';')
    case 'CallExpression':
      return (codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(', ') + ')')
    case 'Identifier':
      return node.name
    case 'NumberLiteral':
      return node.value
    case 'StringLiteral':
      return '"' + node.value + '"'
    default:
      throw new TypeError(node.type)
  }
}

module.exports = codeGenerator
