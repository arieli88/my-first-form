

const container = document.getElementById('participantsContainer');

function addParticipant() {
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `
        <div class="col">
            <input type="text" name="participantName[]" placeholder="שם פרטי" required class="form-control mt-2">
        </div>
        <div class="col">
            <input type="text" name="participantLastName[]" placeholder="שם משפחה" required class="form-control mt-2">
        </div>
        <div class="col">
            <select name="participantRelation[]" class="form-control mt-2">
            <option value="kirva">קרבה לחלל</option>
            <option value="aba">אבא</option>
            <option value="ima">אמא</option>
            <option value="ach">אח</option>
            <option value="achot">אחות</option>
            <option value="ben">בן</option>
            <option value="bat">בת</option>
            <option value="dod">דוד</option>
            <option value="doda">דודה</option>
            <option value="saba">סבא</option>
            <option value="savta">סבתא</option>
            
            </select>
        </div>
        <div class="col">
            <input type="number" name="participantAge[]" placeholder="גיל" required class="form-control mt-2">
        </div>
        <div class="col">
            <input type="text" name="participantCellphone[]" placeholder="פלאפון" required class="form-control mt-2">
        </div>
        <div class="col">
            <input type="text" name="participantNotes[]" placeholder="הערות" class="form-control mt-2">
        </div>
    `;
    container.appendChild(div);
}

function calculateTotalPeople() {
    const adults = document.getElementById('adults').value || 0;
    const children = document.getElementById('children').value || 0;
    document.getElementById('totalPeople').value = parseInt(adults, 10) + parseInt(children, 10);
}

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        name: formData.get('firstname'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        participants: formData.getAll('participants[]'),
        vacation: formData.get('vacation')
    };

    // AJAX request to server
    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            alert('Error saving data!');
            return;
        }
        alert('Data saved successfully!');
    });
});
