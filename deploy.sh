# #!/bin/bash

# # Build the client
# cd share-stories-client
# npm run build
# cd ..
# # Build the server
# cd share-stories-server
# npm run build

# # (Optional) Copy any additional files needed for deployment



# # Output a success message
# echo "Build completed successfully!"
# current_location=$(pwd)
# echo "Current location: $current_location"
# exec bash


echo "Switching to branch master" git checkout master
echo "Building app..."
cd share-stories-client
npm run build


echo "Deploying files to serevr...
pscp -r build/* netanel@72.167.55.241:/var/www/share-stories.online/
exec bash

echo "Done!"