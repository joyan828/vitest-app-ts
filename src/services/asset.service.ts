import { ApiService } from "./api.service";
export default class AssetService {
  $api: ApiService;

  constructor($api: ApiService) {
    this.$api = $api;
  }

  async getTokens() {
    const { data } = await this.$api.get("/tokens");
    return data.payload;
  }
  
  async getTokensAccount() {
    const { data } = await this.$api.get("/tokens_account");
    return data.payload;
  }
}