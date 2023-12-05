# Virtual Horizon

Welcome to Virtual Horizon, a remote education startup leveraging a React JS frontend and Golang backend. We integrate adaptive learning algorithms, secure APIs, cloud-based databases, and agile methodologies for efficient development. Our platform is hosted on cloud infrastructure to ensure high availability and scalability.

## Setup

### Pre-Requisites

#### Github SSH key Setup
1. Set up your GitHub SSH key for secure repository access.

#### Go
1. Download Go from [here](https://go.dev/doc/install).
2. Navigate to the tar file directory and run the following commands:
   ```bash
   rm -rf /usr/local/go && tar -C /usr/local -xzf go1.20.7.linux-amd64.tar.gz
   export PATH=$PATH:/usr/local/go/bin
   ```
3. Restart your computer to apply changes.


#### Install Make
   ```bash
   sudo apt install make
   ```
#### Postgres 
Run these commands on the terminal
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql.service
   sudo -i -u postgres
   psql
   \q
   exit
   createuser --interactive
   ```
#### PgAdmin

Credentials
`username: admin`
`Password: helloworld`


# To do
`Dockerizing Whole Application`
