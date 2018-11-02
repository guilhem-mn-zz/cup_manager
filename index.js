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

embed.setDescription(h+n+addcup+n+argcup+n+cup);



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
            setTimeout(game, 30000);
        }
        else if (r==0) {
            setTimeout(game, 30000);
        }
        else if (r==2) {
            setTimeout(game, 30000);
        }
}

//Connected
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setTimeout(game, 1);
});

//gestion des reactions
/*client.on('messageReactionAdd', function(reaction) {
    let users = reaction.users;
    console.log(users);

});*/

client.on('message', msg => {



    if (msg.content.startsWith(prefix+"addcup")) {//word detection with startsWith
        
        //On recupère et on split les messages
        const args = msg.content.split(' ').slice(1);
        //On déclare un nouvel objet avec ces variables
        let macup = new Cup(args[0], args[1], args[2], args[3]);

        //Cup('nom', 'date', 'maps', 'lien');
        //Création d'un objet embed pour recap la cup
        const cupe = new Discord.RichEmbed();

        //Cup property
        cupe.setAuthor(macup.nom);
        cupe.setColor('NAVY');
        cupe.setDescription(macup.date+'\n\n'+macup.map+'\n\n'+macup.lien+'\n\n');

        //Sending cup + react
        msg.channel.send(cupe)
        .then(function (message) {
            message.react("✅")
            message.react("❌")
        });
        
        //creation des roles avec le nom de la cup        
        msg.guild.createRole({
            name: macup.nom,
            permissions: []
        }).then ((role) => {
            //donation des roles aux react
            msg.member.addRole(role.id);
        }).catch ((e) => console.log("err: "+e));
        
      //ajout de l'objet en bdd ?

    }

    switch (msg.content) {

        case prefix+'h':
            msg.channel.send(embed);
        break;

        case 'r':
            msg.react("✅");
        break;

        case prefix+'cup':
            console.log('COMMANDE: cup');
            msg.channel.send("Recents Cup");
            //requete
        break;
    }
});


client.login('');
