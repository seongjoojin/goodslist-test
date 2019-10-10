import GoodsListStore from "../stores/goodsList";

describe("GoodsList Filter Test", () => {
  const store = new GoodsListStore();
  it("typedStatus filter test A", () => {
    store.checkedListRemoveItem("모집중");
    expect(store.sortedListData[0].typedStatus).toBe("대기중");
  });
  it("typedStatus filter test B", () => {
    store.checkedListRemoveItem("대기중");
    expect(store.sortedListData[0].typedStatus).toBe("모집중");
  });
  it("contractType filter test A", () => {
    store.checkedListRemoveItem("부동산담보");
    expect(store.sortedListData[0].contractType).toBe("건축자금");
  });
  it("contractType filter test B", () => {
    store.checkedListRemoveItem("건축자금");
    expect(store.sortedListData[0].contractType).toBe("부동산담보");
  });
});
