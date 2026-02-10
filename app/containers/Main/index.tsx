import React from 'react';
import { Table, Card } from 'antd';
import { connect } from 'react-redux';
import type { TablePaginationConfig } from 'antd/es/table';
import type { SorterResult } from 'antd/es/table/interface';
import SearchBar from '../../components/SearchBar/index';
import { changeSearchText, getAPIData } from './actions';
import columns from './headers';
import { getFilteredDataArray, isDataLoading, getSearchText } from './selectors';
import type { RootState, RandomUserPerson } from '../../types';

const NUM_RESULTS = 100;

interface ApiParams {
  results?: number;
  page?: number;
  sortField?: string;
  sortOrder?: string;
  [key: string]: unknown;
}

interface MainProps {
  loading: boolean;
  data: RandomUserPerson[];
  searchText: string;
  onChangeSearchText: (text: string) => void;
  onGetAPIData: (params: ApiParams) => void;
}

interface MainComponentState {
  pagination: { total: number; current?: number };
  selectedRowKeys: React.Key[];
}

class Main extends React.Component<MainProps, MainComponentState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      pagination: { total: NUM_RESULTS },
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  onSelectChange = (selectedRowKeys: React.Key[]) => {
    this.setState({ selectedRowKeys });
  };

  handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, unknown>,
    sorter: SorterResult<RandomUserPerson> | SorterResult<RandomUserPerson>[],
  ) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: singleSorter?.field as string | undefined,
      sortOrder: singleSorter?.order as string | undefined,
    });
  };

  fetch = (
    params: ApiParams = { results: 10, page: 0 },
  ) => {
    this.props.onGetAPIData(params);
  };

  render() {
    const { selectedRowKeys, pagination } = this.state;
    const {
      loading, searchText, onChangeSearchText, data,
    } = this.props;

    return (
      <Card bordered={false}>
        <SearchBar
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
        />
        <Table<RandomUserPerson>
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

const mapStateToProps = (state: RootState) => ({
  data: getFilteredDataArray(state),
  loading: isDataLoading(state),
  searchText: getSearchText(state),
});

type MainDispatch = (
  action: ReturnType<typeof changeSearchText> | ReturnType<typeof getAPIData>
) => void;

const mapDispatchToProps = (dispatch: MainDispatch) => ({
  onChangeSearchText: (text: string) => {
    dispatch(changeSearchText(text));
  },
  onGetAPIData: (params: ApiParams) => {
    dispatch(getAPIData(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
