# Loading
全局加载效果组件

### Loading

| 属性        | 说明                          | 类型            | 默认值         |
| :-------- | ----------------------------- |:-------------:| :-----------: |
| prefixCls  | 样式前缀，如：`cefc-loading`，可用于自定义样式 | String | `cefc-loading` |
| content    | 加载说明                         | String | '加载中' |
| iconType  | Icon图标的名称，从矢量图标库中找需要的图标| string   | 'loadingspinner'  |
| delay      | 延迟显示加载效果的时间(毫秒）（防止闪烁）页面的第一个Loading无delay效果 | number | 无    |
| isShow     | 是否显示Loading组件，true表示显示  | Boolean | true|
| mask       | 是否显示遮罩层，true表示显示，false表示视觉上不显示，但是仍然有透明遮罩层 | bool | true|
| onCallback | Loading显示结束的回调函数          | Function | ()=>{} |
| className  | 外部传入类                       | string   | ''  |

### 如何使用
```
<Loading isShow content="加载中" type="loading" time="1500" onCallback={alert("我是回调函数")} />
import Loading from 'cefc-ui-loading';
Loading.open({
    content: "加载中",
    iconType: "loading",
    delay: 500,
    mask: false
});

Loading.close();
```