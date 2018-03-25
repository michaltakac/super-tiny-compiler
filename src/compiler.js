const tokenizer = require('./tokenizer')
const parser = require('./parser')
const transformer = require('./transformer')
const codeGenerator = require('./code-generator')

/**
 * We'll create our `compiler` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */
function compiler(input) {
  let tokens = tokenizer(input)
  let ast = parser(tokens)
  let newAst = transformer(ast)
  let output = codeGenerator(newAst)

  return output
}

module.exports = compiler
