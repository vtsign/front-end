import * as React from 'react';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';

import withRoot from './modules/withRoot';
import BannerIntro from './modules/views/BannerIntro';
import FAQs from './modules/views/FAQs';

function Intro() {
	return (
		<React.Fragment>
			<BannerIntro />
			<ProductValues />
			<ProductHowItWorks />
			<FAQs />
		</React.Fragment>
	);
}

export default withRoot(Intro);
