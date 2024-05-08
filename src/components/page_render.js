import React, { useState } from 'react';
import CreateSchool from "@/components/create_school";
import { useRouter } from 'next/navigation';
import { GetTodayDate } from '@/util/getTodayDate';

function PageRender() {
    const school = localStorage.getItem("school_titles");
    if(school == null) return <CreateSchool />

    const router = useRouter();

    const [ forms ] = useState([{ form: 1 },{ form: 2 },{ form: 3 },{ form: 4 },{ form: 5 },{ form: 6 }])
    const [ selected_class, set_selected_class ] = useState(0)
    const [ olevel_classes ] = useState(["A", "B", "C", "D", "E"])
    const [ alevel_classes ] = useState(["Lower6-Commercials-1", "Lower6-Commercials-2", "Upper6-Commercials-1", "Upper6-Commercials-2", "Lower6-Arts-1", "Lower6-Arts-2", "Upper6-Arts-1", "Upper6-Arts-2", "Lower6-Sciences-1","Lower6-Sciences-2", "Upper6-Sciences-1","Upper6-Sciences-2"])

    const [ working_class, set_working_class ] = useState('')

    const handleProceedToClass = () => {
        const today_date = GetTodayDate();
        localStorage.setItem("class_in_session", working_class)
        localStorage.setItem("mark_date", today_date);
        router.push("/class_page")
        // console.log(working_class)
    }

  return (
    <div className='page_render_container'>
        <p className='select_class_title'>Select class</p>
        <div className='select_container'>
            <select className='form_select' onChange={(e) => { set_selected_class(e.target.value) }}>
                <option>Select Form</option>
                { forms.map((item) => <option key={item.form} value={item.form}>Form {item.form}</option>) }
            </select>

            {
                selected_class != ''? 
                <select className='form_select' onChange={(e) => set_working_class(e.target.value)}>
                    <option>Select class</option>
                    {
                        selected_class >= 1 && selected_class <= 4 ? 
                        olevel_classes.map((item) => <option key={item}>{selected_class}{item}</option>):
                        alevel_classes.map((item) => <option key={item}>{item}</option>)
                    }
                </select>:<div></div>
            }
            { working_class != '' ?<button onClick={handleProceedToClass} className='select_class_btn'>GO TO CLASS</button>:"" }
        </div>
    </div>
  )
}

export default PageRender