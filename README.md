# Oceanography

An application to connect GeoNode, Portal, and Rocker Shiny servers using reverse proxy Nginx and Docker.

### Development Flow

- [ ] The user requests to access something.
> This request was made by the user who has headers to be worked by Nginx to redirect the user to the correct application.
- [ ] Nginx will have `upstream` with all servers that will be used.
> The headers values are going to decide the redirect using conditionals.
- [ ] After that user is redirected to the correct server, the server gives a response to the user.
- [ ] The user gets information given by the server and his made happy.

### Diagram Flow

![image](https://github.com/DanielAraldi/oceanography/assets/50931267/625c6683-8494-4cf1-8b91-7e1eb3a2631d)
