const {Person}=require('../models/datamodel')

const addPerson= async (req,res) => {
    const {name,email} = req.body;
    // console.log(name,email,isStudent,rollnumber);
    try{
        const createdPerson=await Person.create({name,email});
        // console.log(createdPerson);
        res.status(200).json(createdPerson);
    }
    catch(error){   
        // console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const findPerson= async (req,res) => {
    const {email} = req.body;
    // console.log(email);
    try{
        const findPerson=await Person.findOne({email});
        // console.log(findPerson);
        if(!findPerson) { return res.status(404).json({ error: 'Data not Found' });}
        else{
            return res.status(200).json(findPerson);
        }
    }
    catch(error){   
        res.status(500).json({ error: 'Internal server error' });
        // console.log(error);
    }
}
// const createCourse= async (req,res) => {
//     const {coursename,id} = req.body;
//     // console.log(id);
//     try{
//         const findPerson=await Person.findById(id);
//         // console.log(findPerson);
//         if(!findPerson) return res.status(404).json({ error: 'Data not Found' });
//         const createdcourse =await Course.create({coursename,teacher:id}); 
//         if(!createdcourse) return res.status(400).json({ error: 'Course cannot be Added !' });
//         findPerson.courses.push(createdcourse._id);
//         await findPerson.save();
//         res.status(200).json({success_msg: 'Course added successfully'});
//     }
//     catch(error){   
//         // console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

module.exports = { addPerson,findPerson };