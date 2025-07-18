"use client";

import { useMounted } from "@mantine/hooks";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export function Captcha({
	invisible = false,
}: {
	readonly invisible?: boolean;
}) {
	const ref = useRef<TurnstileInstance>(null);
	const isMounted = useMounted();
	const { setCaptchaToken, setResetCaptcha } = useCaptcha();

	useEffect(() => {
		if (isMounted) {
			setResetCaptcha(() => () => ref.current?.reset());
		}
	}, [isMounted, setResetCaptcha]);

	if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
		return null;
	}

	return (
		<Turnstile
			ref={ref}
			className={(invisible && "hidden") || ""}
			siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
			onSuccess={(token: string) => {
				setCaptchaToken(token);
			}}
			onExpire={() => ref.current?.reset()}
		/>
	);
}

interface CaptchaContextType {
	captchaToken: string;
	setCaptchaToken: (token: string) => void;
	resetCaptcha: () => void;
	setResetCaptcha: (resetFn: () => void) => void;
}

const CaptchaContext = createContext<CaptchaContextType | undefined>(undefined);

export const useCaptcha = () => {
	const context = useContext(CaptchaContext);
	if (!context) {
		throw new Error("useCaptcha must be used within a CaptchaProvider");
	}
	return context;
};

export const CaptchaProvider = ({ children }: { children: ReactNode }) => {
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [resetCaptcha, setResetCaptcha] = useState<() => void>(() => () => {});

	const value = useMemo(
		() => ({
			captchaToken,
			setCaptchaToken,
			resetCaptcha,
			setResetCaptcha,
		}),
		[captchaToken, resetCaptcha],
	);

	return (
		<CaptchaContext.Provider value={value}>{children}</CaptchaContext.Provider>
	);
};
