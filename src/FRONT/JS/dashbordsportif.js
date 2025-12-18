// Sample data - Replace with actual API calls

fetch("../../BACK/API/selectallcoaches.php")
    .then(rep => rep.json())
    .then(coaches => loadCoaches(coaches))
    .catch(error => console.error(error))




let bookings = [
    { id: 1, coach: "Ahmed Benali", date: "2025-12-20", time: "14:00-15:00", status: "pending" },
    { id: 2, coach: "Sarah Alami", date: "2025-12-18", time: "10:00-11:00", status: "accepted" }
];

// Load stats
function loadStats() {
    document.getElementById('totalBookings').textContent = bookings.length;
    document.getElementById('pendingBookings').textContent = bookings.filter(b => b.status === 'pending').length;
    document.getElementById('acceptedBookings').textContent = bookings.filter(b => b.status === 'accepted').length;
    document.getElementById('availableCoaches').textContent = coaches.length;
}

// Load coaches
function loadCoaches(filteredCoaches) {
    
    coachsList.innerHTML = filteredCoaches.map(coach => `
        <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-600 transition duration-300">
            <div class="flex items-start space-x-4">
                <img src="${coach.photo}" alt="${coach.first_name} ${coach.last_name}" class="w-20 h-20 rounded-full object-cover">
                <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800">${coach.first_name} ${coach.last_name}</h3>
                    <p class="text-sm text-gray-600"><i class="fas fa-trophy text-purple-600 mr-1"></i>${coach.sport || ''}</p>
                    <p class="text-sm text-gray-600"><i class="fas fa-certificate text-purple-600 mr-1"></i>${coach.certification || ''}</p>
                    <div class="flex items-center mt-2">
                        <span class="text-yellow-500 mr-1"><i class="fas fa-star"></i></span>
                        <span class="text-sm font-semibold">${coach.rating || 'N/A'}</span>
                        <span class="text-sm text-gray-500 ml-2">${coach.experience_year} ans d'exp.</span>
                    </div>
                </div>
                <button onclick="openBookingModal(${coach.coach_id}, '${coach.first_name} ${coach.last_name}')" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300">
                    <i class="fas fa-calendar-plus mr-1"></i>Réserver
                </button>
            </div>
        </div>
    `).join('');

}

// Load bookings
function loadBookings() {
    const bookingsList = document.getElementById('bookingsList');
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p class="text-gray-500 text-center py-8">Aucune réservation</p>';
        return;
    }

    bookingsList.innerHTML = bookings.map(booking => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800'
        };
        const statusText = {
            pending: 'En attente',
            accepted: 'Acceptée',
            rejected: 'Refusée',
            cancelled: 'Annulée'
        };

        return `
            <div class="border-2 border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-gray-800">${booking.coach}</h4>
                    <span class="px-2 py-1 rounded text-xs font-semibold ${statusColors[booking.status]}">${statusText[booking.status]}</span>
                </div>
                <p class="text-sm text-gray-600"><i class="fas fa-calendar mr-1"></i>${booking.date}</p>
                <p class="text-sm text-gray-600"><i class="fas fa-clock mr-1"></i>${booking.time}</p>
                <div class="flex space-x-2 mt-3">
                    ${booking.status === 'accepted' ? `
                        <button onclick="openReviewModal(${booking.id})" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs transition duration-300">
                            <i class="fas fa-star mr-1"></i>Avis
                        </button>
                    ` : ''}
                    ${booking.status === 'pending' || booking.status === 'accepted' ? `
                        <button onclick="cancelBooking(${booking.id})" class="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition duration-300">
                            <i class="fas fa-times mr-1"></i>Annuler
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Booking Modal
function openBookingModal(coachId, coachName) {
    document.getElementById('selectedCoachId').value = coachId;
    document.getElementById('selectedCoachName').textContent = coachName;
    document.getElementById('bookingModal').classList.remove('hidden');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').setAttribute('min', today);
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.getElementById('bookingForm').reset();
}

// Load availabilities when date changes
document.getElementById('bookingDate').addEventListener('change', function() {
    const coachId = document.getElementById('selectedCoachId').value;
    const date = this.value;
    
    // Simulated availabilities - Replace with API call
    const availabilities = [
        { id: 1, time: '09:00-10:00' },
        { id: 2, time: '10:00-11:00' },
        { id: 3, time: '14:00-15:00' },
        { id: 4, time: '15:00-16:00' }
    ];

    const select = document.getElementById('availabilitySelect');
    select.innerHTML = availabilities.map(a => 
        `<option value="${a.id}">${a.time}</option>`
    ).join('');
});

// Submit booking
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const coachId = document.getElementById('selectedCoachId').value;
    const coachName = document.getElementById('selectedCoachName').textContent;
    const date = document.getElementById('bookingDate').value;
    const availabilityId = document.getElementById('availabilitySelect').value;
    const timeSlot = document.getElementById('availabilitySelect').options[document.getElementById('availabilitySelect').selectedIndex].text;

    // Add booking (Replace with API call)
    bookings.push({
        id: bookings.length + 1,
        coach: coachName,
        date: date,
        time: timeSlot,
        status: 'pending'
    });

    Swal.fire({
        icon: 'success',
        title: 'Réservation envoyée!',
        text: 'Votre demande a été envoyée au coach.',
        confirmButtonColor: '#7c3aed'
    });

    closeBookingModal();
    loadBookings();
    loadStats();
});

// Review Modal
function openReviewModal(bookingId) {
    document.getElementById('reviewBookingId').value = bookingId;
    document.getElementById('reviewModal').classList.remove('hidden');
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.add('hidden');
    document.getElementById('reviewForm').reset();
    document.querySelectorAll('#ratingStars i').forEach(star => {
        star.classList.remove('text-yellow-500');
        star.classList.add('text-gray-300');
    });
}

// Rating stars
document.querySelectorAll('#ratingStars i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        document.getElementById('ratingValue').value = rating;
        
        document.querySelectorAll('#ratingStars i').forEach(s => {
            s.classList.remove('text-yellow-500');
            s.classList.add('text-gray-300');
        });
        
        for (let i = 0; i < rating; i++) {
            document.querySelectorAll('#ratingStars i')[i].classList.remove('text-gray-300');
            document.querySelectorAll('#ratingStars i')[i].classList.add('text-yellow-500');
        }
    });
});

// Submit review
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rating = document.getElementById('ratingValue').value;
    const comment = document.getElementById('reviewComment').value;

    if (!rating) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez sélectionner une note',
            confirmButtonColor: '#7c3aed'
        });
        return;
    }

    // Submit review (Replace with API call)
    Swal.fire({
        icon: 'success',
        title: 'Merci!',
        text: 'Votre avis a été enregistré.',
        confirmButtonColor: '#7c3aed'
    });

    closeReviewModal();
});

// Cancel booking
function cancelBooking(bookingId) {
    Swal.fire({
        title: 'Confirmer l\'annulation?',
        text: "Cette action est irréversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Oui, annuler',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = bookings.findIndex(b => b.id === bookingId);
            if (index > -1) {
                bookings[index].status = 'cancelled';
                loadBookings();
                loadStats();
                Swal.fire({
                    icon: 'success',
                    title: 'Annulée!',
                    text: 'La réservation a été annulée.',
                    confirmButtonColor: '#7c3aed'
                });
            }
        }
    });
}

// Search and filter
document.getElementById('searchCoach').addEventListener('input', function(e) {
    const search = e.target.value.toLowerCase();
    const filtered = coaches.filter(c => 
        c.name.toLowerCase().includes(search) || 
        c.sport.toLowerCase().includes(search)
    );
    
    const coachsList = document.getElementById('coachsList');
    coachsList.innerHTML = filtered.map(coach => `
        <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-600 transition duration-300">
            <div class="flex items-start space-x-4">
                <img src="${coach.photo}" alt="${coach.name}" class="w-20 h-20 rounded-full object-cover">
                <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800">${coach.name}</h3>
                    <p class="text-sm text-gray-600"><i class="fas fa-trophy text-purple-600 mr-1"></i>${coach.sport}</p>
                    <p class="text-sm text-gray-600"><i class="fas fa-certificate text-purple-600 mr-1"></i>${coach.certifications}</p>
                    <div class="flex items-center mt-2">
                        <span class="text-yellow-500 mr-1"><i class="fas fa-star"></i></span>
                        <span class="text-sm font-semibold">${coach.rating}</span>
                        <span class="text-sm text-gray-500 ml-2">${coach.experience} ans d'exp.</span>
                    </div>
                </div>
                <button onclick="openBookingModal(${coach.id}, '${coach.name}')" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300">
                    <i class="fas fa-calendar-plus mr-1"></i>Réserver
                </button>
            </div>
        </div>
    `).join('');
});

document.getElementById('sportFilter').addEventListener('change', function() {
    loadCoaches(this.value);
});

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
loadBookings();



