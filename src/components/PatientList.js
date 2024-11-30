import { useEffect, useState } from "react";
import { deletePatient,getPatient } from "./services/ApiService";
import Addpatient from './AddPatient'

const PatientList = () => {
    const [patients, setPatients] = useState([])
    const [showAddPatient,setShowAddPatient]=useState(false)
    const [editPatient, setEditPatient] = useState(null);
    useEffect(() => {
        getPatient()
            .then(res => {
                console.log("Response from api ", res)
                setPatients(res)
            })
    }, [])
    const handleDeleteBtn=(id)=>{
        deletePatient(id)
        .then(()=>setPatients(patients.filter(p=>p.patient_id!==id)))
    }

    const handleEditBtn = (patient) => {
        setEditPatient(patient);
        setShowAddPatient(true); // Show the AddPatient form for editing
    };

    const handleCancelBtn=()=>{
        setShowAddPatient(false);
        getPatient()
        .then(res=>{
            console.log("response from api: ",res)
            setPatients(res)
        })
    }
    return (
        <div className="container">
            <h3>Patient List</h3>
            <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Blood Group</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient =>
                        < tr key={patient.patient_id} >
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.blood}</td>
                            <td>
                                <button className="btn btn-primary m-2" onClick={() => handleEditBtn(patient)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteBtn(patient.patient_id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br/>
            
            <button className="btn btn-success" onClick={()=>setShowAddPatient(!showAddPatient)}>Add New Patient</button>
            <br/>
            <br/>
            {showAddPatient && (
                <div className="popup-overlay">
                <div className="popup-content">
                    <Addpatient handleCancelBtn={handleCancelBtn}
                                            editPatient={editPatient} 
                                            setEditPatient={setEditPatient} 
                                            setPatients={setPatients}/>
                </div>
                </div>
            )}
        </div>
    )
}
export default PatientList