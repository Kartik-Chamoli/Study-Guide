var elem = document.getElementById("myBar");

var uppy = Uppy.Core()
  .use(Uppy.Dashboard, {
    inline: true,
    target: '#drag-drop-area',
  })

uppy.on('complete', (result) => {
    let file;
    let storageRef;
    result.successful.forEach((item,index)=>{
          file=item.data;
              
          switch(file.name.split('.').pop()){
            case "mp4":
            case "avi":
                storageRef = firebase.storage().ref('Teacher/'+User+'/Videos/'+file.name);
                uploadFiles(file,"Videos",storageRef,item);
            break;
              
            case 'jpg':
            case 'jpeg':
            case 'png':
                storageRef = firebase.storage().ref('Teacher/'+User+'/Images/'+file.name);
                uploadFiles(file,"Images",storageRef,item);
            break;
            
            case 'pptx':
            case 'pdf':
            case 'ppt':
            case 'odp':
                storageRef = firebase.storage().ref('Teacher/'+User+'/WrittenMaterial/'+file.name);
                uploadFiles(file,"WrittenMaterial",storageRef,item);
            break;
            
            default:
                uppy.removeFile(item.id);
            uppy.info(`Invalid format file only ppt, pdf, mp4, avi, jpg, jpeg, pptx, supported`);
            break;
          }

      });
})

let uploadedFiles = {};

function uploadFiles(file,fileType,storageRef,item){
  let uploadTask=storageRef.put(file);
  let fileKey;

          uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            elem.style.width=progress+"%";
            if(progress===100){
                uppy.removeFile(item.id);
                uppy.info(`Files are being uploaded to the server`);
            }
          },function(error) {
            switch (error.code) {
              case 'storage/unauthorized':
                uppy.info('Unauthorized access','error',3000);
                break;
          
              case 'storage/canceled':
                uppy.info('Upload Cancelled','error',3000);
                break;
          
              case 'storage/unknown':
                uppy.info('Unknown error','error',3000);
                break;
            }
          },function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
              fileKey=file.name;
              uploadedFiles[fileKey] = downloadURL;
              let updateObj = {};
              updateObj[fileType] = uploadedFiles;
              firebase.firestore().collection('Teacher').doc(User).update(updateObj);

              let userId = firebase.auth().currentUser.uid;
              firebase.firestore().doc(`Teacher/${userId}`).get().then(e=>{
                let teacherdata=e.data();
                let clg = teacherdata.College;
                let crs = teacherdata.Course;
                let sem = document.getElementById('semester-select').value;
                let sec = document.getElementById('section-select').value;
                firebase.firestore().doc(`${clg}/${crs}/${sem}/${sec}`).set(updateObj,{merge:true});
              });
            })
          });
}