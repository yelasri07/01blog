import { blogInterface } from "../../features/blogs/interfaces/blog.interface";
import { User } from "./user.interface";

export interface searchInterface {
    users: User[],
    blogs: blogInterface[]
}