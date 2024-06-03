interface IColumnHeader {
	Header: string;
	accessor: string;
}

type Columns = IColumnHeader[];

export const columnContact: Columns = [
	{
		Header: "id",
		accessor: "id",
	},
	{
		Header: "Nombre",
		accessor: "fullName",
	},
	{
		Header: "Email",
		accessor: "email",
	},
	{
		Header: "Asunto",
		accessor: "theme",
	},
	{
		Header: "subject",
		accessor: "subject",
	},
	{
		Header: "Entorno Trabajo",
		accessor: "bussiness",
	},
	{
		Header: "status",
		accessor: "status",
	},
	{
		Header: "Fecha Registro",
		accessor: "createdAt",
	},
	{
		Header: "Fecha Servicio",
		accessor: "dateService",
	},
	{
		Header: "Estado Servicio",
		accessor: "stateService",
	},
	{
		Header: "Acciones",
		accessor: "actions",
	},
]
export const columnBlog: Columns = [
	{
		Header: "id",
		accessor: "id",
	},
	{
		Header: "Email",
		accessor: "email",
	},
	{
		Header: "Fecha Registro",
		accessor: "createdAt",
	},
]
export const developmentColumn: Columns = [
	{
		Header: "Id",
		accessor: "id",
	},
	{
		Header: "Tema",
		accessor: "theme",
	},
	{
		Header: "Tiempo estimado",
		accessor: "timeEstimation",
	},
	{
		Header: "Tiempo Toogle",
		accessor: "timeToogle",
	},
	{
		Header: "Fecha solicitud",
		accessor: "dateRequest",
	},
	{
		Header: "Fecha Pago",
		accessor: "paymentRequest",
	},
	{
		Header: "paymentStatus",
		accessor: "paymentStatus",
	},
	{
		Header: "Estado de Pago",
		accessor: "statePayment",
	},
	{
		Header: "Acciones",
		accessor: "actions",
	},
]

export const columnsDataColumns: Columns = [
	{
		Header: "NAME",
		accessor: "name",
	},
	{
		Header: "PROGRESS",
		accessor: "progress",
	},
	{
		Header: "QUANTITY",
		accessor: "quantity",
	},
	{
		Header: "DATE",
		accessor: "date",
	},
]

export const columnsDataComplex: Columns = [
	{
		Header: "NAME",
		accessor: "name",
	},
	{
		Header: "STATUS",
		accessor: "status",
	},
	{
		Header: "DATE",
		accessor: "date",
	},
	{
		Header: "PROGRESS",
		accessor: "progress",
	},
]
