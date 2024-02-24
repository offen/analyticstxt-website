<a href="https://www.offen.dev/">
  <img src="https://offen.github.io/press-kit/avatars/avatar-OFWA-header.svg" alt="Offen Fair Web Analytics logo" title="Offen Fair Web Analytics" width="60px"/>
</a>

# analyticstxt.org

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
