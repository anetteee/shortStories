
export type Post = {
    _id: String;
    id: number;
    title: String;
    body: String;
    userId: number;
    tags: String[];
    reactions: number;
}

export type FetchResult = {
    getPost: getPostResponse;
}

export type getPostResponse = {
    posts: Post[];
    count: number;
}

export type StoryProps = {
    inventory: Post;
}