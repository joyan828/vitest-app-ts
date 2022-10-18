import {sum, math} from '../../utils/math'
import {describe, it, expect} from 'vitest'

describe("#math", () => {
  const a = '1.2312412312'
  const b = '0.111111111'
  const c = '0.1'
  const d = '0.2'

  it(`${c} + ${d} 는 0.3 (부동소수점 0.30000000000000004 가 되지 않는다.)`, () => {
    expect(math('plus', c, d)).toBe('0.3')
  })

  it(`${a} + ${b}`, () => {
    expect(math('plus', a, b)).toMatchSnapshot()
  })

  it(`${a} - ${b}`, () => {
    expect(math('minus', a, b)).toMatchSnapshot()
    // inline snapshots 
    // expect(math('minus', a, b)).toMatchInlineSnapshot()
  })

  it(`${a} * ${b}`, () => {
    expect(math('mul', a, b)).toMatchSnapshot()
  })

  it(`${a} / ${b}`, () => {
    expect(math('div', a, b)).toMatchSnapshot()
  })
})

describe("#sum", () => {
  it("입력된 인자가 없을 시 0 리턴", () => {
    expect(sum()).toBe(0)
  })

  it("입력된 인자가 하나일때 해당 값 리턴", () => {
    expect(sum(2)).toBe(2)
  })


  it("입력된 인자가 1,2일때 3 리턴", () => {
    expect(sum(1,2)).toBe(3)
  })

  it("입력된 인자가 1,2,3 일때 6 리턴", () => {
    expect(sum(1,2,3)).toBe(6)
  })
})