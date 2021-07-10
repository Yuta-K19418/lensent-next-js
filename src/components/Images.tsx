import Image from 'next/image';
import { VFC } from 'react';
import Icon from '/app/lensent-next-js/public/logo.png';
import Top from '/app/lensent-next-js/public/Innovation_Isometric.svg';

export const IconImage: VFC = () =>{

	return (
		<>
			<Image src={Icon} alt="" width="70" height="70"/>
		</>
	);
}

export const TopImage: VFC = () =>{

	return (
		<>
			<Image src={Top} alt="" width="500" height="500" />
		</>
	);
}
