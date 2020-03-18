let storageRef = firebase.storage().ref('');
storageRef.child('Teacher/9uHgMcxuaFUGaJ5zk57MQpyeFQ72/WrittenMaterial/').list().then(ele=>{
    ele.items.forEach(item=>{
        console.log(item.location.path)  
    })
})
storageRef.child('Teacher/9uHgMcxuaFUGaJ5zk57MQpyeFQ72/Images/').list().then(ele=>{
    ele.items.forEach(item=>{
        console.log(item.location.path)  
    })
})    
storageRef.child('Teacher/9uHgMcxuaFUGaJ5zk57MQpyeFQ72/Videos/').list().then(ele=>{
    ele.items.forEach(item=>{
        console.log(item.location.path)  
    })
})    


// let storageRef = firebase.storage().ref('Teacher/9uHgMcxuaFUGaJ5zk57MQpyeFQ72');

// storageRef.list().then(val => {
//     console.log(val);
// });
// /*
// storageRef.list().then(root => {
//     if ('prefixes' in root) {
//         root.prefixes.forEach(ele => {
//             console.log(ele.location.path);
//         })
//     }
// })

// function rootTraverse(root) {
//     storageRef.list(root).then(root =>{
//     if ('prefixes' in root) {
//         root.prefixes.forEach(element => {
//             console.log(element.location.path);
//             rootTraverse(element.location.path);
//         });
//     }
// })
// }

// storageRef.list().then(root=>{rootTraverse(root)});
// */

// function traversePath(path) {

//     storageRef.child(path).list().then(ele => {
//         if (ele.items.length > 0) {
            
//         }
//         ele.prefixes.forEach((item,index) => {
//             console.log(item.prefixes[index].location.path);
//             // console.log(i.location.path);
//             /*storageRef.child(i.location.path).list().then(ele => {
//                 ele.prefixes.forEach(i => {
//                     console.log(i.location.path);
                    
//                 })
//             })*/
//             traversePath(i.location.path);
//         });
//     })

// }

// traversePath('')


