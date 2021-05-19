const express = require('express');
const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL,{
	dialect:'postgres'
});

const SensorData= sequelize.define('sensor-data', {
	serial:{
            type:DataTypes.STRING,
	    allowNull: false
        },
        name:{
            type: DataTypes.STRING,
	    allowNull:false
        },
       temperature:{
            type: DataTypes.FLOAT,
            allowNull: false
       },
});

const app =express();
/*app.get('/hello', (req,res) => {res.status(200).send('How r you');
});
app.listen({port:8080}, () =>{console.log('server is runninng');
});*/
app.use(express.json());

const dataList = [];
app.get('/data', (req,res) => {res.status(201).send(dataList);
});

app.post('/data', (req,res) => {
	let data = req.body;
	dataList.push(data);
	res.status(201).send(data);
	return;
});

app.listen({port:8060}, () => {
       
        sequelize.authenticate();
	console.log('server is running');
        console.log('database is connected!');
       
});

