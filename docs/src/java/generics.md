---
title: 泛型
---

# 泛型


**格式：**
```java
<数据类型>
```

::: danger   提示
泛型只能支持引用数据类型，如果需要使用简单的数据类型，需要使用其包装类
:::

```java
// 引用类型
ArrayList<String> strArr = new ArrayList<>();
// 简单类型
ArrayList<Integer> numArr = new ArrayList<>();
```

**优点**  
1. 统一数据类型
2. 把运行时期的问题提前到编译期间，避免了强制类型转换可能出现的异常，因为在编译阶段类型就能确定下来

**注意事项**
1. 泛型中不能写基本数据类型
2. 指定泛型的具体类型后，传递数据时，可以传入该类类型或者其子类型
3. 如果不写泛型，类型默认是Object


## 泛型类
### 格式
```java
修饰符 class 类名<类型> {
    ....
}
```

### 示例
```java
// 泛型类
public class MyArrayList<T>{
    Object[] obj = new Object[10];
    int size;

    public boolean add(T t){
        obj[size] = t;
        size++;
        return true;
    }

    public T get(int i) {
        return (T)obj[i];
    }

    @Override
    public String toString() {
        return Arrays.toString(obj);
    }
}
// 使用泛型类
MyArrayList<String> strArr = new MyArrayList<>();  //在使用泛型类的时候必须提供泛型的类型
strArr.add("abc");
```

## 泛型方法
方法中形参类型不确定时,可以使用以下两种方案
1. 可以使用类名后面定义的泛型\<T\>
2. 在方法声明上定义自己的泛型

### 格式
```java
// 泛型必须放在修饰符后面，如果有两个修饰符，就放在第二个修饰符后面
修饰符<类型> 返回值类型 方法名(类型 变量名) {

}
```

### 示例
```java
// 泛型方法
public class ListUtil {
    public static<T> void addAll(ArrayList<T> list, T...t){
        for(T element : t) {
            list.add(element);
        }
    }
}
// 使用泛型方法
ArrayList<String> strArr = new ArrayList<>();
ListUtil.addAll(strArr, "abc");  // 泛型方法必须在被调用的时候提供具体类型
```

## 泛型接口

### 格式
```java
修饰符 interface 接口名<类型>{

}
```

### 实现方式
1. 实现类给出具体类型
```java
// 泛型接口
public class MyArrayList implements List<String>{
    ...
}
```
2. 实现类延续泛型，创建对象时再确定 
```java
// 泛型接口
public class MyArrayList<T> implements List<T>{
    ...
}
```

## 泛型的继承及通配符
### 继承
泛型不具备继承性，但数据具备继承性
```java
public class GenericeDemo1 {
    public static void main(String[] args) {
        ArrayList<Ye> list1 = new ArrayList<>();
        ArrayList<Fu> list2 = new ArrayList<>();
        ArrayList<Zi> list3 = new ArrayList<>();

        // 这里体现的是泛型不具备继承性
        method(list1);
        method(list2);  // 编译报错 method方法参数类型是ArrayList<Ye>，这里传递的是ArrayList<Fu>类型数据
        method(list3);  // 编译报错 method方法参数类型是ArrayList<Ye>，这里传递的是ArrayList<Zi>类型数据

        // 这里体现的是数据具备继承性
        list1.add(new Ye());
        list1.add(new Fu());
        list1.add(new Zi());
    }

    public static void method(ArrayList<Ye> list){

    }
}

class Ye{}
class Fu extends Ye {}
class Zi extends Fu {}
```

### 通配符
限定泛型的范围

使用`?`做为泛型的通配符。
`?`表示不确定的类型，可以进行类型限定
1. `? extends E`:表示可以传递E或者E所有的子类型
2. `? super E`:表示可以传递E或者E所有的父类类型

#### 应用场景
1. 定义类、方法、接口的时候，如果类型不确定就可以定义泛型类，泛型方法、泛型接口。
2. 类型不确定，但是能确定以后只能传递某个继承体系中的，就可以使用泛型的通配符