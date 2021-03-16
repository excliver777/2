const Discord = require ('discord.js');

const dquiz = require ('./discord-quiz');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

const reactionData = require('./reaction.json')

const token = process.env.token;

dquiz.add_question('육댕의 학교와 집은 가까운 편이다', '가깝지 않다', ['가깝다', '너무 가깝다', '순간이동 ㅆㄱㄴ']); //퀴즈내용
console.log (dquiz.get_questions());
/**
 * 육댕은 얼불춤 고인물이다 / X
육댕의 본진은 다피쿤이다 / O
육댕의 본진은 한명이다 / X
육댕은 LG모니터를 쓴다 / O
육댕은 부자다 / X
육댕의 능지는 매우 부족하다 / X
육댕의 집은 2층에 있다 / O
육댕은 남자이다 / O
육댕은 미성년자이다 / O
 */

dquiz.add_question('육댕은 학교에 갈때 통학버스를 타고 간다 ', '타고간다', ['택시타고간다', '안타고간다', '자가용이있다']); //이어서 
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 늘 배가 고프다', '고프다', ['안고프다', '먹을거많다', '배 빵빵하다']); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 집돌이다', '집돌이다', ['아니다', '절대아니다', '죽어도 그런일은 없다']); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 관종이 아니다', '관종이다', [ '엄준식','관심을 싫어한다','아니다' ]); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕의 핸드폰 통신사는 SKT이다', 'SKT 아니다', [ 'SKT 이다','폰이없다', 'KT이다' ]); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 얼불춤 고인물이다', '아니다', [ '고수다', '쌉고수다', '17랩 껌이다' ]); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕의 본진은 다피쿤이다', '맞다', ['아니다', '절대아니다', '죽어도 그런일은 없다']); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕의 본진은 한명이다', '아니다', ['맞다', '매우맞다', '죽어도 맞다']); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 LG모니터를 쓴다', '맞다', ['맞다', '매우맞다', '죽어도 맞다']);  
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 부자다', '아니다', [ '개부자다', '빌게이츠 뺨치는 재산을 가지고 있다', '요플레 뚜껑 안핥아먹는다' ]); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕의 능지는 매우 부족하다', '부족하다', [ '안부족하다', '매우 안부족하다', '똑똑하다']); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕의 집은 2층에 있다', '맞다', ['아니다', '절대아니다', '죽어도 그런일은 없다']); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 남자이다', '맞다', ['아니다', '그럴수가 없다', '목소리부터가 다른데 남자일수가 없다' ]); 
console.log (dquiz.get_questions());
dquiz.add_question('육댕은 미성년자이다', '맞다', ['아니다', '절대아니다', '죽어도 그런일은 없다']); 
console.log (dquiz.get_questions());

client.on ('ready', () => {
    console.log (`Bot is ready under ${client.user.tag}`) //로그인
}) 

client.on ('message', (message) => {

    if (message.content.toLowerCase().startsWith('!퀴즈')) //퀴즈시작
        dquiz.quiz(message, 10, 'ffb7c5');

}) 


client.on('messageReactionAdd', async (reaction, user) => {  //반응 인증
  console.log(reaction)
  try {
      if(reactionData[reaction.message.id] !== undefined) { 
          await reaction.fetch()
          if(reaction._emoji.name === reactionData[reaction.message.id][0].reaction) {
              reaction.message.guild.members.fetch(user.id).then(member => {
                  member.roles.add(reactionData[reaction.message.id][0].roleid)
              })
          }
      }
  } catch (error) {
      console.log(error)
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  try {
      if(reactionData[reaction.message.id] !== undefined) { 
          await reaction.fetch()
          if(reaction._emoji.name === reactionData[reaction.message.id][0].reaction) {
              reaction.message.guild.members.fetch(user.id).then(member => {
                  member.roles.remove(reactionData[reaction.message.id][0].roleid)
              })
          }
      }
  } catch (error) {
      console.log(error)
  }
})

client.on('message', message => {
  if (message.content == "!프로필") {
  let embed = new Discord.MessageEmbed()
  .setTitle(`**${message.author.username}** 님의 프로필 입니다! `)
  .setColor(`#A9F5F2`)
  .setImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=2048`)
  message.channel.send(embed)
}})


client.on('message', message => {
  if (message.content == "!게임도움말") {
    let img = "https://cdn.discordapp.com/attachments/806818893368000564/819922449612275742/21M0l6AEgaL.png?size=252"
    let embed = new Discord.MessageEmbed()
      .setTitle("퀴즈 게임 , 가위바위보")
      .setAuthor("게임도움말")
      .setThumbnail(img)
      //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
      .addField(" |퀴즈 게임| = 먼저 `!퀴즈` 라는 명령어를 입력해주세요", "그러면 봇이 무작위로 문제를 드릴겁니다. \n처음문제는 버그가 있지만 다음문제시 버그없이 즐기실수있습니다.")
      .addField("|가위바위보|",  " = 채팅창에 가위, 바위 또는 보 를 입력해주세요. 봇이 상대해드립니다.", true)
      //.addField("Inline field title", "Some value here", true)
      //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
      .setTimestamp()
      .setFooter("Help Of 게임", img)
     
    message.channel.send(embed)
  }})

  client.on('message', message => {
    if (message.content == "!봇도움말") {
      let img = "https://cdn.discordapp.com/attachments/806818893368000564/819922449612275742/21M0l6AEgaL.png?size=252"
      let embed = new Discord.MessageEmbed()
        .setTitle("봇도움말")
        .setAuthor("도움말")
        .setThumbnail(img)
        //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
        .addField("!음악도움",  "음악기능의 대한 명령어입니다.", true)//
        .addField("!게임도움말",  "게임기능의 대한 명령어입니다.", true)//
        .addField("!프사",  "당신 또는 유저의 프로필을 보여줍니다.", true)//
        .addField("!유저기능",  "유저가 사용할수있는 서비스입니다.", true)
        .addField("!매니저",  "관리자 권한이있는 유저가 이 명령어를 실행할수있습니다", true)


        //.addField("",  "", true)
        //.addField("Inline field title", "Some value here", true)
        //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
        .setTimestamp()
        .setFooter("Help Of 봇도움말", img)
       
      message.channel.send(embed)
    }})


    client.on('message', message => {
      if (message.content == "!유저기능") {
        let img = "https://cdn.discordapp.com/attachments/806818893368000564/819922449612275742/21M0l6AEgaL.png?size=252"
        let embed = new Discord.MessageEmbed()
          .setTitle("유저도움말")
          .setAuthor("도움말")
          .setThumbnail(img)
          //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
          .addField("!코로나",  "대한민국 코로나 현황입니다.", true)//
          .addField("!핑",  "핑상태", true)//
          .addField("!골라 {단어1} {단어2}",  "봇이 무작위로 단어를 골라줍니다.", true)//
          .addField("!서버정보",  "해당서버에 서버정보를 보여줍니다.", true)
          .addField("!내정보",  "유저의 정보를 보여줍니다.", true)
  
  
          //.addField("",  "", true)
          //.addField("Inline field title", "Some value here", true)
          //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
          .setTimestamp()
          .setFooter("Help Of 유저기능", img)
         
        message.channel.send(embed)
      }})

      
    client.on('message', message => {
      if (message.content == "!매니저") {
        let img = "https://cdn.discordapp.com/attachments/806818893368000564/819922449612275742/21M0l6AEgaL.png?size=252"
        let embed = new Discord.MessageEmbed()
          .setTitle("매니저도움말")
          .setAuthor("도움말")
          .setThumbnail(img)
          //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
          .addField("!뮤트 {사용자} [사유]",  "유저를 뮤트합니다.", true)//
          .addField("!청소 [1~100]",  "메시지를 청소해줍니다.", true)//
          .addField("!언뮤트",  "유저의 뮤트권한을 해제합니다.", true)//
          //.addField("",  "", true)
          //.addField("Inline field title", "Some value here", true)
          //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
          .setTimestamp()
          .setFooter("Help Of 매니저기능", img)
         
        message.channel.send(embed)
      }})

  client.on('message', message => {
  if(message.content.startsWith('!프사')){
    
        
    if(message.mentions.users.size){
        let member=message.mentions.users.first()
    if(member){
        const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL({size: 2048})).setTitle(`${member.username}님의 프로파일 사진입니다.`)
        message.channel.send(emb)
        
    }
    else{
        message.channel.send("해당유저를 찾을수 없습니다.")

    }
    }else{
        const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL({size: 2048})).setTitle(`당신의 프로파일 사진입니다.`)
        message.channel.send(emb)
    }
}})

//__________________________________________



    const convertEmoji = (who) => { //가위바위보
        if(who === "가위"){
          return "✂️";
        }
        else if(who === "바위"){
          return "🪨";
        }
        else if(who === "보"){
          return "📰";
        }
      }
      
      client.on('message', msg => {  //이건몰름 왜만들었는지도 모르겠다 ㅋㅋㅋㅋ
        if(msg.content === "야"){
          msg.channel.reply("?");
        }

             //게임 시작let embed = new Discord.MessageEmbed()
        if(msg.content === "가위" || msg.content === "바위" || msg.content === "보") {
          const human = msg.content;
          const list = ["가위", "바위", "보"];
          const random = Math.floor(Math.random() * 3);
          const bot = list[random];
          let winner = "";
      
          if(human === bot) {
            winner = "비김";
          }
          else {
            human === "가위" ? (winner = bot === "바위" ? "`봇`" : "`당신`") : "";
            human === "바위" ? (winner = bot === "보" ? "`봇`" : "`당신`") : "";
            human === "보" ? (winner = bot === "가위" ? "`봇`" : "`당신`") : "";
          }
      
          const result =
          `
          당신: ${convertEmoji(human)} vs 봇: ${convertEmoji(bot)}
          ${winner === "비김" ? "비겼네요!" : winner + "이 이겼습니다 🎉"}
          `
              msg.reply(result);
            }
      
      });
      

client.login(token);