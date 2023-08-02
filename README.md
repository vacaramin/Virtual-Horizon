# Virtual-Horizon
Virtual Horizon is a remote education startup with a React JS frontend and Golang backend. It uses adaptive learning algorithms for personalized recommendations, secure APIs, cloud-based databases, and agile methodologies for efficient development. Hosted on cloud infrastructure for high availability and scalability.

# Setup
## Pre Requisites
    Github SSH key Setup
    * Go *
        Download Go
        https://go.dev/doc/install
        Navigate to tar file directory, and run these command
            rm -rf /usr/local/go && tar -C /usr/local -xzf go1.20.7.linux-amd64.tar.gz
            export PATH=$PATH:/usr/local/go/bin
        Restart your computer.

    * Make *
        sudo apt install make
    * Postgres *
    Run these commands on the terminal
        sudo apt update
        sudo apt install postgresql postgresql-contrib
        sudo systemctl start postgresql.service
        sudo -i -u postgres
        psql
        \q
        exit
        createuser --interactive
# Pg admin

Credentials
username: admin
Password: helloworld


# Pre requirements
1. Migrate CLI golang
2. Node
3. go
4. make
5. 
