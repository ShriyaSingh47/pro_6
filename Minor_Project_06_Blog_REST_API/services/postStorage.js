const fs=require('fs'), path=require('path');
const dir=path.join(__dirname,'..','data'), file=path.join(dir,'posts.json');
function ensure(){if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});if(!fs.existsSync(file))fs.writeFileSync(file,'[]\n','utf8');}
function readPosts(){ensure();try{const d=JSON.parse(fs.readFileSync(file,'utf8'));return Array.isArray(d)?d:[];}catch{const e=new Error('Invalid JSON in posts data file');e.statusCode=500;throw e;}}
function writePosts(posts){ensure();fs.writeFileSync(file,JSON.stringify(posts,null,2)+'\n','utf8');}
module.exports={readPosts,writePosts};
