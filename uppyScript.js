var elem = document.getElementById("myBar");

var uppy = Uppy.Core()
  .use(Uppy.Dashboard, {
    inline: true,
    target: '#drag-drop-area',
  })

uppy.on('complete', (result) => {
    let file;
    let storageRef;
    let indexStore = 0;
    let validFileType = true;
    result.successful.forEach((item,index)=>{
          file=item.data;
              
          switch(file.name.split('.').pop()){
            case "mp4":
            case "avi":
                storageRef = firebase.storage().ref(User+'/Videos/'+file.name);
            break;
              
            case 'jpg':
            case 'jpeg':
            case 'png':
                storageRef = firebase.storage().ref(User+'/Images/'+file.name);
            break;
            
            case 'pptx':
            case 'pdf':
            case 'ppt':
            case 'odp':
                storageRef = firebase.storage().ref(User+'/WrittenMaterial/'+file.name);
            break;
            
            default:
                validFileType = false;
            break;
          }
          
        if(validFileType===true){
          let uploadTask=storageRef.put(file);

          uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            elem.style.width=progress+"%";
            if(progress===100){
                uppy.removeFile(item.id);
                uppy.info(`${indexStore} files have been uploaded successfully`);
                elem.style.width='0%';
            }
          });
          indexStore++;
        }
        else{
            uppy.removeFile(item.id);
            uppy.info(`Invalid format file only ppt, pdf, mp4, avi, jpg, jpeg, pptx, supported`);
        }
      });
      
})