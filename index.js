require('dotenv').config();
//TODO:
//react handle
//tweet

/*
modules:

discord.js
dotenv
jsonfile
*/

const jf = require('jsonfile');
const file = 'cup.json'
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

const n = "\n\n";
const h = "**"+prefix+"h**: Help";
const addcup = "**"+prefix+"addcup**: \nThe Cup admins needs to make sure to declare the cup as following\n!addcup name date map link\n\nWhere:";
const argcup = "Date need to be xx/xx/xxxx\nMap sumbission link must be x@xxx.xx\nDiscord link must be at this format'a9ze7'";
const cup = "**"+prefix+"cup**: Display complete list of the upcomming events, by style";
const i = "**"+prefix+"i**: DMs you a permanent invite for this server";

embed.setDescription(h+n+addcup+n+argcup+n+cup+n+i);

//Game
gamel = [
    prefix+`h for Help`,
    `${client.users.size} users`,
    `Made by Gui#5440`
]

function randomG (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomC () {
    return Math.random().toString(16).slice(2, 8).toUpperCase();
}

let color = randomC();

function game() {
    //Loop toutes les 30s
        const r = randomG(0, 2);
        client.user.setActivity(gamel[r], {
            type: 'LISTENING'
        });

        if (r==1) {
            setTimeout(game, 30000);
        }
        else if (r==0) {
            setTimeout(game, 30000);
        }
        else if (r==2) {
            setTimeout(game, 30000);
        }
}
//Login
client.login(process.env.CB);

//Connected
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setTimeout(game, 1);
});


client.on('message', msg => {



    if (msg.content.startsWith(prefix+"addcup"))  { //word detection with startsWith
        
        //On recupère et on split les messages
        const args = msg.content.split(' ').slice(1);
        //On déclare un nouvel objet avec ces variables
        let macup = new Cup(args[0], args[1], args[2], args[3]);

        if (args[3] == null) {
            msg.channel.send('You need to fill in arguments after the command');
        } else {
    
            //Cup('nom', 'date', 'maps', 'lien');
            //Création d'un objet embed pour recap la cup
            const cupe = new Discord.RichEmbed();

            //Cup property
            cupe.setAuthor(macup.nom);
            cupe.setColor('NAVY');
            cupe.setDescription(macup.date+'\n\n'+macup.map+'\n\n'+macup.lien+'\n'+'Make sure to react with ✅ to the message register yourself to the cup');

            //Sending cup + react
            msg.channel.send(cupe)
            .then(function (message) {
                message.react("✅")
            });
            
            //creation des roles avec le nom de la cup         
            //FAIRE QUE LE ROLE SOIT TAGGABLE + couleur aleatoire
            msg.guild.createRole({
                name: macup.nom,
                color: color,
                permissions: [],
                mentionable: true
            });

            //ajout de l'objet en json ?
            let json = {
            "nom": macup.nom,
            "date": macup.date,
            "map": macup.map,
            "lien": macup.lien
            };

            //supprimer ]} puis rajouter ,
            
            jf.writeFile(file, json, { flag: 'a' }, function (err) {
                if (err) console.error(err)
              })

              //rajouter ]}
        }
    }

    switch (msg.content) {

        case prefix+'h':
        //help
            msg.channel.send(embed);
        break;

        case prefix+'cup':
            //cup display
            jf.readFile(file, function (err, obj) {
                if (err) console.error(err)
                console.log(obj);
            })

        break;

        case prefix+'i':
            //invite
            const l = "https://discord.gg/KN9XBBN";
            msg.delete()
                .then(function (message) {
                    message.author.send(l)
                });
            
        break;
    }
});
