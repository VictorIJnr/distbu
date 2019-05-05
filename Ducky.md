# Rubber Ducking
You can ignore everything here to be honest. I'm just going to be rambling on about a bunch of stuff that I want to do and how I'll probably do them. You know, if I actually stick to my word and make them.

Also, if I end up writing incoherent nonsense here - sorry. I decided to give the GraphQL section a

## CSV to JSON conversion
I don't think I'll actually go through with this but give me a minute. Since we're testing everything using returned JSON files, the current CSVs on DigitalOcean don't work and can be used as test subjects. Now, this could easily be done with python. I think. Actually, gimme one minute. 

## As it loads retrieval
You know what? Read this if you want to. I stopped halfway to figure out how I would implement this with Digi even though it's pretty much just streaming datasets. **_BUT_** then I realised why no one's ever done that before. It's pointless. Alright, you may as well be training your model on a batch size of 1. You'd send a request, then each individual record will be coming through, but then you're just training your model on the first record by the time 9 more come through. Just trust me, we don't need this. Pagination is fine.

AILR? Eh could be a better acronym. But this is a lightbulb moment if anything. So you know how the request comes in? How about I enforce mandatory pagination? Even if it's the complete file, I split it up into chunks and send back each chunk at a time? This sounded better in my head honestly. As I got halfway through the 3<sup>rd</sup> sentence in this paragraph I realised that this may not work the way I hoped just because of the way requests work in general. Look, what I want to do here (without even thinking about mandatory pagination) would be like this:
+ User sends me a request
    + That's good, no problems so far
+ I receive the request, duh
+ Then I get the file they want
    + Hold on to your seatbelts, it gets messy from here on out
+ I send a bit of each file until they have the complete file
    + Wait, this is just like streaming (I wrote the next bullet point before I realised this)
    + Instead of just sending them the entire file
    + Everything after this comes after the streaming revalation
    + But each chunk I send over has to be a complete record - no question

# GraphQL
I think my understanding of GraphQL wasn't sufficient. I wanted to add this to allow for pagination. But given the way I'll implement it, there's no reason I can't just use a REST API. **_BUT_** I don't want one. GraphQL is buzzwordy, plus I want to play around with it. 

GraphQL queries need to be resolved. And I want distbu to be able to retrieve chunks of data at a time. Now, this is paginating the dataset. If the dataset itself is stored as a table in a dataset, this works perfectly well. 

> Little aside here, I just thought about k-folds cross-validation. The shuffling and splitting up of data will need to be handled by myself (obviously) but it **_will_** need to be consistent for a user making a request. I could sort this out with a seed. I started off saying this: _`WAIT. Just require the randomisation seed (I'll send that back alongside each shuffled fold) is sent back per request`_ that'd mean I'd have to make any request without a seed generate a new seed. It would also be a pain to work with client-side. So I won't do that.  
Instead, I could rethink distbu. It wouldn't change too much. It'd just become an MVP if you will. distbu would instead just act as an endpoint where you specify the you want dataset in a request and distbu loads ALL of it into memory for you. But at least have the response split it up into training and testing data. We're not monsters here. This isn't much of a _`little aside`_ now huh?

But since I'm just storing datasets as raw CSVs, it doesn't exactly work. This relates to a problem I already knew I had. Since I'm just storing the files in Digi, I have to make my own request there to get the appropriate file. This takes just as long as downloading the file - obviously the server downloading the dataset will have a different duration than a client downloading the dataset as they, most likely, won't have an identical bandwidth and latency. I'm not done yet. After the file is in server memory, I need to process it. This involves resolving the GraphQL query such that only the necessary subset of data is sent back to the user. Sure, this only takes a couple of milliseconds (hopefully) but it means that the time taken is now greater than if the dataset is stored locally. Going back to the server needing to resolve queries itself: if I can programmatically alter the GraphQL schema, and Prisma datamodel for each dataset, I won't have to do that. Prisma will do it for me :D

So, distbu is only saving the user space. For me, that's all I want. And since this is meant for the realm of ML, I don't believe that waiting a couple minutes for data to download is too big an issue. Compared to training models for hours, days or weeks on end, it's insignificant.

Now that I think about it. Programmatically altering the schema isn't difficult whatsoever. The hardest part would be type inference of the fields of the dataset. Writing to the schema is nothing more than reading the file, and appending a new, unique type with all the fields of the dataset. That can wait for a while. Let's not get ahead of ourselves, get the MVP from the aside done first.