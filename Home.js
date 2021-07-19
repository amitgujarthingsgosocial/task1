

import React,{ useState , useEffect} from 'react';


import './Home.css';

const data =

    { 
        heading :["sr","name","contact"],
        rows:[
            ["c1","c2","c3"],
            ["c1","c2","c3"],
            ["c1","c2","c3"]
        ]
    
    }

;


export const Home = () => {

    const [ heading , setHeading ]= useState([]);
    const [ NewColumn , addNewColumn ] = useState(''); 
    const [ listrow ,setlistrow ] = useState([]);
    const [result , setResult] = useState({});


    const OnNewColumnAddClick = ()=>{
        
         
        if(NewColumn != "")
        {
        for( var litem of listrow )
        {
             litem.push('');
            console.log(litem);
        }

        setHeading([...heading,NewColumn]);
        addNewColumn('');
      }
    }

   const addNewRow = () =>{

     const len = data.rows.length;
       
     const temp = [];
       
       for (let i=0; i < len , i++)
       {
           temp[i] = "";   
       }    
       
    
    
     setlistrow([...listrow,temp])

   }

const save = ()=>{
        
    setResult({ heading ,listrow});
    document.getElementById('res').innerHTML =
     JSON.stringify({ heading ,listrow});


}

    const OnDataChange =(i,j,val)=>{
       
    //    const tem1 = listrow; 
    //    const row = tem1[i];
    //    const field = row[j];
      
    var temp = [...listrow];
   
        temp[i][j] = val;
     
      setlistrow(temp);
     
    }
      

   useEffect(()=>{

    setHeading(data.heading);
    setlistrow(data.rows);

   },[]);





    return (
       
       <div className="block">



         <div className="row am1">
             <div class="form-group">
              <input type="newcolumn" class="form-control" 
                placeholder="Enter name" value={NewColumn} 
                 name="newColumnValue" 
                 onChange={ (e)=> addNewColumn(e.target.value) }
                 
                 id="newfield"/>
            </div>

            <div class="form-group">
            <input type="submit" className="btn btn-primary"
               value="add new column"
               onClick ={ ()=> OnNewColumnAddClick()}
               />
            </div>
            

            <div class="form-group">
            <input type="submit" className="btn btn-primary"
               value="add new row"
               onClick ={ ()=> addNewRow()}
               />
            </div>
            

             </div>

            
            <table class="table am table-responsive">
    <thead>
    <tr>
       {  heading.map((item,i)=>(

           <th>{item}</th>
                   
           ))
       
       }
     </tr>

    </thead>
    <tbody>

     {

          listrow.map((item,i)=>(
            <tr>
                {
            item.map((en,j)=>(
                  <td>
                 <input type="text"
                  
                  data-id={i} 
                  value={listrow[i][j]}
                  onChange ={ (e)=> 
                    OnDataChange(i,j,e.target.value)
                  }
               
                / > 
                </td>
            ))
            }
            </tr>

        ))

     }




    </tbody>
  </table>


<div>

<div class="form-group">
<input type="submit" className="btn btn-primary"
value="save"
onClick ={ ()=> save()}
/>
</div>


<p id="res"> sss </p>

</div>


        </div>

      
         

    )
}

export default Home;
