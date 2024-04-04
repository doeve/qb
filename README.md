This is a simple web-socket chat app that uses no database which could be easily implemented but it was outside of the scope of this project.

The project flow is the following: 
- the Dockerized node webserver is run from a PC
    - this opens port 8080 for the web-app
    - it also opens port 8081 for the web-socket
- from then on, the web-app is available to all devices within the network

Usage:
- in root folder: `docker compose up` to start the webserver
- you can access the web-app from the host PC using the address `http://localhost:8080`
- you can access the web-app from the other devices using the PC's local address ex: `http://192.168.1.205`

You can find a screenshoth here:

![image](https://github.com/doeve/qb/assets/76120007/035dc898-77dd-4d95-bdda-eb323af4f2fb)
