import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Create()
{
	const rRno = useRef();
	const rName = useRef();
	const rMarks = useRef();

	const [rno, setRno] = useState("");
	const [name, setName] = useState("");
	const [marks, setMarks] = useState("");
	const [msg, setMsg] = useState("");

	const hRno = (event) => { setRno(event.target.value);}
	const hName = (event) => {setName(event.target.value);}
	const hMarks = (event) => { setMarks(event.target.value);}

	const save = (event) => {
		event.preventDefault();

	if (rno === "")
	{
		toast.error("rno shud not be empty", {autoClose:1000});
		setMsg("");
		rRno.current.focus();
		return;
	}

	if (name === "")
	{
		toast.error("name shud not be empty", {autoClose:1000});
		setMsg("");
		rName.current.focus();
		return;
	}

	if (marks === "")
	{
		toast.error("marks shud not be empty", {autoClose:1000});
		setMsg("");
		rMarks.current.focus();
		return;	
	}

let url = "http://localhost:9000/ss";
let data = { rno, name, marks};

axios.post(url, data)
.then(res => {
	if (res.data.insertedId === rno)
	{
		setMsg("record created");
		setRno("");
		setName("");
		setMarks("");
		rRno.current.focus();
	}
	else if (res.data.errorResponse.code === "11000")
	{
		setMsg(rno + "already exists ");
		setRno("");
		rRno.current.focus();
	}
})
.catch(err => {
	setMsg("issue " + err);
});
}

return(
<>
<h1> Create Page </h1>
<ToastContainer/>
<form onSubmit={ save }>
<input type="number"	placeholder="enter rno"
ref={ rRno } 	onChange={ hRno }	value={rno}/>
<br/><br/>
<input type="text"	placeholder="enter name"
ref={ rName } 	onChange={ hName }	value={name}/>
<br/><br/>
<input type="number"	placeholder="enter marks"
ref={ rMarks } 	onChange={ hMarks }	value={marks}/>
<br/><br/>
<input type="submit"	value="Save"/>
<br/><br/>
</form>
<h2> { msg } </h2>
</>
);}
export default Create;



	