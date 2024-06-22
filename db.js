// var mysql      = require('mysql2');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123456',
//   database : 'gcovanoti',
//   dateStrings : 'date'
// });

// // 게시판
//   function insertNoti(title, content, writer, password, callback){ //router 매개변수 순서맞추기
//     console.log(title)
//     connection.query(`INSERT INTO  notice_table(title_notice,content_notice,createDate_notice,write_notice,pw_notice) VALUES('${title}','${content}',NOW(),'${writer}','${password}')`
//     ,(err)=>{ //에러를 프론트단으로 보내줘
//       if(err) throw err;
//       console.log('완료')
//       callback()
//     })
//   }

//   function getNotiAll(callback){ //DESC역순
//     connection.query('select * from notice_table order by id_notice DESC',(err,rows)=>{ 
//       if(err) throw err;
//       console.log('완료')
//       callback(rows);
//     })
//     }

//   function getNotiID(id,callback){
//     connection.query(`select * from notice_table WHERE id_notice = ${id}`,(err,row)=>{
//       if(err) throw err;
//       console.log('완료')
//       callback(row);
//     })
//   }

//   function deleteNotiID(id,callback){
//     connection.query(`DELETE FROM notice_table WHERE id_notice = ${id}`,(err)=>{
//       if(err) throw err;
//       console.log('완료')
//       callback();
//     })
//   }

//   function updateNoti(id,tit,cont,writer,pw,callback){
//     connection.query(`UPDATE notice_table SET title_notice='${tit}',content_notice='${cont}',write_notice='${writer}',pw_notice='${pw}' WHERE id_notice = ${id}`,(err)=>{
//       if(err) throw err;
//       console.log('완료')
//       callback();
//     })
    
//   }
// // 파일업로드
//   function insertImg(tit,img,callback){
//     console.log(tit)
//     connection.query(`INSERT INTO imageitem(create_time, title, images) VALUES(NOW(),'${tit}','${img}')`
//     ,(err)=>{
//       if(err) throw err;
//       console.log('완료')
//       callback()
//     })
//   }

//   function getImgAll(callback){ //DESC역순
//     connection.query('select * from imageitem order by id DESC',(err,rows)=>{ 
//       if(err) throw err;
//       console.log('완료')
//       callback(rows);
//     })
//     }

//   function getImgID(id,callback){
//       connection.query(`select * from imageitem WHERE id = ${id}`,(err,row)=>{
//         if(err) throw err;
//         console.log('완료')
//         callback(row);
//       })
//     }

//   function deleteImgID(id,callback){
//       connection.query(`DELETE FROM imageitem WHERE id = ${id}`,(err)=>{
//         if(err) throw err;
//         console.log('완료')
//         callback();
//       })
//     }

//     function updateImg(id,tit,img,callback){
//       connection.query(`UPDATE imageitem SET title ='${tit}', images='${img}' WHERE id = ${id}`,(err)=>{
//         if(err) throw err;
//         console.log('완료')
//         callback();
//       })
      
//     }

//   module.exports={
//     insertNoti,
//     getNotiID,
//     getNotiAll,
//     deleteNotiID,
//     updateNoti,

//     insertImg,
//     getImgAll,
//     getImgID,
//     deleteImgID,
//     updateImg,
//   }