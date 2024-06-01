---
title: 类型运算
---

# 类型运算

## keyof
`keyof`是一个单目运算符，接受一个对象类型作为参数，返回该对象的所有键名组成的联合类型

```typescript
type MyObj = {
    foo: number,
    bar: string
}

type Keys = keyof MyObj;  // 'foo' | 'bar';
```

由于`JavaScript`对象的键名只有三种类型，所以对于任意对象的键名的联合类型就是`string|number|symbol`。  
```typescript
type Keys = keyof any;  // string | number | symbol
```

对于没有自定义键名的类型使用 keyof 运算符，返回never类型，表示不可能有这样类型的键名。
```typescript
type Keys = keyof object; // never
```

由于`keyof`返回的类型是`string|number|symbol`，如果有些场合只需要其中的一种类型，那么可以采用交叉类型的写法。  
```typescript
type Capital<T extends string> = Capitalize<T>;
type MyKey<Obj extends object> = Capital<keyof Obj>;  //报错  因为string|number|symbol，跟字符串不兼容

// 使用交叉类型就不会报错
type MyKey<Obj extends object> = Capital<string & keyof Obj>;
```

对象属性名采用索引形式，keyof 会返回属性名的索引类型。
```typescript
interface T {
    [prop:number]:unknown,
}

type KeyT = keyof T;  // number

// 另外一个例子
interface T {
    [prop:string]:unknown,
}
// JavaScript 属性名为字符串时，包含了属性名为数值的情况，因为数值属性名会自动转为字符串。
type KeyT = keyof T;  // string | number
```

对于联合类型，`keyof`返回成员共有的键名。
```typescript
type A = { a: string; z: boolean };
type B = { b: string; z: boolean };

// 返回 'z'
type KeyT = keyof (A | B);
```

对于交叉类型，`keyof`返回所有键名。
```typescript
type A = { a: string; x: boolean };
type B = { b: string; y: number };

type KeyT = keyof (A & B); // keyof A | keyof B;
```

keyof 取出的是键名组成的联合类型，如果想取出键值组成的联合类型，可以像下面这样写。
```typescript
type MyObj = {
    x: number,
    y: string
}

type Keys = keyof MyObj;

type Values = MyObj[Keys];  // number | string
```

#### keyof用途
##### 精确表达对象的属性类型。

```typescript
// js函数
function prop(obj, key) {
    return obj[key];
}

// 上面函数的类型
function prop(
    obj: { [p:string]:any },
    key:string
):any{
    return obj[key];    
}
```
上面的类型声明存在两个问题
- 无法表示参数`key`与对象`obj`之间的关系
- 函数的返回值只能使用`any`

使用keyof重写上面的类型
```typescript
funtion prop<Obj, K extends keyof Obj>(
    obj:Obj,
    key:K
):obj[key] {
    return obj[key];
}
```

##### 属性映射
将一个类型的所有属性逐一映射成其他值.  
```typescript
type NewProps<Obj> = {
    [Prop in keyof Obj]: boolean;
};

// 用法
type MyObj = { foo: number; };

// 等于 { foo: boolean; }
type NewObj = NewProps<MyObj>;
```

去掉 readonly 修饰符。
```typescript
type Mutable<Obj> = {
    -readonly [Prop in keyof Obj]: Obj[Prop];
};

// 用法
type MyObj = {
    readonly foo: number;
}

// 等于 { foo: number; }
type NewObj = Mutable<MyObj>
```

让可选属性变成必有的属性
```typescript
type Concrete<Obj> = {
    [Prop in keyof Obj]-?: Obj[Prop];
};

// 用法
type MyObj = {
    foo?: number;
}

// 等于 { foo: number; }
type NewObj = Concrete<MyObj>;
```

- `-readonly`表示去除属性的只读特性
- `+readonly`表示添加只读属性特性
- `-?`表示去除可选属性设置
- `+?`表示添加可选属性设置

## in运算符

`TypeScript`语言的类型运算中，用来取出（遍历）联合类型的每一个成员类型。
```typescript
type U = "a" | "b" | "c";

type Foo = {
    [Prop in U]:number,
}

// 等同于
type Foo = {
  a: number,
  b: number,
  c: number
};
```

## 方括号运算符
方括号运算符（`[]`）用于取出对象的键值类型，比如`T[K]`会返回对象T的属性`K`的类型。
```typescript
type Person = {
    age: number;
    name: string;
    alive: boolean;
};

// Age 的类型是 number
type Age = Person['age'];
```

方括号的参数如果是联合类型，那么返回的也是联合类型。
```typescript
type Person = {
    age: number;
    name: string;
    alive: boolean;
};

// number|string
type T = Person['age'|'name'];

// number|string|boolean
type A = Person[keyof Person];
```

如果访问不存在的属性，会报错。
```typescript
type T = Person['notExisted']; // 报错
```

方括号运算符的参数也可以是属性名的索引类型。
```typescript
type Obj = {
    [key:string]: number,
};

// number
type T = Obj[string];


// 这个语法对数组也适用,可以使用`number`作为方括号的参数;
// MyArray 的类型是 { [key:number]: string }
const MyArray = ['a','b','c'];

// 等同于 (typeof MyArray)[number]
// 返回 string
type Person = typeof MyArray[number];
```

方括号里面不能有值的运算。
```typescript
// 示例一
const key = 'age';
type Age = Person[key]; // 报错

// 示例二
type Age = Person['a' + 'g' + 'e']; // 报错
```

#### extends...?: 条件运算符
条件运算符extends...?:可以根据当前类型是否符合某种条件，返回不同的类型。
```typescript
// 类型T是否可以赋值给类型U，即T是否为U的子类型，这里的T和U可以是任意类型。
T extends U ? X : Y
```

```typescript
interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}

// number
type T1 = Dog extends Animal ? number : string;

// string
type T2 = RegExp extends Animal ? number : string;
```

如果需要判断的类型是一个联合类型，那么条件运算符会展开这个联合类型。
```typescript
(A|B) extends U ? X : Y

// 等同于
(A extends U ? X : Y) | (B extends U ? X : Y);
```

不希望联合类型被条件运算符展开，可以把extends两侧的操作数都放在方括号里面。
```typescript
// 示例一
type ToArray<Type> = Type extends any ? Type[] : never;

// string[]|number[] 
type T = ToArray<string|number>;

// 示例二
type ToArray<Type> = [Type] extends [any] ? Type[] : never;

// (string | number)[]
type T = ToArray<string|number>;
```

条件运算符还可以嵌套使用。
```typescript
type LiteralTypeName<T> =
    T extends undefined ? "undefined" :
    T extends null ? "null" :
    T extends boolean ? "boolean" :
    T extends number ? "number" :
    T extends bigint ? "bigint" :
    T extends string ? "string" :
    never;
    
// 使用
// "bigint"
type Result1 = LiteralTypeName<123n>;

// "string" | "number" | "boolean"
type Result2 = LiteralTypeName<true | 1 | 'a'>;
```

## infer关键字
infer关键字用来定义泛型里面推断出来的类型参数，而不是外部传入的类型参数。

通常跟条件运算符一起使用，用在extends关键字后面的父类型之中。

```typescript
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

`infer Item`表示`Item`这个参数是`TypeScript`自己推断出来的，不用显式传入，而`Flatten<Type>`则表示`Type`这个类型参数是外部传入的。`Type extends Array<inferItem>`则表示，如果参数`Type`是一个数组，那么就将该数组的成员类型推断为`Item`，即`Item`是从`Type`推断出来的。

另外一个例子
```typescript
type Flatten<T> =  T extends Array<infer item> ? item : T;

type Props = {
    x:number,
    y:string
}

type Str = Flatten<Props[]>;  // { x:number, y:string }

type Num = Flatten<number>;  // number
```

如果不使用`inter`定义类型参数,就要传入两个类型参数。
```typescript
type Flatten<Type, Item> = Type extends Array<Item> ? Item : Type;
```

使用`infer`，推断函数的参数类型和返回值类型。
```typescript
// 如果T是函数，就返回这个函数的 Promise 版本，否则原样返回。inferA表示该函数的参数类型为A，inferR表示该函数的返回值类型为R。
type ReturnPromise<T> =
  T extends (...args: infer A) => infer R 
  ? (...args: A) => Promise<R> 
  : T;
```

`infer`提取对象指定属性。
```typescript
type MyType<T> =
    T extends {
        a: infer M,
        b: infer N
    } ? [M, N] : never;

// 用法示例
type T = MyType<{ a: string; b: number }>;
// [string, number]
```

`infer`通过正则匹配提取类型参数
```typescript
type Str = 'foo-bar';

type Bar = Str extends `foo-${infer rest}` ? rest : never // 'bar'
```

## is运算符
`is`运算符总是用于描述函数的返回值类型，写法采用`parameterName is Type`的形式，即左侧为当前函数的参数名，右侧为某一种类型。它返回一个布尔值，表示左侧参数是否属于右侧的类型。
```typescript
type A = { a: string };
type B = { b: string };

function isTypeA(x: A|B): x is A {
    if ('a' in x) return true;
    return false;
}
```

`is`运算符可以用于类型保护
```typescript
function isCat(a:any): a is Cat {
    return a.name === 'kitty';
}

let x:Cat|Dog;

if (isCat(x)) {
    x.meow(); // 正确，因为 x 肯定是 Cat 类型
}
```

is运算符还有一种特殊用法，就是用在类（class）的内部，描述类的方法的返回值。
```typescript
class Teacher {
    isStudent():this is Student {
        return false;
    }
}

class Student {
    isStudent():this is Student {
        return true;
    }
}
```

> `this is T`这种写法，只能用来描述方法的返回值类型，而不能用来描述属性的类型。

## 模板字符串
TypeScript 允许使用模板字符串，构建类型。

模板字符串的最大特点，就是内部可以引用其他类型。
```typescript
type World = "world";

// "hello world"
type Greeting = `hello ${World}`;
```

模板字符串可以引用的类型一共6种，分别是 `string`、`number`、`bigint`、`boolean`、`null`、`undefined`。引用这6种以外的类型会报错。
```typescript
type Num = 123;
type Obj = { n : 123 };

type T1 = `${Num} received`; // 正确
type T2 = `${Obj} received`; // 报错
```

模板字符串里面引用的类型，如果是一个联合类型，那么它返回的也是一个联合类型，即模板字符串可以展开联合类型。
```typescript
type T = 'A'|'B';

// "A_id"|"B_id"
type U = `${T}_id`;
```

模板字符串引用两个联合类型，它会交叉展开这两个类型。
```typescript
type T = 'A'|'B';

type U = '1'|'2';

// 'A1'|'A2'|'B1'|'B2'
type V = `${T}${U}`;
```

## satisfies运算符
satisfies运算符用来检测某个值是否符合指定类型。

```typescript
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255] // 报错
} satisfies Record<Colors, string|RGB>;

const greenComponent = palette.green.substring(1); // 不报错
```

satisfies也可以检测属性值。
```typescript
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0] // 报错
} satisfies Record<Colors, string|RGB>;
```