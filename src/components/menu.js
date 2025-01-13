export const menuItems = [
   
    {
        id: 7,
        label: "menuitems.report.text",
        isTitle: true
    },
    {
        id: 8,
        label: "menuitems.discount.text",
        icon: "bx-money",
        link: "/reports/discounts",
        roles:{"global_manager":true,"loca_manager":false},
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "marketingManager", "hrManager", "admin"],
    },
    {
        id: 9,
        label: "menuitems.order.text",
        icon: "bx-list-ol",
        link: "/reports/orders",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "marketingManager", "hrManager", "admin"],
    },

    {
        id: 10,
        label: "menuitems.bank.text",
        icon: "bxs-bank",
        link: "/reports/banks",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    {
        id: 11,
        label: "Sales report",
        icon: "bxs-purchase-tag-alt",
        link: "/reports/sales-report",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "marketingManager", "hrManager", "admin"],
    },
    {
        id: 12,
        label: "Toppings report",
        icon: "bxs-circle",
        link: "/reports/toppings-report",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    {
        id: 6,
        label: "Timeclock report",
        icon: "bxs-time",
        link: "/reports/timetable",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    {
        id: 6,
        label: "Timeclock sum report",
        icon: "bxs-time",
        link: "/reports/timetablesum",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    {
        id: 13,
        label: "menuitems.safe.text",
        icon: "bx-wallet-alt",
        link: "/reports/safe",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    
    {
        id: 14,
        label: "menuitems.closed.text",
        icon: "bx-window-close",
        link: "/reports/closed",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    {
        id: 25,
        label: "menuitems.invoice.text",
        icon: "bx-file",
        link: "/reports/invoices",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    {
        id: 35,
        label: "menuitems.customer.text",
        icon: "bx-user-circle",
        link: "/customer",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "marketingManager", "hrManager", "admin"],
    },
    {
        id: 37,
        label: "HR",
        isTitle: true
    },
    {
        id: 36,
        label: "Add/Edit Users",
        icon: "bx-user",
        link: "/users",
        role: ["operationalManager", "branchManager", "viceManager", "hrManager", "admin"],
    },
    { 
        id: 16,
        label: "menuitems.warehouse.text",
        isTitle: true
    },
    {
        id: 17,
        label: "menuitems.waybill.text",
        icon: "bx-list-plus",
        link: "/warehouse/waybill",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "inventoryManager", "hrManager", "admin"],
    },
    {
        id: 18,
        label: "menuitems.request.text",
        icon: "bx-list-plus",
        link: "/warehouse/requests",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "inventoryManager", "hrManager", "admin", "procurement"],
    },
    {
        id: 19,
        label: "menuitems.ticket.text",
        icon: "bx-info-circle",
        link: "/warehouse/ticket",
        role: ["financialManager", "operationalManager", "branchManager", "viceManager", "inventoryManager", "hrManager", "admin"],
    },
    {
        id: 20,
        label: "menuitems.setting.text",
        icon: "bx-cog",
        link: "/warehouse/setting",
        role: ["financialManager", "operationalManager", "inventoryManager", "hrManager", "admin"],
    },
    {
        id: 21,
        label: "menuitems.barcodes.text",
        icon: "bx-barcode",
        link: "/warehouse/barcodes",
        role: ["financialManager", "operationalManager",  "inventoryManager", "hrManager", "admin", "procurement"],
    },
];

