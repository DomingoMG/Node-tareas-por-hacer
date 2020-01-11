// Requireds
const fs = require('fs');
const colors = require('colors');


let listadoPorHacer = [];

// GuardarDB: Almacena en un archivo .JSON las tareas por hacer
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (error) => {
        if (error) throw new Error('No se pudo grabar', error);
    });

}

// CargarDB: Lee el fichero JSON y lo almacenamos en la array "listadoPorHacer"
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    console.log(listadoPorHacer);
}

// crear: Cargabamos los datos del fichero JSON y luego procedemos en registrar
// las tareas por hacer.
const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

// getListado: Obtener todas las tareas por hacer
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

// actualizar: Actualizar las tareas por hacer
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

// Borrar: borramos una tarea que ya estaba registrada en el archivo JSON
const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter((tarea) => tarea.descripcion !== descripcion);

    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}