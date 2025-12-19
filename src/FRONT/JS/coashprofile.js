// Character counter for bio

import verifyevrypage from './requestvalidsesion.js';

verifyevrypage()


fetch("../../BACK/API/getalldataofcoash.php")
    .then(res => res.json())
    .then(data => {
        document.getElementById('firstName').value = data.first_name ;
        document.getElementById('lastName').value = data.last_name ;
        document.getElementById('email').value = data.email ;
        document.getElementById('bio').value = data.bio ;
        document.getElementById('experienceYears').value = data.experience_year ;
        document.getElementById('certifications').value = data.certification ;

        if (data.photo) {
            document.getElementById('profilePhoto').src = data.photo;
        }

        updateBioCount();
        document.getElementById('displayName').textContent = `${data.first_name} ${data.last_name}`;
        document.getElementById('displayEmail').textContent = data.email;
    })
    .catch(error => console.log(error))

const bioTextarea = document.getElementById('bio');
const bioCount = document.getElementById('bioCount');

function updateBioCount() {
    const count = bioTextarea.value.length;
    bioCount.textContent = count;
    if (count > 500) {
        bioCount.classList.add('text-red-500');
        bioTextarea.value = bioTextarea.value.substring(0, 500);
    } else {
        bioCount.classList.remove('text-red-500');
    }
}

bioTextarea.addEventListener('input', updateBioCount);
updateBioCount();

// Photo preview
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veuillez sélectionner une image valide',
                confirmButtonColor: '#7c3aed'
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'L\'image ne doit pas dépasser 5MB',
                confirmButtonColor: '#7c3aed'
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePhoto').src = e.target.result;
            
            Swal.fire({
                icon: 'success',
                title: 'Photo mise à jour!',
                text: 'N\'oubliez pas d\'enregistrer vos modifications',
                confirmButtonColor: '#7c3aed',
                timer: 2000
            });
        };
        reader.readAsDataURL(file);
    }
}

// Form validation and submission
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const experienceYears = document.getElementById('experienceYears').value;
    const certifications = document.getElementById('certifications').value.trim();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    // Get selected sports
    const selectedSports = Array.from(document.querySelectorAll('input[name="sports"]:checked')).map(cb => cb.value);

    // Regex patterns
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    let isValid = true;

    // Reset errors
    document.querySelectorAll('.text-red-500').forEach(error => error.classList.add('hidden'));

    // Validate names
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Nom ou prénom invalide',
            confirmButtonColor: '#7c3aed'
        });
        return;
    }

    // Validate email
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Email invalide',
            confirmButtonColor: '#7c3aed'
        });
        return;
    }

    // Validate bio
    if (bio.length < 50) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'La biographie doit contenir au moins 50 caractères',
            confirmButtonColor: '#7c3aed'
        });
        return;
    }

    // Validate sports selection
    if (selectedSports.length === 0) {
        document.getElementById('sportsError').classList.remove('hidden');
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez sélectionner au moins une discipline sportive',
            confirmButtonColor: '#7c3aed'
        });
        return;
    }

    // Validate password if changing
    if (newPassword || confirmNewPassword) {
        if (!currentPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veuillez entrer votre mot de passe actuel',
                confirmButtonColor: '#7c3aed'
            });
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            document.getElementById('passwordError').classList.remove('hidden');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            document.getElementById('confirmPasswordError').classList.remove('hidden');
            return;
        }
    }

    // Prepare data to send (Replace with actual API call)
    const profileData = {
        firstName,
        lastName,
        email,
        bio,
        experienceYears,
        certifications,
        sports: selectedSports,
        ...(newPassword && { newPassword })
    };

    console.log('Profile Data:', profileData);

    // Show success message
    Swal.fire({
        icon: 'success',
        title: 'Profil mis à jour!',
        text: 'Vos modifications ont été enregistrées avec succès',
        confirmButtonColor: '#7c3aed'
    }).then(() => {
        // Update display name
        document.getElementById('displayName').textContent = `${firstName} ${lastName}`;
        document.getElementById('displayEmail').textContent = email;

        // Clear password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmNewPassword').value = '';
    });
});

// Reset form
function resetForm() {
    Swal.fire({
        title: 'Réinitialiser le formulaire?',
        text: "Toutes les modifications non enregistrées seront perdues",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Oui, réinitialiser',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('profileForm').reset();
            updateBioCount();
            
            Swal.fire({
                icon: 'success',
                title: 'Réinitialisé!',
                text: 'Le formulaire a été réinitialisé',
                confirmButtonColor: '#7c3aed',
                timer: 2000
            });
        }
    });
}

// Logout
function logout() {
    Swal.fire({
        title: 'Déconnexion',
        text: "Voulez-vous vous déconnecter?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'login.html';
        }
    });
}

// Initialize display
document.getElementById('displayName').textContent = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;
document.getElementById('displayEmail').textContent = document.getElementById('email').value;