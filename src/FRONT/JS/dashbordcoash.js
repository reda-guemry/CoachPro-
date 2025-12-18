
function getallavai() {  
    fetch("../../BACK/API/getallavaili.php")
        .then(rep => rep.json())
        .then(data => data.status == "success" ? loadAvailabilities(data.datainsert) : console.log(data))
        .catch(error =>console.error(error))
}

function getallpendigres() {
    fetch("../../BACK/API/getallpendres.php")
        .then(rep => rep.text())
        .then(data => console.log(data))
        .catch(error =>console.error(error))
}

// Sample data - Replace with actual API calls
let bookingRequests = [
    { id: 1, sportif: "Youssef Amrani", date: "2025-12-20", time: "14:00-15:00", status: "pending", sportif_id: 1 },
    { id: 2, sportif: "Amina Benkirane", date: "2025-12-21", time: "10:00-11:00", status: "pending", sportif_id: 2 }
];

let acceptedSessions = [
    { id: 3, sportif: "Omar Tazi", date: "2025-12-18", time: "09:00-10:00", status: "accepted" },
    { id: 4, sportif: "Leila Mahjoub", date: "2025-12-19", time: "15:00-16:00", status: "accepted" }
];

// let availabilities = [
//     { id: 1, date: "2025-12-20", start: "09:00", end: "10:00", status: "available" },
//     { id: 2, date: "2025-12-20", start: "14:00", end: "15:00", status: "booked" },
//     { id: 3, date: "2025-12-21", start: "10:00", end: "11:00", status: "available" }
// ];

let reviews = [
    { id: 1, sportif: "Hassan Alami", rating: 5, comment: "Excellent coach! Très professionnel.", date: "2025-12-10" },
    { id: 2, sportif: "Sara Idrissi", rating: 4, comment: "Bon entraînement, je recommande.", date: "2025-12-08" }
];

// Load stats
function loadStats() {
    document.getElementById('pendingRequests').textContent = bookingRequests.filter(b => b.status === 'pending').length;
    
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    document.getElementById('todaySessions').textContent = acceptedSessions.filter(s => s.date === today).length;
    document.getElementById('tomorrowSessions').textContent = acceptedSessions.filter(s => s.date === tomorrow).length;
    
    const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
    document.getElementById('averageRating').textContent = avgRating;

    // Show next session
    const nextSession = acceptedSessions.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    if (nextSession) {
        document.getElementById('nextSessionAlert').classList.remove('hidden');
        document.getElementById('nextSessionInfo').textContent = `${nextSession.sportif} - ${nextSession.date} à ${nextSession.time}`;
    }
}

// Load pending requests
function loadPendingRequests(dara) {
    const list = document.getElementById('pendingRequestsList');
    
    if (data.filter(b => b.status === 'pending').length === 0) {
        list.innerHTML = '<p class="text-gray-500 text-center py-8">Aucune demande en attente</p>';
        return;
    }

    list.innerHTML = data.filter(b => b.status === 'pending').map(request => `
        <div class="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="font-bold text-gray-800 text-lg">
                        <i class="fas fa-user text-purple-600 mr-2"></i>${request.sportif}
                    </h4>
                    <p class="text-sm text-gray-600 mt-1">
                        <i class="fas fa-calendar mr-1"></i>${request.date}
                    </p>
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-clock mr-1"></i>${request.time}
                    </p>
                </div>
                <span class="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-semibold">
                    <i class="fas fa-hourglass-half mr-1"></i>En attente
                </span>
            </div>
            <div class="flex space-x-2">
                <button onclick="acceptBooking(${request.id})" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300">
                    <i class="fas fa-check mr-1"></i>Accepter
                </button>
                <button onclick="rejectBooking(${request.id})" class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300">
                    <i class="fas fa-times mr-1"></i>Refuser
                </button>
            </div>
        </div>
    `).join('');
}

// Load accepted sessions
function loadAcceptedSessions() {
    const list = document.getElementById('acceptedSessionsList');
    
    if (acceptedSessions.length === 0) {
        list.innerHTML = '<p class="text-gray-500 text-center py-8">Aucune séance validée</p>';
        return;
    }

    list.innerHTML = acceptedSessions.map(session => `
        <div class="border-2 border-green-200 bg-green-50 rounded-lg p-4">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-bold text-gray-800">
                        <i class="fas fa-user text-purple-600 mr-2"></i>${session.sportif}
                    </h4>
                    <p class="text-sm text-gray-600 mt-1">
                        <i class="fas fa-calendar mr-1"></i>${session.date}
                    </p>
                    <p class="text-sm text-gray-600">
                        <i class="fas fa-clock mr-1"></i>${session.time}
                    </p>
                </div>
                <span class="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">
                    <i class="fas fa-check-circle mr-1"></i>Validée
                </span>
            </div>
        </div>
    `).join('');
}

// Load availabilities
function loadAvailabilities(data) {
    const list = document.getElementById('availabilitiesList');
    
    if (data.length === 0) {
         list.innerHTML = '<p class="text-gray-500 text-center py-8">Aucune disponibilité</p>';
         return;
    }

    const statusColors = {
        available: 'bg-green-100 text-green-800',
        booked: 'bg-blue-100 text-blue-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    const statusText = {
        available: 'Disponible',
        booked: 'Réservée',
        cancelled: 'Annulée'
    };

    list.innerHTML =  data.map(avail => `
        <div class="border-2 border-gray-200 rounded-lg p-3 mb-2">
            <div class="flex justify-between items-start mb-2">
                <div class="text-sm">
                    <p class="font-semibold text-gray-800">${avail.availabilites_date}</p>
                    <p class="text-gray-600">${avail.start_time} - ${avail.end_time}</p>
                </div>
                <span class="px-2 py-1 rounded text-xs font-semibold ${statusColors[avail.status]}">${statusText[avail.status]}</span>
            </div>
            ${avail.status === 'available' ? `
                <button onclick="deleteAvailability(${avail.availability_id})" class="w-full bg-red-500 hover:bg-red-600 text-white text-xs py-1 rounded transition duration-300">
                    <i class="fas fa-trash mr-1"></i>Supprimer
                </button>
            ` : ''}
        </div>
    `).join('');

}

// Load reviews
function loadReviews() {
    const list = document.getElementById('reviewsList');
    
    if (reviews.length === 0) {
        list.innerHTML = '<p class="text-gray-500 text-center py-8">Aucun avis</p>';
        return;
    }

    list.innerHTML = reviews.map(review => `
        <div class="border-2 border-gray-200 rounded-lg p-3">
            <div class="flex justify-between items-start mb-2">
                <p class="font-semibold text-gray-800 text-sm">${review.sportif}</p>
                <div class="flex items-center">
                    ${Array(review.rating).fill().map(() => '<i class="fas fa-star text-yellow-500 text-xs"></i>').join('')}
                    ${Array(5 - review.rating).fill().map(() => '<i class="fas fa-star text-gray-300 text-xs"></i>').join('')}
                </div>
            </div>
            <p class="text-gray-600 text-xs mb-1">${review.comment}</p>
            <p class="text-gray-400 text-xs">${review.date}</p>
        </div>
    `).join('');
}

// Add availability
document.getElementById('availabilityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('availDate').value;
    const start = document.getElementById('startTime').value;
    const end = document.getElementById('endTime').value;

    // Validate time
    if (start >= end) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'L\'heure de fin doit être après l\'heure de début',
            confirmButtonColor: '#7c3aed'
        });
        return;
    }

    // Check if date is in the past
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'La date ne peut pas être dans le passé',
            confirmButtonColor: '#7c3aed'
        });
        return;
    }

    // Add availability (Replace with API call)
    let availabilitie = {
        date: date,
        start: start,
        end: end,
        status: 'available'
    };

    Swal.fire({
        icon: 'success',
        title: 'Succès!',
        text: 'Disponibilité ajoutée',
        confirmButtonColor: '#7c3aed'
    });

    fetch("../../BACK/API/insertavailibilter.php" , {
        method : "POST",
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify(availabilitie)
    })
        .then(rep => rep.json())
        .then(data => data.status == "success" ? getallavai() : console.log(data))
        .catch(error => console.error(error))
});

// Accept booking
function acceptBooking(bookingId) {
    Swal.fire({
        title: 'Accepter cette réservation?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Oui, accepter',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = bookingRequests.findIndex(b => b.id === bookingId);
            if (index > -1) {
                const booking = bookingRequests[index];
                booking.status = 'accepted';
                acceptedSessions.push(booking);
                bookingRequests.splice(index, 1);

                // Update availability status
                const availIndex = availabilities.findIndex(a => 
                    a.date === booking.date && 
                    `${a.start}-${a.end}` === booking.time
                );
                if (availIndex > -1) {
                    availabilities[availIndex].status = 'booked';
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Acceptée!',
                    text: 'La réservation a été acceptée',
                    confirmButtonColor: '#7c3aed'
                });

                loadPendingRequests();
                loadAcceptedSessions();
                loadAvailabilities();
                loadStats();
            }
        }
    });
}

// Reject booking
function rejectBooking(bookingId) {
    Swal.fire({
        title: 'Refuser cette réservation?',
        text: 'Le sportif sera notifié',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Oui, refuser',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = bookingRequests.findIndex(b => b.id === bookingId);
            if (index > -1) {
                bookingRequests[index].status = 'rejected';
                bookingRequests.splice(index, 1);

                Swal.fire({
                    icon: 'success',
                    title: 'Refusée!',
                    text: 'La réservation a été refusée',
                    confirmButtonColor: '#7c3aed'
                });

                loadPendingRequests();
                loadStats();
            }
        }
    });
}

// Delete availability
function deleteAvailability(availId) {
    Swal.fire({
        title: 'Supprimer cette disponibilité?',
        text: 'Cette action est irréversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = availabilities.findIndex(a => a.id === availId);
            if (index > -1) {
                availabilities.splice(index, 1);

                Swal.fire({
                    icon: 'success',
                    title: 'Supprimée!',
                    text: 'La disponibilité a été supprimée',
                    confirmButtonColor: '#7c3aed'
                });

                loadAvailabilities();
            }
        }
    });
}

// Set minimum date for availability form
const today = new Date().toISOString().split('T')[0];
document.getElementById('availDate').setAttribute('min', today);

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

// Initialize
loadStats();
loadPendingRequests();
loadAcceptedSessions();
// loadAvailabilities();
loadReviews();
getallavai()