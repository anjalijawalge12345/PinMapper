// // document.addEventListener("DOMContentLoaded", function () {
// // 	const emailInput = document.querySelector(".login-input");
// // 	const sendOtpBtn = document.getElementById("sendOtpBtn");
// // 	const otpSection = document.getElementById("otpSection");
// // 	const otpInputs = document.querySelectorAll(".otp-input");
// // 	const inputButtonContainer = document.querySelector(
// // 		".input-button-container"
// // 	);

// // 	function isValidEmail(email) {
// // 		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // 		return emailRegex.test(email);
// // 	}

// // 	emailInput.addEventListener("input", function () {
// // 		const emailValue = emailInput.value.trim();
// // 		sendOtpBtn.disabled = emailValue === "" || !isValidEmail(emailValue);
// // 	});

// // 	sendOtpBtn.addEventListener("click", function () {
// // 		if (sendOtpBtn.textContent === "Validate user") {
// // 			otpSection.style.display = "block";
// // 			sendOtpBtn.textContent = "Sign In";
// // 			sendOtpBtn.disabled = true;

// // 			inputButtonContainer.classList.add("no-gap");
// // 		} else if (sendOtpBtn.textContent === "Sign In") {
// // 			window.location.href = "/Home/Dashboard";
// // 		}
// // 	});

// // 	function checkOtpCompletion() {
// // 		const allFilled = [...otpInputs].every(
// // 			(input) => input.value.trim() !== ""
// // 		);
// // 		sendOtpBtn.disabled = !allFilled;
// // 	}

// // 	otpInputs.forEach((input) => {
// // 		input.addEventListener("input", checkOtpCompletion);
// // 	});
// // });
// document.addEventListener("DOMContentLoaded", function () {
// 	 const togglePassword = document.getElementById("togglePassword");
//     const passwordInput = document.getElementById("passwordInput");

//     togglePassword.addEventListener("click", function () {
//         const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
//         passwordInput.setAttribute("type", type);

//         // Toggle icon
//         this.classList.toggle("ri-eye-off-fill");
//         this.classList.toggle("ri-eye-fill");
//     });
// 	let otpTimerInterval;

//     function startOTPTimer(duration = 180) {
//         const display = document.getElementById("otpTimer");
//         let timer = duration;

//         clearInterval(otpTimerInterval); // Clear if already running

//         otpTimerInterval = setInterval(function () {
//             const minutes = Math.floor(timer / 60);
//             const seconds = timer % 60;

//             display.textContent = `Time left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

//             if (--timer < 0) {
//                 clearInterval(otpTimerInterval);
//                 display.textContent = "OTP expired. Please resend.";
//             }
//         }, 1000);
//     }
// 	const emailInput = document.querySelector(".login-input");
// 	const password= document.querySelector(".password-input");
// 	const sendOtpBtn = document.getElementById("sendOtpBtn");
// 	const otpSection = document.getElementById("otpSection");
// 	const otpInputs = document.querySelectorAll(".otp-input");
// 	const inputButtonContainer = document.querySelector(".form");

// 	function isValidEmail(email) {
// 		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 		return emailRegex.test(email);
// 	}

// 	emailInput.addEventListener("input", function () {
// 		const emailValue = emailInput.value.trim();
// 		 const passwordValue = passwordInput.value.trim();
// 		 console.log("passwordValue",password.value)
// 		sendOtpBtn.disabled = emailValue === "" || !isValidEmail(emailValue) || passwordValue === "";
// 	});

// 	sendOtpBtn.addEventListener("click", function () {
// 		if (sendOtpBtn.textContent === "Validate user") {
// 			otpSection.style.display = "block";
// 			sendOtpBtn.textContent = "Sign In";
// 			sendOtpBtn.disabled = true;
// 			inputButtonContainer.classList.add("no-gap");

// 			// Focus on first OTP input
// 			if (otpInputs.length > 0) otpInputs[0].focus();
// 		} else if (sendOtpBtn.textContent === "Sign In") {
// 			console.log("Sign In");
// 			window.location.href = "/Home/Dashboard";
// 		}
// 	});
//   startOTPTimer(180);
// 	function checkOtpCompletion() {
// 		const allFilled = [...otpInputs].every((input) => input.value.trim() !== "");
// 		sendOtpBtn.disabled = !allFilled;
// 	}

// 	otpInputs.forEach((input, index) => {
// 		input.addEventListener("input", function (e) {
// 			const value = e.target.value;
// 			if (value.length === 1 && index < otpInputs.length - 1) {
// 				otpInputs[index + 1].focus();
// 			}
// 			checkOtpCompletion();
// 		});

// 		input.addEventListener("keydown", function (e) {
// 			if (e.key === "Backspace") {
// 				if (input.value === "" && index > 0) {
// 					otpInputs[index - 1].focus();
// 				}
// 			}
// 		});
// 	});
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const togglePassword = document.getElementById("togglePassword");
//     const passwordInput = document.getElementById("passwordInput");

//     togglePassword.addEventListener("click", function () {
//         const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
//         passwordInput.setAttribute("type", type);
//         this.classList.toggle("ri-eye-off-line");
//         this.classList.toggle("ri-eye-line");
//     });

//     let otpTimerInterval;

//     function startOTPTimer(duration = 180) {
//         const display = document.getElementById("otpTimer");
//         let timer = duration;

//         clearInterval(otpTimerInterval); // Clear if already running

//         otpTimerInterval = setInterval(function () {
//             const minutes = Math.floor(timer / 60);
//             const seconds = timer % 60;

//             display.textContent = `Time left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

//             if (--timer < 0) {
//                 clearInterval(otpTimerInterval);
//                 display.textContent = "OTP expired. Please resend.";
//             }
//         }, 1000);
//     }

//     const emailInput = document.querySelector(".login-input");
//     const sendOtpBtn = document.getElementById("sendOtpBtn");
//     const otpSection = document.getElementById("otpSection");
//     const otpInputs = document.querySelectorAll(".otp-input");
//     const inputButtonContainer = document.querySelector(".form");

//     function isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     // ✅ Combined Validation Function
//     function validateInputs() {
//         const emailValue = emailInput.value.trim();
//         const passwordValue = passwordInput.value.trim();
//         const isEmailValid = isValidEmail(emailValue);
//         const isPasswordValid = passwordValue !== "";

//         sendOtpBtn.disabled = !(isEmailValid && isPasswordValid);
//     }

//     // Trigger validateInputs when either email or password changes
//     emailInput.addEventListener("input", validateInputs);
//     passwordInput.addEventListener("input", validateInputs);

//     sendOtpBtn.addEventListener("click", function () {
//         if (sendOtpBtn.textContent === "Validate user") {
//             otpSection.style.display = "block";
//             sendOtpBtn.textContent = "Sign In";
//             sendOtpBtn.disabled = true;
//             inputButtonContainer.classList.add("no-gap");

//             // Focus on first OTP input
//             if (otpInputs.length > 0) otpInputs[0].focus();
//         } else if (sendOtpBtn.textContent === "Sign In") {
//             console.log("Sign In");
//             window.location.href = "/Home/Dashboard";
//         }
//     });

//     startOTPTimer(180);

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
//             if (e.key === "Backspace") {
//                 if (input.value === "" && index > 0) {
//                     otpInputs[index - 1].focus();
//                 }
//             }
//         });
//     });
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
    const inputContainer= document.querySelector(".input-group");
    const pass= document.querySelector(".input-group1");
    const loginSubtext= document.querySelector(".login-subtext");
    
    let otpTimerInterval;

    // Toggle password visibility
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.classList.toggle("ri-eye-off-line");
        this.classList.toggle("ri-eye-line");
    });

    // Start OTP Timer
    function startOTPTimer(duration = 180) {
        let timer = duration;

        clearInterval(otpTimerInterval); // Clear if already running
        otpTimerInterval = setInterval(function () {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;

            otpTimerDisplay.textContent = `Time left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

             if (--timer < 0) {
                 clearInterval(otpTimerInterval);
             }
        }, 1000);
    }

    // Validate Email Format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ✅ Input Validation Function
    function validateInputs() {
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const isEmailValid = isValidEmail(emailValue);
        const isPasswordValid = passwordValue !== "";

        sendOtpBtn.disabled = !(isEmailValid && isPasswordValid);
    }

    // Trigger validation when email or password changes
    emailInput.addEventListener("input", validateInputs);
    passwordInput.addEventListener("input", validateInputs);
    sendOtpBtn.addEventListener("click", async function (e) {
        e.preventDefault(); // Prevent form submission
        if (sendOtpBtn.textContent === "Send OTP") {

            try {
                const response = await fetch("/home/Login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: emailInput.value,
                        password: passwordInput.value
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                debugger;
                if (response.status == 200) {
                    
                 inputContainer.style.display = "none"; 
                 pass.style.display = "none";
                otpSection.style.display = "block";
                loginSubtext.textContent = "Enter OTP to access your account"; 
                    sendOtpBtn.textContent = "Sign In";
                    console.log("sendOtpBtn",sendOtpBtn)
                    sendOtpBtn.disabled = true;
                    inputButtonContainer.classList.add("no-gap");

                    startOTPTimer(180); // Start OTP timer
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
            console.log("Sign In");
            window.location.href = "/Home/Dashboard";
        }
    });

    // OTP Input Handling
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

    startOTPTimer(180);
});
