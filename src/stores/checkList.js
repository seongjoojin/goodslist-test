import { observable, action } from "mobx";

export default class CheckListStore {
  @observable list = ["건축자금", "부동산담보", "대기중", "모집중"];

  @action addItem = value => {
    this.list = this.list.concat(value);
  };

  @action removeItem = value => {
    this.list = this.list.filter(item => item !== value);
  };
}
