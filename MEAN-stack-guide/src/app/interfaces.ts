export interface Post {
    id?: string;
    title: string;
    content: string;
    imagePath: string;
    creator: string;
}

export interface PostDTO {
    message: string;
    posts: Post[];
}

export interface AuthData {
    email: string;
    password: string;
}

export interface User {
    email: string;
    id: string;
}
