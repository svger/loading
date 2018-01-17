import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'cefc-ui-icon';
import styles from './style/index.less';

const defaultPrefixCls = 'cefc-loading';
let LoadingComponent = '';
let loadingContainer = '';
const createLoadingContainer = (options) => {
  loadingContainer = document.createElement('div');
  document.body.appendChild(loadingContainer);
  ReactDom.render(<Loading {...options} />, loadingContainer);
}

const open = (options) => {
  if (!loadingContainer) {
    createLoadingContainer(options);
  }
}

const close = () => {
  ReactDom.render(<Loading isShow={false} />, loadingContainer);
}

class LoadingContainer extends Component {
  static propTypes = {
    className: PropTypes.oneOfType([                        //外部传入类
      PropTypes.string,
      PropTypes.object
    ]),
    delay: PropTypes.number,                                //延迟显示加载效果的时间（防止闪烁）
    iconType: PropTypes.string,
    mask: PropTypes.bool,                                   //是否显示遮罩层
    prefixCls: PropTypes.string,                            //自定义类
    content: PropTypes.string,                              //loading的内容展示
    isShow: PropTypes.bool,                                 //是否显示Loading
    onCallback: PropTypes.func,                             //loading隐藏后的回调处理函数
  };

  static defaultProps = {
    prefixCls: defaultPrefixCls,
    iconType: 'loadingspinner',
    className: '',
    content: '加载中',
    isShow: true,
    mask: true,
    onCallback: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isShow: true
    };
    this.debounceTimeout = 0;
    this.delayTimeout = 0;
  }

  componentWillReceiveProps(nextProps) {
    const { isShow } = nextProps;
    const { delay } = this.props;
    const currentIsShow = this.props.isShow;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (currentIsShow && !isShow) {
      this.debounceTimeout = setTimeout(() => {
        this.setState({ isShow });
        this.props.onCallback();
      }, 200);
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (isShow && delay && !isNaN(Number(delay))) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
        this.delayTimeout = setTimeout(() => this.setState({ isShow }), delay);
      } else {
        currentIsShow !== isShow && this.setState({ isShow });
      }
    }
  }

  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  render() {
    let { content, prefixCls, className, iconType, mask } = this.props;
    let { isShow } = this.state;
    let container = classnames(prefixCls, className, {
      [`${prefixCls}-hiding`]: !isShow
    });

    const iconCls = classnames({
      [`${prefixCls}-icon`]: true,
      [`${prefixCls}-loading-icon`]: true
    });

    const loadingCls = classnames({
      [`${prefixCls}-loading`]: true,
      [`${prefixCls}-transparent`]: !mask
    })

    return (
      <section className={container}>
        <div className={loadingCls}>
          <Icon type={iconType} className={iconCls} />
          <span>{content}</span>
        </div>
      </section>
    )
  }
}

class Loading extends Component {
  constructor(props) {
    super(props);
    if (!LoadingComponent) {
      LoadingComponent = LoadingContainer;
    }
  }
  render() {
    return <LoadingComponent {...this.props} />
  }
}

Loading.open = open;
Loading.close = close;

export default Loading;
