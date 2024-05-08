"use client"

import React, { useEffect, useState } from 'react'

const CreateStudent = () => {

  const [classes, set_classes ] = useState({})

  useEffect(() => {
    const local_classes = localStorage.getItem("classes_object");
    set_classes(local_classes)
    console.log(JSON.parse(local_classes))
  })
  return (
    <div>CreateStudent</div>
  )
}

export default CreateStudent