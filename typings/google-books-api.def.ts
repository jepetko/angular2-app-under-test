import {Type} from '@angular/core';
export declare namespace GoogleBooksAPI {

    export interface ImageLinks {
        smallThumbnail: string;
        thumbnail: string;
        small: string;
        medium: string;
        large: string;
        extraLarge: string;
    }

    export interface IndustryIdentifier {
        type: string;
        identifier: string;
    }

    export interface VolumeInfo {
        title: string;
        authors: string[];
        description: string;
        pageCount: number;
        mainCategory: string;
        categories: string[];
        imageLinks: ImageLinks;
        industryIdentifiers: IndustryIdentifier[];
    }

    export interface QueryResultItem {
        kind: string;
        id: string;
        etag: string;
        selfLink: string;
        volumeInfo: VolumeInfo;
    }

    export interface QueryResult {
        kind: string;
        items: QueryResultItem[];
        totalItems: number;
    }
}

export interface DefaultViewerType {
    load(id: string);
}

export interface GoogleBooksViewerAPI {
    load: Function;
    setOnLoadCallback: (fun: Function) => void;
    DefaultViewer: Type<DefaultViewerType>;
}
