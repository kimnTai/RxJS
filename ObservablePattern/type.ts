interface Subject {
  // 添加觀察者
  attach(observer: Observer): void;
  // 移除觀察者
  detach(observer: Observer): void;
  // 通知所有觀察者
  notify(): void;
}

interface Observer {
  // 對發布者發出的更新訊息作出回應
  update(subject: Subject): void;
}

export { Subject, Observer };
