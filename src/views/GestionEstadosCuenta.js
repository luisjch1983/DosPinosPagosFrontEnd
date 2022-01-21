import React from "react";
import { DataGrid } from '@mui/x-data-grid';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,Grid, Form, FormGroup, FormLabel, FormControl, Checkbox, Radio, Modal
} from "react-bootstrap";
import axios from 'axios';
import {
  useEffect,
  useState
} from "react";


function GestionEstadosCuenta() {

  const [input, setInput] = useState('');
  const [motivo, setMotivo] = useState('');

  async function Anular() {    
  
    if (input.length == 0 || motivo.length == 0 ) {
      alert('Debe ingresar todo los campos')
    } 
    else 
    {
      axios
      .post(`http://localhost:80/Anular/${input}/${motivo}`)
      .then((response) => {
        // check if the data is populated
        console.log(response.data);
      
        // you tell it that you had the result
       setLoadingData(false);
      }); 
    }
     
 }

 async function Reactivar() {    
  
 
  axios
.post(`http://localhost:80/Reactivar/${input}/${motivo}`)
.then((response) => {
  // check if the data is populated
  console.log(response.data);

  // you tell it that you had the result
 setLoadingData(false);
}); 
}

async function Procesar() {   
  
 axios
.post(`http://localhost:80/Procesar}`)
.then((response) => {
  // check if the data is populated
  console.log(response.data);

  // you tell it that you had the result
 setLoadingData(false);
}); 
}

  return (
    <>
      <Container  className="justify-content-md-center">
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Gestion de Estados de Cuenta y Pagos</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>                 
                  
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Numero de Estado de Cuenta</label>
                        <Form.Control                         
                          placeholder="No.Estado Cuenta"
                          type="text"
                          value={input} onInput={e => setInput(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>                  
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Motivo</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Motivo"
                          rows="4"
                          as="textarea"
                          value={motivo} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={Anular}
                  >
                    Anular
                  </Button>&nbsp;
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={Reactivar}
                  >
                    Re-Activar
                  </Button>&nbsp;
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={Procesar}
                  >
                    Aplicar
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>         
        </Row>
      </Container>
    </>
  );
}

export default GestionEstadosCuenta;

