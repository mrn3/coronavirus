# Second Metrics

To use this app, you need to run the frontend and backend.

## Development Setup on MacOS

### Install Postgres

1. See current postgres
    ```
    which postgres
    postgres --version
    ```
1. Remove current postgres
    ```
    brew uninstall --force postgresql
    ```
1. Remove old data directory
    ```
    rm -rf /usr/local/var/postgres
    ```
1. Install postgres
    ```
    brew install postgres
    ```
1. Get PostGIS
    ```
    brew install postgis
    ```
1. Start postgres
    ```
    pg_ctl -D /usr/local/var/postgres start
    ```
1. Make sure postgres is running
    ```
    ps aux | grep postgres
    ```
1. Initialize the database
    ```
    initdb /usr/local/var/postgres
    ```

### Set up database

1. Create database
    ```
    createdb secondmetrics
    ```
1. Connect to database
    ```
    psql secondmetrics
    ```
1. Show databases and tables
    ```
    \l
    \dt
    ```

### Set up project

1. Install modules
    ```
    npm install
    cd client && npm install && cd ..
    ```
1. Seed database with data
    ```
    node_modules/.bin/sequelize db:seed:all
    ```
1. Run - go to localhost:3000 in a browser
    ```
    npm run dev
    ``` 

## Production Setup For Server

### Set up server
1. Get ec2 micro instance on Amazon Linux
1. Set up ssh access to server
1. Add elastic IP address
1. Associate elastic IP address as A record on domain in Route 53
1. Install nginx
    ```
    sudo amazon-linux-extras install nginx1.12
    ```
1. Start up and get status of nginx
    ```
    sudo systemctl start nginx
    sudo systemctl status nginx
    ```
1. Add nginx service to start automatically on reboot
    ```
    sudo chkconfig nginx on
    ```
    <i>Output will be similar to:</i>
    ```
    Note: Forwarding request to 'systemctl enable nginx.service'.
    Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /usr/lib/systemd/system/nginx.service.
    ```
1. Add the Enterprise Linux repo (EPEL)
    ```
    sudo amazon-linux-extras install epel
    ```
1. Install certbot and certbot nginx package
    ```
    sudo yum install certbot python2-certbot-nginx
    ```
1. Install git
    ```
    sudo yum install git
    ```
1. Set up your ssh key for the server
    ```
    ssh-keygen -t rsa -C "<your_email_address>"
    ```
1. Get your new public ssh key
    ```
    cat /home/ec2-user/.ssh/id_rsa.pub
    ```
1. Add your ssh key (copied from previous step) to https://github.com/settings/keys

### Set up pm2

1. Install pm2 globally
    ```
    npm install -g pm2
    ```
1. Generate script to start pm2 on reboot and run the script
    ```
    pm2 startup
    ```
    <i>Output will be similar to:</i>
    ```
    [ec2-user@ip-172-31-58-101 client]$ pm2 startup
    [PM2] Init System found: systemd
    [PM2] To setup the Startup Script, copy/paste the following command:
    sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v10.15.3/bin /home/ec2-user/.nvm/versions/node/v10.15.3/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
    ```

### Set up node
1. Install nvm
    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    ```
1. Active nvm
    ```
    . ~/.nvm/nvm.sh
    ```
1. Install node 10
    ```
    nvm install 10
    ```
1. Make sure it worked
    ```
    node -e "console.log('Running Node.js ' + process.version)"
    ```
1. Make sure versions look right (particularly if you have multiple versions)
    ```
    nvm ls
    ```
1. Set alias if needed
    ```
    nvm alias default 10
    ```
1. Update to latest npm
    ```
    npm install -g npm
    ```

### Set up postgres
1. Install Amazon Linux Extras
    ```
    sudo amazon-linux-extras install postgresql10
    ```
1. Remove old data (from previously installed postgres)
    ```
    rm -rf /var/lib/pgsql/data
    ```
1. Initialized database
    ```
    /usr/bin/postgresql-setup --initdb --unit postgresql
    ```
1. Start up and get status of service
    ```
    sudo service postgresql start
    sudo service postgresql status
    ```
1. Switch to the postgres user
    ```
    sudo su - postgres
    ```
1. Connecto to postgres
    ```
    psql -U postgres
    ```
1. Add postgresql service to start automatically on reboot
    ```
    sudo chkconfig postgresql on
    ```
    <i>Output will be similar to:</i>
    ```
    Note: Forwarding request to 'systemctl enable postgresql.service'.
    Created symlink from /etc/systemd/system/multi-user.target.wants/postgresql.service to /usr/lib/systemd/system/postgresql.service.
    ```

## Production Setup For Each Virtual Host

### Configure nginx
1. Open config file for editing
    ```
    sudo vi /etc/nginx/conf.d/secondmetrics.conf
    ```
1. Add content to config file in vim
    ```
    server {
        listen 80;
        listen [::]:80;

        server_name secondmetrics.com;

        location / {
            proxy_pass http://localhost:5030/;
            proxy_buffering off;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```
1. Restart nginx
    ```
    sudo systemctl status nginx
    ```

### Set up SSL certificate
1. Run certbot to set up SSL certificate for this domain
    ```
    sudo certbot
    ```
1. Follow the on-screen prompts.  When asked about whether or not to redirect HTTP traffic to HTTPS, removing HTTP access, choose option 2 Redirect

### Set up git and repo
1. Go to the ec2-user home
    ```
    cd ~
    ```
1. Clone the repo
    ```
    git clone git@github.com:mrn3/secondmetrics.git
    ```
1. Go into the project directory
    ```
    cd secondmetrics
    ```
1. Create .env file and open for editing
    ```
    vi .env
    ```
1. Add content to .env file
    ```
    NODE_ENV=production
    PORT=5030
    ```
1. Install node modules for server
    ```
    npm install
    ```
1. Install node modules for client and create build
    ```
    cd client
    npm install
    npm run build
    ```

### Set up pm2
1. Go into the project directory
    ```
    cd ~/secondmetrics
    ```
1. Set up pm2 to set up the project (using the npm run start script)
    ```
    pm2 start npm --name "secondmetrics" -- start
    ```
1. You can see logs
    ```
    pm2 logs secondmetrics
    ```
1. If you need to remove it
    ```
    pm2 delete secondmetrics
    ```

### Set up database

1. Switch to the postgres user
    ```
    sudo su - postgres
    ```
1. Create database
    ```
    createdb secondmetrics
    ```
1. Connecto to the secondmetrics database
    ```
    psql -U secondmetrics
    ```
1. Show databases and tables
    ```
    \l
    \dt
    ```

## Roadmap

https://github.com/mrn3/secondmetrics/projects/2

## Sequelize commands

Seed

node_modules/.bin/sequelize db:seed:all
node_modules/.bin/sequelize db:seed --seed seeders/20190315125216-seed-item.js

Migrate Up

node_modules/.bin/sequelize db:migrate

Migrate Down

node_modules/.bin/sequelize db:migrate:undo
node_modules/.bin/sequelize db:migrate:undo:all

Generate models and migrations

node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string

node_modules/.bin/sequelize model:generate --name Location --attributes placeId:string,formattedAddress:string,addressComponents:json,lat:float,lng:float

node_modules/.bin/sequelize model:generate --name UserLocation --attributes userId:integer,locationId:integer

node_modules/.bin/sequelize model:generate --name Item --attributes modelNumber:string,serialNumber:string,brandSeriesModel:string

node_modules/.bin/sequelize model:generate --name Type --attributes name:string
node_modules/.bin/sequelize model:generate --name ItemType --attributes itemId:integer,typeId:integer

node_modules/.bin/sequelize model:generate --name Status --attributes name:string
node_modules/.bin/sequelize model:generate --name ItemStatus --attributes itemId:integer,statusId:integer

node_modules/.bin/sequelize model:generate --name Series --attributes name:string
node_modules/.bin/sequelize model:generate --name ItemSeries --attributes itemId:integer,seriesId:integer

node_modules/.bin/sequelize model:generate --name Brand --attributes name:string
node_modules/.bin/sequelize model:generate --name SeriesBrand --attributes seriesId:integer,brandId:integer

## See also

- https://medium.com/@Umesh_Kafle/postgresql-and-postgis-installation-in-mac-os-87fa98a6814d
- https://gist.github.com/nrollr/56e933e6040820aae84f82621be16670
- https://www.linode.com/docs/web-servers/nginx/use-nginx-reverse-proxy/
- https://facebook.github.io/create-react-app/docs/deployment
- https://www.digitalocean.com/community/questions/setting-up-multiple-nodejs-applications-using-nginx-vitual-hosts
- https://futurestud.io/tutorials/pm2-restart-processes-after-system-reboot
- https://hackprogramming.com/how-to-setup-subdomain-or-host-multiple-domains-using-nginx-in-linux-server/
- https://chartio.com/resources/tutorials/how-to-list-databases-and-tables-in-postgresql-using-psql/
- https://github.com/snowplow/snowplow/wiki/Setting-up-PostgreSQL
- https://medium.com/@pablo127/google-api-authentication-with-oauth-2-on-the-example-of-gmail-a103c897fd98
- https://console.cloud.google.com/apis/credentials?project=marketing-healer
- https://www.npmjs.com/package/googleapis#samples
- https://developers.google.com/analytics/devguides/reporting/core/v4/authorization
- https://flaviocopes.com/google-analytics-api-nodejs/
