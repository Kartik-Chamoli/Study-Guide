let storageRef = firebase.storage().ref();

storageRef.list().then(val => {
    console.log(val);
});
/*
storageRef.list().then(root => {
    if ('prefixes' in root) {
        root.prefixes.forEach(ele => {
            console.log(ele.location.path);
        })
    }
})

function rootTraverse(root) {
    storageRef.list(root).then(root =>{
    if ('prefixes' in root) {
        root.prefixes.forEach(element => {
            console.log(element.location.path);
            rootTraverse(element.location.path);
        });
    }
})
}

storageRef.list().then(root=>{rootTraverse(root)});
*/

function traversePath(path) {

    storageRef.child(path).list().then(ele => {
        if (ele.items.length > 0) {
            console.log("Path: "+path);            
            console.log(ele.items);
        }
        ele.prefixes.forEach(i => {
            console.log(i.location.path);
            /*storageRef.child(i.location.path).list().then(ele => {
                ele.prefixes.forEach(i => {
                    console.log(i.location.path);
                    
                })
            })*/
            traversePath(i.location.path);
        });
    })

}

traversePath('')