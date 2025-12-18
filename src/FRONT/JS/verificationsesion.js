
export default function verifysesionlog() {  
    
    fetch("../../BACK/API/sesionverify.php")
        .then(rep => rep.text())
        .then(data => {
            data === "invalid" ? window.location.href = "login.html" : data ; 
            if(data == "coach"){
                window.location.href = "dashbordcoach.html" ; 
            }else if (data == "sportif"){
                window.location.href = "dashbordsportif.html" ;
            }
        })
        .catch(error => console.error(error))

}
