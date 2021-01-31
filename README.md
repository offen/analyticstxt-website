# analyticstxtorg

The analyticstxt.org website

### Developing the website

The development setup requires `docker` and `docker-compose` to be installed.

After cloning the repository, you can build the containers and install dependencies using:

```sh
$ make setup
```

You can test your setup by starting the website:

```sh
$ make up
```

which should enable you to access the homepage at <http://localhost:7000/>.
