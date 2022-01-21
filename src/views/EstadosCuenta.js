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

import DatePicker from 'react-datepicker'
import TableSelect  from 'react-table-select'

import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import axios from 'axios';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { matchSorter } from 'match-sorter';


// Import React Table
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import {
  useEffect,
  useState
} from "react";

import 'react-datepicker/dist/react-datepicker-cssmodules.css'

import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function EstadosCuenta() {

  const optionsm = {
    filterType: 'checkbox',
  };
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);      
  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [CodigoProceso, setCodigoProceso] = useState('Cualquiera');
  const [Estado, setEstado] = useState('Cualquiera');

  const beginDate = moment(startDate).format('YYYY-MM-DD')
  const EDate = moment(EndDate).format('YYYY-MM-DD')
  const options = [
    'Cualquiera', 'FI-40', 'FI-39'
  ];
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const optionsEstado = [
    'Cualquiera', 'Confirmado', 'Pendiente', 'Error'
  ];

  const [codigoProceso, setCodProceso] = useState('');
  const [sociedadFinanciera, setSociedadFinanciera] = useState('');
  const [agrupaTrans, setAgrupaTrans] = useState('');
  const [consTransaccion, setconsTransaccion] = useState('');
  const [tempSelected, setTempData] = useState([]);




  const columns = [
    { title: "Num_Comp ", field: "Num_Comp " },
    { title: "Banco", field: "Banco" },
    { title: "Agencia ", field: "Agencia " },
    { title: "Fecha_Pago", field: "Fecha_Pago" },
    { title: "Factura", field: "Factura" },
    { title: "Num_Cuenta", field: "Num_Cuenta" },
    { title: "Monto", field: "Monto" },
    { title: "Estado", field: "Estado" },
    { title: "OBSERVACIONES", field: "OBSERVACIONES" },
    { title: "CuentaCliente", field: "CuentaCliente" },
    { title: "SOCIEDAD_FINANCIERA", field: "SOCIEDAD_FINANCIERA" },
    { title: "CONS_AGRUPA_TRANS", field: "CONS_AGRUPA_TRANS" },
    { title: "CONS_TRANSACCION", field: "CONS_TRANSACCION" },
    { title: "USUARIO_INSERTA", field: "USUARIO_INSERTA" },
    { title: "FECHA_INSERCION", field: "FECHA_INSERCION" },
    { title: "USUARIO_ACTUALIZA", field: "USUARIO_ACTUALIZA" },
    { title: "FECHA_ACTUALIZACION", field: "FECHA_ACTUALIZACION" },
  ];

  const [appData, setDatos] = useState(data);
  const selectAll = () => {
    console.log("cc");
    const tempData = data.map(el => ({ ...el, checked: true }));
    setDatos(tempData);
    setTempData(tempData);
    console.log(tempData);
  };

  const checkOne = (id,id2, id3, id4) => {
    console.log("cc2",id,id2, id3, id4);
    const tempData = data.map(el => {
      if (el.SOCIEDAD_FINANCIERA === id && el.CODIGO_PROCESO === id2 && el.CONS_AGRUPA_TRANS === id3&& el.CONS_TRANSACCION === id4) {
        return { ...el, checked: !el.checked };
      }
      return el;
    });
    setData(tempData);
  };

  
 
  

   async function getData2() {
    
    const beginDate = moment(startDate).format('YYYY-MM-DD')
    const EDate = moment(EndDate).format('YYYY-MM-DD')

    var inputValue;

    if (Object.keys(input).length == 0) {
      console.log("nu");
      inputValue = 'Null';
    }
    else
    {
      inputValue = input;
    }
 
    console.log("ll");
 
      await axios
    .get(`http://localhost:80/EstadoCuenta/${inputValue}/${beginDate}/${EDate}`)
    .then((response) => {
      // check if the data is populated
      console.log(response.data);
      setData(response.data);
      // you tell it that you had the result
      setLoadingData(false);
    });

}

  
  return (
    <>
    <Container style={{'borderRadius':'5px'}} >
        <Row>
          <Col md={3}>
          <Form.Group>
                        <label>Desde</label>
                        <Form.Control
                          placeholder="Desde"
                          type="date"                          
                          onChange={(e) => setStartDate(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
          </Col>
          <Col md={3}>
          <Form.Group>
                        <label>Hasta</label>
                        <Form.Control
                          placeholder="Hasta"
                          type="date"                          
                          onChange={(e) => setEndDate(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      </Col>
          <Col md={3}>        
          
    
    <FormLabel>No.Estado de Cuenta</FormLabel><br />
   
    <input value={input} onInput={e => setInput(e.target.value)} type="text" name="name" />
 
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
                    buttonText="Enviar a Excel"/>
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
                  <th scope="col">SAP_ID</th>
                  <th scope="col">RAZONSOCIAL_CLIENTE</th>
                  <th scope="col">CEDULACLIENTE </th>
                  <th scope="col">FECHAESTADOCUENTA</th>
                  <th scope="col">NUMEROESTADOCUENTA</th>
                  <th scope="col">FECHAVENCIMIENTO</th>               
                  <th scope="col">MONTO</th>
                  <th scope="col">SOCIEDAD_FINANCIERA</th>                 
                  <th scope="col">CODIGO_PROCESO</th>
                  <th scope="col">CONS_AGRUPA_TRANS</th>
                  <th scope="col">CONS_TRANSACCION</th>
                  <th scope="col">FECHA_INSERCION</th>
                  <th scope="col">FECHA_ACTUALIZACION</th>
                  <th scope="col">USUARIO_INSERTA</th>
                  <th scope="col">USUARIO_ACTUALIZA</th>
                  <th scope="col">OBSERVACIONES</th>
                </tr>
              </thead>
              <tbody  style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
              
                {data.map((res) => (
                  <tr>
                    
                    <td>{res.Num_Comp}</td>
                            <td>{res.SAP_ID}</td>
                            <td>{res.RAZONSOCIAL_CLIENTE }</td>
                            <td>{res.CEDULACLIENTE}</td>
                            <td>{res.FECHAESTADOCUENTA}</td>
                            <td>{res.NUMEROESTADOCUENTA}</td> 
                            <td>{res.FECHAVENCIMIENTO}</td>                          
                            <td>{res.MONTO}</td>
                            <td>{res.SOCIEDAD_FINANCIERA}</td>
                            <td>{res.CODIGO_PROCESO}</td>
                            <td>{res.CONS_AGRUPA_TRANS}</td>
                            <td>{res.CONS_TRANSACCION}</td>
                            <td>{res.FECHA_INSERCION}</td>
                            <td>{res.FECHA_ACTUALIZACION}</td>
                            <td>{res.USUARIO_INSERTA}</td>
                            <td>{res.USUARIO_ACTUALIZA}</td>  
                            <td>{res.OBSERVACIONES}</td>                        
                           
                            
                  </tr>
                ))}
              </tbody>
            </table>


                  
                
                </div>
        </Row>
      </Container>
    </>
  );
}


