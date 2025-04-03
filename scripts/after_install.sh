#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/Skycast/deploy.log
echo 'cd /home/ec2-user/Skycast' >> /home/ec2-user/Skycast/deploy.log
cd /home/ec2-user/Skycast >> /home/ec2-user/Skycast/deploy.log

# Clean up previous node_modules, package-lock.json, and npm cache
echo 'Cleaning up node_modules, package-lock.json, and npm cache' >> /home/ec2-user/Skycast/deploy.log
rm -rf node_modules package-lock.json >> /home/ec2-user/Skycast/deploy.log
npm cache clean --force >> /home/ec2-user/Skycast/deploy.log

# Run npm install
echo 'npm install' >> /home/ec2-user/Skycast/deploy.log
npm install >> /home/ec2-user/Skycast/deploy.log

# Fix permissions
echo 'Fixing permissions for node_modules' >> /home/ec2-user/Skycast/deploy.log
chown -R ec2-user:ec2-user /home/ec2-user/Skycast/node_modules >> /home/ec2-user/Skycast/deploy.log
