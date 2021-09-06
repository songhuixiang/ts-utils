# 防抖 debounce

在一定时间间隔内，多次调用一个方法，只会执行一次。

使用方式：

```typescript
function onInput() {
    console.log("1111");
}
const debounceOnInput = debounce(onInput);
document.getElementById("input").addEventListener("input", debounceOnInput); //在Input中输入，多次调用只会在调用结束之后，等待100ms触发一次
```

如果第三个参数 immediate 传 true，则会立即执行一次调用，后续的调用不会在执行。
