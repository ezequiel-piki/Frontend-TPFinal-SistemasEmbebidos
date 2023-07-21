import { useEffect, useState } from "react"
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import Swal from 'sweetalert2'


const modeloUsuario = {
    identificador:0,
    nombre:"",
    apellido:"",
    email:"",
    dni:0

}

const ModalContacto = ({mostrarModal, setMostrarModal, guardarUsuario, editarUsuario,setEditar,editar}) => {

    const [usuario, setUsuario] = useState(modeloUsuario);
    
    const actualizarDato = (e) => {

        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    const enviarDatos = () => {
       
        if(usuario.identificador == 0){
            guardarUsuario(usuario);
            
            Swal.fire({
                title: 'Usuario Guardado',   
                icon: 'success',
                confirmButtonText: 'Cool'
              });
        } 
        else {
            editarUsuario(usuario);
            Swal.fire({
                title: 'Usuario Editado',   
                icon: 'success',
                confirmButtonText: 'Cool'
              });
        }
        setUsuario(modeloUsuario);
    }

    useEffect( () =>{
        if(editar != null){
            setUsuario(editar)
        } else {
            setUsuario(modeloUsuario)
        }
    },[editar])

    const cerrarModal = () =>{
        setMostrarModal(!mostrarModal);
        setEditar(null);
    }
    return (
        <Modal isOpen={mostrarModal}>
            
                <ModalHeader>
                    {usuario.id == 0 ? 'Nuevo Usuario' : 'Editar Usuario'}
                </ModalHeader>
                <ModalBody>
                    <form>
                        
                        <FormGroup className="mb-3">
                            <label  className="form-label">NOMBRE</label>
                            <input 
                            onChange={(e)=>actualizarDato(e)} 
                            value={usuario.nombre || ''} 
                            name="nombre" 
                            type="text" 
                            className="form-control" 
                            placeholder="Ezequiel"
                            />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <label className="form-label">APELLIDO</label>
                            <input 
                            onChange={(e)=>actualizarDato(e)} 
                            value={usuario.apellido || ''} 
                            name="apellido" 
                            type="text" 
                            className="form-control" 
                            placeholder="Benitez"
                            />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <label className="form-label">CORREO</label>
                            <input 
                            onChange={(e)=>actualizarDato(e)} 
                            value={usuario.email || ''} 
                            name="email" 
                            type="text" 
                            className="form-control"  
                            placeholder="example@gmail.com"
                            />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <label  className="form-label">DNI</label>
                            <input 
                            onChange={(e)=>actualizarDato(e)} 
                            value={usuario.dni || ''} 
                            name="dni" 
                            type="text" 
                            className="form-control" 
                             placeholder="11222333"
                             />
                        </FormGroup>
                        
                       
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button onClick={enviarDatos} className="btn btn-primary btn-sm">Guardar</button>
                    <button onClick={cerrarModal} className="btn btn-danger btn-sm">Cerrar</button>
                </ModalFooter>
            
        </Modal>
    )
}

export default ModalContacto