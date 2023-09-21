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
		Header: "Estado Servicio",
		accessor: "stateService",
	},
	{
		Header: "Acciones",
		accessor: "actions",
	},
]
export const columnsDataCheck: Columns = [
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
