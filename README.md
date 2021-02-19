# Test de BSale

Esta aplicación corresponde al ejercicio de postulación de BSale.

Se trata de una app web de única pagina que consulta contra una api montada en Nodejs.

Esta aplicación se encuentra montada en Heroku en https://bsale-test-andres-reyes.herokuapp.com/

## Como ejecutar en local


1 Clone el repositorio

```bash
$ git clone https://github.com/profe-ajedrez/bsale-test-reyes.git
$ cd bsale-test-reyes
```



2 Instale dependencias.


```bash
$ npm install
```



3 Abra el archivo config/config.dev.env y reemplace en el las credenciales para conectarse a BD



4 Inicie el servidor local

```bash
$ npm start
```


## Deployar a Heroku

1 Instale la console de Heroku (ver https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)

2 En el subdirectorio del repositorio ingrese a la consola de Heroku

```bash
$ heroku login
```

3 Cree una app en Heroku

```bash
$ heroku create
```

4 Deploye a Heroku

```bash
$ git push heroku main
```

5 Asegurece de que la app esta corriendo

```bash
$ heroku ps:scale web=1
```

6 Abra la instancia de la app deployada en Heroku

```bash
$ heroku open
```

7 Enjoy!






