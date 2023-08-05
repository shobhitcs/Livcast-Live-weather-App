const { Person } = require('../models/datamodel')

const addPerson = async (req, res) => {
    const { name, email } = req.body;
    // console.log(name,email,isStudent,rollnumber);
    try {
        const createdPerson = await Person.create({ name, email });
        // console.log(createdPerson);
        res.status(200).json(createdPerson);
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const findPerson = async (req, res) => {
    const { email } = req.body;
    // console.log(email);
    try {
        const findPerson = await Person.findOne({ email });
        // console.log(findPerson);
        if (!findPerson) { return res.status(404).json({ error: 'Data not Found' }); }
        else {
            return res.status(200).json(findPerson);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        // console.log(error);
    }
}
const saveSearch = async (req, res) => {
    const { email, city } = req.body;
    // console.log(id);
    try {
        const findPerson = await Person.findOne({ email });
        // console.log(findPerson);
        if (!findPerson) return res.status(404).json({ error: 'Data not Found' });

        const indexToDelete = findPerson.searches.findIndex((item) => item === city);

        if (indexToDelete !== -1) {
            findPerson.searches.splice(indexToDelete, 1);
        }
        findPerson.searches.unshift(city);
        findPerson.searches=findPerson.searches.slice(0,8);
        await findPerson.save();
        res.status(200).json(findPerson);
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addPerson, findPerson, saveSearch };