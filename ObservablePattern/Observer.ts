import ConcreteSubject from "./Subject";
import { Observer } from "./type";

//具體觀察者A
class ConcreteObserverA implements Observer {
  update(subject: ConcreteSubject) {
    if (subject.state <= 5) console.log("觀察者A作出回應");
  }
}

// 具體觀察者B
class ConcreteObserverB implements Observer {
  update(subject: ConcreteSubject) {
    if (subject.state > 5) console.log("觀察者B作出回應");
  }
}

export { ConcreteObserverA, ConcreteObserverB };
