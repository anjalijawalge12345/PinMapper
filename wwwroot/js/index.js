// document.addEventListener("DOMContentLoaded", function () {
// 	const emailInput = document.querySelector(".login-input");
// 	const sendOtpBtn = document.getElementById("sendOtpBtn");
// 	const otpSection = document.getElementById("otpSection");
// 	const otpInputs = document.querySelectorAll(".otp-input");
// 	const inputButtonContainer = document.querySelector(
// 		".input-button-container"
// 	);

// 	function isValidEmail(email) {
// 		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 		return emailRegex.test(email);
// 	}

// 	emailInput.addEventListener("input", function () {
// 		const emailValue = emailInput.value.trim();
// 		sendOtpBtn.disabled = emailValue === "" || !isValidEmail(emailValue);
// 	});

// 	sendOtpBtn.addEventListener("click", function () {
// 		if (sendOtpBtn.textContent === "Validate user") {
// 			otpSection.style.display = "block";
// 			sendOtpBtn.textContent = "Sign In";
// 			sendOtpBtn.disabled = true;

// 			inputButtonContainer.classList.add("no-gap");
// 		} else if (sendOtpBtn.textContent === "Sign In") {
// 			window.location.href = "/Home/Dashboard";
// 		}
// 	});

// 	function checkOtpCompletion() {
// 		const allFilled = [...otpInputs].every(
// 			(input) => input.value.trim() !== ""
// 		);
// 		sendOtpBtn.disabled = !allFilled;
// 	}

// 	otpInputs.forEach((input) => {
// 		input.addEventListener("input", checkOtpCompletion);
// 	});
// });
document.addEventListener("DOMContentLoaded", function () {
	const emailInput = document.querySelector(".login-input");
	const sendOtpBtn = document.getElementById("sendOtpBtn");
	const otpSection = document.getElementById("otpSection");
	const otpInputs = document.querySelectorAll(".otp-input");
	const inputButtonContainer = document.querySelector(".input-button-container");

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	emailInput.addEventListener("input", function () {
		const emailValue = emailInput.value.trim();
		sendOtpBtn.disabled = emailValue === "" || !isValidEmail(emailValue);
	});

	sendOtpBtn.addEventListener("click", function () {
		if (sendOtpBtn.textContent === "Validate user") {
			otpSection.style.display = "block";
			sendOtpBtn.textContent = "Sign In";
			sendOtpBtn.disabled = true;
			inputButtonContainer.classList.add("no-gap");

			// Focus on first OTP input
			if (otpInputs.length > 0) otpInputs[0].focus();
		} else if (sendOtpBtn.textContent === "Sign In") {
			window.location.href = "/Home/Dashboard";
		}
	});

	function checkOtpCompletion() {
		const allFilled = [...otpInputs].every((input) => input.value.trim() !== "");
		sendOtpBtn.disabled = !allFilled;
	}

	otpInputs.forEach((input, index) => {
		input.addEventListener("input", function (e) {
			const value = e.target.value;
			if (value.length === 1 && index < otpInputs.length - 1) {
				otpInputs[index + 1].focus();
			}
			checkOtpCompletion();
		});

		input.addEventListener("keydown", function (e) {
			if (e.key === "Backspace") {
				if (input.value === "" && index > 0) {
					otpInputs[index - 1].focus();
				}
			}
		});
	});
});
