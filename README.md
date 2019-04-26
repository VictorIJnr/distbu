# distbu
An ML dataset distribution server I created as a side-project for my SH.

## Aight, you finally going to explain this?
Yep, I'm beginning to make this into an absurdly complicated project, even though this should be supplementary to my SH. 
> Lay it on me fam.  

Okay. So, <span style="color:#333">distbu</span> is just a way to store all of my training/testing data into a database which can be queried with a GraphQL API. But since I'm me, there's also a bit of Docker sprinkled around here and there.

## You know what imma ask next.
Of course I do. "Why you doin all dis fam?" some shit like that right?
> Yeah, some shit like that

Well I don't exactly want to be storing all of my data locally just in case I have too much crap to deal with. Legit, I don't want 28GB of compressed data just sitting on my SSD, you know? Yeeting all that onto [DigitalOcean](https://www.digitalocean.com/) works for me instead (got to love the $50 free student credit). DigitalOcean is genuinely fantastic I can't get enough of it, so I'll probably deploy some MySQL database on it when I get that up and running.

## The hell you need MySQL for?
GraphQL. I'm implementing that using [Prisma](https://prisma.io), so I'll need to make my database in MySQL since it's relational. They also support MongoDB as a backend too (Mongo be out here looking fine AF with its document-oriented database, I'll want to get a piece of that in the future) but I can't use that unless I do a bunch of data refactoring. I could automate it, but even then it's just too much time that I could be dumping into <span style="color:#e3c59e">**bu**</span> instead.

## That's tight bruv, but how's this complex?
Bitch, you try to make this with all the shit I'm doing and tell me it's not fucking complex.
> Damn, sorry cuz.

"dAmN, sORrY Cuz." Fuck you. Look at this shit. This is what I need to do to run this properly.

+ Deploy the api service to Heroku 
  + BUT DON'T WORRY, I'VE ALREADY DONE THIS BUT IT WON'T WORK FOR ANY GraphQL QUERIES
+ Deploy the MySQL database onto DigitalOcean
+ `docker-compose up -d --build`  
  + OH WHAT'S THIS? A DOCKER COMPOSE COMMAND?!?!?!?!?!?! Yes. Yes it fucking is. 2 Docker images need to be built, 1 for the MySQL database (which I'm still working on in my Sandbox because I'm scared) and 1 for the GraphQL server.
  + Plus I'll probably have to do this on the DigitalOcean VM I spin up ([Imagine that, running a container inside a VM](https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/), Solomon Hykes probably hates me right now)
  + Oh and let's not forget that my docker-compose.yml file has to be goddamn pristine.

But all that is without menial crap like making sure I can build the database and its tables from my CSV files. But yeah "hOw'S thiS cOmPLEx?". Pleb.

## Point taken. What's coming then?
I've got my hands full with the current state of this project. So I don't think I'll be adding anything too extreme until I've implemented all the stuff I want right now. 
> So no front-end?

<span style="color:#333">distbu</span> doesn't really need one. This isn't a startup idea, even though I could easily expand it to become a full-fledged product for data storage and pagination. I'd only ever add a functioning front-end allowing data uploads and shit if I wanted to make a product that I'd just sell off (but negotiate a buy-back, because <span style="color:#e3c59e">**_RRori_**</span>). Huh, looks like I won't be making this public anytime soon. 