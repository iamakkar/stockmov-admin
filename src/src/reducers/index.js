var initstate = {
    creator: "",
    title: "",
    banner: "",
    date: Date.now(),
    readTime: 0,
    caption: "",
    content: "",
    hashtag: "",
    published: false,
    _id: "",
}

const mainReducer = (state = initstate, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                creator: action.data
            }
        case 'SET_ID':
            return {
                ...state,
                _id: action.data
            }
        case 'SET_TITLE':
            return {
                ...state,
                title: action.data
            }
        case 'SET_CAPTION':
            return {
                ...state,
                caption: action.data
            }
        case 'SET_BANNER':
            return {
                ...state,
                banner: action.data
            }
        case 'SET_CONTENT':
            return {
                ...state,
                content: action.data
            }
        case 'SET_HASHTAG':
            return {
                ...state,
                hashtag: action.data
            }
        case 'SET_READTIME':
            return {
                ...state,
                readTime: action.data
            }
        default:
            return state
    }
}

export default mainReducer;