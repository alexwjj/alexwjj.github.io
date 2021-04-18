## Partial<T>

### 定义

将T中所有属性转换为可选属性。返回的类型可以是T的任意子集

```js
export interface UserModel {
  name: string;
  age?: number;
  sex: number;
  address?: string;
  tel?: string;
  favorite?: string;
}

type JUserModel = Partial<UserModel>
// =
type JUserModel = {
    name?: string | undefined;
    age?: number | undefined;
    sex?: number | undefined;
    address?: string | undefined;
    tel?: string | undefined;
    favorite?: string | undefined;
}
```

### 源码解析
```js
type Partial<T> = { [P in keyof T]?: T[P]; };
```

## Required<T>

### 定义

通过将T的所有属性设置为必选属性来构造一个新的类型。与Partial相对

```js
type JUserModel2 = Required<UserModel>
// =
type JUserModel2 = {
    name: string;
    age: number;
    sex: number;
    address: string;
    tel: string;
    favorite: string;
}
```

## Readonly<T>
将T中所有属性设置为只读

```js
type JUserModel3 = Readonly<UserModel>

// =
type JUserModel3 = {
    readonly name: string;
    readonly age?: number | undefined;
    readonly sex: number;
    readonly address?: string | undefined;
    readonly tel?: string | undefined;
    readonly favorite?: string | undefined;
}
```

## Record<K,T>
构造一个类型，该类型具有一组属性K，每个属性的类型为T。可用于将一个类型的属性映射为另一个类型。

Record 后面的泛型就是对象键和值的类型。

```js
type TodoProperty = 'title' | 'description';

type Todo = Record<TodoProperty, string>;
// =
type Todo = {
    title: string;
    description: string;
}
```

## Pick<T,K>
通过在T中抽取一组属性K构建一个新类型

```js
interface Todo {
  title: string;
  description: string;
  done: boolean;
}

type TodoBase = Pick<Todo, "title" | "done">;

// =
type TodoBase = {
    title: string;
    done: boolean;
}
```

## Omit<T,K>
从T中取出除去K的其他所有属性。与Pick相对。


## Exclude<T,U>
从T中排除可分配给U的属性，剩余的属性构成新的类型

```js
type T0 = Exclude<'a' | 'b' | 'c', 'a'>; 

// = 

type T0 = "b" | "c"
```
## Extract<T,U>

从T中抽出可分配给U的属性构成新的类型。与Exclude相反

```js
type T0 = Exclude<'a' | 'b' | 'c', 'a'>; 

// = 

type T0 = 'a'
```

## NonNullable<T>

去除T中的 null 和 undefined 类型

## Parameters<T>
返回类型为T的函数的参数类型所组成的数组

```js

type T0 = Parameters<() => string>;  // []

type T1 = Parameters<(s: string) => void>;  // [string]
```

## ReturnType<T>
function T的返回类型
```js
type T0 = ReturnType<() => string>;  // string

type T1 = ReturnType<(s: string) => void>;  // void

```
## InstanceType<T>
返回构造函数类型T的实例类型; 相当于js中的，不过返回的是对应的实例

```js
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;  // C
```