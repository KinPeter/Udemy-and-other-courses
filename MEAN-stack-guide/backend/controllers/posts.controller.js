const Post = require('../models/post');

exports.createPost = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });
    console.log('NEW POST: ', post.title);
    post.save().then((createdPost) => {
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                id: createdPost._id,
                title: createdPost.title,
                conent: createdPost.content,
                imagePath: createdPost.imagePath
            }
        });
    })
    .catch((err) => {
        res.status(500).json({ message: 'Creating a post failed.' });
    });
};

exports.updatePost = (req, res) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const id = req.params.id;
    console.log('UPDATE: ', id);
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    Post.updateOne({ _id: id, creator: req.userData.userId }, post)
    .then(result => {
        // console.log(result);
        if (result.nModified > 0) {
            res.status(200).json({ message: 'Post updated' });
        } else {
            res.status(401).json({ message: 'Not Authorized!' });
        }
    })
    .catch((error) => {
        res.status(500).json({ message: 'Updating a post failed.' });
    });
};

exports.getPosts = (req, res) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
    .then((documents) => {
        fetchedPosts = documents;
        return Post.countDocuments();
    })
    .then((count) => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: fetchedPosts,
            maxPosts: count
        });
        console.log('GET ALL: ' + count + ' posts');
    })
    .catch((error) => {
        res.status(500).json({ message: 'Fetching posts failed.' });
    });
};

exports.getPost = (req, res) => {
    Post.findById(req.params.id)
    .then((document) => {
        if (document) {
            res.status(200).json({
                message: 'Post fetched successfully',
                post: document
            });
            console.log('GET: ', document.title);
        } else {
            res.status(404).json({
                message: 'Post not found!'
            });
        }
    })
    .catch((error) => {
        res.status(500).json({ message: 'Fetching the post failed.' });
    });
};

exports.deletePost = (req, res) => {
    const id = req.params.id;
    console.log('DELETE: ', id);
    Post.deleteOne({ _id: id, creator: req.userData.userId })
    .then(result => {
        // console.log(result);
        if (result.n > 0) {
            res.status(200).json({ message: 'Post deleted' });
        } else {
            res.status(401).json({ message: 'Not Authorized!' });
        }
    })
    .catch((error) => {
        res.status(500).json({ message: 'Deleting the post failed.' });
    });
};
