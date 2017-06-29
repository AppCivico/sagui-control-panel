import Vue from 'vue'
import Hello from '../../app/components/Hello.vue'
import chai from 'chai'
import { expect } from 'chai'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Hello)
    })
    expect(vm.$el.querySelector('h1').textContent).to.equal('Welcome to Your Vue.js App')
  })
})
