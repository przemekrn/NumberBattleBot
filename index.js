    const { Client,GatewayIntentBits, Message } = require('discord.js');
    const { TOKEN } = require("./config")
    require('dotenv').config();
    const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    })
    const StartWords=[
        "Zagrajmy",
        "Start",
        "//",
        "Battle",
    ]
    const WonWords=[
        "zatwa wygrana😎",
        "zostałeś pokonany!",
        "hahahaha",
    ]
    const LosesWords=[
        "😕",
        "miałem pecha!",
    ]
    
    var readyForBattle=true;
    let minNum;
    let maxNum;
    client.login(TOKEN)
    client.on("messageCreate",(Message)=>{
        if (Message.author.bot) return
        if(readyForBattle)
        {
            readyForBattle=false;
            const content = Message.content.toLowerCase();
            if((StartWords.some(phrase => content.includes(phrase.toLowerCase())))){
                Message.reply("Dobrze, podaj mi zatem swoją liczbę, musi być ona z przedziału od 0 do 10");
            }
        }
       
        else if(!readyForBattle)
        {
                const messageContentAsNumber = parseFloat(Message.content);
                if(!isNaN(messageContentAsNumber))
                {
                    someFun(messageContentAsNumber,Message);
                }
                else
                {
                    Message.reply("Nie podałeś liczby");
                }
        }
        
    })
    function someFun(playerNumber,Message)
    {
        let drawnNumber;
        if(playerNumber==10)
        {
            drawnNumber=10.1;
            CheckingResoults(drawnNumber,playerNumber,Message);
            readyForBattle=true;
        }
        else
        {
            drawnNumber = NumberGenerator(0,10);
            CheckingResoults(drawnNumber,playerNumber,Message);
            readyForBattle=true;
        }
    }
    function NumberGenerator(min, max) {
    const losowaLiczba = Math.random() * (max - min) + min;
    const zaokraglonaLiczba = parseFloat(losowaLiczba.toFixed(1)); 
    return zaokraglonaLiczba;
    } 
    function CheckingResoults(botNumber,playerNumber,Message)
    {
        const botResoult=`Moja liczba to ${botNumber} `;

        const randomPhrase = botNumber > playerNumber
        ? WonWords[Math.floor(Math.random() * WonWords.length)]
        : LosesWords[Math.floor(Math.random() * LosesWords.length)];;
      
        Message.reply(botResoult+randomPhrase);
    }
