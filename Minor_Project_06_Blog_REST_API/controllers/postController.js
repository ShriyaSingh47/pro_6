const { randomUUID } = require('crypto');
const { readPosts, writePosts } = require('../services/postStorage');
const { validatePost } = require('../utils/validatePost');

function createPost(req, res, next) {
  try {
    const errors = validatePost(req.body, true);
    if (errors.length) return res.status(400).json({ success:false, message:'Validation failed', errors });
    const posts = readPosts(), now = new Date().toISOString();
    const post = { id:randomUUID(), title:req.body.title.trim(), content:req.body.content.trim(),
      authorName:req.body.authorName.trim(), category:req.body.category.trim(), createdDate:now, updatedDate:now };
    posts.unshift(post); writePosts(posts);
    res.status(201).json({ success:true, message:'Blog post created successfully', data:post });
  } catch (e) { next(e); }
}
function getAllPosts(req, res, next) {
  try {
    let posts = readPosts();
    const { search, category, author } = req.query;
    if (search) { const q=search.toLowerCase(); posts=posts.filter(p=>p.title.toLowerCase().includes(q)||p.content.toLowerCase().includes(q)); }
    if (category) posts=posts.filter(p=>p.category.toLowerCase()===category.toLowerCase());
    if (author) posts=posts.filter(p=>p.authorName.toLowerCase().includes(author.toLowerCase()));
    const page=Math.max(1,parseInt(req.query.page,10)||1), limit=Math.min(100,Math.max(1,parseInt(req.query.limit,10)||10));
    const totalItems=posts.length, totalPages=Math.ceil(totalItems/limit);
    posts=posts.slice((page-1)*limit,page*limit);
    res.status(200).json({success:true,count:posts.length,pagination:{currentPage:page,pageSize:limit,totalItems,totalPages},data:posts});
  } catch(e) { next(e); }
}
function getPostById(req,res,next) {
  try { const post=readPosts().find(p=>p.id===req.params.id);
    if(!post) return res.status(404).json({success:false,message:`No blog post found with ID: ${req.params.id}`});
    res.status(200).json({success:true,data:post});
  } catch(e) { next(e); }
}
function updatePost(req,res,next) {
  try {
    const errors=validatePost(req.body,false);
    if(errors.length) return res.status(400).json({success:false,message:'Validation failed',errors});
    const posts=readPosts(), i=posts.findIndex(p=>p.id===req.params.id);
    if(i<0) return res.status(404).json({success:false,message:`No blog post found with ID: ${req.params.id}`});
    for(const f of ['title','content','authorName','category']) if(req.body[f]!==undefined) posts[i][f]=req.body[f].trim();
    posts[i].updatedDate=new Date().toISOString(); writePosts(posts);
    res.status(200).json({success:true,message:'Blog post updated successfully',data:posts[i]});
  } catch(e) { next(e); }
}
function deletePost(req,res,next) {
  try {
    const posts=readPosts(), i=posts.findIndex(p=>p.id===req.params.id);
    if(i<0) return res.status(404).json({success:false,message:`No blog post found with ID: ${req.params.id}`});
    const [deleted]=posts.splice(i,1); writePosts(posts);
    res.status(200).json({success:true,message:'Blog post deleted successfully',data:deleted});
  } catch(e) { next(e); }
}
module.exports={createPost,getAllPosts,getPostById,updatePost,deletePost};
