import React, { useEffect, useState } from 'react'

function CreateSchool() {
    const [ error, set_error ] = useState('')
    const [ user_input, set_user_input ] = useState('')
    // useEffect(() => {
    //     console.log(user_input)
    // },[user_input])

    const setValue = (e) => {
        console.log(e)
    }
    
  return (
    <div className='create_school_container'>
        <p style={{ fontFamily: "sans-serif", fontSize: "1.5rem", textAlign: "center" }}>Create School</p>
        <div className='create_school_inputs'>
            <input value={user_input} onChange={(e) => setValue(e)} type='text' placeholder='Name of school' className='create_school_name_input' />
            <button className='create_school_btn'>Create School</button>
        </div>
        {error!=''?
        <div className='create_school_error_box'>
            <p>WARNING</p>
            <p>You need to provide the name of the school</p>
            <button className='create_school_cancel_btn'>Cancel</button>
        </div>:""}
    </div>
  )
}

export default CreateSchool