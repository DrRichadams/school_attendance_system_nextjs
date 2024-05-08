import React, { useState, useEffect } from 'react'

function CreateSchool() {
    const [ error, set_error ] = useState('')
    const [ user_input, set_user_input ] = useState('')
    const [ current_date, set_current_date ] = useState('')

    useEffect(() => {
        let now_date = new Date();
        let now_day = now_date.getDate();
        let now_month = now_date.getMonth();
        let now_year = now_date.getFullYear();
        let full_date = `${now_day}/${now_month}/${now_year}`;
        set_current_date(full_date)
    },[])

    useEffect(() => {
        console.log("Current date is: ", current_date)
    },[current_date])

    const [ classes_object ] = useState({
        A1: [], B1: [], C1: [], D1: [], E1: [],
        A2: [], B2: [], C2: [], D2: [], E2: [],
        A3: [], B3: [], C3: [], D3: [], E3: [],
        A4: [], B4: [], C4: [], D4: [], E4: [],
        L6C1: [], L6C2: [], U6C1: [], U6C2: [],
        L6A1: [], L6A2: [], U6A1: [], U6A2: [],
        L6S1: [], L6S2: [], U6A1: [], U6A2: []
    })



    const createSchool = () => {
        if(user_input == "") {
            set_error("You need to provide the name of school")
        } else{
            if(user_input.trim().length < 6){
                set_error("Name of school should atleast be 6 characters or more")
            }else{
                localStorage.setItem("school_titles", user_input);
                localStorage.setItem("classes_object", JSON.stringify(classes_object));
                localStorage.setItem("dates_array", JSON.stringify([current_date]));
                localStorage.setItem("today_date", JSON.stringify(current_date));
                window.location.reload()
            }
        }
    }
    
  return (
    <div className='create_school_container'>
        <p style={{ fontFamily: "sans-serif", fontSize: "1.5rem", textAlign: "center" }}>Create School</p>
        <div className='create_school_inputs'>
            <input value={user_input} onChange={(e) => { set_user_input(e.target.value); set_error("") }} type='text' placeholder='Name of school' className='create_school_name_input' />
            <button className='create_school_btn' onClick={() => createSchool()}>Create School</button>
        </div>
        {error!=''?
        <div className='create_school_error_box'>
            <p>WARNING</p>
            <p>{error}</p>
            <button 
                className='create_school_cancel_btn'
                onClick={() => set_error("")}
                >Cancel</button>
        </div>:""}
    </div>
  )
}

export default CreateSchool