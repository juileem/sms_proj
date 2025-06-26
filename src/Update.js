
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Update()
{
    const nav = useNavigate();
    const loc = useLocation();
    const rRno = useRef();
    const rName = useRef();
    const rMarks = useRef();

    const [rno, setRno] = useState(loc.state.r);
    const [name, setName] = useState(loc.state.n);
    const [marks, setMarks] = useState(loc.state.m);
    const [msg, setMsg] = useState("");

    const hRno = (event) => { setRno(event.target.value); }
    const hName = (event) => { setName(event.target.value); }
    const hMarks = (event) => { setMarks(event.target.value); }

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

        let url = "http://localhost:9000/us";
        let data = {rno, name, marks};

        axios.put(url, data)
        .then(res => {
            toast.success("record updated", {autoClose:1000, onClose: () => nav("/")});
        })
        .catch(err => {
            setMsg("issue " + err);
        });
    }

    return(
        <>
            <h1> Update Page </h1>
            <ToastContainer/>
            <form onSubmit={ save }>
                <input type="number" placeholder="enter rno" readOnly
                    ref={ rRno } onChange={ hRno } value={rno}/>
                <br/><br/>
                <input type="text" placeholder="enter name"
                    ref={ rName } onChange={ hName } value={name}/>
                <br/><br/>
                <input type="number" placeholder="enter marks"
                    ref={ rMarks } onChange={ hMarks } value={marks}/>
                <br/><br/>
                <input type="submit" value="Update"/>
            </form>
            <h2> { msg } </h2>
        </>
    );
}
export default Update;
