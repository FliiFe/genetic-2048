## Learning algorithm for 2048

This project is an attempt to make a computer learn how to play [2048](https://github.com/gabrielecirulli/2048), and hopefully extend this learning ability to other games.

It works using both neural networks, and genetic evolution. It starts knowing nothing of the game, and by trial and error, random mutations and evolution, learns how to get better.

## Setting up the project

Since this project relies on [2048](https://github.com/gabrielecirulli/2048) and [Brainwave](https://github.com/zefman/Brainwave), I didn't want to include their code directly into my repository (which would make it look like it is mine). Instead, I made them submodules.

#### Step 0, prerequisites

You need to have `nodejs` and `npm` installed, preferably system-wide.

#### Step 1, clone the repository

It is necessary you have git installed on your machine. Using github's `Download as zip` feature won't work (See Step 2).

Clone the repository with :
```
git clone https://github.com/FliiFe/genetic-2048.git
```
or, if you have an SSH key :
```
git clone git@github.com:FliiFe/genetic-2048.git
```

#### Step 2, install dependencies

You can install the dependencies with
```
npm install
```

#### Step 3, Install `grunt`

Grunt is an automation tool, which allows to build and run a project with one command.

You can install it with
```
npm install -g grunt
```

***On Linux systems, make sure you execute this command with root privileges (e.g `sudo`)***


#### Step 4, Run !

You can run the project with `grunt`, without arguments :
```
grunt
```

**The server will run on localhost, on port 8080**. You can change this in the Gruntfile

If you want to build without serving files, use
```
grunt build
```
