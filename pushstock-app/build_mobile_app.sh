#!/bin/bash

### Script runs under the assumption of proper environment (i.e. has all dependencies) ###

#cd ./pushstock-app

# If mobile-app directory doesn't exist, make Ionic project
printf "Creating mobile app project...\n"
if [[ ! -d "mobile-app" ]]; then
    ionic start --v2 --ts --appname "PushStock" mobile-app blank
fi

# Ensure that all intended platforms added
printf "Adding target platforms...\n"
cd mobile-app
if [[ ! -d "platforms/ios" ]]; then
    ionic platform add ios
fi
if [[ ! -d "platforms/android" ]]; then
    ionic platform add android
fi

# Delete all old source files except theme/variables.scss
cd src
rm -rf `ls | grep -v "theme"`

# Copy over all website source files
printf "Copying over source files from web directory...\n"
cp -R ../../public/src/ .
# Move main.ts to app/
mv main.ts app/

# Run python script to change source files
printf "Modifying source for mobile...\n"
../../make_mobile_files.py



#cd ?/mobile-app
#npm install
