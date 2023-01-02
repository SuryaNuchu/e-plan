import React, { SVGProps } from 'react';

const SvgDragHandle = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='1em'
			viewBox='0 0 24 24'
			width='1em'
			fill='currentColor'
			className='svg-icon'
			{...props}>
			<path d='M0 0h24v24H0z' fill='none' />
			<path d='M4 9h16v2H4zm0 4h16v2H4z' />
		</svg>
	);
}

export default SvgDragHandle;
