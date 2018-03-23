/* eslint-disable object-curly-newline */
import React from 'react';
import { Table, Card } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from '../../components/SearchBar/index';
import { changeSearchText, getAPIData } from './actions';
import columns from './headers';
import { getFilteredDataArray, isDataLoading, getSearchText } from './selectors';

const NUM_RESULTS = 100;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: { total: NUM_RESULTS },
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = { results: 10, page: 0 }) => {
    this.props.onGetAPIData(params);
  };

  render() {
    const { selectedRowKeys, pagination } = this.state;
    const { loading, searchText, onChangeSearchText, data } = this.props;

    return (
      <Card bordered={false}>
        <SearchBar
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
        />
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          onChange={this.handleTableChange}
          rowSelection={{ selectedRowKeys, onChange: this.onSelectChange }}
          pagination={{ showSizeChanger: true, showQuickJumper: true, ...pagination }}
        />
      </Card>
    );
  }
}

Main.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  searchText: PropTypes.string,
  onChangeSearchText: PropTypes.func,
  onGetAPIData: PropTypes.func,
};

Main.defaultProps = {
  loading: true,
  data: [],
  searchText: '',
  onChangeSearchText: () => {},
  onGetAPIData: () => {},
};

const mapStateToProps = state => ({
  data: getFilteredDataArray(state),
  loading: isDataLoading(state),
  searchText: getSearchText(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeSearchText: (text) => {
    dispatch(changeSearchText(text));
  },
  onGetAPIData: (text) => {
    dispatch(getAPIData(text));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
