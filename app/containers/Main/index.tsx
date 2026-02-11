import React, { useState, useEffect, useCallback } from 'react';
import {
  Table, Card, Alert, Empty,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import SearchBar from '@/components/SearchBar/index';
import type { ApiPaginationParams, RandomUserPerson } from '@/types';
import { changeSearchText, getAPIData } from './actions';
import columns from './headers';
import {
  getFilteredDataArray,
  getApiDataError,
  isDataLoading,
  getSearchText,
} from './selectors';

const NUM_RESULTS = 100;

const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector(getFilteredDataArray);
  const error = useSelector(getApiDataError);
  const loading = useSelector(isDataLoading);
  const searchText = useSelector(getSearchText);

  const [pagination, setPagination] = useState<{ total: number; current?: number }>({
    total: NUM_RESULTS,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetch = useCallback(
    (params: ApiPaginationParams = { results: 10, page: 0 }) => {
      dispatch(getAPIData(params));
    },
    [dispatch],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleTableChange = (
    pager: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RandomUserPerson> | SorterResult<RandomUserPerson>[],
  ) => {
    setPagination(prev => ({ ...prev, current: pager.current }));
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    const filterParams: ApiPaginationParams = filters
      ? Object.fromEntries(
        Object.entries(filters)
          .filter(
            ([, value]) => value != null && (!Array.isArray(value) || value.length > 0),
          )
          .map(([key, value]) => [
            key,
            Array.isArray(value) && value.length === 1 ? value[0] : value,
          ]),
      )
      : {};
    fetch({
      results: pager.pageSize,
      page: pager.current,
      sortField: singleSorter?.field as string | undefined,
      sortOrder: singleSorter?.order as string | undefined,
      ...filterParams,
    });
  };

  return (
    <Card bordered={false}>
      <SearchBar
        searchText={searchText}
        onChangeSearchText={text => dispatch(changeSearchText(text))}
      />
      {error && (
        <Alert
          type="error"
          message="Failed to load data"
          description={error.message}
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      {!loading && data.length === 0 && !error && (
        <Empty description="No data" style={{ margin: '24px 0' }} />
      )}
      <Table<RandomUserPerson>
        loading={loading}
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          ...pagination,
        }}
      />
    </Card>
  );
};

export default Main;
