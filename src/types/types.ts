export type OptionsType = {
    value: string
    name: string
}

type ImageLinksType = {
    thumbnail: string
    smallThumbnail: string
}

export type VolumeInfoType = {
    title: string
    authors: Array<string>
    imageLinks: ImageLinksType
    categories: Array<string>
    description: string

}

export type BookType = {
    kind: string
    id: string
    etag: string
    selfLink: string
    volumeInfo: VolumeInfoType
}

export type RequestBooksType = {
    items: Array<BookType>
    totalItems: number
    description: string
    categories: Array<string>
}