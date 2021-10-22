import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import MaterialDatatable from 'material-datatable';
import { useMediaQuery } from 'react-responsive';
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';

const PersonasMaterial = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])
    const [id_persona, setId] = useState()
    const isMobile = useMediaQuery({ query: `(max-width: 760px)`});

    const handleInputChangeNombre = (event) => {
        setNombre(event.target.value)
    }

    const handleInputChangeApellido = (event) => {
        setApellido(event.target.value)
    }

    const enviarDatos = () => {
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)

        guardarPersona();
    }

    useEffect(() => {
        getPersonas()
    },[])
    const json = ""
    async function getPersonas(){
        try{
            const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=18')
            if (response.status == 200){
                setPersonas(response.data.persona) // Se setea el response json en la variable personas
            }
        } catch (error){
            console.error(error)
        }
    }

    const editPersona = (id_persona) => {
        
        axios.put(`http://192.99.144.232:5000/api/personas/${id_persona}`, {
            _id: id_persona,
            nombre: nombre,
            apellido: apellido,
            grupo: 18
        })
        .then(function (response){
            if(response.status == 200){
                alert("Registro modificado con exito")
                getPersonas()
            }
            else {
                alert("Error al guardar")
            }
        })
        .catch(function (error){
            console.log(error)
        });
    }

    const deletePersona = (id_persona) => {
        axios.delete(`http://192.99.144.232:5000/api/personas/${id_persona}`, {
            _id: id_persona
        })
        .then(function (response){
            if(response.status == 200){
                alert("Registro eliminado")
                getPersonas()
            }
            else {
                alert("Error al eliminar la persona")
            }
        })
        .catch(function (error){
            console.log(error)
        });
    }

    function guardarPersona(){
        axios.post('http://192.99.144.232:5000/api/personas', {
            nombre: nombre,
            apellido: apellido,
            grupo: 18 // ver que grupo somos
        })
        .then(function (response){
            if(response.status == 200){
                alert("Registro correcto")
                getPersonas()
            }
            else {
                alert("Error al guardar")
            }

        })
        .catch(function (error){
            console.log(error);
        });
    }

    

    const columns = [
        {
            name: "ID",
            field: "_id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Nombre",
            field: "nombre",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Apellido",
            field: "apellido",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Grupo",
            field: "grupo",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    /*
    const data1 = [
        {name: "Name 1", title: "Title 1", location: "Location 1", age: 30, salary: 10},
        {name: "Name 2", title: "Title 2", location: "Location 2", age: 31, salary: 11},
    ];
    */
    

    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData.name);
        setNombre(rowData.nombre);
        setApellido(rowData.apellido);
        setId(rowData._id)
    };

    const handleInputClean = () => {
        setNombre('');
        setApellido('');
        setId(0);
    }

    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick
    };

    return (
        <Container maxWidth="md">
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="h6">
                    Personas
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} fullWidth>
                <TextField id="nombre" label="Nombre" variant="outlined" onChange={handleInputChangeNombre} value={nombre} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField id="apellido" label="Apellido" variant="outlined" onChange={handleInputChangeApellido} value={apellido} fullWidth />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button variant="contained" color="primary" onClick={guardarPersona} fullWidth>Guardar</Button>

            </Grid>
            {
                        id_persona ?
                        <Grid item xs={12} md={2}>
                        <Button variant="contained" onClick={()=>deletePersona(id_persona)} color="secondary" fullWidth
                        >Eliminar</Button>
                        </Grid>
                        :
                        <Grid item xs={12} md={2}>
                        <Button variant="contained" disabled color="secondary" fullWidth
                        >Eliminar</Button>
                        </Grid>
                        
                        
                }
        </Grid>

  
        <Grid item xs={12} md={12} className="tabla">
        <MaterialDatatable
            title={"Miembros de grupo"}
            data={personas}
            columns={columns}
            options={options}
        />
        
    </Grid>
  

    </Container>
    )
}
export default PersonasMaterial