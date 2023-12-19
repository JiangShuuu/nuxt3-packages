import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Test from '~/components/Test.vue'

vi.stubGlobal('useSeoMeta', vi.fn())

describe('my describe', () => {
  it('test', () => {
    expect(1).toBe(1)
  })
})

describe('my component', () => {
  it('test', () => {
    const wrapper = mount(Test)

    console.log(wrapper.html())
  })
})

it('1 + 1 should not to be 11', () => {
  const add = (x: number | string, y: number | string) => Number(x) + Number(y)
  expect(add(1, 1)).not.toBe('11')
  expect(add('1', '1')).toBe(2)
})
