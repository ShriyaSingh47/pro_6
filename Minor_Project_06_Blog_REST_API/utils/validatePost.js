const fields=['title','content','authorName','category'];
function validatePost(body,all){
 const errors=[];
 if(!body||typeof body!=='object'||Array.isArray(body)) return ['Request body must be a JSON object'];
 for(const f of fields){const v=body[f];if(all&&(typeof v!=='string'||!v.trim()))errors.push(`${f} is required and must be a non-empty string`);else if(v!==undefined&&(typeof v!=='string'||!v.trim()))errors.push(`${f} must be a non-empty string when provided`);}
 const unknown=Object.keys(body).filter(k=>!fields.includes(k));if(unknown.length)errors.push(`Unknown field(s): ${unknown.join(', ')}`);
 if(!all&&!fields.some(f=>body[f]!==undefined))errors.push('Provide at least one field to update');
 if(typeof body.title==='string'&&body.title.trim().length>150)errors.push('title must be 150 characters or fewer');
 if(typeof body.category==='string'&&body.category.trim().length>60)errors.push('category must be 60 characters or fewer');
 if(typeof body.authorName==='string'&&body.authorName.trim().length>100)errors.push('authorName must be 100 characters or fewer');
 return errors;
}
module.exports={validatePost};
