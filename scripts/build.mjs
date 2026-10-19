import {mkdir,rm,copyFile,cp} from 'node:fs/promises';
const root=new URL('../',import.meta.url),dist=new URL('dist/',root);
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const name of ['index.html','app.js','catalogue.mjs','unit2-learn.mjs','unit2-week.mjs','unit2-week-data.mjs','unit2-week.css','unit2-journey.mjs','unit2-journey-data.mjs','unit2-journey.css','progress.mjs','engine.mjs','explore.mjs','play.mjs','play-engine.mjs','style.css','explore.css','play.css'])await copyFile(new URL(name,root),new URL(name,dist));
for(const name of ['data','assets','activity-library'])await cp(new URL(name,root),new URL(name,dist),{recursive:true});
console.log('Static application packaged in dist/');
