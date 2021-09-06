import { debounce } from "../index";

test("httpclient", async () => {
    function onInput() {
        console.log("1111");
    }
    const debounceOnInput = debounce(onInput);
    document.getElementById("input").addEventListener("input", debounceOnInput); //在Input中输入，多次调用只会在调用结束之后，等待100ms触发一次
});
