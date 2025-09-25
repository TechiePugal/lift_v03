import { lazy } from "react";
import { useSelector } from "react-redux";

const CustomersPage = lazy(() => import("../pages/Customers/CustomersPage"));
const CreateCustomerPage = lazy(() =>
  import("../pages/Customers/CreateCustomer")
);
const CustomerDetailsPage = lazy(() =>
  import("../pages/Customers/CustomerDetails")
);
const CustomerEditPage = lazy(() => import("../pages/Customers/EditiCustomer"));

const Home = lazy(() => import("../pages/Home"));
const Appointments = lazy(() => import("../pages/Appointments/Appointments"));
const Settings = lazy(() => import("../pages/Settings"));
const PlanandPricingPage = lazy(() =>
  import("../pages/Settings/PlanandPricing/PlanandPricing")
);
const AdminUsers = lazy(() => import("../pages/Settings/AdminUsers"));
const Doctors = lazy(() => import("../pages/Settings/Doctors"));
const Treatments = lazy(() => import("../pages/Settings/Treatments"));
const Medicines = lazy(() => import("../pages/Settings/Medicines"));
const Labs = lazy(() => import("../pages/Settings/Labs"));
const LabsWorks = lazy(() => import("../pages/Settings/LabsWorks"));
const TreatmentsPage = lazy(() => import("../pages/Treatments"));
const InventoryPage = lazy(() => import("../pages/Inventory"));
const PatientDatabasePage = lazy(() =>
  import("../pages/Treatments/PatientDatabase/PatientDatabasePage")
);
const TreatmentDetailsPage = lazy(() =>
  import("../pages/Treatments/TreatmentDetails/TreatmentDetailsPage")
);
const EditTreatmentDetailsPage = lazy(() =>
  import("../pages/Treatments/EditTreatmentDetails/EditTreatmentDetailsPage")
);
const PatientProfilePage = lazy(() =>
  import("../pages/Treatments/PatientProfile/PatientProfilePage")
);
const LabsPage = lazy(() => import("../pages/Labs/LabsPage"));
const LabOrderDetailsPage = lazy(() =>
  import("../pages/Labs/LabOrderDetails/LabOrderDetails")
);
const CreateLabOrderPage = lazy(() =>
  import("../pages/Labs/CreateLabOrder/CreateLabOrder")
);
const PaymentsPage = lazy(() => import("../pages/Payments/Payments"));
const FinancePage = lazy(() => import("../pages/Finance/index"));
const PaymentDetailsPage = lazy(() =>
  import("../pages/Payments/PaymentDetails/PaymentDetailsPage")
);
const CreateInvoicePage = lazy(() =>
  import("../pages/Payments/CreateInvoicePage/CreateInvoicePage")
);
const ExpensePage = lazy(() =>
  import("../pages/Payments/Expenses/ExpensePage")
);
const PrescriptionsPage = lazy(() =>
  import("../pages/Prescriptions/PrescriptionsPage")
);
const PrescriptionDetailsPage = lazy(() =>
  import("../pages/Prescriptions/PrescriptionDetails")
);
const CreatePrescriptionPage = lazy(() =>
  import("../pages/Prescriptions/CreatePrescription")
);

const RemindersPage = lazy(() => import("../pages/Reminders/RemindersPage"));

const coreRoutes = [
  {
    path: "/customers",
    title: "Customers",
    component: CustomersPage,
    dashboardItem: true,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/Home.svg"
        alt=""
      />
    ),
  },
  {
    path: "/create_customer",
    title: "customer Create",
    component: CreateCustomerPage,
    dashboardItem: false,
  },
  {
    path: "/edit_customer",
    title: "customer Edit",
    component: CustomerEditPage,
    dashboardItem: false,
  },
  {
    path: "/customer_details",
    title: "Customer Details",
    component: CustomerDetailsPage,
    dashboardItem: false,
  },
  {
    path: "/",
    title: "Dashboard",
    component: Home,
    dashboardItem: false,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/Home.svg"
        alt=""
      />
    ),
  },
  {
    path: "/appointments",
    title: "Appointments",
    component: CustomersPage,
    dashboardItem: false,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/Appointments.svg"
        alt=""
      />
    ),
  },
  {
    path: "/reminders",
    title: "Reminders",
    component: RemindersPage,
    dashboardItem: false,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/ReminderIcon.svg"
        alt=""
      />
    ),
  },
  {
    path: "/treatments",
    title: "Treatments",
    component: TreatmentsPage,
    childrens: [
      "/patient_database",
      "/treatment_details",
      "/patient_profile",
      "/edit_treatment_details",
    ],
    dashboardItem: false,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/Treatments.svg"
        alt=""
      />
    ),
  },
  {
    path: "/patient_database",
    title: "Patient Database",
    component: PatientDatabasePage,
    dashboardItem: false,
  },
  {
    path: "/patient_profile",
    title: "Patient Profile",
    component: PatientProfilePage,
    dashboardItem: false,
  },
  {
    path: "/treatment_details",
    title: "Treatment Details",
    component: TreatmentDetailsPage,
    dashboardItem: false,
  },
  {
    path: "/edit_treatment_details",
    title: "Treatment Details",
    component: EditTreatmentDetailsPage,
    dashboardItem: false,
  },
  {
    path: "/inventory",
    title: "inventory",
    component: InventoryPage,
    childrens: [
      // "/patient_database",
      // "/treatment_details",
      // "/patient_profile",
      // "/edit_treatment_details",
    ],
    dashboardItem: false,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/Treatments.svg"
        alt=""
      />
    ),
  },
  {
    path: "/prescriptions",
    title: "Prescriptions",
    component: PrescriptionsPage,
    childrens: ["/prescription_details/", "/create_prescription"],
    dashboardItem: false,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/Prescriptions.svg"
        alt=""
      />
    ),
  },
  {
    path: "/prescription_details",
    title: "Prescription Details",
    component: PrescriptionDetailsPage,
    dashboardItem: false,
  },
  {
    path: "/create_prescription",
    title: "Prescription Create",
    component: CreatePrescriptionPage,
    dashboardItem: false,
  },

  {
    path: "/labs",
    title: "Labs",
    component: LabsPage,
    dashboardItem: false,
    childrens: ["/lab_order_details/", "/create_lab_order"],
    icon: (
      <img
        width={14.11}
        height={24.9}
        className=""
        src="/icons/Labs.svg"
        alt=""
      />
    ),
  },
  {
    path: "/lab_order_details",
    title: "LabOrderDetails",
    component: LabOrderDetailsPage,
    dashboardItem: false,
  },
  {
    path: "/create_lab_order",
    title: "CreateLabOrder",
    component: CreateLabOrderPage,
    dashboardItem: false,
  },
  {
    path: "/payments",
    title: "Payments",
    component: PaymentsPage,
    dashboardItem: false,
    childrens: ["/payment_details", "/create_invoice", "/expense"],
    icon: (
      <img
        width={22}
        height={15}
        className=""
        src="/icons/Payments.svg"
        alt=""
      />
    ),
  },
  {
    path: "/payment_details",
    title: "PaymentDetailsPage",
    component: PaymentDetailsPage,
    dashboardItem: false,
  },
  {
    path: "/create_invoice",
    title: "CreateInvoicePage",
    component: CreateInvoicePage,
    dashboardItem: false,
  },
  {
    path: "/expense",
    title: "ExpensePage",
    component: ExpensePage,
    dashboardItem: false,
  },
  {
    path: "/finance",
    title: "Finance",
    component: FinancePage,
    dashboardItem: false /** Make this true */,
    childrens: [],
    icon: (
      <img
        width={20}
        height={12}
        className=""
        src="/icons/Finance.svg"
        alt=""
      />
    ),
  },

  {
    path: "/settings",
    title: "Settings",
    component: Settings,
    childrens: [
      "/settings/admin_users",
      "/settings/doctors",
      "/settings/treatments",
      "/settings/medicines",
      "/settings/labs",
      "/settings/labs_works",
      "/settings/planandpricing",
    ],
    dashboardItem: false,
    icon: (
      <img
        width={18.56}
        height={18.18}
        className=""
        src="/icons/Settings.svg"
        alt=""
      />
    ),
  },
  {
    path: "/settings/planandpricing",
    title: "PlanandPricingPage",
    component: PlanandPricingPage,
    dashboardItem: false,
  },
  {
    path: "/settings/admin_users",
    title: "Admin users",
    component: AdminUsers,
    dashboardItem: false,
  },
  {
    path: "/settings/doctors",
    title: "Doctors",
    component: Doctors,
    dashboardItem: false,
  },
  {
    path: "/settings/treatments",
    title: "Treatments",
    component: Treatments,
    dashboardItem: false,
  },
  {
    path: "/settings/medicines",
    title: "Medicines",
    component: Medicines,
    dashboardItem: false,
  },
  {
    path: "/settings/labs",
    title: "Labs",
    component: Labs,
    dashboardItem: false,
  },
  {
    path: "/settings/Labs_works",
    title: "Labs",
    component: LabsWorks,
    dashboardItem: false,
  },
];

const routes = [...coreRoutes];
export default routes;
