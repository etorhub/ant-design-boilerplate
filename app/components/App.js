import React from 'react';
import { Form, Table, Card, Input, Icon } from 'antd';
import reqwest from 'reqwest';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      selectedRowKeys: [],
      searchText: '',
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.searchText !== this.state.searchText && nextState.searchText.length > 2) {
      console.log('datafilter!');
    }
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  emitEmpty = () => {
    this.searchTextInput.focus();
    this.setState({ searchText: '' });
  }

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

  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  };

  render() {
    const {
      loading,
      data,
      pagination,
      selectedRowKeys,
      searchText,
    } = this.state;
    const FormItem = Form.Item;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const suffix = searchText ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <Card bordered={false}>
        <Form layout="inline">
          <FormItem label="Name">
            <Input
              placeholder="Type 3 digits"
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              value={searchText}
              suffix={suffix}
              onChange={this.onChangeSearchText}
              // eslint-disable-next-line no-return-assign
              ref={node => this.searchTextInput = node}
            />
          </FormItem>
        </Form>
        <Table
          columns={columns}
          rowKey={record => record.registered}
          dataSource={data}
          rowSelection={rowSelection}
          pagination={paginationProps}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </Card>
    );
  }
}

export default App;
