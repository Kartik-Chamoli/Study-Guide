uploadFileHtml();

function uploadFileHtml(){
  let uploadHtmlString = `<div id="drag-drop-area"></div>
  <div> 
          <label for="semester-select">Choose a Semester:</label>
          <select id="semester-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <label for="section-select">Choose a Section:</label>

          <select id="section-select">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="E">E</option>
          </select> 
        </div>
  <div id="myProgress">
      <div id="myBar"></div>
    </div>   
  `
  var uppyScript = document.createElement('script');
  uppyScript.setAttribute('src','uppyScript.js');
  document.head.appendChild(uppyScript);

  let mainContent =  document.querySelector('.main-content');
  mainContent.innerHTML = uploadHtmlString;
}

let pillNavElement = document.querySelector('.pill-nav');
pillNavElement.addEventListener('click',()=>{
  document.querySelector('.main-content').innerHTML='';

  document.querySelectorAll('.pill-nav a').forEach(item=>{
    item.classList.remove('active');
  })
  event.explicitOriginalTarget.classList.toggle('active');
  if(event.target.text==="Upload Files"){
    uploadFileHtml();
  }
  else if(event.target.text==="View Uploaded Files"){
    showUploadedFiles();
  }
})