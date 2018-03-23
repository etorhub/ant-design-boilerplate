import React from 'react';
import { Form, Input, Icon } from 'antd';
import { PropTypes } from 'prop-types';

const FormItem = Form.Item;

require('./styles.css');

const SearchBar = ({ searchText, onChangeSearchText }) => (
  <div className="searchBar">
    <Form layout="inline">
      <FormItem label="Name">
        <Input
          placeholder="Filter by name"
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={searchText}
          suffix={searchText ?
            <Icon
              type="close-circle"
              id="search-text-delete"
              onClick={() => onChangeSearchText('')}
            /> : null}
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

SearchBar.defaultProps = {
  searchText: '',
  onChangeSearchText: () => {},
};

export default SearchBar;
