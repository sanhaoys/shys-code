# this

从 ECMAScript(简称 ES)规范解读 this

## type

ES 的类型分为语言类型和规范类型

- 语言类型，是 ES 可以直接操作的类型如 Undefined、Number 等
- 规范类型，用来用算法描述规范的语言结构/语言类型
  - Reference(引用)
  - List(列表)
  - Completion(完结)
  - Property Descriptor(属性描述式)
  - Property Identifier(属性标识)
  - Lexical Environment(词法环境)
  - Environment Record(环境记录)

规范类型的值不一定对应 ES 实现里的任何实体的虚拟对象，只用来描述 ES 表示运算的中途结果

## Reference

> 引用类型用来说明 delete，typeof，赋值运算符这些运算符的行为。

> 这里的 Reference 是一个 Specification Type 只存在于规范里的抽象类型，为了更好地描述语言的底层行为，并不存在于实际的 js 代码中

一个 Reference 是个已解决的命名绑定，一个引用由三部分组成

- 基(base)值: 是`undefined`、`Object`、`Boolean`、`String`、`Number`、`environment record`中的任意一个。`undefined`表示此引用可以不解决一个绑定
- 引用名称(referenced name): `String`
- 严格以后用(strict reference): `Boolean`

基值就是属性所在的对象或者就是环境记录  
引用名称就是属性的名称

```javascript
var foo = 1

// 对应的Reference
{
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}
```

```javascript
var foo = {
  bar: function () {
    return this
  },
}

foo.bar() // foo

// bar对应的Reference
{
  base: foo, // Object
  propertyName: 'bar',
  strict: false
}
```

同时规范还提供了获取 Reference 组成部分的方法(抽象操作)

- GetBase(V)。 返回引用值 V 的基值组件。
- GetReferencedName(V)。 返回引用值 V 的引用名称组件。
- IsStrictReference(V)。 返回引用值 V 的严格引用组件。
- HasPrimitiveBase(V)。 如果基值是 Boolean, String, Number，那么返回 true。
- IsPropertyReference(V)。 如果基值是个对象或 HasPrimitiveBase(V) 是 true，那么返回 true；否则返回 false。
- IsUnresolvableReference(V)。 如果基值是 undefined 那么返回 true，否则返回 false。

## GetValue

在接下来就定义了一个从 Reference 类型中获取实际值的方法`GetValue`(抽象操作)

```javascript
var foo = 1

fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false,
}

GetValue(fooReference) // 1
```

**调用`GetValue`返回的是具体的值，而不再是一个 Reference**

## 如何确定 this 的值

> ES 规范 11.2.3 Function Calls
> 产生式 CallExpression:MemberExpression Arguments
>
> 1. 令 ref 为解释执行 MemberExpression 的结果
> 2. 令 func 为 GetValue(ref)
> 3. 令 argList 为解析执行 Arguments 的结果
> 4. 如果 Type(func) is not Object，抛出一个 TypeError 异常
> 5. 如果 IsCallable(func) is false，抛出一个 TypeError 异常(IsCallable，确定 ES 语言值的参数是否是一个可调用对象，输入类型必须是 Object 且参数对象包含一个 Call 内部方法，才会返回 true)
> 6. 如果 Type(ref)为 Reference，那么如果 IsPropertyReference(ref)为 true，令 thisValue 为 getBase(ref)，否则，ref 的基值是一个环境记录项，令 thisValue 为调用 GetBase(ref)的 ImplicitThisValue。(此时 GetBase(ref)为声明式环境记录项，implicitThisValue 永远返回 undefined)
> 7. 否则，如果 Type(ref)不是 Reference，将 thisValue 为 undefined
> 8. 返回调用 fun 的`[[Call]]`内置方法的结果，传入 thisValue 作为 this，argList 作为参数列表

从流程上可以看出，首先如果 MemberExpression 的结果不是引用，那么 this 为 undefined  
如果为一个引用且 IsPropertyReference 为 true，那么 this 为 GetBase(ref)，否则 this 为 undefined  
获取 this 的问题可以抽离为执行 MemberExpression 的结果问题

## 如何知道执行 MemberExpression 的结果是什么

首先 MemberExpression 的类型有

- PrimaryExpression 原始表达式
- FunctionExpression 函数定义表达式
- MemberExpression[Expression]/MemberExpression.identifierName 属性访问表达式
- new MemberExpression Arguments 对象创建表达式

对于属性访问表达式而言，都可以解释为

```
MemberExpression[<identifier-name-string> | Expression]
```

1. 首先令 baseRef 为解析执行 MemberExpression 的结果
2. 令 baseValue 为 GetValue(baseRef)
3. 令 propertyNameRef 为解析执行 Expression 的结果(string 就直接返回)
4. 令 propertyNameValue 为 GetValue(propertyNameRef)
5. 调用 CheckObjectCoercible(baseValue) `CheckObjectCoercible() 在其参数无法用ToObject转换成对象的情况下抛出一个异常`
6. 令 propertyNameString 为 ToString(propertyNameValue).
7. 如果正在执行中的语法产生式包含在严格模式代码当中，令 strict 为 true, 否则令 strict 为 false.
8. 返回一个值类型的引用，其基值为 baseValue 且其引用名为 propertyNameString, 严格模式标记为 strict.

所以此时结果是一个引用，就去走引用的 this 路线

```javascript
var foo = {
  value: 1,
  bar() {
    console.log(this.value)
  },
}

foo.bar() // this = foo
```
