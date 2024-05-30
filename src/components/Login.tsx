import React, { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [submitEnabled, setSubmitEnabled] = useState(true);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!executeRecaptcha) {
			console.error("Execute recaptcha not yet available");
			return;
		}
		setSubmitEnabled(false);
		try {
			const recaptchaToken = await executeRecaptcha("signup");
			const response = await axios.post(
				"http://localhost:8080/api/student/signup",
				{ login: email, password, firstName: "Abduhodi", loginType: "email" },
				{ headers: { recaptcha: recaptchaToken } }
			);
			console.log(response.data);
			if(response?.data?.status){
				setMessage("Login successful");
			}
			else{
				setMessage("Login failed");
			}
		} catch (error) {
			console.log(error);
			setMessage("Login failed");
		} finally {
			setSubmitEnabled(true);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
				<h3 className="text-2xl font-bold text-center">
					Login to your account
				</h3>
				<form className="mt-4" onSubmit={handleSubmit}>
					<div>
						<label className="block" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							required
						/>
					</div>
					<div className="mt-4">
						<label className="block" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							required
						/>
					</div>
					<div className="flex items-baseline justify-between">
						<button
							type="submit"
							className={`${
								submitEnabled
									? "bg-blue-600 hover:bg-blue-900"
									: "bg-gray-600 cursor-not-allowed"
							} px-6 py-2 mt-4 text-white rounded-lg`}
							disabled={!submitEnabled}
						>
							Login
						</button>
					</div>
					<div className="mt-4">{message}</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
