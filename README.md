# react-mui-scroll-pages

React Component is based on the Scroll View Horizontal idea of React Native, used in combination with Material UI

## Notes

Only should be used in projects that have been built with React and Material-UI (MUI), if not, these installations are required.

## Installing

Make sure you install React, MUI (material-ui) and MUI Icons (material-ui icons)

```
yarn add react-mui-scroll-pages
```

## Example

```jsx
import React, { useState, useEffect } from 'react';

import {
    Container, Grid,
    IconButton, Stack
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ScrollPaper from 'react-mui-scroll-pages';

import EachChild = ({item, sizes}) => <div>Hello {sizes.width}x{sizes.height}</div>

const MyCarousel = () => {
    // other code ...
    const [items, setItems] = useState([...Array(10).keys()]);
    const [itemsSizes, setItemsSizes] = useState({ width: 0, height: 0 });

    const config = {
        mui: {
            Grid,             // required
            Container,        // required
            IconButton,       // required
            Stack,            // required
            ArrowBackIcon,    // required
            ArrowForwardIcon, // required
        },
        buttonStyle: {
            backgroundColor: 'grey',
        },
        getElementSizes: (data) => {
            if (JSON.stringify(sizes) !== JSON.stringify(data)) {
                setItemsSizes(data); // get Item Sizes if needed
            }
        },
        React,              // required
    }

    return <ScrollPaper {...config}>
        {items?.length > 0 && items.map((item, index) => (
              <EachChild
                  key={`render-item-list-${index}`}
                  item={item}
                  sizes={itemsSizes}
             />
       ))}
   </ScrollPaper>

}
```

## Props & Function

|      Name       |          Type           | Required |            Default            |                                                Note                                                 |
| :-------------: | :---------------------: | :------: | :---------------------------: | :-------------------------------------------------------------------------------------------------: |
|    children     |      React Element      |   true   |                               |                                      Pass an array of elements                                      |
|  debounceTime   |         Number          |  false   |              250              |                               Delay time for the list to auto-scroll                                |
|  elementStyle   |         Object          |  false   |                               |                                     Style of Element container                                      |
|   buttonStyle   |         Object          |  false   |                               |                               Style of Scroll Back and Forward button                               |
| buttonIconStyle |         Object          |  false   |                               |                            Style of Scroll Back and Forward icon button                             |
|  gridItemSize   |         Object          |  false   | {xs: 12, sm: 6, md: 4, xs: 3} | Number of cols each element takes on different screen sizes. Example: {xs: 12, sm: 6, md: 4, xs: 3} |
|       mui       | Object of React Element |   true   |                               |               You should pass the object such as from the example above for this prop               |
| getElementSizes |        Function         |  false   |                               |                             Used to get the sizes of Element if needed                              |
|      React      |          React          |   true   |                               |                                      Obligatory: React={React}                                      |
