const db = firebase.database();

document.getElementById("message-form").addEventListener("submit", sendMessage);

let userName;
async function getName(){
    let teacher = await firebase.firestore().doc(`Teacher/${User}`).get();
    userName=teacher.data().Name+"("+teacher.data().Designation+")";
}

async function sendMessage(e) {
    e.preventDefault();
    
    await getName();
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      let timeStamp=new Date().toLocaleString(); 

      console.log(timeStamp);
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      Userid:User,
      User:userName,
      message,
    });
  }

  const fetchChat = db.ref("messages/");


  fetchChat.on("child_added", function (snapshot) {
      console.log(User);
    const messages = snapshot.val();
    const message = `<li class=${
      User === messages.Userid ? "sent" : "receive"
    }><span> ${messages.message}<br></span>${messages.User}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });