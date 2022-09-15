function init() {
    const firebaseConfig = {
        apiKey: "AIzaSyDvBS23y11Jk2XKbLRKNqiEw79fyNXbPfw",
        authDomain: "messages-43f3d.firebaseapp.com",
        databaseURL: "https://messages-43f3d-default-rtdb.firebaseio.com",
        projectId: "messages-43f3d",
        storageBucket: "messages-43f3d.appspot.com",
        messagingSenderId: "518237358463",
        appId: "1:518237358463:web:00679b25a8d9dd9d85b24a"
      };
      firebase.initializeApp(firebaseConfig);

      ref = firebase.database().ref("messages");

      

      firebase.database().ref("messages").on("child_added",(snapshot)=>{
        var html = '';
        if(snapshot.val().sender == myName){
            html += '<li class="message mine">';
            html += '<p class="text">' + snapshot.val().message + '</p>';
            html += '<span class="date">'+ tarihCevir(snapshot.val().time) +'</span>';
            html += '</li>';
        }else{
            html += '<li class="message">';
            html += '<p class="text">'+ snapshot.val().message +'</p>';
            html += '<span class="date">'+ tarihCevir(snapshot.val().time) +'</span>';
            html += '<span class="sender">'+ snapshot.val().sender +'</span>';
            html += '</li>';
        }
        messages.innerHTML += html;
        messages.scroll({behavior:"smooth",top:99999999999999999999});
    });
}

function sohbeteBasla(){
    myName = nameInput.value;
    if(myName.length > 0) {
        console.log(myName);
        login.classList.add("hidden");
        init();
    }
}

function tarihCevir(stamp){
    var dt = new Date(stamp);
    var s = "0" + dt.getHours();
    var d = "0" + dt.getMinutes();
    var format = s.substr(-2) + ":" + d.substr(-2);
    return format;
}

function mesajGonder(){ 
    var msg = document.getElementById("myInput").value;
    if(msg.length > 0) {
        ref.push().set({
        sender:myName,
        message:msg,
        time:firebase.database.ServerValue.TIMESTAMP
      });
    }
}

var login = document.querySelector(".login");
var nameInput = document.getElementById("myName");
var messages = document.getElementById("messages");
messages.innerHTML = "";
var myName = "";
var ref;