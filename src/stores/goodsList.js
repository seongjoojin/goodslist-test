import { observable, action, computed } from "mobx";
import goodsListResult from "../api/goodsListResult";

export default class GoodsListStore {
  @observable listData = goodsListResult.list.sort(function(a, b) {
    return a.currentRate > b.currentRate
      ? -1
      : b.currentRate > a.currentRate
      ? 1
      : 0;
  });
  @observable sortedListData = this.listData.map(item => item);
  @observable goodsListData = this.listData.slice(0, 5);
  @observable goodsTotal = goodsListResult.total;
  @observable currentPage = 1;
  @observable maxPage =
    goodsListResult.total % 5
      ? Math.ceil(goodsListResult.total / 5)
      : goodsListResult.total / 5;
  @observable checkedList = ["건축자금", "부동산담보", "대기중", "모집중"];

  @computed get typedStatusFilterValue() {
    if (
      this.checkedList.includes("대기중") ^ this.checkedList.includes("모집중")
    ) {
      return this.checkedList.includes("대기중")
        ? "대기중"
        : this.checkedList.includes("모집중")
        ? "모집중"
        : "";
    } else {
      return "";
    }
  }

  @computed get contractTypeFilterValue() {
    if (
      this.checkedList.includes("부동산담보") ^
      this.checkedList.includes("건축자금")
    ) {
      return this.checkedList.includes("부동산담보")
        ? "부동산담보"
        : this.checkedList.includes("건축자금")
        ? "건축자금"
        : "";
    } else {
      return "";
    }
  }

  @action
  onAddList = () => {
    if (this.currentPage < this.maxPage) {
      let currentPageNumber = this.currentPage + 1;
      const sliceList = this.sortedListData.slice(
        (currentPageNumber - 1) * 5,
        currentPageNumber * 5
      );
      this.goodsListData = this.goodsListData.concat(sliceList);
      this.currentPage = currentPageNumber;
    }
  };
  @action checkedListAddItem = value => {
    this.checkedList = this.checkedList.concat(value);
    this.goodsListFilter();
  };
  @action checkedListRemoveItem = value => {
    this.checkedList = this.checkedList.filter(item => item !== value);
    this.goodsListFilter();
  };
  @action goodsListFilter = () => {
    if (
      this.contractTypeFilterValue !== "" ||
      this.typedStatusFilterValue !== ""
    ) {
      this.sortedListData = this.listData.filter(
        item =>
          (this.contractTypeFilterValue !== ""
            ? item.contractType === this.contractTypeFilterValue
            : true) &&
          (this.typedStatusFilterValue !== ""
            ? item.typedStatus === this.typedStatusFilterValue
            : true)
      );
    } else {
      this.sortedListData = this.listData.map(item => item);
    }
    this.maxPage =
      this.sortedListData.length % 5
        ? Math.ceil(this.sortedListData.length / 5)
        : this.sortedListData.length / 5;
    this.goodsTotal = this.sortedListData.length;
    this.currentPage =
      this.currentPage > this.maxPage ? this.maxPage : this.currentPage;
    this.goodsListData = this.sortedListData.slice(0, 5 * this.currentPage);
  };
}
