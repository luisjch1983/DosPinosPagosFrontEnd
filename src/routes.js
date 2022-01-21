
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Monitor from "views/Monitor.js";
import EntradaPagos from "views/EntradaPagos.js";
import HistorialPagos from "views/HistorialPagos";
import EstadosCuenta from "views/EstadosCuenta";
import GestionEstadosCuenta from "views/GestionEstadosCuenta";
import Domiciliaciones from "views/Domiciliaciones";
import Login from "views/Login.js";

const dashboardRoutes = [
 
  {
    path: "/monitor",
    name: "Monitor",
    icon: "nc-icon nc-notes",
    component: Monitor,
    layout: "/admin",
  },
  {
    path: "/EntradaPagos",
    name: "Entrada de Pagos",
    icon: "nc-icon nc-circle-09",
    component: EntradaPagos,
    layout: "/admin",
  },
  {
    path: "/HistorialPagos",
    name: "Historial Pagos Recibidos",
    icon: "nc-icon nc-circle-09",
    component: HistorialPagos,
    layout: "/admin",
  },
  
  {
    path: "/EstadosCuenta",
    name: "Estados de Cuenta",
    icon: "nc-icon nc-paper-2",
    component: EstadosCuenta,
    layout: "/admin",
  },
  {
    path: "/GestionEstadosCuenta",
    name: "Gest.Estados de Cuenta",
    icon: "nc-icon nc-atom",
    component: GestionEstadosCuenta,
    layout: "/admin",
  },
  {
    path: "/Domiciliaciones",
    name: "Domiciliaciones",
    icon: "nc-icon nc-pin-3",
    component: Domiciliaciones,
    layout: "/admin",
  },
  
];

export default dashboardRoutes;
