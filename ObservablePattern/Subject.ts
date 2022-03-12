import { Observer, Subject } from "./type";

class ConcreteSubject implements Subject {
  // 發布者狀態，測驗使用
  state: number = 0;

  // 訂閱者名單
  observers: Array<Observer> = [];

  /**
   * @description 管理訂閱方法
   * @param {Observer} observer
   * @return {*}  {void}
   * @memberof ConcreteSubject
   */
  attach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) return console.log("已訂閱");

    this.observers.push(observer);
    console.log(observer, "訂閱成功");
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) return console.log("訂閱者未訂閱");

    this.observers.splice(observerIndex, 1);
    console.log(observer, "訂閱者已移除");
  }

  /**
   * @description 通知
   * @memberof ConcreteSubject
   */
  notify(): void {
    console.log("通知所有訂閱者");
    for (const observer of this.observers) observer.update(this);
  }

  /**
   * @description 訂閱管理以外的邏輯
   * @memberof ConcreteSubject
   */
  someLogic(): void {
    this.state = Math.floor(Math.random() * 10 + 1);

    console.log(`我更改了我的狀態：state=${this.state}`);
    this.notify();
  }
}

export default ConcreteSubject;

