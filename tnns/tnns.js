import { information } from "./tnns.mjs";

document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll(".bubbles > div").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      const info = information.find((item) => item.id === id);
      if (info) {
        showModal(info);
      }
    });
  });

  document.querySelector("#closeModal").addEventListener("click", () => {
    document.querySelector("#infoModal").style.display = "none";
  });
});

function showModal(info) {
  const modal = document.querySelector("#infoModal");
  modal.querySelector("h2").textContent = info.title;
  modal.querySelector("p").textContent = info.description;
  modal.style.display = "block";
}

/* Registration Form */
if (window.location.pathname.includes("register.html")) {
    let participantCount = 1;
  
    document.getElementById("add").addEventListener("click", function () {
      participantCount++;
      const newParticipantHTML = participantTemplate(participantCount);
      document.getElementById("add").insertAdjacentHTML("beforebegin", newParticipantHTML);
    });
  
    function participantTemplate(count) {
      return `
        <section class="participant${count}">
          <p>Participant ${count}</p>
          <div class="item">
            <label for="fname${count}"> First Name<span>*</span></label>
            <input id="fname${count}" type="text" name="fname${count}" required />
          </div>
          <div class="item activities">
            <label for="activity${count}">Event<span>*</span></label>
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
            <p>Skill Level</p>
            <select id="skill${count}">
              <option value="" disabled selected></option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </section>
      `;
    }
  
    document.querySelector("form").addEventListener("submit", submitForm);
  
    function submitForm(event) {
      event.preventDefault();
      let totalFee = totalFees();
      let participantCount = document.querySelectorAll("[class^=participant]").length - 1;
      let adultName = document.getElementById("adult_name").value;
  
      document.querySelector("form").style.display = "none";
      let summaryElement = document.getElementById("summary");
      summaryElement.style.display = "block";
  
      summaryElement.innerHTML = successTemplate({
        name: adultName,
        participantCount: participantCount,
        totalFee: totalFee
      });
    }
  
    function totalFees() {
      let feeElements = document.querySelectorAll("[id^=fee]");
      return [...feeElements].reduce((sum, input) => {
        return sum + (parseFloat(input.value) || 0);
      }, 0);
    }
  
    function successTemplate(info) {
      return `
        <h2>Thank you, ${info.name}, for registering!</h2>
        <p>You have registered ${info.participantCount} participant(s) and owe $${info.totalFee.toFixed(2)} in fees.</p>
      `;
    }
  }
  