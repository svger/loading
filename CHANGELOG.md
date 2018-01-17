## CHANGE LOG

### 2017-11-28
* 完善README.md的内容

### 2017-11-29
* 引入Icon,图标不再自己引图片，而是使用Icon.

### 2018-1-2
* 采用单例模式，对外暴露open、close方法
* 去掉time属性，close成为关闭Loading的唯一方法，Loading不再定时自动关闭
* 增加delay属性，Loading在页面第一次使用时delay无效，在第二次及以后使用时，会有延时显示效果，用以防抖动。
* Loading图标一直处于旋转状态，所以只能传入可以旋转的图标