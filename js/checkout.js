// Form tutorial by Web Dev Simplified (YouTube)

const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const progressBar = document.querySelector(".progress-bar");
const progressBarSteps = [...progressBar.querySelectorAll(".progress-step")];
const validatorContainer = document.querySelector(".validator-container");

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

if (currentStep < 0) {
  currentStep = 0;
  formSteps[currentStep].classList.add("active");
  showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1;
  } else {
    return;
  }

  if (incrementor === null) {
    return;
  }
  const formInputs = [...formSteps[currentStep].querySelectorAll("input")];
  const allValid = formInputs.every((input) => input.reportValidity());
  if (allValid) {
    currentStep += incrementor;
    showCurrentStep();
  }
});

formSteps.forEach((step) => {
  step.addEventListener("animationend", (e) => {
    formSteps[currentStep].classList.remove("hide");
    e.target.classList.toggle("hide", !e.target.classList.contains("active"));
  });
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
  progressBarSteps.forEach((step, index) => {
    step.classList.toggle("progress-active", index === currentStep);
  });
}

function noSubmit(form) {
  form.preventDefault();
  validatorContainer.style.display = "block";
}

multiStepForm.addEventListener("submit", noSubmit);
