import React, { useEffect, useState } from 'react'

function CreateSchool() {
    const [ error, set_error ] = useState('')
    const [ user_input, set_user_input ] = useState('')

    const createSchool = () => {
        if(user_input == "") {
            set_error("You need to provide the name of school")
        } else{
            if(user_input.trim().length < 6){
                set_error("Name of school should atleast be 6 characters or more")
            }else{
                localStorage.setItem("school_titles", user_input);
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