import React from 'react';
import Loading from '../src/index';

class App extends React.Component {

  handleCallback = () => {
    alert('我是回调函数');
  };

  handleClick = () => {
    alert('点我了')
  }

  componentDidMount() {
    Loading.open({
      content: "加载中",
      iconType: "loading",
      delay: 2000,
      mask: false
    })

    setTimeout(() => {
      Loading.close();
      console.log('我关闭了')
    }, 4000);
  }

  render() {
    return (
       <div onClick={this.handleClick}>
         <div>Loading Demo</div>
       </div>
    );
  }
}

export default App;
