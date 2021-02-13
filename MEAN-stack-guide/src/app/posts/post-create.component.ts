import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    public title = '';
    public content = '';
    private mode = 'create';
    private postId: string;
    public post: Post;
    public isLoading = false;
    public form: FormGroup;
    public imagePreview: string;

    constructor(
        public ps: PostService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            content: new FormControl(null, {
                validators: [Validators.required]
            }),
            image: new FormControl(null, {
                validators: [Validators.required],
                // asyncValidators: [mimeType]
            })
        });
        this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.has('postId')) {
                this.isLoading = true;
                this.mode = 'edit';
                this.postId = params.get('postId');
                this.ps.getPost(this.postId).subscribe((response: any) => {
                    this.isLoading = false;
                    this.post = {
                        id: response.post._id,
                        title: response.post.title,
                        content: response.post.content,
                        imagePath: response.post.imagePath,
                        creator: response.post.creator
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        image: this.post.imagePath
                    });
                    this.imagePreview = this.post.imagePath;
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        this.isLoading = true;
        const post: Post = {
            title: this.form.value.title,
            content: this.form.value.content,
            imagePath: null,
            creator: null
        };
        if (this.mode === 'create') {
            this.ps.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
        } else {
            this.ps.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
        }
        this.form.reset();
    }
}
