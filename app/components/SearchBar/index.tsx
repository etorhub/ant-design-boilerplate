import { Form, Input } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './styles.css';

const { Item: FormItem } = Form;

interface SearchBarProps {
  searchText?: string;
  onChangeSearchText?: (value: string) => void;
}

const SearchBar = ({ searchText = '', onChangeSearchText = () => {} }: SearchBarProps) => (
  <div className="searchBar">
    <Form layout="inline">
      <FormItem label="Name">
        <Input
          placeholder="Filter by name"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={searchText}
          suffix={
            searchText ? (
              <CloseCircleOutlined
                id="search-text-delete"
                onClick={() => onChangeSearchText('')}
              />
            ) : null
          }
          onChange={e => onChangeSearchText(e.target.value)}
        />
      </FormItem>
    </Form>
  </div>
);

export default SearchBar;
