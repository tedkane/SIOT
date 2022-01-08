// getting data
const recentluxdata = db.collection('lux3').orderBy('dateTime', "desc").limit(1)
const recentHrdata = db.collection('fitMostrecent').orderBy('createdAt', "desc").limit(1)
//Render most recent lux value to the list
//inserting data to front end
//Getting data for recent lux

//getting data for recent fitbit
// Date of the toggle

//realtime listener
recentluxdata.onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data())
        if(change.type == 'added'){
            
        let lux = change.doc.data()["value"];
        let timest = change.doc.data()["dateTime"].slice(-9, -1);
        let datest = change.doc.data()["dateTime"].slice(0, 10)
        document.getElementById("lux-val").innerHTML = lux; 
        document.getElementById("date-stamp-lux").innerHTML = datest; 
        document.getElementById("time-stamp-lux").innerHTML = timest; 

        }
    })
    console.log(changes);
})

recentHrdata.onSnapshot(snapshot =>{
    console.log("Triggered")
    document.getElementById("hr-val").innerHTML = Math.floor(Math.random() * 101); 
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data())
        if(change.type == 'added'){   
            let hr = change.doc.data()["heartRate"];
            let timest2 = change.doc.data()["createdAt"].slice(-8);
            let datest2 = change.doc.data()["createdAt"].slice(0, 10);
            document.getElementById("hr-val").innerHTML = hr; 
            document.getElementById("time-stamp-hr").innerHTML = timest2;  
            document.getElementById("date-stamp-hr").innerHTML = datest2; 

        }
    })
    console.log(changes);
})


