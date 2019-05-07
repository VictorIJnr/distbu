# distbu
An ML dataset distribution server I started as a side-project for my Senior Honours project.

If you've read one of my other READMEs you know what to expect. Otherwise, little heads up, I like to have fun with READMEs, so this'll probably be different to all the "professional" ones with most projects found here. After all, personal projects should feel, well, personal, right? I think so :D. There's nothing to be scared of don't worry.

## Aight, you gonna explain this?
Yep, I'm beginning to make this into an absurdly complicated project, even though this should be supplementary to my SH. 
> Lay it on me fam.  

Okay. So, <span style="color:#333">distbu</span> is just a way to store all of my training/testing data into a database which can be queried with a GraphQL API. Really simple. But since I'm me, there's also a bit of Docker sprinkled around here and there. Ideally, distbu will be a way to store and retrieve any data I may need now, and in the future for any other projects I cook up.

## You know what imma ask next.
Of course I do. "Why you doin' all dis fam?" something like that right?
> Yeah, something like that

Well I don't exactly want to be storing all of my data locally just in case I have too much crap to deal with. Like, I don't want 28GB of compressed data just sitting on my SSD, you know? Dumping all that onto [DigitalOcean](https://www.digitalocean.com/) works for me instead (got to love the $50 free student credit). DigitalOcean is genuinely fantastic I can't get enough of it, so I'll probably deploy some MySQL database on it when I get that up and running.

## The hell you need MySQL for?
GraphQL. I'm implementing that using [Prisma](https://prisma.io), so I'll need to make my database in MySQL since it's relational. 
They also support MongoDB as a backend too (Mongo's looking fine AF with its document-oriented database, I'll want to get a piece of that in the future) but I can't use that unless I do a bunch of data refactoring. I could automate it, but even then it's just too much time that I could be dumping into <span style="color:#e3c59e">**bu**</span> instead. Just in case <span style="color:#e3c59e">**bu**</span>'s not public yet and this is, <span style="color:#e3c59e">**bu**</span>'s my SH project - hence why this is called <span style="color:#333">dist</span><span style="color:#e3c59e">**bu**</span>. 

Well, I've actually decided not to use MySQL anymore. Turns out I don't really need it. I think. I don't need MongoDB either, but it still looks absolutely gorgeous.

## That's tight bruv, but how's this complex?
How about you try to make this with everything I'm doing and tell me it's not complex?
> Damn, sorry cuz.

"dAmN, sORrY Cuz." Screw you. Look at this. This is what I need to do to run this properly.

+ Deploy the api service to Heroku 
  + BUT DON'T WORRY, I'VE ALREADY DONE THIS BUT IT WON'T WORK FOR ANY GraphQL QUERIES YET
+ Deploy the MySQL database onto DigitalOcean <sup><sup>Well I don't need this because MySQL isn't a part of <span style="color:#333">distbu</span> anymore</sup></sup>
+ Some docker container shenanigans.

+ `docker-compose up -d --build`  
  + OH WHAT'S THIS? A DOCKER COMPOSE COMMAND?!?!?!?!?!?! Yes. Yes it freaking is. 2 Docker images need to be built, 1 for the MySQL database (which I'm still working on in my Sandbox because I'm scared) and 1 for the GraphQL server.
  + Plus I'll probably have to do this on the DigitalOcean VM I spin up ([Imagine that, running a container inside a VM](https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/), Solomon Hykes probably hates me right now)
  + Oh and let's not forget that my docker-compose.yml file has to be goddamn pristine.

But all that is without menial crap like making sure I can build the database and its tables from my CSV files. But yeah "hOw'S thiS cOmPLEx?". Pleb.

## Point taken. What's coming then?
I've got my hands full with the current state of this project. So I don't think I'll be adding anything too extreme until I've implemented all the stuff I want right now. 
> So no front-end?

<span style="color:#333">distbu</span> doesn't really need one. This isn't a startup idea, even though I could easily expand it to become a full-fledged product for data storage and pagination. I'd only ever add a functioning front-end allowing data uploads and stuff if I wanted to make this somewhat presentable. You know, like it was an actual product.