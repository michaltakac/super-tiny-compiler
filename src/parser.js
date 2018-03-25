function parser (tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]

    if (token.type === 'number') {
      current++

      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }

    if (token.type === 'string') {
      current++

      return {
        type: 'StringLiteral',
        value: token.value
      }
    }

    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current]

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      }

      token = tokens[++current]

      while ((token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')) {
        const nextStep = walk()
        node.params.push(nextStep)
        token = tokens[current]
      }

      current++
      return node
    }

    throw new TypeError(token.type)
  }

  let ast = {
    type: 'Program',
    body: []
  }

  while (current <tokens.length) {
    const nextStep = walk()
    ast.body.push(nextStep)
  }

  return ast
}

module.exports = parser
