"use client";
import {
	Admin,
	Resource,
	ListGuesser,
	EditGuesser,
	ShowGuesser,
	fetchUtils,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import authProvider from "@/lib/admin/authProvider";
import dataProvider from "@/lib/admin/dataProvider";

// const dataProvider = simpleRestProvider(BACKEND_URL, httpClient);

const AdminApp = () => (
	<Admin dataProvider={dataProvider} authProvider={authProvider}>
		<Resource
			name="products"
			list={ListGuesser}
			edit={EditGuesser}
			show={ShowGuesser}
			recordRepresentation="name"
		/>
		<Resource
			name="types"
			list={ListGuesser}
			edit={EditGuesser}
			show={ShowGuesser}
			recordRepresentation="name"
		/>
		<Resource
			name="promotions"
			list={ListGuesser}
			edit={EditGuesser}
			show={ShowGuesser}
			recordRepresentation="time_discount"
		/>
		<Resource
			name="orders"
			list={ListGuesser}
			edit={EditGuesser}
			show={ShowGuesser}
			recordRepresentation="id"
		/>
	</Admin>
);

export default AdminApp;
