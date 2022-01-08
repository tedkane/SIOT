var HRchart = document.getElementById('HRchart');
var LUXchart = document.getElementById('LUXchart');


const hrData = db.collection('fitbit15min').orderBy('createdAt', "desc").limit(15)
const luxData = db.collection('lux3').orderBy('dateTime', "desc").limit(15)
var heartRate = [];
var heartTime = [];
var luxVal = [];
var luxTime = [];

hrData.get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        console.log(doc)
        console.log(doc.data()['heartRate'])
        console.log(doc.data()["createdAt"].slice(-8, 0))
        heartRate.push(doc.data()['heartRate'])
        heartTime.push(doc.data()["createdAt"].slice(-8))
    })
    console.log("array", heartRate);
    console.log("array", heartTime);
    var myChart = new Chart(HRchart, {
        type: 'line',
        data: {
           labels: heartTime,
           datasets: [{
               data: heartRate,
               borderColor: "#ff0844",
               fill: false,
               label: "BPM",
               tension:0.5
           }]
        },
       })
})

luxData.get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        console.log(doc)
        console.log(doc.data()['value'])
        console.log(doc.data()["dateTime"].slice(-9, -1))
        luxVal.push(doc.data()['value'])
        luxTime.push(doc.data()["dateTime"].slice(-9, -1))
    })
    var myChart = new Chart(LUXchart, {
        type: 'line',
        data: {
           labels: luxTime,
           datasets: [{
               data: luxVal,
               label: "LX",
               borderColor: "#fc7a59",
               tension:0.5,
           }]
        },
       })
})









