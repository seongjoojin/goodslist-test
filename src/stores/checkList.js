import { observable, action } from "mobx";

export default class CheckListStore {
  @observable checkedList = [];

  @action addItem = value => {
    this.checkedList = this.checkedList.concat(value);
  };

  @action removeItem = value => {
    this.checkedList = this.checkedList.filter(item => item !== value);
  };
}
