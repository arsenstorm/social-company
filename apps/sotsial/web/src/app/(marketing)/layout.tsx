// Components

import { Logo } from "@social/components/logo/sotsial";
import { MarketingHeader } from "@social/components/marketing/header";
import { MarketingContainer } from "@social/components/marketing/marketing-container";
import { SimpleFooter } from "@social/components/marketing/simple-footer";

export default function MarketingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<MarketingContainer>
			<MarketingHeader logo={<Logo className="size-6" />} logoText="Sotsial" />
			<div className="flex-1 grow">{children}</div>
			<SimpleFooter />
		</MarketingContainer>
	);
}
