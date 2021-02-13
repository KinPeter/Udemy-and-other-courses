import { Injectable } from '@angular/core';
import { Post } from '../interfaces';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private posts: Post[] = [];
    private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getPosts(postsPerPage: number, currentPage: number): void {
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http.get<any>('http://localhost:3000/api/posts' + queryParams)
        .pipe(map((response) => {
            return {
                // tslint:disable-next-line: no-shadowed-variable
                posts: response.posts.map((post) => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath,
                        creator: post.creator
                    };
                }),
                maxPosts: response.maxPosts
            };
        }))
        .subscribe((postData: any) => {
            this.posts = postData.posts;
            this.postsUpdated.next({posts: [...this.posts], postCount: postData.maxPosts});
        });
    }

    getPostsUpdateListener(): Observable<{posts: Post[], postCount: number}> {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        // return {...this.posts.find(post => post.id === id)};
        return this.http.get('http://localhost:3000/api/posts/' + id);
    }

    addPost(title: string, content: string, image: File): void {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.http.post<any>('http://localhost:3000/api/posts', postData)
        .subscribe((response) => {
            this.router.navigate(['/']);
        });
    }

    updatePost(id: string, title: string, content: string, image: File | string): void {
        let postData: FormData | Post;
        if (typeof(image) === 'object') {
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        } else {
            postData = { id, title, content, imagePath: image, creator: null };
        }
        this.http.put('http://localhost:3000/api/posts/' + id, postData)
        .subscribe((response) => {
            this.router.navigate(['/']);
        });
    }

    deletePost(postId: string) {
        return this.http.delete('http://localhost:3000/api/posts/' + postId);
    }

}
