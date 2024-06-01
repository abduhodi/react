import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Login from "./components/Login";

const App: React.FC = () => {
	const recaptchaSiteKey: string =
		process.env.REACT_APP_RECAPTCHA_SITE_KEY || "reCAPTCHA_SITE_KEY";

	return (
		<GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
			<div className="App">
				<Login />
			</div>
		</GoogleReCaptchaProvider>
	);
};

export default App;
