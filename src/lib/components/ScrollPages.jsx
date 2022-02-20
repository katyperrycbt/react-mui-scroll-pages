import React, { useRef, useMemo } from 'react';

import {
    Container, Grid,
    IconButton, Stack
} from '@mui/material';

import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useThisToGetSizesFromRef, useThisToGetPositionFromRef, useWindowSize } from '../utils';

import { debounce } from 'lodash';

const ScrollPages = (props) => {

    const {
        itemList,
        debounceTime = 250,
        itemStyle,
        containerStyle = {},
        buttonStyle = {},
        BackButton,
        ForwardButton,
        xs, sm, md, lg,
    } = props;

    const theme = useTheme();
    const myRef = useRef(null);
    const gridRef = useRef(null);
    const itemRefs = useRef([]);

    const { width } = useThisToGetSizesFromRef(myRef, { revalidate: 100, timeout: 500 });
    const { top, height, right, left } = useThisToGetPositionFromRef(gridRef, { revalidate: 100, timeout: 500 });
    const { width: windowWidth } = useWindowSize();

    const numberOfWords = itemList?.length || 0;

    const stackLength = width * numberOfWords;

    const handleBackAction = async () => {
        // find which item is in the middle of the screen
        const halfOfScreen = windowWidth / 2;

        const wordIndex = itemRefs.current.findIndex(itemRef => {
            const { left: wordLeft } = itemRef.getBoundingClientRect();
            return (wordLeft < halfOfScreen && wordLeft > 0) ||
                (wordLeft + width > halfOfScreen && wordLeft + width < windowWidth);
        });

        // scroll left
        if (wordIndex > 0) {
            const itemRef = itemRefs.current[wordIndex - 1];
            const { left: wordLeft } = itemRef.getBoundingClientRect();

            gridRef.current.scrollTo({
                left: wordLeft + wordIndex * width - left,
                behavior: 'smooth'
            });
        }
    }

    const handleForwardAction = async () => {
        // find which item is in the middle of the screen
        const halfOfScreen = windowWidth / 2;

        const wordIndex = itemRefs.current.findIndex(itemRef => {
            const { left: wordLeft } = itemRef.getBoundingClientRect();
            return (wordLeft < halfOfScreen && wordLeft > 0) ||
                (wordLeft + width > halfOfScreen && wordLeft + width < windowWidth);
        });

        // scroll left
        if (wordIndex < itemRefs.current?.length - 1) {
            const itemRef = itemRefs.current[wordIndex + 1];
            const { left: wordLeft } = itemRef.getBoundingClientRect();

            gridRef.current.scrollTo({
                left: wordLeft + wordIndex * width - left,
                behavior: 'smooth'
            });
        }
    }

    const debounceScroll = useMemo(() => debounce(() => {

        const autoScroll = async () => {
            const halfOfScreen = windowWidth / 2;

            const wordIndex = itemRefs?.current?.findIndex(itemRef => {
                const { left: wordLeft } = itemRef?.getBoundingClientRect();
                return (wordLeft < halfOfScreen && wordLeft > 0) ||
                    (wordLeft + width > halfOfScreen && wordLeft + width < windowWidth);
            });

            const itemRef = itemRefs?.current?.[wordIndex];

            if (itemRef) {
                const { left: wordLeft } = itemRef?.getBoundingClientRect();

                const a = Math.abs(wordIndex * width - left);
                const b = Math.abs(wordLeft);
                const whichBigger = Math.max(a, b);
                const different = Math.round(Math.abs(a - b) * 100 / whichBigger);

                if (different > 10) {
                    gridRef?.current?.scrollTo({
                        left: wordLeft + (wordIndex * width - wordLeft),
                        behavior: 'smooth'
                    });
                }
            }

        };
        autoScroll();
    }, debounceTime), [left, width, windowWidth]);

    const onScroll = () => {
        debounceScroll();
    }

    return (
        <Container maxWidth="lg" disableGutters>
            <Grid container direction="row" mt={[0, 1, 2, 3]} sx={containerStyle}>
                <div style={{
                    position: 'absolute',
                    top: Math.round(top + height / 2),
                    left: `calc(${left}px + ${theme.spacing(3)})`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100,
                    backgroundColor: theme.palette.scroll_button.main,
                    borderRadius: '50%',
                    ...buttonStyle
                }}>
                    <IconButton aria-label="left" onClick={handleBackAction}>
                        {BackButton ? <BackButton /> : <ArrowBackIcon fontSize="large" />}
                    </IconButton>
                </div>
                <div style={{
                    position: 'absolute',
                    top: Math.round(top + height / 2),
                    left: `calc(${right}px - ${theme.spacing(3)})`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100,
                    backgroundColor: theme.palette.scroll_button.main,
                    borderRadius: '50%',
                    ...buttonStyle
                }}>
                    <IconButton aria-label="left" onClick={handleForwardAction}>
                        {ForwardButton ? <ForwardButton /> : <ArrowForwardIcon fontSize="large" />}
                    </IconButton>
                </div>
                <Grid
                    ref={gridRef}
                    item
                    xs={12}
                    sx={{
                        mt: 1,
                        width: [width],
                        overflow: 'auto',
                        borderRadius: '10px',
                    }}
                    className='hideScrollBar'
                    onScroll={onScroll}
                >
                    <Stack direction="row" sx={{ width: stackLength }}>
                        {itemList?.length > 0 && itemList.map((item, index) => (
                            <EachItem
                                key={`render-item-list-${index}`}
                                item={item}
                                width={width}
                                itemRefs={itemRefs}
                                index={index}
                                itemStyle={itemStyle}
                            >
                                {item}
                            </EachItem>
                        ))}
                    </Stack>
                    <Grid container direction='row'>
                        <Grid ref={myRef} item xs={xs || 12} sm={sm || 6} md={md || 4} lg={lg || 3}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
};

const EachItem = ({ width, itemRefs, index, children, itemStyle = {} }) => {
    return <Grid
        ref={el => itemRefs.current[index] = el}
        container
        direction='column'
        alignItems='center'
        wrap='nowrap'
        sx={{
            p: 1,
            width,
            height: 'auto',
            '&:hover': {
                filter: 'brightness(50%)'
            },
            ...itemStyle
        }}
    >
        {children}
    </Grid>
}

export default ScrollPages;