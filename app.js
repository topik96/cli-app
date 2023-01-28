#!/usr/bin/env node
const prog = require('caporal');
const fs = require('fs')
const xlsx = require('node-xlsx');
const webshot = require('webshot')
prog
  // 1.
  .version('1.0.0')
  // LOWERCASE
  .command('lowercase', 'lowercase')
  .argument('<string>', 'argumen s')
  .action(function(args, options, logger) {
    var a = args.string.toLowerCase();
    logger.info(a) 
  })
  //UPPERCASE
  .command('uppercase','uppercase')
  .argument('<string>', 'nilai input')
  .action(function(args, options, logger) {
    var a = args.string.toUpperCase();
    console.log(a)
    
  })
  //CAPITALIZE
  .command('capitalize','title Case')
  .argument('<string>','nilai input')
  .action(function(args,options,logger){
    let a = args.string
    a = a.split(' ')
    a = a.map(num=>{
        num = num.charAt(0).toUpperCase() + num.slice(1)
        return num
    })
    console.log(a.join(' '))
  })

  //2.
  .command('add','tambah')
  .argument('[num...]', 'input array')
  .action(function(args,options,logger){
  let tot=0
  args.num.map(num=>{
     tot+=parseInt(num)
  })
  console.log("yang buat topik mujianto")
  console.log ("ini punya hilya")
  console.log ("I AM STARVING")
  console.log(tot)
  })
  //SUBSTRACT
  .command('subtract','kurangin')
  .argument('[num...]', 'input array')
  .action(function(args,options,logger){
  let total = args.num[0]
  for(let i=1;i<args.num.length;i++){
      total-=parseInt(args.num[i])
  }
  console.log(total)
  })
  //MULTIPLY
  .command('multiply','tambah')
  .argument('[num...]', 'input array')
  .action(function(args,options,logger){
  let tot=args.num[0]
  for(let i=1; i<args.num.length;i++){
      tot*=parseInt(args.num[i])
  }
  console.log(tot)
  })
  //DIVIDE
  .command('divide','tambah')
  .argument('[num...]', 'input array')
  .action(function(args,options,logger){
  let tot=args.num[0]
  for(let i=1;i<args.num.length;i++){
      tot/=parseInt(args.num[i])
  }
  console.log(tot)
  })

//3
.command('palindrome', 'palindrome command')
.argument('<string>', 'argumens')
.action(function(args, options, logger) {
  var str = args.string
  var temp =''
  var pola = /[^0-9a-zA-Z]/g
  str = str.replace(pola,'').toLowerCase()
  for(var i=str.length-1;i>=0;i--){
      temp += str[i];
  }
      if(str===temp){
          logger.info("String: "+str)
          logger.info('Is palindrome? '+true)
      }else{
          logger.info("String: "+str)
          logger.info('Is palindrome? '+false)
      }
})

//4
.command('obfuscate', 'obfuscate command')
.argument('<string>', 'input string')
.action(function(args, options, logger) {
  console.log(args.string);
  let str = args.string
  str = str.split('')
  var result='';
  for(let i=0;i<str.length;i++){
        result += '&#'+str[i].charCodeAt()+';'
  }
  console.log(result)
})
console.log ("i am learnign git")

//5
.command('random', 'random command')
.option('--length','untuk kondisi',prog.INT,32)
.option('--letters','letter',prog.BOOL)
.option('--numbers','number',prog.BOOL)
.option('--uppercase','uppercase',prog.BOOL)
.option('--lowercase','lowercase',prog.BOOL)
.action(function(args, options, logger){
  
  function randomChar() {
      var text = "";
      var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      if(options.letters==false){
          char = char.replace(/[^0-9]/g,'')
      }else if(options.numbers==false){
          char = char.replace(/[^a-zA-Z]/g,'') 
      }else if(options.lowercase){
          char = char.replace(/[^a-z0-9]/g,'')
      }else if(options.uppercase){
              char = char.replace(/[^A-Z0-9]/g,'')
      }

      for (var i = 0; i < options.length; i++)
          text += char.charAt(Math.floor(Math.random() * char.length));
          return text;
  }    
console.log(randomChar())      
})

//6
  .command('ip', 'ip command')
  .action(function(args, options, logger) {
  var process = require('child_process');
  process.exec('ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk \'{print $2}\' ',function (err,stdout,stderr) {
    if (err) {
        console.log("\n"+stderr);
    } else {
        console.log(stdout);
    }
  })
  })
//7
  .command('ip-external', 'ip command')
  .action(function(args, options, logger) {
  var process = require('child_process');
  process.exec('curl -s checkip.dyndns.org | sed -e \'s/.*Current IP Address: //\' -e \'s/<.*$//\'  ',function (err,stdout,stderr) {
    if (err) {
        console.log("\n"+stderr);
    } else {
        console.log(stdout);
    }
  })
  })

//8
  .command('headlines', 'ip command')
  .action(function(args, options, logger) {
    var request = require('request')
    var cheerio = require('cheerio')
    request('https://www.kompas.com/', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('a.article__link').each(function(i, element){
              console.log('Title: '+$(this).text());
              console.log('URL : '+$(this).attr('href'))
              console.log('\n')
            });
          }
        
  })
  })

  //9
  .command('convert','convert command')
  .argument('<before>','input before')
  .argument('<after>','after convert')
  .action(function(args, options, logger){
      let obj = xlsx.parse(__dirname + `/${args.before}`); // parses a file
      let rows = [];
      let writeStr = "";
      for(var i = 0; i < obj.length; i++){
          var sheet = obj[i];
          //looping row
          for(var j = 0; j < sheet['data'].length; j++){
          //add the row to the rows array
          rows.push(sheet['data'][j]);
          }
      }
      //creates the csv string to write it to a file
      for(var i = 0; i < rows.length; i++) writeStr += rows[i].join(",") + "\n";
      //writes to a file, but you will presumably send the csv as a      
      //response instead
      fs.writeFile(__dirname + `/${args.after}`, writeStr, function(err) {
          if(err) {
          return console.log(err);
       }
       console.log("test.csv was saved!");
  })
  })

//10
.command('screenshot', 'ip command')
.argument('<url>','input url')
.option('--format','extension png',prog.STRING, 'png')
.option('--output','nama',prog.STRING,'screenshot-00')
.action(function(args, options, logger) {
let dir = `./${options.output}1.png`; //filename
//FUNCTION
function callScreenshot(link,num,ext){
  let output = options.output
      output = output.split('.')
  if(options.output!== 'screenshot-00'){
    if(num==1) num = ''
    webshot(`${link}`,`${output[0]}.${output[1]}`, (err) => {
      if(err) return console.log(err)
  });
  }else{
    webshot(`${link}`,`${options.output}${num}.${ext}`, (err) => {
      if(err) return console.log(err)
  });
  }
}

let numberOfFiles = 1
fs.readdirSync('./').forEach(num=>{
if(num.includes('screenshot')) numberOfFiles++
})

if (fs.existsSync(dir)) callScreenshot(args.url,numberOfFiles,options.format)
else callScreenshot(args.url,1,options.format)
})

//11
.command('screenshot-list','ss command')
    .argument('<url>','argument url')
    .option('--format','output image',prog.STRING,'jpg')
    .action(function(args,options,logger){
        let file = fs.readFileSync(`./${args.url}`,'utf8')
            file = file.split('\n')
        file.map(num=>{
            fullpath = num.split('/').pop()
            webshot(num,`${fullpath}.${options.format}`,err=>{
                if(err) console.log(err)
                else console.log(`from ${num} success`)
            })  
        })
    })

  //12.version('1.0.0')
  .command('movies', 'ip command')
  .action(function(args, options, logger) {
    var request = require('request')
    var cheerio = require('cheerio')
    let domain = 'https://www.cgv.id/'
    request('https://www.cgv.id/en/movies/now_playing', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
           // console.log($('.movie-list-body').children().html())
            $('.movie-list-body>ul li a').each(function(i, element){
              let link = domain+$(this).attr('href')
              request(link, function(err, res, htm){
                if (!err && res.statusCode ==200){
                    let $ = cheerio.load(htm)
                    $('.movie-add-info>ul li').each(function(i,element){
                      console.log($(this).text()) 
                    })
                    logger.info('SYNOPSIS : '+($('.movie-synopsis').text()).trim())
                    console.log('\n')
                }
              })

              
              
            });
          }
    });
  });


prog.parse (process.argv);
