import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../index';

describe('SearchBar', () => {
  const testProps = {
    searchText: 'test',
    onChangeSearchText: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be mounted with no props', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });

  it('should manage typing with only searchText', () => {
    const { container } = render(<SearchBar searchText="test" />);
    expect(container).toMatchSnapshot();
  });

  it('should render with all props', () => {
    const { container } = render(<SearchBar {...testProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should dispatch action and react to typing', () => {
    const onChangeSearchText = vi.fn();
    render(<SearchBar onChangeSearchText={onChangeSearchText} />);
    const input = screen.getByPlaceholderText('Filter by name');
    fireEvent.change(input, { target: { value: '111' } });
    expect(onChangeSearchText).toHaveBeenCalledTimes(1);
    expect(onChangeSearchText).toHaveBeenCalledWith('111');
  });

  it('should delete text when button clear clicked', () => {
    render(<SearchBar {...testProps} />);
    const clearButton = document.getElementById('search-text-delete');
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(testProps.onChangeSearchText).toHaveBeenCalledWith('');
  });
});
