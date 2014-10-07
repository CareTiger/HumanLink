#!/usr/bin/env bash

echo -e "HumanLink dev environment auto-setup script.
Not guaranteed to work. If something goes wrong, please install yourself manually.\n"

function print_status {
  if [ $? -ne 0 ]; then
    echo -e "$(tput setaf 1)$1 installation failed.$(tput sgr 0)"
  else
    echo -e "$(tput setaf 2)$1 succesfully installed.$(tput sgr 0)"
  fi
  echo
}

function ins_brew {
  echo "Installing homebrew..."
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  print_status 'homebrew'
}

function ins_git {
  echo 'Installing git...'
  brew install git
  print_status 'git'
}

function ins_py {
  echo 'Installing python 2.7...'
  brew install python
  print_status 'python2.7'
}

function ins_pip {
  echo 'Installing pip...'
  curl https://bootstrap.pypa.io/get-pip.py | sudo python
  print_status 'pip'
}

function ins_flake8 {
  echo 'Installing flake8...'
  pip install flake8
  print_status 'flake8'
}

function ins_node {
  echo 'Installing node/npm...'
  brew install node
  print_status 'node/npm'
}

function ins_bower {
  echo 'Installing bower/gulp...'
  npm install -g gulp
  print_status 'gulp'
  npm install -g bower
  print_status 'bower'
}

function ins_bower_deps {
  echo 'Installing FE dependencies'
  bower install
  print_status 'bower'
  npm install
  print_Status 'npm'
}

function jmake {
  echo 'Building frontend components'
  gulp
  print_status 'gulp'
}

ins_brew
ins_git
ins_py
ins_pip
ins_flake8
ins_node
ins_bower
ins_bower_deps
jmake
