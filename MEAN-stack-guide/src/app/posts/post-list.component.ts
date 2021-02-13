import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../interfaces';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    public posts: Post[] = [];
    public isLoading = false;
    private postsSub: Subscription;
    private authSub: Subscription;
    public isAuth = false;
    public totalPosts = 10;
    public postsPerPage = 2;
    public currentPage = 1;
    public pageSizeOptions = [1, 2, 5, 10];
    public userId: string;

    constructor(
        public ps: PostService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.ps.getPosts(this.postsPerPage, this.currentPage);
        this.postsSub = this.ps.getPostsUpdateListener()
        .subscribe((postData: {posts: Post[], postCount: number}) => {
            this.posts = postData.posts;
            this.totalPosts = postData.postCount;
            this.isLoading = false;
        });
        this.authSub = this.auth.getAuthStatus().subscribe((result) => {
            this.isAuth = result;
            this.userId = this.auth.getUserId();
        });
        this.userId = this.auth.getUserId();
        console.log('LIST comp userID: ', this.userId);
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.ps.deletePost(postId).subscribe(() => {
            this.ps.getPosts(this.postsPerPage, this.currentPage);
        });
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.ps.getPosts(this.postsPerPage, this.currentPage);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authSub.unsubscribe();
    }

}
