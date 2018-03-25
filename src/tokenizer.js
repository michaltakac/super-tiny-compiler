/**
 * Step 1: lexical analysis with tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */
function tokenizer (input) {
  let current = 0
  let tokens = []

  while (current < input.length) {
    let char = input[current]

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })

      current++
      continue
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })

      current++
      continue
    }

    // We're test for whitespace existence and if it does exist we're
    // going to just `continue` on.
    let WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    // (add 123 456)
    //      ^^^ ^^^ Two separate tokens with type `number`
    let NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: 'number',
        value
      })

      continue
    }

    // (concat "foo" "bar")
    //          ^^^   ^^^ string tokens
    if (char == '"') {
      let value = ''

      // Skip first double quote
      char = input[++current]
      // Actual string
      while (char !== '"') {
        value += char
        char = input[++current]
      }

      // Skip ending double quote
      char = input[++current]

      tokens.push({
        type: 'string',
        value
      })

      continue
    }

    // (add 2 4)
    //  ^^^ Name token
    let LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: 'name',
        value
      })

      continue
    }

    throw new TypeError('Unexpected character: ' + char)
  }

  return tokens
}

module.exports = tokenizer
