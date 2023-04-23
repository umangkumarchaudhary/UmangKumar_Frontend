import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  // memoize handleClick function to avoid recreating it on every render
  const handleClick = useCallback(() => {
    onClickHandler(index);
  }, [index, onClickHandler]);

  // memoize backgroundColor value to avoid recomputing on every render
  const backgroundColor = useMemo(() => {
    return isSelected ? 'orange' : 'pink';
  }, [isSelected]);

  return (
    <li
      style={{ backgroundColor, cursor: 'pointer', textDecoration: 'none' }}
      onClick={handleClick}
    >
      {text}
    </li>
  );
};
SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // reset selectedIndex to null when items changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  // memoize handleClick function to avoid recreating it on every render
  const handleClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  // memoize renderedItems to avoid recreating the array on every render
  const renderedItems = useMemo(() => {
    return items.map((item, index) => (
      <SingleListItem
        key={index}
        onClickHandler={handleClick}
        text={item.text}
        index={index}
        isSelected={index === selectedIndex}
      />
    ));
  }, [handleClick, items, selectedIndex]);

  return (
    <ul style={{ textAlign: 'left', listStyleType: 'none', backgroundColor: 'skyblue' }}>
      {renderedItems}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;
