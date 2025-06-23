export function Logo(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 18 18"
			fill={props.fill ?? "#000000"}
			{...props}
		>
			<title>Odkryj Logo</title>
			<g
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				stroke="currentColor"
			>
				<path
					d="M5.5 8.843L6.582 11.034L9 11.386L7.25 13.091L7.663 15.5L5.5 14.363L3.337 15.5L3.75 13.091L2 11.386L4.418 11.034L5.5 8.843Z"
					fill="currentColor"
					fillOpacity="0.3"
					data-stroke="none"
					stroke="none"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.78766 7.3833C4.20925 6.88876 4.83204 6.593 5.5 6.593C6.35624 6.593 7.13827 7.079 7.51741 7.84673L8.07596 8.97777L9.32413 9.15947C10.1716 9.28285 10.8756 9.87666 11.1401 10.6913C11.3365 11.2965 11.2651 11.9457 10.9637 12.4845C12.6147 11.668 13.75 9.96656 13.75 8C13.75 5.23858 11.5114 3 8.75 3C6.19738 3 4.09152 4.91284 3.78766 7.3833Z"
					fill="currentColor"
					fillOpacity="0.3"
					data-stroke="none"
					stroke="none"
				/>
				<path d="M16.25 15.5L12.285 11.535" />
				<path d="M3.859 6.957C4.339 4.696 6.346 3 8.75 3C11.511 3 13.75 5.239 13.75 8C13.75 9.816 12.782 11.405 11.334 12.281" />
				<path d="M5.5 8.843L6.582 11.034L9 11.386L7.25 13.091L7.663 15.5L5.5 14.363L3.337 15.5L3.75 13.091L2 11.386L4.418 11.034L5.5 8.843Z" />
			</g>
		</svg>
	);
}
