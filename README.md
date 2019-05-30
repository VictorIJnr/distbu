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

Well I don't exactly want to be storing all of my data locally just in case I have too much crap to deal with. Like, I personally don't want 28GB of compressed data just sitting on my SSD, you know? Dumping all that onto [DigitalOcean](https://www.digitalocean.com/) works for me instead (got to love the $50 free student credit). DigitalOcean is genuinely fantastic I can't get enough of it, so I'll probably deploy some MySQL database on it when I get that up and running.

## The hell you need MySQL for?
Well, I've actually decided not to use MySQL anymore. Turns out I don't really need it. I think. 

> Bruv look down, why's there text though?

Oh, that. I'm just going to keep that for now. It's a 

> Why?

Let me finish. It's a relic from a time when I thought I could implement this with a table for the dataset I was using for my SH project. I've since decided that I want <span style="color:#333">distbu</span> to be dataset agnostic so I'm not going with MySQL anymore. I thought it might be nice to see what I wanted to do. 

_GraphQL. I'm implementing that using [Prisma](https://prisma.io), so I'll need to make my database in MySQL since it's relational. 
They also support MongoDB as a backend too (Mongo's looking fine AF with its document-oriented database, I'll want to get a piece of that in the future) but I can't use that unless I do a bunch of data refactoring. I could automate it, but even then it's just too much time that I could be dumping into <span style="color:#e3c59e">**bu**</span> instead. Just in case <span style="color:#e3c59e">**bu**</span>'s not public yet and this is, <span style="color:#e3c59e">**bu**</span>'s my SH project - hence why this is called <span style="color:#333">dist</span><span style="color:#e3c59e">**bu**</span>._

I've dropped Prisma entirely, I'll resolve queries on my own. Because of that I actually don't need MongoDB either whatsoever, but it still looks absolutely gorgeous.

## Okay bruv, but you ain't done nothing yet?
Two things:  
+ First: How's that a question?
+ Second: If I "ain't done nothing yet" then I've done something? I'll take that :D

> Skip the pediatrics cuz, how'm I gonna run this boi?

_Pedantics_.

> Fam...

Okay, okay it doesn't seem like much because I'm completely ignoring menial crap that doesn't need to be done to run <span style="color:#333">distbu</span>. I'm talking stuff like building a docker image or going to a URL where <span style="color:#333">distbu</span>'s running. But trust me, it's still a lil' complex. <sup>Hell I kinda like the complexity this is reaching.</sup> I just don't want to bore you with each and every <span style="font-size: 0.65em">tiny</span> implementation detail. But this is what I need to do to run this so far.

+ Deploy the api service to Heroku 
  + I've already done this, but it won't work for any GraphQL queries yet.
+ ~~Deploy the MySQL database onto DigitalOcean~~ <sup>Well I don't need this because MySQL isn't a part of <span style="color:#333">distbu</span> anymore</sup>
+ `docker container run --name distQL -p 20794:20794 victorijnr/distql`
    + Now this, this isn't even that complicated. 
    + All this does is start the docker container for the GraphQL API server and exposes the port it's running on to the host machine.
    + This is what I need to do locally, I haven't deployed it anywhere yet.

If <span style="font-size: 0.2em">(when)</span> I add more stuff to <span style="color:#333">distbu</span> I'll most likely update this part. You know, if I decide to take another quarter-year hiatus, I'll need this too. 

## Fair. What's coming then?
I've got my hands full with the current state of this project. So I don't think I'll be adding anything too extreme until I've implemented all the stuff I want right now. 

> So no front-end?

<span style="color:#333">distbu</span> doesn't really need one. This isn't a startup idea or anything - like I said with [onesie](https://github.com/VictorIJnr/onesie), I have better stuff in private repos; this is just for me. For now at least. I'd only ever add a functioning front-end allowing data uploads and stuff if I wanted to make this somewhat presentable. You know, like it was an actual product. But that's not <span style="color:#333">distbu</span>. Granted, I could easily expand it to become a full-fledged product for data storage and pagination. 