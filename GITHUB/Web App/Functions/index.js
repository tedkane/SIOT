/* eslint-disable max-len */
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
const database = admin.firestore();
// const todayDate = new Date().toISOString().slice(0, 10);
// console.log(todayDate);
const accessToken2 = "";
const axios = require("axios");
const urlPlain = "https://api.fitbit.com/1/user/-/activities/heart/date/";
const timePeriod = "/1d/";
const detail = "1min.json";
const todayDate = "today";
const urlLIFX = "https://api.lifx.com/v1/lights/all/effects/breathe";
const LIFXtoken = "";

let i = 0;
const url = urlPlain + todayDate + timePeriod + detail;
// creates 15 min data graph most recent.
exports.timeUpdate15min = functions.pubsub.schedule("*/15 * * * *").timeZone("Europe/London").onRun((context) => {
  axios.get(url, {
    headers: {
      Authorization: "Bearer " + accessToken2,
    },
  })
      .then((response) => {
        console.log(response.data);
        console.log(response.data["activities-heart-intraday"]["dataset"][0]);
        console.log(response.data["activities-heart"][0]["dateTime"]);
        console.log(response.data["activities-heart-intraday"]["dataset"].length);
        let i = response.data["activities-heart-intraday"]["dataset"].length -16;
        while (i < (response.data["activities-heart-intraday"]["dataset"].length) -1) {
          const name = response.data["activities-heart"][0]["dateTime"]+"T"+ response.data["activities-heart-intraday"]["dataset"][i]["time"];
          const value = response.data["activities-heart-intraday"]["dataset"][i]["value"];
          database.collection("fitbit15min").doc(name).set({
            heartRate: value,
            createdAt: name});
          i++;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  console.log("succesful timer update");
  return null;
});
// runs every minute adding most recent data
exports.timeUpdate1min = functions.pubsub.schedule("* * * * *").timeZone("Europe/London").onRun((context) => {
  axios.get(url, {
    headers: {
      Authorization: "Bearer " + accessToken2,
    },
  })
      .then((response) => {
        console.log(response.data);
        console.log(response.data["activities-heart-intraday"]["dataset"][0]);
        console.log(response.data["activities-heart"][0]["dateTime"]);
        console.log(response.data["activities-heart-intraday"]["dataset"].length);
        let i = response.data["activities-heart-intraday"]["dataset"].length -2;
        while (i < (response.data["activities-heart-intraday"]["dataset"].length) -1) {
          const name = response.data["activities-heart"][0]["dateTime"]+"T"+ response.data["activities-heart-intraday"]["dataset"][i]["time"];
          const value = response.data["activities-heart-intraday"]["dataset"][i]["value"];
          database.collection("fitMostrecent").doc(name).set({
            heartRate: value,
            createdAt: name});
          i++;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  console.log("succesful timer update");
  return null;
});
// runs once a day collecting all data
exports.timeUpdate1day = functions.pubsub.schedule("59 23 * * *").timeZone("Europe/London").onRun((context) => {
  axios.get(url, {
    headers: {
      Authorization: "Bearer " + accessToken2,
    },
  })
      .then((response) => {
        console.log(response.data);
        console.log(response.data["activities-heart-intraday"]["dataset"][0]);
        console.log(response.data["activities-heart"][0]["dateTime"]);
        console.log(response.data["activities-heart-intraday"]["dataset"].length);
        while (i < (response.data["activities-heart-intraday"]["dataset"].length) -1) {
          const name = response.data["activities-heart"][0]["dateTime"]+"T"+ response.data["activities-heart-intraday"]["dataset"][i]["time"];
          const value = response.data["activities-heart-intraday"]["dataset"][i]["value"];
          database.collection("fitbit").doc(name).set({
            heartRate: value,
            createdAt: name});
          i++;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  console.log("succesful timer update");
  return null;
});


exports.HRpulse = functions.pubsub.schedule("* * * * *").timeZone("Europe/London").onRun((context) => {
  database.collection("fitMostrecent").orderBy("createdAt", "desc").limit(1).get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) =>{
          console.log(doc.data());
          // once the data has been retrieved use it to format a post request to the bulb in a breath pattern
          // Payload for the pulse data
          const heartRate = doc.data()["heartRate"];
          const timePeriod = heartRate/60;

          const pulseData = {
            "color": "hue:0 saturation:1.0 brightness:0.7",
            "from_color": "hue:30 saturation:1.0 brightness:0.3",
            "period": timePeriod,
            "cycles": heartRate,
            "persist": true,
            "power_on": true,
          };
          const LIFXheader = {headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + LIFXtoken}};
          axios.post(urlLIFX, pulseData, LIFXheader )
              .then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
              });
        });
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  console.log("succesful timer update");
  return null;
});

