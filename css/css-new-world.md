# CSS 新世界

## CSS 数据类型

CSS 属性中具有代表性的值 语法为关键字加`<`、`>` 例如 `<number>`表示数值

## 常见的数据类型

1. `<shape-box>` 支持的属性如下

   1. `<box>`
   2. `margin-box`
      在 CSS 属性中用到 margin-box 的属性并不多，但是 box 数据类型很常见 box 数据类型包括以下几种属性值

      background-origin 和 background-clip 等属性的属性值就是 box 数据类型

      1. `content-box`
      2. `padding-box`
      3. `border-box`

2. `<basic-shape>` 支持的属性如下

   1. `inset()`
   2. `circle()`
   3. `ellipse()`
   4. `polygon()`
   5. `path()`
      clip-path 和 offset-path 等 css 属性的属性值属于`<basic-shape>`数据类型

3. `<image>` 支持的属性如下

   1. `<url>`
   2. `<gradient>`
   3. `element()`
   4. `image()`
   5. `image-set()`
   6. `cross-fade`
   7. `paint()`
      上述中`<url>`也是一种数据类型 用于表示使用 url()函数调用的图像资源。`<gradient>`也是一种数据类型 用于表示渐变图像

4. `<color>` 支持的属性如下
   1. `<rgb()>`
   2. `<rgba()>`
   3. `<hsl()>`
   4. `<hsla()>`
   5. `<hex-color>`
   6. `<named-color>`
   7. `currentColor`

## 看懂 CSS 属性值定义语法

### 符号

css 中的符号分为字面符号、组合符号和数量符号三类

1. 字面符号指的是 CSS 属性值中原本就支持的合法符号，这些符号在 CSS 语法中会按照其原本的意思字面呈现，目前字面符号只有两种`,`和`/`

   1. `,` 用来分割数个并列值，或分割函数的参数值
   2. `/` 用来分割一个值的多个部分 在 CSS 缩写中用于分离类型相同但属于不同 CSS 属性的值，以及用在部分 CSS 函数中

2. 组合符号用来表示数个基本元素之间的组合关系

   1. ` ` 并列 符号为普通空格字符 表示各部分必须出现 同时要按照顺序出现
   2. `&&` 各部分必须出现 但可以不按顺序出现
   3. `||` 各部分至少出现一个
   4. `|` 各部分恰好出现其中一个
   5. `[]` 将各部分进行分组以绕过优先规则

3. 数量符号用来描述一个元素可以出现多少次 不能叠加出现且优先级高过组合符号

   1. 无符号 恰好出现一次
   2. `*` 可以出现任意次数
   3. `+` 可以出现一次或多次
   4. `?` 可以出现零次或一次
   5. `{A,B}` 最少 A 次最多 B 次
   6. `#` 一次或多次 但多次出现必须以逗号分割
   7. `!` 表示当前分组必须产生一个值

### 全局关键字属性值

1. `inherit` 继承关键字
   可以用来重置输入框的内置字体、实现高度继承、背景继承等
2. `initial` 初始值关键字 将 CSS 还原为规定的初始值
3. `unset` 当前使用的 CSS 属性是具有继承特性的 等同`inherit` 否则的等同`initial` 用来搭配 all 使用`all: unset`
4. `revert` 让当前元素的样式还原为游览器内置样式

```css
all: unset; // 可以让任意一个元素表现的像span一样
```

### @support 规则进行渐进增强处理

support 语法

```css
@support <supports-condition> {
  // css规则集
}

<supports-condition> = ( <var> ) | not ( <var> ) | ( <var> ) [ and ( <var> ) ]+ | ( <var> ) [ or ( <var> ) ]+

<var> = <declaration> | <supports-condition>
```

浏览器也提供了接口用于检测是否支持某个 CSS 特性

```javascript
CSS.supports(propertyName, value)
CSS.supports(supportCondition)
```

## CSS3 的尺寸体系

`width`新增了四个尺寸概念相匹配的关键字，包括`fit-content`、`fill-available`、`min-content`和`max-content`

### `fit-content`

可以理解为大小表现与元素内容一致

1. fit-content 让元素有了确定的尺寸
   ```css demo
   // position需要元素具有明确的尺寸才能实现
   // 此时若希望元素大小随内容变化则使用fix-content即可
   // 将元素定位到中心
   .cw {
     width: fit-content;
     height: fit-content;
     position: absolute;
     left: 0;
     right: 0;
     top: 0;
     bottom: 0;
     margin: auto;
   }
   ```

### `stretch`、`available`和`fill-available`

当在页面中放置一个没有样式的`<div>`元素 该元素的宽度会自动填满可用空间
以上三个关键字作用都是一致的 就是让元素填满可用空间 如同 div 的默认表现一样

1. `stretch` 指*弹性拉伸* 是最新的规范定义的关键字 替换了之前的`fill-available`和`available`
2. `available`指*可用空间* 是 Firefox 浏览器使用的关键字 需要`-moz-`私有前缀
3. `fill-available` 指*填充可用空间* 是 webkit 浏览器使用的关键字 需要`-webkit-`私有前缀

```css 使用场景
// 一般对于具有"包裹性"的元素 建议使用宽度分离原则(也就是外围嵌套一层块级元素)
// 当标签使用受限时 例如button元素希望距离容器左右各15px 则很适合使用stretch关键字
button {
  width: stretch;
  margin: 0 15px;
}
```

### `min-content` 首选最小宽度

元素由`content-box`、`padding-box`、`border-box`和`margin-box`组成, 元素最终所占尺寸由四个盒子占据的尺寸决定
除了`content-box`之外的盒子尺寸表现并不会因为元素的不同而有所不同，但`content-box`随着内容不同 首选最小宽度也会不同

1. 替换元素
   按钮、视频和图片等属于替换元素 替换元素的首选最小宽度是当前元素内容自身的宽度
2. CJK 文字
   CJK 指的是 Chinese/Japanese/Korean 的缩写 以中文为代表说明 如果是一段没有标点的中文文字 则首选最小宽度是单个汉字的宽度
3. 非 CJK 文字
   首选最小宽度由字符单元的宽度决定 直到遇到中断字符(space)

### `max-content` 最大内容宽度

让元素尽可能的大 保证内容在一行显示 哪怕最终宽度溢出外部容器元素

除了`stretch`是外在尺寸(与上下文相关)外 其他的都是内在尺寸(与内容相关)

### CSS 逻辑属性

CSS 是围绕*流*来构建的 belike `margin-inline-end` 当文字书写位置发生变化时 显示不会收到影响
CSS 逻辑属性需要配合`writing-mode`、`direction`或`text-orientation`属性使用才有意义
因为 CSS 中还有一些其他属性可以改变 DOM 元素的呈现方向(如`flex-direction`) 但是这些属性与 CSS 逻辑属性之间没有任何关系

inline/block start/end

margin 为例 在从左至右呈现方向时

```css
margin-left -> margin-inline-start
margin-top -> margin-block-start
margin-right -> margin-inline-end
margin-bottom -> margin-block-end

// writing-mode: vertical-rl 时 内联元素从上向下排列 文档流从右向左排列 关系转换为
margin-left -> margin-block-end
margin-top -> margin-inline-start
margin-right -> margin-block-start
margin-bottom -> margin-inline-end
```

一些额外对应

```css
width/height -> inline-size/block-size

(min | max)-(width | height) -> (min | max)-(inline | block)-size
```

### inset

left、top、right、bottom 的逻辑属性
`inset-(inline | block)-(start | end) // 根据文档流方向定位`

简写`inset: 0; // 等同于 left: 0;right:0;top:0;bottom:0;`
同时`inset`支持的值的范围是{1,4}同 margin 和 padding 的方位一致

### border-image

沿着一个元素的`content-box`画一条线 可以将该元素分为 9 部分 可以称之为九宫格

border-image 由 `source` 和 `slice` 组成

#### 分割的规则由 `slice` 决定

```css
// 该分割可以视为 将分割线设置为距离源图像上右下左并进行切分

border-image-slice: 20px;
```

![栗子](http://s6cvy6sa6.hn-bkt.clouddn.com/image/2023/12/28/MXgYKR-2nTK6O.png)

```css
// 中心部位并不会参与填充效果 可以额外使用fill关键字让中心部位参与填充
border-image-slice: 20px fill;

// 该属性默认值是100% 就会造成裁剪线发生反向交叉导致除了四个边角区域 其他区域不可见
```

如下所示：

![默认值栗子](http://s6cvy6sa6.hn-bkt.clouddn.com/image/2023/12/28/SpPMKj-N3C794.png)

#### 九宫格的尺寸

控制该尺寸的属性为`border-image-width`和`border-image-outset`

`border-image-width`支持使用数值作为属性值 最终计算结果为该数值作为系数\*`border-width`

若值为具体的长度值 则直接为该长度值 但需要给`border-width`设置一个极小的值来保证该属性生效(如`0.02px` 不小于 1/64 像素)

若为百分比则相对元素自身尺寸计算

若为`auto`则会使用 slice 的值

#### outset

外扩距离 可以理解为 border-image 的 border-width -> 九宫格中心区域的方位尺寸扩大

#### border-image-repeat

该属性用于设置四条边的平铺规则的 定于如下
`border-image-repeat: [ stretch | repeat | round | space ]{1, 2}`

属性强制要求相对两边平铺规则相同

1. `stretch` 默认值 让源图像拉伸以填满显示区域
2. `repeat` 让图像紧密相连平铺 保持原始比例 边界处位置可能会截断
3. `round` 让图像紧密相连平铺 适当伸缩以保证边界不会被截断
4. `space` 让图像保持原始尺寸 平铺时彼此保持等宽间距 若区域无法呈现至少一个源图像单元 则以空白显示(该属性兼容性差)

![栗子](http://s6cvy6sa6.hn-bkt.clouddn.com/image/2023/12/28/FFOLOO-FISJnz.png)
