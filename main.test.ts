import { expect, test } from 'bun:test'
import { effect, runWith } from './main'

test('basic', async () => {
  const print = effect('Print', console.log)
  const readFile = effect(
    'ReadFile',
    (path: string) =>
      new Promise<string>((resolve) =>
        setTimeout(() => resolve(`Read from ${path}: Hello, world!`), 1000),
      ),
  )

  const content = await runWith(
    function* () {
      const content = yield readFile.do('hello.txt')
      yield print.do(content)
      return content
    },
    readFile,
    print,
  )
  expect(content).toBe('Read from hello.txt: Hello, world!')
})
