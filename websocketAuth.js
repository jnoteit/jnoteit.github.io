firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
 //Login with email input and password input + automatic wsAuth
	function login(emailElement,passwordElement){let email=emailElement.value;let password = passwordElement.value;firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {return firebase.auth().signInWithEmailAndPassword(email, password);}).catch((error) => {var errorCode = error.code;var errorMessage = error.message;});};firebase.auth().onAuthStateChanged(function(user) {if (user) {authenticate(null,firebase.database().ref("/"),user)}});
async function authenticate(ws,db,fuser){
    return new Promise((resolve,reject)=>{
    console.log("auth")
    address="";
    console.log(fuser)
    db.on("value",hipv)
    db.set({get:"wsip",from:fuser.uid})
    receivedAddress=false
    function hipv(val){v=val.val();
        
        if(v.ip&&(!receivedAddress)){
            receivedAddress=true
            console.log("Attempt websocket")
            ws=new WebSocket("ws://"+v.ip+":4096")
            ws.onopen=start;
            ws.onerror=tryInternal;
            address=v.intip
        }

    }
function tryInternal(){
    ws=new WebSocket("ws://"+address+":4096")
    ws.onopen=start;

}
    


    /*
AUTH PROCESS THROUGH WEBSOCKET 
:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:

User : gets ip and connects
User : claims an username
Websocket : sends auth random token back to user
User : sends token trough rtdb as the claimed username
Websocket : verifies the token through the list
User is now verified as the claimed name

*/
    //Signaling Interface
    function start(){
        console.log("Attempt")
    ws.onmessage=function(m){
        wsc.om(JSON.parse(m.data))
    }
     wsc={
        send:function(obj){ws.send(JSON.stringify(obj))
        
        
        
        },
        om:function(m){}
    }
    
    if(fuser){
        
        wsc.om=function(m){
                
                console.log(m)
                //Step 2) receive token
                if(m.token){
                     console.log("WsAuth sent to database")
                    // Step 3) send token trough db
                    db.set({from:fuser.uid,token:m.token,get:"wsauth"})
                }else if(m.ok){
                    //Step 4) confirmed authentication
                    
                    wsc.send({ok:true})
                    resolve(wsc)
                    console.log("Success on wsauth! (v1.0)")
                }else if(m.refresh){
                    location.reload()
                }
            
        }

        //Step 1) claim username
        wsc.send({setAuthor:fuser.uid})
        
    }else{
        throw "No user logged in!"
    }
}

}
)
}
