 import * as actions from './actionTypes';

 const initialState = {
    headlines: []
  };

function headlinesReducer(state = initialState, action) {
     switch (action.type) {
         case actions.HEADLINE_ADDED:
            const existingHeadline = state.headlines.find(headline => headline.title === action.payload.title);
            if (!existingHeadline)
            return { ...state, headlines: [...state.headlines, {            
                title: action.payload.title,
                content: action.payload.content,
                source: { 
                    name: action.payload.sourceName,
                },
                publishedAt: action.payload.publishedAt,
                urlToImage: action.payload.urlToImage,
                author: action.payload.author,
                timestamp: Date.now(),
            }] };
            else 
            return {
                ...state,
                headlines: state.headlines.map(headline => headline.title !== action.payload.title ? headline : {...headline, timestamp: Date.now() } )
              };
        case actions.HEADLINE_UPDATED:
            return {
                ...state,
                headlines: state.headlines.map(headline => headline.title !== action.payload.title ? headline : {...headline, timestamp: Date.now() } )
              };
        case actions.HEADLINE_REMOVED:
            return {
                ...state,
                headlines: state.headlines.filter(headline => headline.title !== action.payload.title)
              };
        default:
            return state;
     }
 }

 export default headlinesReducer;