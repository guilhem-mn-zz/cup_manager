const Discord = require('discord.js');
const client = new Discord.Client();

//Class CUP
class Cup {
    constructor(nom, date, map, lien) {
        this.nom = nom;
        this.date = date;
        this.map = map;
        this.lien = "https://discord.gg/"+lien;
    }
};

//Prefix
const prefix = "!";

//RichEmbed
const embed = new Discord.RichEmbed();

embed.setAuthor('Available commands:');
embed.setColor('NAVY');
//embed.setThumbnail(message.author.avatarUR);
embed.setDescription('\n\n**.h**: Help\n\n**.addcup**: The function adds a cup to the scehdule\nThe Cup admins needs to make sure to declare the cup as following\n!addcup (name, date, map, link)\n\nWhere:\n\nDate need to be xx/xx/xxxx\nMap sumbission link must be x@xxx.xx\nDiscord link must be at this format"a9ze7"');



//Game
gamel = [
    prefix+`h for Help`,
    `${client.users.size} users`,
    `Made by Gui#5440`
]

function randomG(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function game() {
    //Loop toutes les 30s
        const r = randomG(0, 2);
        client.user.setActivity(gamel[r], {
            type: 'LISTENING'
        });

        if (r==1) {
            console.log('users');
            setTimeout(game, 30000);
        }
        else if (r==0) {
            console.log('.h');
            setTimeout(game, 30000);
        }
        else if (r==2) {
            console.log('Gui');
            setTimeout(game, 30000);
        }
}

//Connected
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setTimeout(game, 1);
});

client.on('message', msg => {


    switch (msg.content) {

        case prefix+'h':
            msg.channel.send(embed);
        break;


        case 'r':
            msg.react("✅");
            msg.react("❌");

            //cocher oui -> getrole

        break;

        case prefix+'addcup':

            console.log('COMMANDE: addcup');
            //On recupère et on split les messages
            const args = msg.content.split(' ').slice(1);
            //On déclare un nouvel objet avec ces variables
            const macup = new Cup(args[1], args[2], args[3], args[4]);

            //Cup('nom', 'date', 'maps', 'lien');
            //Création d'un objet embed pour recap la cup
            const cupe = new Discord.RichEmbed();

            //Cup property
            cupe.setAuthor(macup.nom);
            cupe.setColor('RED');
            cupe.setDescription(macup.nom+'\n\n'+macup.lien+'\n\n');

            //Sending cup
            msg.channel.send(cupe);


            console.log("args: "+args[1]);
            console.log("args: "+args[2]);
            console.log("args: "+args[3]);
            console.log("args: "+args[4]);
        break;

        case prefix+'cup':
            console.log('COMMANDE: cup');
            msg.channel.send("Recents Cup");
        break;
    }
});


client.login('');
