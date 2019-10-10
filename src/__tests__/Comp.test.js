import GoodsListStore from "../stores/goodsList";

describe("GoodsList Compare Test", () => {
  const store = new GoodsListStore();
  it("compare test", () => {
    store.listData.forEach(item => {
      expect(Math.floor((item.investAmount / item.targetAmount) * 100)).toBe(
        item.currentRate
      );
    });
  });
});
