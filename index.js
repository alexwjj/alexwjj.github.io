function myCall(ctx = window, ...args) {
  ctx = ctx || window;
  // 为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
  const fn = Symbol();
  ctx[fn] = this;
  // 处理参数，传入第一个参数后的其余参数
  const res = ctx[fn](...args);
  // 调用函数后即删除该Symbol属性
  delete ctx[fn];
  return res;
}


function myApply(ctx = window, args) {
  ctx = ctx || window;
  const fn = Symbol();
  ctx[fn] = this;
  if (Array.isArray(args)) {
    result = ctx[fn](...args);
  } else {
    result = ctx[fn]();
  }
  delete ctx[fn];
  return res;
}

function myBind(ctx, ...args1) {
  const _this = this;
  return function F(...args2) {
    if (this instanceof F) {
      // 判断是否为构造函数调用，如果是则使用new调用当前函数
      return new _this(...args1, ...args2)
    } else {
      // 如果不是，使用apply，将context和处理好的参数传入
      return _this.apply(ctx, args1.concat(args2))
    }
  }
}

class PubSub{
  constructor() {
    this.subscribers = [];
  }
  subscribe (topic, callback) {
    let callbacks = this.subscribers[topic]
    if(!callbacks) {
      this.subscribers[topic] = [callback]
    } else {
      callbacks.push(callback)
    }
  }

  publish(topic, ...args) {
    let callbacks = this.subscribers[topic] || [];
    callbacks.forEach(callback => callback(...args))
  }
}

function aEvent(num) {
  console.log('aEvent:'+num);
}
function bEvent(num) {
  console.log('bEvent:'+num);
}

let pubSub = new PubSub();

pubSub.subscribe('aaa', aEvent)

pubSub.subscribe('bbb', bEvent)

pubSub.publish('aaa', '11111111')

pubSub.publish('bbb', '11111111')


// 观察者模式
class Subject {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer)
  }

  notify(...args) {
    this.observers.forEach(observer => observer.update(...args))
  }
}

class Observer {
  update(...args) {
    console.log(...args);
  }
}

// 创建观察者ob1
let ob1 = new Observer();
// 创建观察者ob2
let ob2 = new Observer();
// 创建目标sub
let sub = new Subject();
// 目标sub添加观察者ob1 （目标和观察者建立了依赖关系）
sub.add(ob1);
// 目标sub添加观察者ob2
sub.add(ob2);
// 目标sub触发SMS事件（目标主动通知观察者）
sub.notify('I fired `SMS` event');



class Subject {
  constructor() {
      this.observers = [];
  }

  add(observer) {
      this.observers.push(observer);
  }

  notify(...args) {
      this.observers.forEach(observer => observer.update(...args));
  }
}

class Observer {
  update(...args) {
      console.log(...args);
  }
}

// 创建观察者ob1
let ob1 = new Observer();
// 创建观察者ob2
let ob2 = new Observer();
// 创建目标sub
let sub = new Subject();
// 目标sub添加观察者ob1 （目标和观察者建立了依赖关系）
sub.add(ob1);
// 目标sub添加观察者ob2
sub.add(ob2);
// 目标sub触发SMS事件（目标主动通知观察者）
sub.notify('I fired `SMS` event');