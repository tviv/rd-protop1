import React, { Component } from 'react';

class LoadingWrappedView extends Component {

  componentDidMount () {
    //console.log(this.refs);
    this.refs.table.focus();

  }

  render() {

    return (
      <div ref="table">
        <Loading loading={this.props.filterLoading} error={this.props.error}>
          {this.props.filterBlock}
        </Loading>

        {!this.props.filterLoading &&
        <Loading loading={this.props.dataLoading} error={this.props.error}>
          <div>
          {this.props.dataSize === 0 ?
            <div className="text-info">Нет данных по запросу</div>
            :
            this.props.children}
          </div>
        </Loading>
        }
      </div>
    )
  }
}

function Loading (props) {
    return (
      <div>
        {props.loading && props.error ?
          <div className="text-danger">{props.error}</div>
          : props.loading ?
            <div>Загрузка...</div>
            :
              props.children}

      </div>
    )
}

export default LoadingWrappedView;
