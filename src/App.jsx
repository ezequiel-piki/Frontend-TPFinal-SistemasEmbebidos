import React, { useEffect, useState } from 'react'
import TablaUsuarios from './components/TablaUsuarios'
import ModalUsuario from './components/ModalUsuario';

import PaginacionTablaUsuarios from './components/PaginacionTablaUsuarios';

const App = () => {
 
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editar, setEditar] = useState(null);
  const [buscar , setBuscar] = useState("");
  const [index, setIndex] = useState(1);
  
  //ENPOINTS
  const mostrarUsuarios = async (pagina=1) => {
    const response = await fetch(`https://localhost:7223/api/usuarios/paginacion/${pagina}`);

    if(response.ok){
      const data = await response.json();
      console.log(data)
      setUsuarios(data);
    }else{
      console.log("ERROR");
    }

  }
  const guardarUsuario = async (usuario) =>{
    
    const response = await fetch("https://localhost:7223/api/usuarios/crear",{
      method:'POST',
      headers: {
        'Content-Type':'application/json;charset=utf-8'
      },
      body:JSON.stringify(usuario)
    })
    if(response.ok){
     setMostrarModal(!mostrarModal);
     mostrarUsuarios();
    }
  }
  const editarUsuario = async (usuario) =>{
    
    const response = await fetch("https://localhost:7223/api/usuarios/editar",{
      method:'PUT',
      headers: {
        'Content-Type':'application/json;charset=utf-8'
      },
      body:JSON.stringify(usuario)
    })

    if(response.ok){
     setMostrarModal(!mostrarModal);
     mostrarUsuarios();  
    }
  }
  const eliminarUsuario = async (id) => {
    
    var respuesta = window.confirm("¿deseas eliminar el usuario?");
    
    if(!respuesta){
      return;
    }

    const response = await fetch("https://localhost:7223/api/usuarios/eliminar/"+id,{
      method:'DELETE'
    })

    if(response.ok){
     setMostrarModal(mostrarModal);
     mostrarUsuarios();
    }
  }
   
  //función de busqueda
   const buscador = (e) => {
    const inputValue = e.target.value;
    if(/^\d*$/.test(inputValue)){
      setBuscar(inputValue)
     } else{
      console.log('Este campo solo admite números');
     }
    
   }
  
  //metodo de filtrado
  let resultados = [];
  
   if(buscar.trim()==''){
    resultados = usuarios
   }
   else{
    resultados = usuarios.filter( (dato) =>
      
      dato.dni.toString().startsWith(buscar)
      )
   }

   //pagina
  

  useEffect ( () => {
    
    mostrarUsuarios(index);
    
  },[index])

  return (
    <div className='container'>
     <div className='row mt-5'>
      <div className='col-sm-12'>
        <div className='card'>
          <div className='card-header'>
            <h5>  Lista de Usuarios</h5>
            <div className='card-body'>
              <button 
              onClick={()=>setMostrarModal(!mostrarModal)} 
              className='btn btn-success btn-sm'>
                Nuevo Usuario
              </button>
             
              <input 
              type="text" 
              placeholder='Buscar por DNI' 
              className='form-control mt-2' 
              value={buscar} 
              onChange={buscador} 
              />
              <hr />
             
              <TablaUsuarios 
                            resultados     ={resultados}
                            setEditar      ={setEditar}
                            mostrarModal   ={mostrarModal}
                            setMostrarModal={setMostrarModal}
                            eliminarUsuario={eliminarUsuario}
              />
              <PaginacionTablaUsuarios 
              setIndex={setIndex}
              index={index}/>
              
            </div>
          </div>
        </div>
      </div>
     </div>
     <ModalUsuario 
                  mostrarModal={mostrarModal} 
                  setMostrarModal={setMostrarModal} 
                  guardarUsuario={guardarUsuario}
                  editar={editar}
                  setEditar={setEditar}
                  editarUsuario={editarUsuario}
     />
    </div>
  )
}

export default App