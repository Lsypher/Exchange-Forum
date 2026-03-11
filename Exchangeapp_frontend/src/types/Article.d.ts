export interface Article {
    ID: number;
    title: string;
    preview: string;
    content: string;
    category?: string;
    tags?: string;
    author?: Author;
    CreatedAt?: string;
    views?: number;
    likes?: number;
    isFavorited?: boolean;
}

export interface Author {
    ID?: number;
    username: string;
    avatar?: string;
    bio?: string;
}

export interface Like {
    likes: number
}

export interface Comment {
    id: number;
    articleId: number;
    author: Author;
    content: string;
    CreatedAt: string;
    replies?: Comment[];
}