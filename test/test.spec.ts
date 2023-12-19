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
