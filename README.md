# Liltael.com

- [Demo](#demo)
- [Description](#description)
- [How to start](#start)
- [Development](#development)
- [Heroku](#heroku)

## Demo
[liltael.com](http://liltaelcom.herokuapp.com)

## Description
This is website for my darling wife

## How to start

Get code
```shell
git clone https://github.com/fealaer/StartingPointJS.git <name-of-your-project>
```

Test that everything works fine
```shell
npm install && bower install && npm test
```

## Development

Run server in development mode
```shell
npm start
```

Run all tests
```shell
npm test
```

For run in production mode use
```shell
NODE_ENV=production node server/app.js
```

## Heroku

Configure heroku

**Note:** you need to set up heroku tools first

New project

```shell
./heroku.sh <name-of-your-project>
```

If project already exists

```shell
git remote add <url-to-your-heroku-repository>
```

For release on heroku

**Note:** you need to configure heroku first

**Note:** branch release will be updated to master and released

```shell
./release.sh
```