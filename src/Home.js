import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home()
{
	const [info, setInfo] = useState([]);
	const nav = useNavigate();

	const fetchData = () => {
		let url = "http://localhost:9000/gs";
		axios.get(url)
		.then(res => {
			setInfo(res.data);
		});
	}
	
	useEffect( () => {
		fetchData();
	}, []);

	const delStu = (r) => {
		let url = "http://localhost:9000/ds";
		let d = {data : {rno:r} };
		axios.delete(url, d)
		.then(res => {
			toast.info("record deleted ",{autoClose:1000});
			fetchData();
		})
		.catch(err => {
			toast.error("issue "+ err, { autoClose:1000});

		
	});
};

const upStu = (r, n, m) => {
		nav("/update", { state: { r, n, m } });  // navigate to /update and pass data
	};

return(
<>
<ToastContainer/>
<h1> Home Page </h1>
<table border={5}>
<tr>
<th> Rno </th>
<th> Name </th>
<th> Marks </th>
<th> Delete </th>
<th> Update </th>
</tr>
{
info.map( (e) => (
<>
<tr>
<td> { e._id } </td>
<td> { e.name } </td>
<td> { e.marks } </td>
<td> <button onClick = { () => { if ( window.confirm('r u sure??')) delStu(e._id)} }> Delete </button></td>
<td> <button onClick={() => upStu(e._id, e.name, e.marks)}> Update </button> </td>
</tr>
</>
))
}
</table>
</>
);
}
export default Home;
