


const roleInputs = document.querySelectorAll('input[name="role"]');
const coachFields = document.getElementById('coachFields');
const coachInputs = coachFields.querySelectorAll('input, textarea');

function toggleCoachFields() {
    const selectedRole = document.querySelector('input[name="role"]:checked').value;
    
    if (selectedRole === 'coach') {
        coachFields.classList.remove('hidden');
        coachInputs.forEach(input => {
            if (input.id !== 'certifications') { 
                input.setAttribute('required', 'required');
            }
        });
    } else {
        coachFields.classList.add('hidden');
        coachInputs.forEach(input => {
            input.removeAttribute('required');
        });
    }
}


function togglePasswordVisibility(input, icon) {
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function signinfetch(datajson) {
    fetch("../../BACK/API/signin.php" , {
            method : "POST" , 
            body : datajson
        })
        .then(rep => rep.text())
        .then(data => data == "success" ? window.location.href = "login.html" : console.log("masd9tch"))
        .catch(eroor => console.log(eroor))
}

document.getElementById('togglePassword').addEventListener('click', function() {
    const password = document.getElementById('password');
    const icon = this.querySelector('i');
    togglePasswordVisibility(password, icon);
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    const password = document.getElementById('confirmPassword');
    const icon = this.querySelector('i');
    togglePasswordVisibility(password, icon);
});


document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();

    
    const Roleuser = document.querySelector('input[name="role"]:checked').value;
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value ;
    const confirmPassword = document.getElementById('confirmPassword').value ;
    const BioCoach = document.getElementById("bio").value ; 
    const experiencecoach = document.getElementById("experienceYears").value ;
    const profilePhoto = document.getElementById("photo").files[0] ; 
    const certificate = document.getElementById("certifications").files[0] ; 
    const terms = document.getElementById('terms').checked ;
    
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    let isValid = true;
    
    document.querySelectorAll('.text-red-500').forEach(error => error.classList.add('hidden'));
    
    if (!nameRegex.test(prenom)) {
        document.getElementById('prenomError').classList.remove('hidden');
        isValid = false;
    }
    
    if (!nameRegex.test(nom)) {
        document.getElementById('nomError').classList.remove('hidden');
        isValid = false;
    }
    
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').classList.remove('hidden');
        isValid = false;
    }
    
   
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').classList.remove('hidden');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').classList.remove('hidden');
        isValid = false;
    }
    
    if (!terms) {
        document.getElementById('termsError').classList.remove('hidden');
        isValid = false;
    }
    
    if (isValid) {
        const datauser = new FormData() ;

        datauser.append("prenom", prenom);
        datauser.append("nom", nom);
        datauser.append("email", email);
        datauser.append("password", password);
        datauser.append("confirmPassword", confirmPassword);
        datauser.append("role", Roleuser); 
        
        if (Roleuser == "coach") {
            datauser.append("BioCoach" , BioCoach) ; 
            datauser.append("experiencecoach" , experiencecoach) ; 
            datauser.append("profilePhoto" , profilePhoto) ;
            datauser.append("certificate" , certificate) ;
        }

        signinfetch(datauser);
    }

});


roleInputs.forEach(input => {
    input.addEventListener('change', toggleCoachFields);
});

toggleCoachFields();