export function Logo(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 18 18"
			fill={props.fill ?? "#000000"}
			{...props}
		>
			<title>Istota Logo</title>
			<g
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				stroke="currentColor"
			>
				<path
					d="m11.24,6.289l-2.24-4.539-2.24,4.539-5.01.728,3.625,3.534-.856,4.989,3.9892-2.0965c-.0054-.0638-.0082-.1283-.0082-.1935,0-1.2426,1.0074-2.25,2.25-2.25h.25v-.25c0-1.2426,1.0074-2.25,2.25-2.25.4215,0,.8795.1474,1.2167.349l1.7833-1.832-5.01-.728Z"
					fill="currentColor"
					fillRule="evenodd"
					opacity=".3"
					strokeWidth="0"
				/>
				<line x1="13.25" y1="10.75" x2="13.25" y2="15.75" />
				<line x1="15.75" y1="13.25" x2="10.75" y2="13.25" />
				<polyline points="14.9509 8.2841 16.25 7.017 11.24 6.29 9 1.75 6.76 6.29 1.75 7.017 5.375 10.551 4.519 15.54 7.8043 13.8138" />
			</g>
		</svg>
	);
}
