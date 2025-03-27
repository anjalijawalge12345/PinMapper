// document.addEventListener("DOMContentLoaded", function () {
//     const togglePassword = document.getElementById("togglePassword");
//     const passwordInput = document.getElementById("passwordInput");
//     const emailInput = document.querySelector(".login-input");
//     const sendOtpBtn = document.getElementById("sendOtpBtn");
//     const otpSection = document.getElementById("otpSection");
//     const otpInputs = document.querySelectorAll(".otp-input");
//     const inputButtonContainer = document.querySelector(".form");
//     const otpTimerDisplay = document.getElementById("otpTimer");
//     const inputContainer = document.querySelector(".input-group");
//     const pass = document.querySelector(".input-group1");
//     const loginSubtext = document.querySelector(".login-subtext");
//     const resendOtpBtn = document.querySelector(".resend-otp");

//     let otpTimerInterval;

//     togglePassword.addEventListener("click", function () {
//         const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
//         passwordInput.setAttribute("type", type);
//         this.classList.toggle("ri-eye-off-line");
//         this.classList.toggle("ri-eye-line");
//     });
//     function startOTPTimer(duration = 180) {
//         let timer = duration;

//         clearInterval(otpTimerInterval);
//         otpTimerInterval = setInterval(function () {
//             const minutes = Math.floor(timer / 60);
//             const seconds = timer % 60;

//             otpTimerDisplay.textContent = `Time left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

//             if (--timer < 0) {
//                 clearInterval(otpTimerInterval);
//             }
//         }, 1000);
//     }
//     function isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }
//     function validateInputs() {
//         const emailValue = emailInput.value.trim();
//         const passwordValue = passwordInput.value.trim();
//         const isEmailValid = isValidEmail(emailValue);
//         const isPasswordValid = passwordValue !== "";

//         sendOtpBtn.disabled = !(isEmailValid && isPasswordValid);
//     }
//     emailInput.addEventListener("input", validateInputs);
//     passwordInput.addEventListener("input", validateInputs);

//     sendOtpBtn.addEventListener("click", async function (e) {
//         e.preventDefault();
//         if (sendOtpBtn.textContent === "Send OTP") {
//             try {
//                 const response = await fetch("your-api-endpoint", {
//                     method: "POST",
//                     body: JSON.stringify({
//                         email: emailInput.value,
//                         password: passwordInput.value
//                     }),
//                     headers: { "Content-Type": "application/json" }
//                 });

//                 if (response.status !== 200) {
//                     inputContainer.style.display = "none";
//                     pass.style.display = "none";
//                     otpSection.style.display = "block";
//                     loginSubtext.textContent = "Enter OTP to access your account";
//                     sendOtpBtn.textContent = "Sign In";
//                     sendOtpBtn.disabled = true;
//                     inputButtonContainer.classList.add("no-gap");

//                     startOTPTimer(180);
//                     if (otpInputs.length > 0) otpInputs[0].focus();
//                 } else {
//                     inputContainer.style.border = "1px solid #ED6A5A";
//                     pass.style.border = "1px solid #ED6A5A";
//                     sendOtpBtn.textContent = "Send OTP";
//                 }
//             } catch (error) {
//                 console.error("Error:", error);
//                 emailInput.style.border = "1px solid #ED6A5A";
//                 passwordInput.style.border = "1px solid #ED6A5A";
//             }
//         } else if (sendOtpBtn.textContent === "Sign In") {
//             validateOtp();
//         }
//     });
//     function checkOtpCompletion() {
//         const allFilled = [...otpInputs].every((input) => input.value.trim() !== "");
//         sendOtpBtn.disabled = !allFilled;
//     }

//     otpInputs.forEach((input, index) => {
//         input.addEventListener("input", function (e) {
//             const value = e.target.value;
//             if (value.length === 1 && index < otpInputs.length - 1) {
//                 otpInputs[index + 1].focus();
//             }
//             checkOtpCompletion();
//         });

//         input.addEventListener("keydown", function (e) {
//             if (e.key === "Backspace" && input.value === "" && index > 0) {
//                 otpInputs[index - 1].focus();
//             }
//         });
//     });
//     async function validateOtp() {
//         const otpValue = [...otpInputs].map(input => input.value).join("");

//         try {
//             const response = await fetch("your-otp-validation-api", {
//                 method: "POST",
//                 body: JSON.stringify({ otp: otpValue }),
//                 headers: { "Content-Type": "application/json" }
//             });

//             if (response.status === 200) {
//                 window.location.href = "/Home/Dashboard";
//             } else {

//                 otpInputs.forEach(input => {
//                     input.style.border = " 1px solid #FF5C48";
//                 });

//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }
// });
document.addEventListener("DOMContentLoaded", function () {
	const togglePassword = document.getElementById("togglePassword");
	const passwordInput = document.getElementById("passwordInput");
	const emailInput = document.querySelector(".login-input");
	const sendOtpBtn = document.getElementById("sendOtpBtn");
	const otpSection = document.getElementById("otpSection");
	const otpInputs = document.querySelectorAll(".otp-input");
	const inputButtonContainer = document.querySelector(".form");
	const otpTimerDisplay = document.getElementById("otpTimer");
	const inputContainer = document.querySelector(".input-group");
	const pass = document.querySelector(".input-group1");
	const loginSubtext = document.querySelector(".login-subtext");
	const resendOtpBtn = document.querySelector(".resend-otp");
	const loginText = document.querySelector(".login-header");

	let otpTimerInterval;

	togglePassword.addEventListener("click", function () {
		const type =
			passwordInput.getAttribute("type") === "password" ? "text" : "password";
		passwordInput.setAttribute("type", type);
		this.classList.toggle("ri-eye-off-line");
		this.classList.toggle("ri-eye-line");
	});

	function startOTPTimer(duration = 180) {
		let timer = duration;
		clearInterval(otpTimerInterval);
		otpTimerInterval = setInterval(function () {
			const minutes = Math.floor(timer / 60);
			const seconds = timer % 60;
			otpTimerDisplay.textContent = `Time left: ${String(minutes).padStart(
				2,
				"0"
			)}:${String(seconds).padStart(2, "0")}`;

			if (--timer < 0) {
				clearInterval(otpTimerInterval);
				otpTimerDisplay.textContent = "Didn't get the code?";
			}
		}, 1000);
	}

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validateInputs() {
		const emailValue = emailInput.value.trim();
		const passwordValue = passwordInput.value.trim();
		const isEmailValid = isValidEmail(emailValue);
		const isPasswordValid = passwordValue !== "";
		sendOtpBtn.disabled = !(isEmailValid && isPasswordValid);
	}

	emailInput.addEventListener("input", validateInputs);
	passwordInput.addEventListener("input", validateInputs);
	sendOtpBtn.addEventListener("click", async function (e) {
		e.preventDefault();
		if (sendOtpBtn.textContent === "Send OTP") {
			try {
				const response = await fetch("your-api-endpoint", {
					method: "POST",
					body: JSON.stringify({
						email: emailInput.value,
						password: passwordInput.value,
					}),
					headers: { "Content-Type": "application/json" },
				});

				if (response.status !== 200) {
					inputContainer.style.display = "none";
					pass.style.display = "none";
					otpSection.style.display = "block";
					loginSubtext.textContent = "Enter OTP to access your account";
					sendOtpBtn.textContent = "Sign In";
					sendOtpBtn.disabled = true;
					inputButtonContainer.classList.add("no-gap");
					const emailValue = emailInput.value;

					const firstName = emailValue.split("@")[0].split(".")[0];
					loginText.innerHTML = `Welcome ${
						firstName.charAt(0).toUpperCase() + firstName.slice(1)
					}!`;
					startOTPTimer(180);
					if (otpInputs.length > 0) otpInputs[0].focus();
				} else {
					inputContainer.style.border = "1px solid #ED6A5A";
					pass.style.border = "1px solid #ED6A5A";
					sendOtpBtn.textContent = "Send OTP";
				}
			} catch (error) {
				console.error("Error:", error);
				emailInput.style.border = "1px solid #ED6A5A";
				passwordInput.style.border = "1px solid #ED6A5A";
			}
		} else if (sendOtpBtn.textContent === "Sign In") {
			validateOtp();
		}
	});

	function checkOtpCompletion() {
		const otpValue = [...otpInputs].map((input) => input.value).join("");
		const allFilled = [...otpInputs].every(
			(input) => input.value.trim() !== ""
		);
		sendOtpBtn.disabled = !allFilled;
		console.log("otpValue",otpValue)
	}
	otpInputs.forEach((input, index) => {
		input.addEventListener("input", function (e) {
			const value = e.target.value;
			if (value.length === 1 && index < otpInputs.length - 1) {
				otpInputs[index + 1].focus();
			}
			console.log("value",value)
			checkOtpCompletion();
		});

		input.addEventListener("keydown", function (e) {
			if (e.key === "Backspace" && input.value === "" && index > 0) {
				otpInputs[index - 1].focus();
			}
		});
	});

	async function validateOtp() {
		console.log("i am here")
		const otpValue = [...otpInputs].map((input) => input.value).join("");
console.log("otpValue",otpValue)
		try {
			const response = await fetch("your-otp-validation-api", {
				method: "POST",
				body: JSON.stringify({ otp: otpValue }),
				headers: { "Content-Type": "application/json" },
			});

			if (response.status !== 200) {
				// window.location.href = "/Home/UserManagement";
				console.log("data is here")
			} else {
				otpInputs.forEach((input) => {
					input.style.border = "1px solid #FF5C48";
				});
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	// Resend OTP functionality
	resendOtpBtn.addEventListener("click", function () {
		// Clear OTP inputs
		otpInputs.forEach((input) => {
			input.value = "";
			input.style.border = "1px solid #E0F049";
			otpTimerDisplay.style.display = "block"; // Reset border color
		});

		// Restart the OTP timer
		startOTPTimer(180);

		// Call the API to resend OTP
		fetch("your-resend-otp-api", {
			method: "POST",
			body: JSON.stringify({ email: emailInput.value }),
			headers: { "Content-Type": "application/json" },
		}).catch((error) => console.error("Error:", error));
	});
});
