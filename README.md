### Library MERN App

# First step
Copy all the files Or, fork a branch from this repository

# Second step
~open terminal
~go to server folder of this project where you saved it, using `cd`
~run `nvm use 18` instead of 18 you can use any other supported version
~run `yarn`    whichever package using
~run `yarn start`or `yarn app`.
~server will run, showing message "Server running on port4000"

# Third Step DB error
~If get error  "Error connecting to MongoDB ..." , you need to change "mongo URI" detail in "default.json"
~Refer to url mentioned in "description" of "package.json" file

# Fourth step
~Open another tab or window and go to client folder of this project where you saved it, using `cd`
~run `nvm use 18` instead of 18 you can use any other supported version
~Run `yarn` if not installed already
~Then Run `yarn start`, which will open your browser at http://localhost:3000/