//경로전환 / 다른페이지들 연결
const express = require('express');
const router = express.Router();
const {check, validationResult, cookie} = require('express-validator');
const db = require('../db');
const path = require('path');

const multer  = require('multer'); //multer 연결
const { compile } = require('ejs');
// const upload = multer({ dest: 'img2/' })
//이미지저장 폴더없으면 만들어줘
const upload = multer({ 
  //파일명 저장
  storage:multer.diskStorage({
    destination: function (req, file, done) {
      done(null, './public/img2')
    },
    filename: function (req, file, done) {
      const ux = path.extname(file.originalname) //파일확장자만 뽑는거 img(basename).jpg(orignalname)
      done(null, path.basename(file.originalname,file.originalname)+'-'+Date.now()+ux)//파일명-날짜.확장자
    }
  }),
  limits:{
    fileSize : 1024*1024*1//메가바이트 //사진크기 //2메가바이트넘으면X
  }
})

// 페이지 연결
  router.route('/').get(function (req, res) { //메인연결
    res.cookie('id','userId',{maxAge : 10000})
    console.log(req.cookies.id)
    res.render('app.ejs') //render 내부페이지연결
  
  })
  // 쿠키
router.get('/cookie',(req,res)=>{
  res.render('cookie.ejs')
})
router.post('/cookie', (req,res)=>{
  let text = req.body.text;
  res.cookie('id',text)
  console.log(req.cookies.user)
  res.redirect('/')
})

  router.route('/sub1_1').get(function (req, res) { 
    res.render('sub1_1.ejs')
  })
  router.route('/sub1_2').get(function (req, res) { 
    res.render('sub1_2.ejs')
  })
  router.route('/sub1_3').get(function (req, res) { 
    res.render('sub1_3.ejs')
  })
  router.route('/sub1_4').get(function (req, res) { 
    res.render('sub1_4.ejs')
  })
  router.route('/notiWrite').get(function (req, res) {
    res.render('notice_write.ejs')
  })

  // 공지사항 게시판
  // 입력하기
  router.post('/noti',[check('title').isLength({min:1,max:100})],(req,res)=>{ //form action 
    let errs = validationResult(req);
      // console.log(errs);
    if(errs['errors'].length>0){
      res.render('notice_write.ejs',{errs:errs['errors']}) //noti_write 에러메세지
    }else{
      let params = JSON.parse(JSON.stringify(req.body)); //한번에 불러오기
          console.log(params)
          let tit = params['title']; //함수로 db로보내기 , 매개변수 맞추기 [notice_write form name]
          let cont = params['cont'];
          let writer = params['writer'];
          let pw = params['pw']
          db.insertNoti(tit, cont, writer, pw, ()=>{ // 매개변수 순서중요
            res.redirect('/notiList')
          })
    }
  })

  router.get('/notiList',(req,res)=>{
    let page = req.query.page;
    db.getNotiAll((rows)=>{
      console.log(rows)
      res.render('notice_list.ejs',{
        rows : rows, 
        page : page, 
        leng : Object.keys(rows).length-1, //if문 과 동일하게만드려고
        page_list: 5, 
        pass: true
      })
    })
  })
  
// 상세페이지
  router.get('/detail',(req,res)=>{
    let id = req.query.id;
    db.getNotiID(id,(row)=>{
      res.render('notice_detail.ejs',{row:row[0]})
    })
  })

// 삭제
router.get('/delete',(req,res)=>{
  let id = req.query.id;
  db.deleteNotiID(id,()=>{
    res.redirect('/notiList?page=1')
  })
})

// 수정
router.get('/update',(req,res)=>{
    let id = req.query.id;
    db.getNotiID(id,(row)=>{
      res.render('notice_update.ejs',{row:row[0]})
    })
  })

router.post('/updateNoti',(req,res)=>{
    let errs = validationResult(req);
    console.log(errs);
    if(errs['errors'].length>0){
      res.render('notice_update.ejs',{errs:errs['errors']}) //noti_write 에러메세지
    }else{
      let params = JSON.parse(JSON.stringify(req.body)); //한번에 불러오기
          console.log(params)
          let id = params['id']
          let tit = params['title']; //함수로 db로보내기 , 매개변수 맞추기 [notice_write form name]
          let cont = params['cont'];
          let writer = params['writer'];
          let pw = params['pw']
          db.updateNoti(id,tit, cont, writer, pw, ()=>{ // 매개변수 순서중요
            res.redirect('/notiList')
          })
    }
  })

  // 파일업로드
  // 입력

router.get('/newitemWrite',(req,res)=>{
    res.render('newitem_write.ejs')
  })

router.post('/itemWrite',upload.single('fileName'),(req,res)=>{
  let errs = validationResult(req);
  console.log(errs);
  if(errs['errors'].length>0){
    res.render('newitem_write.ejs',{errs:errs['errors']})
  }else{
    let params = JSON.parse(JSON.stringify(req.body));
        console.log(params)
        let tit = params['title']; //form 태그 name
        let img = 'img2/'+ req.file.filename;
        db.insertImg(tit, img, ()=>{ // 매개변수 순서중요
          res.redirect('/newitemlist')
        })
  }
})

router.get('/newitemlist',(req,res)=>{
  let page = req.query.page;
  console.log(page)
  db.getImgAll((rows)=>{
    res.render('newitemlist.ejs',{
        rows : rows, 
        page : page, 
        leng : Object.keys(rows).length-1,
        page_list: 5, 
        pass: true
    })
  })
})

router.get('/detail2',(req,res)=>{
  let id = req.query.id;
  db.getImgID(id,(row)=>{
    res.render('newitem_detail.ejs',{row:row[0]})
  })
})

// 삭제
router.get('/delete2',(req,res)=>{
  let id = req.query.id;
  db.deleteImgID(id,()=>{
    res.redirect('/newitemlist')
  })
})

router.get('/update2',(req,res)=>{
  let id = req.query.id;
  db.getImgID(id,(row)=>{
    res.render('newitem_update.ejs',{row:row[0]})
  })
})

router.post('/updateImg',upload.single('fileName'),(req,res)=>{
  let errs = validationResult(req);
  console.log(errs);
  if(errs['errors'].length>0){
    res.render('newitem_update.ejs',{errs:errs['errors']}) //noti_write 에러메세지
  }else{
    let params = JSON.parse(JSON.stringify(req.body)); //한번에 불러오기
        console.log(params)
        let id = params['id']
        let tit = params['title'];
        let img = 'img2/'+ req.file.filename;
        db.updateImg(id, tit, img, ()=>{ // 매개변수 순서중요
          res.redirect('/newitemlist')
        })
  }
})

module.exports = router; //모듈화 내보내기

