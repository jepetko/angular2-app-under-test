import {GoogleBooksAPI} from '../../../typings/google-books-api.def';

export default <GoogleBooksAPI.QueryResult> {
    kind: 'books#volumes',
    totalItems: 3,
    items: [
        {
            kind: 'books#volume',
            id: '1',
            etag: 'aa',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/aa',
            volumeInfo: {
                title: 'Hamlet',
                authors: [
                    'William Shakespeare'
                ]
            }
        },
        {
            kind: 'books#volume',
            id: '2',
            etag: 'bb',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/bb',
            volumeInfo: {
                title: 'Macbeth',
                authors: [
                    'William Shakespeare'
                ]
            }
        },
        {
            kind: 'books#volume',
            id: '3',
            etag: 'cc',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/cc',
            volumeInfo: {
                title: 'King Lear',
                authors: [
                    'William Shakespeare'
                ]
            }
        }
    ]
};
