// Participant Button Step 1: 
let participantCount = 1;

// Step 2: 
document.getElementById("add").addEventListener("click", function () {
    participantCount++; 

    // Step 3: 
    const newParticipantHTML = participantTemplate(participantCount);

    // Step 4: 
    document.getElementById("add").insertAdjacentHTML("beforebegin", newParticipantHTML);
});

// Step 3: 
function participantTemplate(count) {
    return `
      <section class="participant${count}">
        <p>Participant ${count}</p>
        <div class="item">
          <label for="fname${count}"> First Name<span>*</span></label>
          <input id="fname${count}" type="text" name="fname${count}" required />
        </div>
        <div class="item activities">
          <label for="activity${count}">Activity #<span>*</span></label>
          <input id="activity${count}" type="text" name="activity${count}" />
        </div>
        <div class="item">
          <label for="fee${count}">Fee ($)<span>*</span></label>
          <input id="fee${count}" type="number" name="fee${count}" />
        </div>
        <div class="item">
          <label for="date${count}">Desired Date <span>*</span></label>
          <input id="date${count}" type="date" name="date${count}" />
        </div>
        <div class="item">
          <p>Grade</p>
          <select id="grade${count}">
            <option value="" disabled selected></option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
      </section>
    `;
}

// Submit Button Step 1:
document.querySelector("form").addEventListener("submit", submitForm);

// Step 2:
function submitForm(event) {
    event.preventDefault(); 

    // Step 3: 
    let totalFee = totalFees();

    let participantCount = document.querySelectorAll("[class^=participant]").length -1;

    // Step 4: 
    let adultName = document.getElementById("adult_name").value;

    // Step 5:
    document.querySelector("form").style.display = "none";
    let summaryElement = document.getElementById("summary");
    summaryElement.style.display = "block";

    summaryElement.innerHTML = successTemplate({
        name: adultName,
        participantCount: participantCount,
        totalFee: totalFee
    });
}

// Function to Calculate Total Fees
function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements]; 

    let total = feeElements.reduce((sum, input) => {
        return sum + (parseFloat(input.value) || 0);
    }, 0);

    return total;
}

// Function to Generate Success Message
function successTemplate(info) {
    return `
        <h2>Thank you, ${info.name}, for registering!</h2>
        <p>You have registered ${info.participantCount} participant(s) and owe $${info.totalFee} in fees.</p>
    `;
}

