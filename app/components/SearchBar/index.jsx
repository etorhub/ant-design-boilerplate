import React from 'react';
import { Form, Input } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PropTypes } from 'prop-types';

const { Item: FormItem } = Form;

require('./styles.css');

const SearchBar = ({ searchText = '', onChangeSearchText = () => {} }) => (
  <div className="searchBar">
    <Form layout="inline">
      <FormItem label="Name">
        <Input
          placeholder="Filter by name"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={searchText}
          suffix={searchText
            ? (
              <CloseCircleOutlined
                id="search-text-delete"
                onClick={() => onChangeSearchText('')}
              />
            )
            : null}
          onChange={e => onChangeSearchText(e.target.value)}
        />
      </FormItem>
    </Form>
  </div>
);

SearchBar.propTypes = {
  searchText: PropTypes.string,
  onChangeSearchText: PropTypes.func,
};

export default SearchBar;
