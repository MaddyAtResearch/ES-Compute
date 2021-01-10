class User {
    id: number
    username: string
    email: string
}
export class Post {
    id?: number
    title: string
    cover_img: string
    content: string
    author?: User
    created?: string
}