# User-Centric Natural Language Generation

## Objective
<span style="font-size: .8em">
UC-NLG will be a means of allowing Chatbots and Virtual Assistants(VAs), such as Google Assistant, Alexa, Siri, and Bixby, to respond to queries presented to them in a much more human-like nature. Current Chatbot and VA implementations strictly follow a defined structure when sending the result of the query to the user, typically utilising string interpolation. UC-NLG will allow the same desired intention to be expressed, however, the manner in which it is conveyed will be  "free-flowing" and possibly even dependent on what the system has learnt about the user and the situation regarding the supplied query.
</span>

<span style="font-size: .8em">
UC-NLG will be able to give a response such as "Sir, I would advise that you leave for your 4pm meeting with Angela immediately." to one user, however, another user will receive "Hurry up a little you need to meet Angela at 4", despite identical queries of "When's my meeting with Angela". Current techniques would simply serve a response akin to "Your meeting with Angela is at 4pm", UC-NLG will allow VAs and Chatbots to appear to posses a wide vocabulary and their own personality, as opposed to one dictated by their programmer.
</span>

## Accomplishing UC-NLG
<span style="font-size: .8em">
UC-NLG relies heavily on aspects concerning the user, and the context of the situation in which the query arose. As a result I will be using a wide array of techniques related to AI, most specifically, Recurrent Neural Networks (RNNs). These networks would prove ideal when processing natural language as past inputs can be carried forward in time to help make an informed decision on the style of the response. Especially so with the use of Long Short-Term Memory Networks (LSTMs) and their derivations.
</span>

<span style="font-size: .8em">
In order to understand how to form its own sentences, I propose the use of a Sequence-to-Sequence model, commonly seen in Neural Machine Translation. This model would initially be non-deterministic as, given the Angela meeting example prior, one trigger would lead to multiple possible responses. However, once state (composing of a suitable number of factors to personalise users) is considered, the model will become fully deterministic.
</span>

<span style="font-size: .8em">
The proposed Sequence-to-Sequence model would be trained on various databases in order to learn how to respond to questions in general. From this, the model will tag learnt responses to specific dialects in order to correlate these responses to the dialect of the user. Using this correlation between prior exposure to varying dialects, the system will, ideally, be able to label the user's dialect and respond as appropriate.
</span>

## Final Product
<span style="font-size: .8em">
A program capable of providing responses to queries, influenced by users.
UC-NLG will appropriate the user's dialect and speaking habits in order to provide a response which feels much less robotic; instead feeling much more intimate. UC-NLG will not be a means of Speech Synthesis, rather it generates sentences tailored for the user, to later be used with any desired Speech Synthesis technique. The sentences generated by the program will provide the same intent as any sentences that could have been hard-coded as the response for any VA or Chatbot, yet with an increased charisma surrounding them.
</span>