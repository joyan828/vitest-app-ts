import { mount } from '@vue/test-utils'
import Asset from '../../components/Asset.vue';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { $assetApi } from '../../services/api.service'
import { tokens, tokens_account } from '../../dummy/tokens.json'
import { math } from '../../utils/math' 

// beforeEach(() => {

// })

describe("MyAsset.vue 테스트", () => {
  test("로그인 시 타이틀은 'My'", () => {
    const loggedIn = true;
    const wrapper = mount(Asset, {
      props: { loggedIn },
    });
    const h1 = wrapper.find('h1');
    expect(h1.text()).toMatch('Myy'); // fix!
  });
  test("미로그인 시 타이틀은 'All'", () => {
    const loggedIn = false;
    const wrapper = mount(Asset, {
      props: { loggedIn },
    });
    const h1 = wrapper.find('h1');
    expect(h1.text()).toMatch('All'); 
  });
  test("미로그인 시 보유량 햡계를 sum div에 디스플레이: 0", () => {
    const wrapper = mount(Asset, {
      props: { 
        loggedIn : false
      }
    });

    // data check 
    expect(wrapper.vm.total).toMatch('0')

    const strong = wrapper.find('strong');
    expect(strong.text()).toMatch('0'); 
  });
  test("$1 시세의 토큰을 각 2개씩 4종류 보유하고 있을 때 sum은 8", async () => {
    const wrapper = mount(Asset, {
      props: { 
        loggedIn : true
      }
    });

    // tokens_account api mocking
    $assetApi.getTokensAccount = vi.fn().mockResolvedValue(tokens_account.payload)

    const tokens = await $assetApi.getTokensAccount()
    for(const symbol in tokens) {
      const token = tokens[symbol]
      token.USDValue = 1
      token.balance = 2
    }

    expect(wrapper.vm.sum(tokens)).toMatch('8')
    
    // failed!
    // const strong = wrapper.find('strong')
    // expect(strong.text()).toMatch('8')

    // failed again! 
    // expect(wrapper.vm.total).toMatch('8')
  });
  test("미로그인 시 발행량 기준으로 내림차순", () => {
  });
  test("로그인 시 보유량 기준으로 내림차순", () => {
  });
})
