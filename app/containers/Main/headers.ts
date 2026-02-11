import type { ColumnsType } from 'antd/es/table';
import type { RandomUserPerson } from '../../types';

const columns: ColumnsType<RandomUserPerson> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (_, record) => `${record.name.first} ${record.name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

export default columns;
