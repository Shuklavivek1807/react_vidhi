import { useEffect, useState } from "react";

const Student =()=>{
    const[studentData,setStudentData]= useState([]);
    useEffect(()=>{
          getStudent();
    },[])

    const getStudent = async()=>{
        try{
            let result = await fetch('http://www.api.vidhimantraa.com/admin/student',{
                method:"GET",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            if(!result.ok){
                console.log(result.error)
            }
            const student = await result.json();
            setStudentData(student);

        }catch(error){
            console.log(error)
        }
    }
    return(
    <>
    <ul>
      {studentData.map((item,index)=>(
        <li key={item.index}>{item.name}</li>
      ))}
      </ul>
    </>
    )
}
export default Student;