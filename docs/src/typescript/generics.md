---
title: 泛型
---

# 泛型

泛型的特点就是带有类型参数

```ts
// 函数名后面尖括号的部分<T>，就是类型参数，参数要放在一对尖括号（<>）里面,可以将其理解为类型声明需要的变量，需要在调用时传入具体的参数类型。
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// 调用
getFirst<number>([1, 2, 3]);
```

类型参数的名字，可以随便取，但是必须为合法的标识符。习惯上，类型参数的第一个字符往往采用大写字母。一般会使用 T（type 的第一个字母）作为类型参数的名字。如果有多个类型参数，则使用 T 后面的 U、V 等字母命名，各个参数之间使用逗号（“,”）分隔。

```ts
function mapIns<T, U>(arr: T[], f: (arg: T) => U): U[] {
  return arr.map(f);
}
// 使用
mapIns<string | number>(["1", "2", "3", "4"], (n) => parseInt(n));
```

## 泛型的写法

#### 函数泛型

`function`关键字定义的泛型函数，类型参数放在尖括号中，写在函数名后面。

```ts
function<T> foo(arg:T):T{
    return arg;
}
// 对于变量形式定义的函数,泛型有以下两种写法

// 第一种
let myId:<T>(arg:t) => arg = foo;

// 第二种
let myId:{ <T>(arg:T):T } = foo;
```

#### 接口泛型

接口泛型的基本写法

```ts
interface Box<T> {
  contents: T;
}

let box: Box<string>;
```

接口实现函数

```ts
interface Comparator<T> {
  compareTo(value: T): number;
}

class Rectangle implements Comparator<Rectangle> {
  compareTo(value: Rectangle): number {
    // ...
  }
}
// 第二种写法
interface Fn {
  <Type>(arg: Type): Type;
}

function id<Type>(arg: Type): Type {
  return arg;
}

let myId: Fn = id;
```

#### 类的泛型写法

泛型类的类型参数写在类名后面。

```ts
class Person<K, V> {
  name: K;
  age: V;
}
```

继承泛型类的时候需要给出具体的类型

```ts
class A<T> {
    value:T
}

class B extends A<number>{
    ...
}
```

泛型类也可以用在类表达式

```ts
const Container = class<T> {
  constructor(private readonly data: T) {}
};
// 新建实例时需要给出具体的类型
const a = new Container<boolean>(true);
const b = new Container<number>(0);

// 另一个例子
class C<NumType> {
  value!: NumType;
  add!: (x: NumType, y: NumType) => NumType;
}

let foo = new C<number>();

foo.value = 0;
foo.add = function (x, y) {
  return x + y;
};
```

JavaScript 的类本质上是一个构造函数，因此也可以把泛型类写成构造函数。

```ts
type MyClass<T> = new (...args: any[]) => T;

// 或者
interface MyClass<T> {
  new (...args: any[]): T;
}

// 用法实例
function createInstance<T>(AnyClass: MyClass<T>, ...args: any[]): T {
  return new AnyClass(...args);
}
```

泛型类描述的是类的实例，不包括静态属性和静态方法，因为这两者定义在类的本身。因此，它们不能引用类型参数。类型参数只能用于**实例属性**和**实例方法**.
```ts
class C<T> {
    static data: T;  // 报错
    constructor(public value:T) {}
}
```
 #### 类型别名的泛型写法
 
 type命名定义的类型别名,也可以使用泛型
 ```ts
 type Nullable<T> = T | undefined | null;
 
 type Container<T> = { value:T };
 
 // 使用
 let a:Container<number> = { value:1234 };
 let b:Container<string> = { value:"Tom" };
 ```
 
 ## 类型参数默认值
 类型参数可以设置默认值。使用时，如果没有给出类型参数的值，就会使用默认值。
 
 ```ts
 function getFirst<T = string>(arr:T[]):T {
     return arr[0];
 }
 ```
 
 一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后。
 ```ts
<T = boolean, U> // 错误

<T, U = boolean> // 正确
```

## 类型参数的约束条件

#### 基本语法
```ts
<TypeParameter extends ConstrainType>
```

`TypeScript`提供了一种语法，允许在类型参数上面写明约束条件，如果不满足条件，编译时就会报错。这样也可以有良好的语义，对类型参数进行说明。
```ts
function comp<T extends {length:number}>(a:T,b:T):T{
    if(a.length >= b.length) {
        return a;
    }
    return b;
}
```

类型参数可以同时设置约束条件和默认值,前提是默认值必须满足约束条件.
```ts
type Fn<A extends string, B extends string = 'world'> = [A,B];

type Result = Fn<"hello">;  // ["hello", "world"]
```

> 泛型本质上是一个类型函数，通过输入参数，获得结果，两者是一一对应关系。

如果有多个类型参数,一个类型参数约束条件,可以引用其他参数.
```ts
<T, U extends T>
// 或者
<T extends U, U>
```

#### 使用注意点
1. 尽量少用泛型
2. 类型参数越少越好
    多一个类型参数，多一道替换步骤，加大复杂性。因此，类型参数越少越好。
    ```ts
        function filter<T, Fn extends (arg:T) => boolean >( arr:T[], func:Fn): T[] {
          return arr.filter(func);
        }
    ```
3. 类型参数需要出现两次
    如果类型参数在定义后只出现一次，那么很可能是不必要的。
    ```ts
        function greet<Str extends string>(s:Str) {
            console.log('Hello, ' + s);
        }
    ```

4. 泛型可以嵌套
    类型参数可以是另一个泛型。
    ```ts
        type OrNull<Type> = Type|null;

        type OneOrMany<Type> = Type|Type[];

        type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
    ```