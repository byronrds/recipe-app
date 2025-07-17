# Recipe App

This is a simple React app which fetches recipes using the Edamam API.
Once you sign up for an account, you have the ability to save recipes, create recipes,
rate recipes, ask your sous-chef (OpenAI API) for more information on recipe.

# OpenAI API Feature

We use OpenAI's public Chat Completions model to have a chatbot (sous-chef), who's deisnged to assist the user with the recipe they are viewing. When you click on the chatbot, it sends the first query which contains the entire recipe which Edamam provides us with, to give the model context. After that, the user is able to prompt any questions it may have.

# Tools

-   React/JavaScript, Express.js, OpenAI API, Firestore, Edamam API
