# reactSourceCodeLearing
react源码学习

### 20220717


```js
//匹配捕获分组
console.log('1ab'.match(/1([a-z])([a-z])/));
//非捕获分组
console.log('1ab'.match(/1(?:[a-z])([a-z])/));
//捕获分组命名
console.log('1ab'.match(/1(?<x>[a-z])(?<y>[a-z])/));
'1ab'.replace(/1(?<x>[a-z])(?<y>[a-z])/, '$<x>-$<y>')
//正向肯定前瞻，并不会消费掉此字符
console.log('1ab'.match(/1(?=[a-z])([a-z])/));
//正向否定前瞻，
console.log('1ab'.match(/1(?![A-Z])([a-z])/));
//反向肯定
console.log('b1a'.match(/(?<=[a-z])1([a-z])/));
//反向否定
console.log('b1a'.match(/(?<![A-Z])1([a-z])/));
```
