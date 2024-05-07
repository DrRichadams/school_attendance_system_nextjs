import React from 'react';
import CreateSchool from "@/components/create_school";

function PageRender() {
    const school = localStorage.getItem("school_titles");
    if(school == null) return <CreateSchool />

  return (
    <div>PageRender</div>
  )
}

export default PageRender