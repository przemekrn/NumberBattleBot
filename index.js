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
        "łatwa wygrana😎",
        "zostałeś pokonany!",
        "hahahaha",
    ]
    const LosesWords=[
        "😕",
        "miałem pecha!",
    ]

    var readyForBattle=new Map();
    client.login(TOKEN)
    client.on("messageCreate",(Message)=>{
        if (Message.author.bot) return
        if (!readyForBattle.has(Message.author.id))
        {
            const content = Message.content.toLowerCase();
            if((StartWords.some(phrase => content.includes(phrase.toLowerCase())))){
                Message.reply("Dobrze, podaj mi zatem swoją liczbę, musi być ona z przedziału od 0 do 10");
                readyForBattle.set(Message.author.id, true);
                setTimeout(() => {
                    if (readyForBattle.has(Message.author.id)) {
                      Message.reply(`Za długo czekałem na twoją liczbę, aby zagrać ze mną wpisz ponownie: "//" bądź "Start" `);
                      readyForBattle.delete(Message.author.id);
                    }
                  }, 15000);
            }
        }
       
        else if(readyForBattle.has(Message.author.id))
        {
                const messageContentAsNumber = parseFloat(Message.content);
                if(!isNaN(messageContentAsNumber))
                {
                    someFun(messageContentAsNumber,Message);
                }
                else
                {
                    Message.reply("Prosze wpisać liczbę");
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
        }
        else
        {
            drawnNumber = NumberGenerator(0,10);
            CheckingResoults(drawnNumber,playerNumber,Message);
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
        readyForBattle.delete(Message.author.id);
    }
