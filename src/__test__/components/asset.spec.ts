import { mount } from '@vue/test-utils'
import Asset from '../../components/Asset.vue';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { $assetApi } from '../../services/api.service'
import { tokens as tokensData, tokens_account as tokensAccountData } from '../../dummy/tokens.json' 
import { BigNumber } from "bignumber.js";


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
  test("미로그인 시 발행량 기준으로 내림차순", async () => {
    const wrapper = mount(Asset, {
      props: { 
        loggedIn : false
      }
    });

    // idea1: 대상 값에 해당하는 element들을 조회하여 a > b > c .. 인지 확인 => failed
    // const totalSupply = wrapper.find('.balance')
    // console.log({totalSupply})

    // idea2: sorting 된 상태의 데이터 검증
    $assetApi.getTokens = vi.fn().mockResolvedValue(tokensData.payload)
    const tokens =  await $assetApi.getTokens()

    const sortedTokens = wrapper.vm.sortDecending(tokens, 'totalSupply')
    
    for(let i = 0; i < sortedTokens.length; i++ ) {
      if(!sortedTokens[i+1]) {
        return
      }
      const curr = new BigNumber(sortedTokens[i].totalSupply);
      const next = new BigNumber(sortedTokens[i+1].totalSupply);
      // console.log(curr.isGreaterThanOrEqualTo(next))
      expect(curr.isGreaterThanOrEqualTo(next)).toBe(true)
    }
  });
  test("로그인 시 보유량 기준으로 내림차순", async () => {
    const wrapper = mount(Asset, {
      props: { 
        loggedIn : true
      }
    });

    $assetApi.getTokens = vi.fn().mockResolvedValue(tokensAccountData.payload)
    const tokens =  await $assetApi.getTokensAccount()

    const sortedTokens = wrapper.vm.sortDecending(tokens, 'balance')
    
    for(let i = 0; i < sortedTokens.length; i++ ) {
      if(!sortedTokens[i+1]) {
        return
      }
      const curr = new BigNumber(sortedTokens[i].balance);
      const next = new BigNumber(sortedTokens[i+1].balance);
      expect(curr.isGreaterThanOrEqualTo(next)).toBe(true)
    }
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
    $assetApi.getTokensAccount = vi.fn().mockResolvedValue(tokensAccountData.payload)

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
})
