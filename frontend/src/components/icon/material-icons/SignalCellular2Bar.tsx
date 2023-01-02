import React, { SVGProps } from 'react';

const SvgSignalCellular2Bar = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='1em'
			viewBox='0 0 24 24'
			width='1em'
			fill='currentColor'
			className='svg-icon'
			{...props}>
			<path d='M0 0h24v24H0V0z' fill='none' />
			<path d='M2 22h20V2L2 22z' fillOpacity={0.3} />
			<path d='M14 10L2 22h12V10z' />
		</svg>
	);
}

export default SvgSignalCellular2Bar;
