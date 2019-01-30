const Discord = require('discord.js');
const config = require('./calculator.json');
const fetch = require("node-fetch");
const request = require('request');
const client = new Discord.Client();
const totalProviders = 10;

client.on('ready', () => {
  client.user.setActivity("DM !calc")
  console.log(`Logged in as ${client.user.tag}!`);
});


function formatDollar(amount) {
    var dollar = Number(amount).toLocaleString("us", "currency");
    //decimals
    var arrAmount = dollar.split(".");
    if (arrAmount.length==2) {
        var decimal = arrAmount[1];
        if (decimal.length==1) {
            arrAmount[1] += "0";
        }
    }
    if (arrAmount.length==1) {
        arrAmount.push("00");
    }

    return "$" + arrAmount.join(".");
}








client.on('message', msg => {
	
	
	
	
  if (msg.content === '!calc') {
	  
	   msg.channel.send({embed: {
  color: 15625731,
  description: '**What Provider would you like to calculate prices for?**\n\n  1.) Vultr\n 2.) Linode\n 3.) Digital Ocean\n 4.) Conoha\n 5.) ZCloud\n 6.) Google Cloud\n 7.) Amazon\n 8.) Alibaba\n 9.) Rackspace\n 10.) Upcloud\n'
}})
.then(() => {
	  msg.channel.awaitMessages(response => client.user.tag !== msg.author.username + "#" + msg.author.discriminator, {
	    max: 1,
	    time: 10000,
	    errors: ['time'],
	  })
	  .then((collected) => {
		  var proxyProvider = collected.first().content;
		  
		 if(!isNaN(proxyProvider))
		 {
			 if(proxyProvider <= totalProviders)
			 {
				 askQuantity(proxyProvider);
			 }
			 else
			 {
				msg.channel.send({embed: {
				  color: 15625731,
				  description: "Please select a valid provider"
				}});
			 }
		 }
		 else
		 {
			 msg.channel.send({embed: {
				  color: 15625731,
				  description: "Please select a valid provider"
				}});
		 }

	      
	    })
	    .catch(() => {
	      msg.channel.send({embed: {
  color: 15625731,
  description: "Uhoh! The bot gets tired of waiting too!"
}});
	    });
	});
	
	function askQuantity(provider)
	{
		msg.channel.send({embed: {
		  color: 15625731,
		  description: 'How many proxies do you have for this provider?\n'
		}})
		.then(() => {
				  msg.channel.awaitMessages(response => client.user.tag !== msg.author.username + "#" + msg.author.discriminator, {
				    max: 1,
				    time: 10000,
				    errors: ['time'],
				  })
				  .then((collected) => {
					  var quantity = collected.first().content;
					  
					  if(!isNaN(quantity))
					  {
						  askHours(provider, quantity)
					  }
					  else
					  {
						  msg.channel.send({embed: {
							  color: 15625731,
							  description: "Please enter a valid amount of proxies.\n"
							}})
					  }
			
				      
				    })
				    .catch(() => {
				      msg.channel.send({embed: {
						  color: 15625731,
						  description: "Uhoh! The bot gets tired of waiting too!"
						}});
				    });
				});
	}
	function askHours(provider, quantity)
    {
 
        msg.channel.send({embed: {
          color: 15625731,
          description: 'How many hours do you plan to run the proxies?\n'
 
        }})
 
        .then(() => {
                  msg.channel.awaitMessages(response => client.user.tag !== msg.author.username + "#" + msg.author.discriminator, {
                    max: 1,
                    time: 10000,
                    errors: ['time'],
                  })
                  .then((collected) => {
                      var hours = collected.first().content;
 
                      if(!isNaN(hours))
 
                      {
                          calculatePrice(provider, quantity, hours);
                      }
                      else
                      {
                          msg.channel.send({embed: {
                              color: 15625731,
                              description: "Please enter a valid amount of hours.\n"
                            }})
 
                      }
  

                    })
 
                    .catch(() => {
                      msg.channel.send({embed: {
                          color: 15625731,
                          description: "Uhoh! The bot gets tired of waiting too!"
 
                        }});
 
                    });
 
                });
 
    }
	function calculatePrice(provider, quantity, hours)
	{
		if(provider == '1')
		{
			var price = config.vultr;
		}
		if(provider == '2')
		{
			var price = config.linode;
		}
		if(provider == '3')
		{
			var price = config.digitalocean;
		}
		if(provider == '4')
		{
			var price = config.conoha;
		}
		if(provider == '5')
		{
			var price = config.zcloud;
		}
		if(provider == '6')
		{
			var price = config.googlecloud;
		}
		if(provider == '7')
		{
			var price = config.amazon;
		}
		if(provider == '8')
		{
			var price = config.alibaba;
		}
		if(provider == '9')
		{
			var price = config.rackspace;
		}
		if(provider == '10')
		{
			var price = config.upcloud;
		}
		
		var total = Number(price) * Number(quantity) * Number (hours);
		
		if(total > 0)
		{
			var total = formatDollar(total);
			var message = "The total to run " + quantity + " proxies for " + hours + " hours is: " + total;
		}
		else
		{
			var message = "There was an error calculating the price.";
		}
		
		msg.channel.send({embed: {
		  color: 15625731,
		  description: message
		
		}})
		
	}
	  
    
  }
  
  
  
  
  
  
  
  
  
  
  
});




















client.login(config.token);
