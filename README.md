# Fable

[Fable][fable]

## Summary

Fable is a single-page web application inspired by Medium built using Ruby on Rails
utilizing React.js/redux architecture. Fable allows users to:

* Create an account
* Sign in / Sign out (optionally with Twitter)
* Create stories
* Highlight parts of stories to 
* Follow users to never miss their stories
* Search for stories within database by title, content and tags

## Overall Structure

#### Back end
The app was built using Ruby on Rails on the back end with a postgreSQL database. Back end structure is RESTful and all  the data requests use AJAX and are fulfilled with a JSON API. Associations are used to prefetch data in order to minimize SQL queries to the database.

#### Front end
The front end is built completely in [React.js][React] and JavaScript and utilizes React's redux architecture. React's virtual DOM allows for lightning-quick rerendering without requiring new pages to be sent from the server. Even modals appear/disappear using React rather than toggling CSS display properties.

#### Libraries

[fable]: https://boiling-escarpment-40124.herokuapp.com/
[React]:https://facebook.github.io/react/