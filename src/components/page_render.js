import React, { useState } from 'react';
import CreateSchool from "@/components/create_school";

function PageRender() {
    const school = localStorage.getItem("school_titles");
    if(school == null) return <CreateSchool />

    const [ forms ] = useState([{ form: 1 },{ form: 2 },{ form: 3 },{ form: 4 },{ form: 5 },{ form: 6 }])
    const [ selected_class, set_selected_class ] = useState('')
    const [ olevel_classes ] = useState(["A", "B", "C", "D", "E"])
    const [ alevel_classes ] = useState(["Commercials-1", "Commercials-2", "Arts-1", "Arts-2", "Sciences-1","Sciences-2"])

  return (
    <div>
        <p>Select class</p>
        <div className='select_container'>
            <select className='form_select' onChange={() => {}}>
                { forms.map((item) => <option key={item.form} value={item.form}>Form {item.form}</option>) }
            </select>

            {
                selected_class != ''? 
                <select className='form_select'>
                    {
                        selected_class >= 1 && selected_class <= 4 ? 
                        olevel_classes.map((item) => <option key={item}>{item}</option>):
                        alevel_classes.map((item) => <option key={item}>{item}</option>)
                    }
                </select>:<div></div>
            }
        </div>
    </div>
  )
}

export default PageRender