# Rubber Ducking
You can ignore everything here to be honest. I'm just going to be rambling on about a bunch of stuff that I want to do and how I'll probably do them. You know, if I actually stick to my word and make them.

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
