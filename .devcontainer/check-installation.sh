#!/bin/bash

# Function to check if a command exists
command_exists () {
    type "$1" &> /dev/null ;
}

echo "Checking installations..."

# Check each command
for cmd in node npm python3 pip3 gradle docker docker-compose; do
    if command_exists $cmd; then
        version=$($cmd --version)
        echo "$cmd is installed with version: $version"
    else
        echo "$cmd is not installed."
    fi
done

if command_exists java; then
    version=$(java -version 2>&1 | head -n 1)
    echo "java is installed with version: $version"
else
    echo "java is not installed."
fi

# Check Flask
pip3 show flask &> /dev/null
if [ $? -eq 0 ]; then
    echo "Flask is installed."
else
    echo "Flask is not installed."
fi

# Check JavaScript libraries
for lib in cors axios express create-react-app; do
    npm list -g | grep -q $lib
    if [ $? -eq 0 ]; then
        echo "$lib is installed."
    else
        echo "$lib is not installed."
    fi
done

echo "Done checking installations."
