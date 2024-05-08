"use client"

import React, { useEffect, useState } from 'react'
import { ConvertClassName } from '@/util/convert_class_name'
import { ReConvertClassName } from '@/util/reconvert_class'
import Link from 'next/link'

const ClassPage = () => {

  const [classes, set_classes ] = useState({})
  const [ my_class_name, set_my_class_name ] = useState('')
  const [ today_date, set_today_date ] = useState('')
  const [ name_input, set_name_input ] = useState('');
  const [ gender_input, set_gender_input ] = useState('');

  let my_class_array = classes[my_class_name];


    let now_date = new Date();
    let now_day = now_date.getDate();
    let now_month = now_date.getMonth();
    let now_year = now_date.getFullYear();
    let full_date = `${now_day}/${now_month}/${now_year}`;

  useEffect(() => {
    const local_classes = localStorage.getItem("classes_object");
    const loaded_class = localStorage.getItem("class_in_session")
    const the_date = localStorage.getItem("today_date")

    set_classes(JSON.parse(local_classes))
    set_my_class_name(ConvertClassName(loaded_class))
    set_today_date(the_date)
  }, [])

  useEffect(() => {
    console.log("Class data: ", classes[my_class_name])
    console.log("My Class: ", my_class_name)
  },[my_class_name])

  const addStudentFunc = () => {
    if(name_input != "" && gender_input != ""){
        // alert("Adding student")
        let sd_id = `${name_input.trim()}${Math.random()}`
        let sd_object = {
            id: sd_id,
            name: name_input,
            gender: gender_input,
            class: my_class_name,
            dates: [`${full_date}`]
        }
        // ADD STUDENT TO THE DATABASE
        let current_class_students = [...my_class_array, sd_object]
        set_classes({...classes, [my_class_name]: [...current_class_students]})
        localStorage.setItem("classes_object", JSON.stringify({...classes, [my_class_name]: [...current_class_students]}))
        console.log("Datas: ", {...classes, [my_class_name]: [...current_class_students]})

        console.log("Updated classes: ", classes)

        set_name_input('');
        set_gender_input('');
    }else{
        alert("Please, provide full student details")
    }
  }

  return (
    <div className='class_page_container'>
        <div className='class_page_titles_dates'>
            <h1>Student attendance system</h1>
            <div className='class_page_class_title'>
                <p>Class: {ReConvertClassName(my_class_name)}</p>
                <Link href="/" className='change_class_link'>Change class</Link>
            </div>
            <div className='class_page_dates_container'>
                <div>17/06/2024</div>
                <div>18/06/2024</div>
                <div>19/06/2024</div>
                <div>20/06/2024</div>
                {full_date != today_date ? <div>ADD DATE</div>:""}
            </div>
        </div>
        <div className='class_page_students_listing'>
            <form className='class_page_new_student_form' onSubmit={(e) => e.preventDefault()}>
                <p>Add new student to class</p>
                <div className='class_page_input_box'>
                    <input type='text' placeholder='Fullname of new student' value={name_input} onChange={(e) => set_name_input(e.target.value)} />
                    <input type='text' placeholder='Gender' value={gender_input} onChange={(e) => set_gender_input(e.target.value)} />
                    <button onClick={addStudentFunc}>Add student to class</button>
                </div>
            </form>
            <div className='class_page_students_box'>
                <h4 style={{ margin: "12px 0", color: "red", fontFamily: "sans-serif", fontSize: ".85rem" }}>* Click on a student to add them to the list of available students</h4>
                
                {
                    my_class_array?.map((item, i) => (
                        <div className='class_page_student_box' key={i}>
                            <p>{item.name}</p>
                            <div>{item.gender}</div>
                        </div>
                    ))
                }
            </div>
        </div>



        <div className='class_page_available_students_box'>
            <p>Available students for the date of: </p>
        </div>
    </div>
  )
}

export default ClassPage