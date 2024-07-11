export interface Effect<T extends string, P, R> {
  type: T
  handler: Handler<P, R>
  do: (payload?: P) => Perform<T, P>
}

export type Handler<P, R> = (payload: P) => R

export interface Perform<T extends string, P> {
  type: T
  payload?: P
}

export const effect = <const T extends string, P = undefined, R = void>(
  type: T,
  handler: Handler<P, R>,
): Effect<T, P, R> => ({
  type,
  handler,
  do: (payload?: P) => ({ type, payload }),
})

export function runWith<R>(
  program: () => Generator<Perform<string, unknown>, R, unknown>,
  ...effects: Effect<string, any, unknown>[]
) {
  const iter = program()

  async function handleNext(resume?: unknown) {
    const { value: perform, done } = iter.next(resume)
    if (done) {
      return perform
    }
    const effect = effects.find((effect) => effect.type === perform.type)
    if (effect === undefined) {
      throw Error('Unknown effect')
    }
    return handleNext(await effect.handler(perform.payload))
  }

  return handleNext()
}
