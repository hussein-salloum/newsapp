import * as actions from './actionTypes';

export const headlineAdded = (title, content, sourceName, publishedAt, urlToImage, author) => dispatch => {
    dispatch({
    type: actions.HEADLINE_ADDED,
    payload: {
        title,
        content,
        sourceName,
        publishedAt,
        urlToImage,
        author,
    }
});
};
/*
export const headlineUpdated = title => ({
    type: actions.HEADLINE_UPDATED,
    payload: {
        title
    }
});

export const headlineRemoved = title => ({
    type: actions.HEADLINE_REMOVED,
    payload: {
        title
    }
});

*/
  