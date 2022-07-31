'use strict';

const path = require('path');
const SftpClient = require('ssh2-sftp-client');

const dotenvPath = path.join(__dirname, '.', '.env');
require('dotenv').config({ path: dotenvPath });

const config = {
  host: process.env.SFTP_SERVER,
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASSWORD,
  port: process.env.SFTP_PORT || 22,
  remotePath : process.env.SFTP_PATH,
};

async function main() {
    const sftp = new SftpClient();

  
    try {
      await sftp.connect(config);
      console.log('sftp client connected');
      console.log('trying to list ', config.remotePath)
      let fileList = await sftp.list(config.remotePath);
      console.log(fileList);
      await sftp.end();
    } finally {
        sftp.end();
    }
  }


main().then(() => {
  console.log('script complete');
});