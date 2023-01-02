import React, { SVGProps } from 'react';

const SvgVerticalAlignTop = (props: SVGProps<SVGSVGElement>) => {
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
			<path d='M4 3h16v2H4zm4 8h3v10h2V11h3l-4-4z' />
		</svg>
	);
}

export default SvgVerticalAlignTop;
