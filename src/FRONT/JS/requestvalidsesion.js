export default function verifyevrypage() {
    fetch("../../BACK/API/verificateecryreauest.php")
    .then(rep => rep.text())
    .then(data => {
        if(data){
            window.location.href = data ; 
        }
    })
}
