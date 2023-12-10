<p align="center">
  <img src="https://github.com/vacaramin/Virtual-Horizon/blob/main/frontend/public/transparent-vhs-logo.png?raw=true" alt="Virtual Horizon Logo">
</p>

Welcome to Virtual Horizon, a remote education startup leveraging a React JS frontend and Golang backend. We integrate adaptive learning algorithms, secure APIs, cloud-based databases, and agile methodologies for efficient development. Our platform is hosted on cloud infrastructure to ensure high availability and scalability.

## Development
### Local Development
For local development, use the docker-compose-ci.yaml file. This runs all the services directly from the code on your computer.
```console
docker-compose -f docker-compose-ci.yaml up
```
This command starts all services defined in the docker-compose-ci.yaml file.

### One Command to Run it all
For running this application, use the docker-compose-prod.yaml file. This pulls the latest backend and frontend images of virtual horizon from docker hub and runs the images directly. No setups are required except docker and docker-compose.
```console
docker-compose -f docker-compose-prod.yaml up -d
```
This command starts all services in detached mode.

## Technologies Used
| ![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) | ![React.js](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white) | ![Redux RTK](https://img.shields.io/badge/Redux%20RTK-764ABC?style=for-the-badge&logo=redux&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) | ![Migration](https://img.shields.io/badge/Migration-000000?style=for-the-badge) | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) | ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github&logoColor=white) | ![GORM](https://img.shields.io/badge/GORM-0076C5?style=for-the-badge&logo=go&logoColor=white) | ![Gin](https://img.shields.io/badge/Gin-F05032?style=for-the-badge&logo=go&logoColor=white) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | 

## Todo
- WebRTC Implementation for video conferencing 
- Code improvements
  - Replacing axios with RTK
  - Use Dispatch for Notifications

