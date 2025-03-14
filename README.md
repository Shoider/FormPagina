# Formulario VPN / CONAGUA - Frontend

Este proyecto representa el frontend de la aplicación Formulario VPN CONAGUA, diseñado para interactuar con la API correspondiente.

## Tabla de Contenidos

1.  [Descripción](#descripcion)
2.  [Requisitos](#requisitos)
3.  [Instalación](#instalacion)
4.  [Uso](#uso)
5.  [Desarrollo](#desarrollo)

---

## Descripción

Este frontend proporciona una interfaz de usuario para interactuar con la API de CONAGUA. Permite a los usuarios realizar el llenado de un formulario para generar automaticamente el pdf de solicitud de VPN.

## Requisitos

* Docker instalado y en ejecución.
* Git (opcional, para clonar el repositorio).

## Instalación

1.  **Clonar el Repositorio (Opcional)**

    Si aún no tienes el código localmente, clona el repositorio desde GitHub:

    ```bash
    git clone [https://github.com/Shoider/FormPagina](https://github.com/Shoider/FormPagina)
    cd first-project
    ```

2.  **Construir la Imagen Docker**

    Desde el directorio del proyecto (donde se encuentra el `Dockerfile`), ejecuta el siguiente comando para construir la imagen Docker:

    ```bash
    docker build -t frontend:v1.0.0 .
    ```

## Uso

1.  **Ejecutar el Contenedor Docker**

    Ejecuta el contenedor Docker con el siguiente comando:

    ```bash
    docker run --name frontend -d -p 3000:3000 frontend:v1.0.0
    ```

2.  **Acceder a la Aplicación**

    Una vez que el contenedor esté en ejecución, abre un navegador web y navega a `http://localhost:3000` para acceder a la aplicación.

## Desarrollo

Si deseas realizar cambios en el código fuente y desarrollar localmente, sigue estos pasos:

1.  **Instalar Dependencias (Si es necesario)**

    Si el proyecto utiliza Node.js y `npm`, asegúrate de instalar las dependencias:

    ```bash
    npm install
    ```

2.  **Ejecutar el Servidor de Desarrollo**

    Ejecuta el servidor de desarrollo localmente:

    ```bash
    npm run dev # o el comando que uses para iniciar el servidor de desarrollo
    ```

3.  **Acceder a la Aplicación en Desarrollo**

    Abre un navegador web y navega a `http://localhost:3000` (o el puerto que uses para el desarrollo local) para acceder a la aplicación.

4.  **Realizar Cambios**

    Realiza los cambios necesarios en el código fuente.

5.  **Reconstruir la Imagen Docker (Si es necesario)**

    Si realizas cambios que afecten la construcción de la imagen Docker, reconstruye la imagen:

    ```bash
    docker build -t frontend:v1.0.0 .
    ```

6.  **Reiniciar el Contenedor Docker (Si es necesario)**

    Si realizas cambios que afecten la ejecución del contenedor, reinicia el contenedor:

    ```bash
    docker stop frontend && docker rm frontend && docker run --name frontend -d -p 3000:3000 frontend:v1.0.0
    ```

---