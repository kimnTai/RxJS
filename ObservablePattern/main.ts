import { ConcreteObserverA, ConcreteObserverB } from "./Observer";
import ConcreteSubject from "./Subject";

const subject = new ConcreteSubject();
const observerA = new ConcreteObserverA();
const observerB = new ConcreteObserverB();
subject.attach(observerA);
subject.attach(observerB);

subject.someLogic();
// subject.detach(observerB);
// subject.someLogic();
