import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

const TablaUsuarios = ({ resultados, setMostrarModal, mostrarModal, setEditar, eliminarUsuario }) => {
    
    
    const enviarDatos = (usuario) => {
        setEditar(usuario);
        setMostrarModal(!mostrarModal);
    }

    const columnas = [
        {
            name: 'NOMBRE',
            selector: row => row.nombre
        },
        {
            name: 'APELLIDO',
            selector: row => row.apellido
        },
        {
            name: 'CORREO',
            selector: row => row.email
        },
        {
            name: 'DNI',
            selector: row => row.dni
        }
    ]

    return (
        <>
          
            <table className='table table-striped' >
                <thead>
                    <tr>
                        <th className='col'>NOMBRE</th>
                        <th className='col'>APELLIDO</th>
                        <th className='col'>CORREO</th>
                        <th className='col'>DNI</th>
                        <th className='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (resultados.length < 1) 
                        ? 
                        (
                            <tr>
                                <td className='col-span-4'> sin registros</td>
                            </tr>
                        ) 
                        :
                            (
                                resultados.map((item) =>
                                    <tr key={item.identificador}>
                                        <td>{item.nombre}</td>
                                        <td>{item.apellido}</td>
                                        <td>{item.email}</td>
                                        <td>{item.dni}</td>
                                        <td>
                                            <button
                                                onClick={() => enviarDatos(item)}
                                                className='btn btn-primary btn-sm mx-1'>Editar</button>
                                            <button
                                                onClick={() => eliminarUsuario(item.identificador)}
                                                className='btn btn-danger btn-sm mx-1'>Eliminar</button>
                                        </td>

                                    </tr>
                                )
                            )
                    }
                </tbody>
            </table>
           
        </>
    )
}

export default TablaUsuarios;