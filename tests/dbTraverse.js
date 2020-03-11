let dbRef = firebase.database().ref();
let dbSnapshot;
dbRef.once('value').then(val => {
    dbSnapshot = val.toJSON();
    console.log(dbSnapshot);
});
