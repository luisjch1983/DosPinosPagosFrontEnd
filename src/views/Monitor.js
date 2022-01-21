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

export default function Monitor() {

  const optionsm = {
    filterType: 'checkbox',
  };
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);      
  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [CodigoProceso, setCodigoProceso] = useState('Cualquiera');
  const [Estado, setEstado] = useState('Cualquiera');
  const [input, setInput] = useState('');
  const beginDate = moment(startDate).format('YYYY-MM-DD')
  const EDate = moment(EndDate).format('YYYY-MM-DD')
  const options = [
    'Cualquiera', 'FI-40', 'FI-39'
  ];
  
  const optionsEstado = [
    'Cualquiera', 'Confirmado', 'Pendiente', 'Error'
  ];

  const [codigoProceso, setCodProceso] = useState('');
  const [sociedadFinanciera, setSociedadFinanciera] = useState('');
  const [agrupaTrans, setAgrupaTrans] = useState('');
  const [consTransaccion, setconsTransaccion] = useState('');
  const [tempSelected, setTempData] = useState([]);


  const defaultOption = options[0];
  const defaultOption2 = optionsEstado[0];

 
  const handleSelect=(e)=>{
    console.log(e.value);
    setEstado(e.value);
  }

  const handleSelectCodigo=(e)=>{
    console.log(e.value);
    setCodigoProceso(e.value);
  }


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

  async function reprocesar() {
    
   var codigoProceso;
   var agrupaTrans;
   var consTransaccion;
   var sociedadFinanciera;

   tempSelected.map(function(d) { 
    codigoProceso = d.CODIGO_PROCESO,
        agrupaTrans = d.CONS_AGRUPA_TRANS,
        sociedadFinanciera = d.SOCIEDAD_FINANCIERA,
        consTransaccion = d.CONS_TRANSACCION

      axios
    .post(`http://localhost:80/Reprocesar/${sociedadFinanciera}/${codigoProceso}/${agrupaTrans}/${consTransaccion}`)
    .then((response) => {
      // check if the data is populated
      console.log(response.data);
    
      // you tell it that you had the result
     setLoadingData(false);
    });


   });


      
 
 
 }
 
  

   async function getData2() {
    
   console.log("cod",CodigoProceso,Estado,beginDate,EDate);
   
   
      await axios
    .get(`http://localhost:80/DatosControl/${CodigoProceso}/${Estado}/${beginDate}/${EDate}`)
    .then((response) => {
      if(!response.data.length){
        alert("No hay registros con los datos seleccionados");

    }
     
      console.log(response.data);
      setData(response.data);
      // you tell it that you had the result
      setLoadingData(false);
    })
    .catch((error) => {
      alert("Se presento un error al consultar los datos");
  })


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
          
    
    <FormLabel>Codigo de Proceso</FormLabel><br />
   
<Dropdown options={options}  value={defaultOption} onChange={handleSelectCodigo} placeholder="Codigo de Proceso" />
 
          </Col>
          <Col md={3}>
          <FormLabel>Estado</FormLabel><br />
        
          <Dropdown options={optionsEstado}  value={defaultOption2} onChange={handleSelect} placeholder="Estado" />
          
          </Col>
         
          <Col md={4}>
          <br />
          <Button  onClick={getData2} variant="download-table-xls-button btn btn-success mb-3">Buscar</Button>{' '}    
          <Button  onClick={reprocesar} variant="download-table-xls-button btn btn-success mb-3">Reprocesar</Button>{' '}    
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
        

        <table id="table-to-xls" className="table">
              <thead style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                <tr>
                  <th scope="col">
                  <input
                type="checkbox"               
                onChange={selectAll}
              />
                  </th>
                  <th scope="col">PROCESO</th>
                  <th scope="col">TRANS</th>
                  <th scope="col">TRANSACCION</th>
                  <th scope="col">IMPORTE</th>
                  <th scope="col">CREACION</th>
                  <th scope="col">EJECUCION</th>
                  <th scope="col">ESTADO</th>
                  <th scope="col">EJECUCION</th>
                  <th scope="col">GUID</th>
                  <th scope="col">SOC.FINANCIERA</th>
                  <th scope="col">CANTIDAD</th>
                
                </tr>
              </thead>
              <tbody style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
              
                {data.map((res) => (
                  <tr key={res.CONS_AGRUPA_TRANS,res.SOCIEDAD_FINANCIERA,res.CONS_TRANSACCION,res.CODIGO_PROCESO}  >
                    <th scope="row">
                    <input
                  type="checkbox"
                  
                  onChange={() => checkOne(res.CONS_AGRUPA_TRANS,res.SOCIEDAD_FINANCIERA,res.CONS_TRANSACCION,res.CODIGO_PROCESO)}
                />
                    </th>
                    <td>{res.CODIGO_PROCESO}</td>
                            <td>{res.CONS_AGRUPA_TRANS}</td>
                            <td>{res.CONS_TRANSACCION}</td>
                            <td>{res.TOTAL_IMPORTE}</td>
                            <td>{res.FECHA_CREACION}</td>
                            <td>{res.FECHA_EJECUCION}</td>                            
                            <td>{res.ESTADO}</td>
                            <td>{res.CANTIDAD_EJECUCIONES}</td>
                            <td>{res.DETALLE_EJECUCION}</td>
                            <td>{res.GUID_VALUE}</td>
                            <td>{res.SOCIEDAD_FINANCIERA}</td>
                            <td>{res.CANTIDAD_REG_INTEGRAR}</td>
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


