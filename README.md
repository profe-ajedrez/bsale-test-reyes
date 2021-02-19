# Test de BSale

Esta aplicación corresponde al ejercicio de postulación de BSale.

Se trata de una app web de única pagina que consulta contra una api montada en Nodejs.

Esta aplicación se encuentra montada en Heroku en https://bsale-test-andres-reyes.herokuapp.com/

## Obs.

En config/config.env se usan placeholders en lugar de las credenciales para proteger
los accesos a DB, por eso se indica el reemplazar con las credenciales antes de ejecutar en local o deployar

Como se usan promesas y otras capacidades ES6 esta aplicación no correra en Internet Explorer.
Para probar prefiera chrome o firefox


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


## API

### Puntos de entrada

Solo reemplace :parametro por algún valor válido.

```
GET /api/v1/productos/limit/:limit/offset/:offset     
```
Obtiene los productos con un limite de cantidad, empezando desde el offset indicado


```
GET /api/v1/productos/category/:category
```
Obtiene los productos de la categoría especificada


```
GET /api/v1/productos/filter/:filter
```
Obtiene los productos cuyo nombre o categoría coincidan con el filtro indicado


```
GET /api/v1/productos/category/:category/filter/:filter
```
Obtiene los productos de la categoría indicada y cuyo nombre o categoría coincidan con el filtro indicado


```
GET /api/v1/productos/category/:category/filter/:filter/limit/:limit/offset/:offset
```
Obtiene los productos de la categoría indicada con limite desde el offset indicado



Archivo con definición de request para ser importado por Postman y probar API:

https://github.com/profe-ajedrez/bsale-test-reyes/blob/master/bsale.postman_collection.json

