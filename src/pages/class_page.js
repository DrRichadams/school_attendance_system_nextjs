"use client"

import React, { useEffect, useState } from 'react'
import { ConvertClassName } from '@/util/convert_class_name'
import { ReConvertClassName } from '@/util/reconvert_class'
import Link from 'next/link'
import { GetTodayDate } from '@/util/getTodayDate'

const ClassPage = () => {

  const [classes, set_classes ] = useState({})
  const [ my_class_name, set_my_class_name ] = useState('')
  const [ today_date, set_today_date ] = useState('')
  const [ mark_date, set_mark_date ] = useState('')
  const [ name_input, set_name_input ] = useState('');
  const [ gender_input, set_gender_input ] = useState('');
  const [ dates_array, set_dates_array ] = useState([]);

  let my_class_array = classes[my_class_name];
  const available_students = my_class_array?.filter((item) => {
    return item.dates.includes(mark_date)
  })

  console.log("Filtere items: ", available_students)

    let full_date = GetTodayDate()

  useEffect(() => {
    const local_classes = localStorage.getItem("classes_object");
    const loaded_class = localStorage.getItem("class_in_session");
    const the_date = localStorage.getItem("today_date");
    const the_mark_date = localStorage.getItem("mark_date");
    const dates_array = localStorage.getItem("dates_array");

    set_classes(JSON.parse(local_classes))
    set_my_class_name(ConvertClassName(loaded_class))
    set_today_date(the_date)
    set_mark_date(the_mark_date)
    set_dates_array(JSON.parse(dates_array))
  }, [])

  useEffect(() => {
    // console.log("Class data: ", classes[my_class_name])
    // console.log("My Class name: ", my_class_name)
    console.log("Dates array: ", dates_array)
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
            // dates: [`${full_date}`]
            dates: []
        }
        // ADD STUDENT TO THE DATABASE
        let current_class_students = [...my_class_array, sd_object]
        set_classes({...classes, [my_class_name]: [...current_class_students]})
        localStorage.setItem("classes_object", JSON.stringify({...classes, [my_class_name]: [...current_class_students]}))
        set_name_input('');
        set_gender_input('');
    }else{
        alert("Please, provide full student details")
    }
  }

  const handleStudentClick = (id) => {
    // console.log("Student clicked: ", id, "The mark date: ", mark_date)
    let new_sd_array = my_class_array.map((item) => {
        if(item.id == id){
            // console.log("Found the student ID")
            item.dates = [...item.dates, mark_date]
            return item
        } else {
            // console.log("NO ID HERE")
            return item
        }
    })
    // console.log("The mapped array: ", new_sd_array)
    // ADD THE NEW STUDENT ARRAY TO ALL CLASSES THEN ADD ALL CLASSES TO DATABASE
    let new_classes_array = { ...classes, [my_class_name]: new_sd_array }
    localStorage.setItem("classes_object", JSON.stringify(new_classes_array))
    window.location.reload()
    // console.log("New classes array: ", new_classes_array)
  }

  const handleDateClick = (date) => {
    localStorage.setItem("mark_date", date)
    window.location.reload()
  }

  const handleAddDate = () => {
    localStorage.setItem("dates_array", JSON.stringify([...dates_array, full_date]))
    // console.log("My dates: ", [...dates_array, full_date])1
    window.location.reload()
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
                {
                    dates_array.map((item) => {
                        return(
                            <div 
                                style={{ backgroundColor: mark_date == item? "#0fcf05":"#f5f5f5" }}
                                onClick={() => handleDateClick(item)}
                                >
                                    {item}
                                </div>
                        )
                    })
                }
                {/* {full_date != today_date ? <div style={{ border: "3px dotted black" }}>ADD DATE</div>:""} */}
                <div style={{ border: "3px dotted black" }} onClick={handleAddDate}>ADD DATE</div>
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
                        <div className='class_page_student_box' key={i} onClick={() => handleStudentClick(item.id)}>
                            <p>{item.name}</p>
                            <div>{item.gender}</div>
                        </div>
                    ))
                }
            </div>
        </div>



        <div className='class_page_available_students_box'>
            <p className='available_students_title'>Available students for the date of: </p>
            <p style={{ fontFamily: "sans-serif", fontSize: "2rem", fontWeight: "900", color: "#0fcf05" }}>{mark_date}</p><br/>
            <div>
                {
                    my_class_array?.filter((item) => {
                        // console.log("Filter item: ", item.dates.includes(mark_date))
                        return item.dates.includes(mark_date)
                    }).map((the_item, i) => {
                        console.log("The item: ", the_item)
                        return(
                            <div key={i}>
                                <p>{the_item.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ClassPage