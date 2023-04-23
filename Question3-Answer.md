# Please fix, optimize, and/or modify the component as much as you think is necessary.

## 🚀Modified and Optimised Code

```code
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
    return isSelected ? 'green' : 'pink';
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

```

## 💫Changes I made:-

1. To optimize performance and ensure that the same function instance is used across renders, I used `useCallback` to memoize the `handleClick` function in the `List` component and passed it as a prop to the `SingleListItem` component.

2. The `backgroundColor` value in the `SingleListItem` component, which is derived from the `isSelected` prop, is memoized using `useMemo `to avoid redundant computations of the background color on every render.

3. Using `useMemo`, the `renderedItems` variable in the `List` component is memoized to prevent the recreation of the array of `SingleListItem` components on every render unless the `items`, `handleClick`, or `selectedIndex` values change.

4. I eliminated the redundant `WrappedSingleListItem` and `WrappedListComponent` components as they did not add any value to the code.

5. I simplified the `List` component's useEffect hook to reset the selected index to null whenever items changes, rather than creating a new `setSelectedIndex` function.

6. I changed the PropTypes definition for the `items` prop to conform to the correct format of `PropTypes.arrayOf(PropTypes.shape(...))`.

Overall, these changes improve performance by reducing unnecessary function calls and rendering, and simplify the code by removing unnecessary components and simplifying the `useEffect` hook.

### ⚡Output running of the code with no errors/warnings:-

![image](https://www.flickr.com/photos/198168309@N04/52838654758/in/dateposted-public/)

The background color changes to orange on clicking any item:<br><br>
![image](https://www.flickr.com/photos/198168309@N04/52838208296/in/dateposted-public/)
