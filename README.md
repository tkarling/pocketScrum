# Pocket Scrum

Pocket scrum is a scrum board for small development teams. Its main driver 
is ease of use especially for developers, so that we stay motivated updating
the status of our user stories. App is tested also for phone use so you can 
access it easily anywhere/ anytime. With this app user can:

* on Scrumboard
    * view user stories (stories) on scrumboard grouped based on status
    * drag'n'drop story to update its status
    * add/ delete stories
    * update story name, feature and to whom it is assigned to on the board
    * filter stories based on assigned to/ feature/ any string
* add/ view/ tag/ search/ delete design or wireframe pictures related to the project
* add /edit/ delete features
* login w Facebook/ logout
* edit his/her user name and change picture

Currently the app supports only one project at time. Changing projects
requires one line code change (i.e. change of database).

###Tools & Frameworks used: 

* AngularJs 1.x, Material design lite
* node/ express/ passport for Facebook authentication
* es6/es2015 w classes and inheritance on both on Angular client and node
* flux architecture inspired by blog post
  http://victorsavkin.com/post/99998937651/building-angular-apps-using-flux-architecture
* mongo/ mongoose, mongo also for storing pictures & created thumbnails
    * 8 collections





