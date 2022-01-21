import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,FormLabel
} from "react-bootstrap";
import axios from 'axios';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  useEffect,
  useState
} from "react";
import Modal from 'react-bootstrap/Modal'
import { Select , MenuItem, InputLabel} from '@mui/material';
import { useForm } from "react-hook-form";
import { withAlert } from 'react-alert'
import Dropdown from 'react-dropdown';

function Domiciliaciones() {

  const [sap, setSap] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [nombre, setNombre] = useState('');
  const [data, setData] = useState([]);    
  const [loadingData, setLoadingData] = useState(true);
  const [lgShow, setLgShow] = useState(false);
  const [input, setInput] = useState('');
  const [motivo, setMotivo] = useState('');
  const [bancos, setBancos] = useState([]);  
  const [selectedData, setSelectedData] = useState([]); 
  const [lgShowAgregar, setlgShowAgregar] = useState(false);
  const [banco, setBanco] = useState('');
  const [moneda, setMoneda] = useState('');

  const [NumeroCC, setNumeroCC] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Sms, setSms] = useState('');
  const [Senas, setSenas] = useState('');
  const [Canton, setCanton] = useState('');
  const [Provincia, setProvincia] = useState('');
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [ASapIdNombre, setASapIdNombre] = useState('');
  const [ASapId, setASapId] = useState('');


  const optionsMonedas = [
    'Dolares', 'Colones', 'Euros'
  ];

  
  

  useEffect(() => {
    // call api or anything
     axios
    .get(`http://localhost:80/BancosComercialesList`)
    .then((response) => {
      // check if the data is populated
      
      setBancos(response.data);
      // you tell it that you had the result
      setLoadingData(false);
    });
 });

 const handleSelect=(e)=>{
  console.log(e.value);
  setMoneda(e.value);
}

function showModalEdit(res){
  //alert("mostrar modal "+JSON.stringify(data))
 
  setSelectedData({
    SapId:sap,
    Nombre:res.NomDueño_CuentaCliente,
    cedula_CuentaCliente:res.cedula_CuentaCliente,
    dirProvincia_Cliente:res.dirProvincia_Cliente,
    dirCanton_Cliente:res.dirCanton_Cliente,
    dirOtrasSenas_Cliente:res.dirOtrasSenas_Cliente,
    telSMS_Representante:res.telSMS_Representante,
    correoNotificaciones_Representante:res.correoNotificaciones_Representante,
    numero_CuentaCliente:res.numero_CuentaCliente,
    banco_CuentaCliente:res.banco_CuentaCliente,
    
    
   
  })
  console.log("selected",selectedData);
  setLgShow(true)
}

  async function getData2() {

    if (sap.length == 0 || nombre.length == 0  || cuenta.length == 0) {
      alert('Debe ingresar todo los campos')
    } 
    else 
    {
      console.log(sap,cuenta,nombre);
      await axios
    .get(`http://localhost:80/ObtenerDomiciliaciones/${sap}/${nombre}/${cuenta}`)
    .then((response) => {
      // check if the data is populated
      console.log(response.data);
      setData(response.data);
      // you tell it that you had the result
      setLoadingData(false);
    });
    }
  
    

}


  return (
    <>
     <Container style={{'borderRadius':'5px'}} >
        <Row>
          <Col md={3}>
          <FormLabel>Sap ID</FormLabel><br />
   
   <input value={sap} onInput={e => setSap(e.target.value)} type="text" name="name" />
          </Col>
          <Col md={3}>
          <FormLabel>Numero Cuenta</FormLabel><br />
   
   <input value={cuenta} onInput={e => setCuenta(e.target.value)} type="text" name="name" />
                      </Col>
          <Col md={3}>      
         
    
    <FormLabel>Nombre de Propietario</FormLabel><br />
   
    <input value={nombre} onInput={e => setNombre(e.target.value)} type="text" name="name" />
 
          </Col>
         
          <Col md={4}>
          <br />
          <Button  onClick={getData2} variant="download-table-xls-button btn btn-success mb-3">Buscar</Button>{' '}    
            
          <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Enviar a Excel"/>&nbsp;
                   
          </Col>
          
        </Row>
        <Row>
       
  
  </Row>
  <br /> <br /> 
</Container>
      <Container fluid>
         <Row style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
     
       
        
        <div style={{overflowX : 'auto',fontSize: '14px'}}>
        

        <table className="table">
              <thead style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                <tr>                 
                  <th scope="col">IdDomiciliacion</th>
                  <th scope="col">numero_CuentaCliente</th>
                  <th scope="col">Banco </th>
                  <th scope="col">Moneda</th>
                  <th scope="col">DueñoCuentaCliente</th>
                  <th scope="col">CedulaCuentaCliente</th>               
                  <th scope="col">Correo Representante</th>
                  <th scope="col">SMS Representante</th>                 
                  <th scope="col">Provincia Cliente</th>
                  <th scope="col">Canton Cliente</th>
                  <th scope="col">Otras Senas</th>
                  <th scope="col">SAP ID</th>
                  <th scope="col">Estado Domiciliacion,</th>
                  <th scope="col">Fecha Insercion</th>
                  <th scope="col">Usuario Actualiza</th>
                  <th scope="col">Fecha Actualizacion</th>
                  <th scope="col">Usuario Actualizacion</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Desactivar</th>
                  <th scope="col">Reiniciar</th>
                </tr>
              </thead>
              <tbody  style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
              
                {data.map((res) => (
                  <tr>
                    
                    <td>{res.IdDomiciliacion}</td>
                            <td>{res.numero_CuentaCliente}</td>
                            <td>{res.banco_CuentaCliente }</td>
                            <td>{res.moneda_CuentaCliente}</td>
                            <td>{res.NomDueño_CuentaCliente}</td>
                            <td>{res.cedula_CuentaCliente}</td> 
                            <td>{res.correoNotificaciones_Representante}</td>                          
                            <td>{res.telSMS_Representante}</td>
                            <td>{res.dirProvincia_Cliente}</td>
                            <td>{res.dirCanton_Cliente}</td>
                            <td>{res.dirOtrasSenas_Cliente}</td>
                            <td>{res.SAP_ID}</td>
                            <td>{res.EstadoDomiciliacion}</td>
                            <td>{res.FECHA_INSERCION}</td>
                            <td>{res.USUARIO_INSERTA}</td>
                            <td>{res.FECHA_ACTUALIZACION}</td>   
                            <td>{res.USUARIO_ACTUALIZA}</td> 
                            <td className='opration'>
                            <Button onClick={() => showModalEdit(res)} variant="download-table-xls-button btn btn-success mb-3">Editar</Button>{' '}                          
                    </td>
                    <td className='opration'>                     
                    <Button  variant="download-table-xls-button btn btn-success mb-3">Desactivar</Button>{' '}                        
                    </td>   
                    <td className='opration'>                      
                    <Button  variant="download-table-xls-button btn btn-success mb-3">Reiniciar</Button>{' '}  
                    </td>                          
                           
                            
                  </tr>
                ))}
              </tbody>
            </table>                 
                
                </div>
                <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
        <Container  className="justify-content-md-center">
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4"> Editar Domiciliacion</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>                 
                  
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>SAP ID</label>
                        <Form.Control                         
                          placeholder="SAP ID"
                          type="text"
                          value={selectedData.SapId}
                        
                          onInput={e => setInput(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>                  
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Nombre Completo</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Nombre Completo"
                          rows="4"
                          type="text"
                          value={selectedData.Nombre} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Cedula</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Cedula"
                          rows="4"
                          type="text"
                          value={selectedData.cedula_CuentaCliente} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Provincia</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Provincia"
                          rows="4"
                          type="text"
                          value={selectedData.dirProvincia_Cliente} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Canton</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Canton"
                          rows="4"
                          type="text"
                          value={selectedData.dirCanton_Cliente} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Otra Señas</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Otra Señas"
                          rows="4"
                          as="textarea"
                          value={selectedData.dirOtrasSenas_Cliente} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>                    
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Celular SMS</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Nombre Completo"
                          rows="4"
                          type="text"
                          value={selectedData.telSMS_Representante} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Correo Electronico</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Cedula"
                          rows="4"
                          type="text"
                          value={selectedData.correoNotificaciones_Representante} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Row>
                    <Col md="6">
                      <Form.Group>
                      <Form.Label>Banco</Form.Label>
        <Form.Control
          as="select"
          
          onChange={e => {
            console.log("e.target.value", e.target.value);
            setBanco(e.target.value);
          }}
        >
          {bancos.map((serviceType, index) => (                                        
                                        <option key={index} value={serviceType.COD}>{serviceType.NOMBRE}</option>                                            
                                ))}
        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                      <Form.Label>Moneda</Form.Label>
                      <Dropdown options={optionsMonedas}  onChange={handleSelect} placeholder="Moneda" />
                     
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Numero CC</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Numero CC"
                          rows="4"
                          type="text"
                          value={selectedData.numero_CuentaCliente} onInput={e => setMotivo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                   
                  >
                    Crear Domiciliacion
                  </Button>&nbsp;
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={() => setLgShow(false)}
                   
                  >
                    Salir
                  </Button>&nbsp;
                 
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>         
        </Row>
      </Container>

        </Modal.Body>
      </Modal>
        </Row>

        <Row>
        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShowAgregar(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
        <Container  className="justify-content-md-center">
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4"> Agregar Domiciliacion</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>                 
                  
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>SAP ID</label>
                        <Form.Control                         
                          placeholder="SAP ID"
                          type="text"
                          value={ASapId}
                        
                          onInput={e => setASapId(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>                  
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Nombre Completo</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Nombre Completo"
                          rows="4"
                          type="text"
                          value={ASapIdNombre} onInput={e => setASapIdNombre(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Cedula</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Cedula"
                          rows="4"
                          type="text"
                          value={cedulaCliente} onInput={e => setCedulaCliente(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Provincia</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Provincia"
                          rows="4"
                          type="text"
                          value={Provincia} onInput={e => setProvincia(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Canton</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Canton"
                          rows="4"
                          type="text"
                          value={Canton} onInput={e => setCanton(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Otra Señas</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Otra Señas"
                          rows="4"
                          as="textarea"
                          value={Senas} onInput={e => setSenas(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>                    
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Celular SMS</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Nombre Completo"
                          rows="4"
                          type="text"
                          value={Sms} onInput={e => setSms(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Correo Electronico</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Cedula"
                          rows="4"
                          type="text"
                          value={Correo} onInput={e => setCorreo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Row>
                    <Col md="6">
                      <Form.Group>
                      <Form.Label>Banco</Form.Label>
        <Form.Control
          as="select"
          
          onChange={e => {
            console.log("e.target.value", e.target.value);
            setBanco(e.target.value);
          }}
        >
          {bancos.map((serviceType, index) => (                                        
                                        <option key={index} value={serviceType.COD}>{serviceType.NOMBRE}</option>                                            
                                ))}
        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                      <Form.Label>Moneda</Form.Label>
                      <Dropdown options={optionsMonedas}  onChange={handleSelect} placeholder="Moneda" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Numero CC</label>
                        <Form.Control
                          cols="80"                         
                          placeholder="Numero CC"
                          rows="4"
                          type="text"
                          value={NumeroCC} onInput={e => setNumeroCC(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                   
                  >
                    Crear Domiciliacion
                  </Button>&nbsp;
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={() => setLgShow(false)}
                   
                  >
                    Salir
                  </Button>&nbsp;
                 
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>         
        </Row>
      </Container>

        </Modal.Body>
      </Modal>
        </Row>
      </Container>
    </>
  );
}

export default Domiciliaciones;
