import {
    observable,
    action,
    computed
} from "mobx";
import goodsListResult from "../api/goodsListResult";

export default class GoodsListStore {
    @observable listData = goodsListResult.list.sort(function (a, b) {
        return a.currentRate > b.currentRate ?
            -1 :
            b.currentRate > a.currentRate ?
            1 :
            0;
    });
    @observable sortedListData = null;
    @observable goodsListData = this.listData.slice(0, 5);
    @observable goodsTotal = goodsListResult.total;
    @observable currentPage = 1;
    @observable maxPage =
        goodsListResult.total % 5 ?
        Math.ceil(goodsListResult.total / 5) :
        goodsListResult.total / 5;
    @observable checkedList = ["건축자금", "부동산담보", "대기중", "모집중"];

    @computed get typedStatusFilterValue() {
        if (
            this.props.checklist.list.includes("대기중") ^
            this.props.checklist.list.includes("모집중")
        ) {
            return this.props.checklist.list.includes("대기중") ?
                "대기중" :
                this.props.checklist.list.includes("모집중") ?
                "모집중" :
                "";
        } else {
            return "";
        }
    }

    @computed get contractTypeFilterValue() {
        if (
            this.props.checklist.list.includes("부동산담보") ^
            this.props.checklist.list.includes("건축자금")
        ) {
            return this.props.checklist.list.includes("부동산담보") ?
                "부동산담보" :
                this.props.checklist.list.includes("모집중") ?
                "건축자금" :
                "";
        } else {
            return "";
        }
    }

    @action
    onAddList = () => {
        if (this.currentPage < this.maxPage) {
            let currentPageNumber = this.currentPage + 1;
            const sliceList = goodsListResult.list.slice(
                (currentPageNumber - 1) * 5,
                currentPageNumber * 5
            );
            this.goodsListData = this.goodsListData.concat(sliceList);
            this.currentPage = currentPageNumber;
        }
    };
    @action checkedListAddItem = value => {
        this.checkedList = this.checkedList.concat(value);
    };
    @action checkedListRemoveItem = value => {
        this.checkedList = this.checkedList.filter(item => item !== value);
    };
    @action goodsListFilter = () => {
        if (this.contractTypeFilterValue !== "" && this.typedStatusFilterValue === "") {
            this.sortedListData = this.listData.filter(
                item => item.contractType === this.contractTypeFilterValue
            );
            this.goodsListData = this.sortedListData.splice(
                0,
                5 * this.currentPage
            );
        } else if (this.contractTypeFilterValue !== "" && this.typedStatusFilterValue !== "") {
            this.sortedListData = this.listData.filter(
                item =>
                item.contractType === this.contractTypeFilterValue &&
                item.typedStatus === this.typedStatusFilterValue
            );
            this.goodsListData = this.sortedListData.splice(
                0,
                5 * this.currentPage
            );
        } else if (this.contractTypeFilterValue === "" && this.typedStatusFilterValue !== "") {
            this.sortedListData = this.listData.filter(
                item => item.typedStatus === this.typedStatusFilterValue
            );
            this.goodsListData = this.sortedListData.splice(
                0,
                5 * this.currentPage
            );
        } else {
            this.sortedListData = this.listData;
            this.goodsListData = this.sortedListData.splice(
                0,
                5 * this.currentPage
            );
        }
    }
}