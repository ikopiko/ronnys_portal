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
        role: "all",
    },
    {
        id: 9,
        label: "menuitems.order.text",
        icon: "bx-list-ol",
        link: "/reports/orders",
        role: "all",
    },

    {
        id: 10,
        label: "menuitems.bank.text",
        icon: "bxs-bank",
        link: "/reports/banks",
        role: "all",
    },
    {
        id: 11,
        label: "Sales report",
        icon: "bxs-purchase-tag-alt",
        link: "/reports/sales-report",
        role: "all",
    },
    {
        id: 12,
        label: "Toppings report",
        icon: "bxs-circle",
        link: "/reports/toppings-report",
        role: "all",
    },
    {
        id: 6,
        label: "Timeclock report",
        icon: "bxs-time",
        link: "/reports/timetable",
        role: "all",
    },
    {
        id: 13,
        label: "menuitems.safe.text",
        icon: "bx-wallet-alt",
        link: "/reports/safe",
        role: "all",
    },
    
    {
        id: 14,
        label: "menuitems.closed.text",
        icon: "bx-window-close",
        link: "/reports/closed",
        role: "all",
    },
    {
        id: 25,
        label: "menuitems.invoice.text",
        icon: "bx-file",
        link: "/reports/invoices",
        role: "all",
    },
    {
        id: 35,
        label: "menuitems.customer.text",
        icon: "bx-user-circle",
        link: "/customer",
        role: "all",
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
        role: "all",
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
        role: "all",
    },
    {
        id: 18,
        label: "menuitems.request.text",
        icon: "bx-list-plus",
        link: "/warehouse/requests",
        role: "all",
    },
    {
        id: 19,
        label: "menuitems.ticket.text",
        icon: "bx-info-circle",
        link: "/warehouse/ticket",
        role: "all",
    },
    {
        id: 20,
        label: "menuitems.setting.text",
        icon: "bx-cog",
        link: "/warehouse/setting",
        role: "admin",
    },
    {
        id: 21,
        label: "menuitems.barcodes.text",
        icon: "bx-barcode",
        link: "/warehouse/barcodes",
        role: "all",
    },
];

