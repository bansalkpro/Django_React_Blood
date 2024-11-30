
import axios from "axios"
import { useEffect,useState } from "react"
const AddPatient = ({ handleCancelBtn,editPatient,setEditPatient, setPatients }) => {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [blood, setBlood] = useState('')

    useEffect(() => {
        if (editPatient) {
            setFirstName(editPatient.first_name);
            setLastName(editPatient.last_name);
            setBlood(editPatient.blood);
        } else {
            setFirstName('');
            setLastName('');
            setBlood('');
        }
    }, [editPatient]);

    const handleAddSubmit = async e => {

        e.preventDefault();
        console.log(first_name, last_name, blood)
        if (editPatient) {
            // Update existing patient
            const res = await axios.put(`http://127.0.0.1:8000/patient/${editPatient.patient_id}/`, { first_name, last_name, blood });
            console.log(res.data);
            setPatients(prevPatients => prevPatients.map(p => (p.patient_id === editPatient.patient_id ? res.data : p)));
        }
        else{
            const res = await axios.post('http://127.0.0.1:8000/patient/', { first_name, last_name, blood })
            console.log(res.data)
            setPatients(prevPatients => [...prevPatients, res.data]);
        }
        setEditPatient(null); // Clear edit state
        handleCancelBtn(); // Close form
    }

    return (
        <>
            <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" value={first_name} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" value={last_name} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="blood" className="form-label">Blood Group</label>
                    <input type="text" className="form-control" id="blood" value={blood} onChange={e => setBlood(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary m-2">{editPatient ? "Update" : "Add"}</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelBtn}>Cancel</button>
            </form>

        </>

    )
}
export default AddPatient
