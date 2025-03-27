#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/Skycast/deploy.log
echo 'cd /home/ec2-user/Skycast' >> /home/ec2-user/Skycast/deploy.log
cd /home/ec2-user/Skycast >> /home/ec2-user/Skycast/deploy.log
echo 'npm install' >> /home/ec2-user/Skycast/deploy.log
npm install >> /home/ec2-user/Skycast/deploy.log
