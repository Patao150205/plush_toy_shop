import React, { FC } from 'react';
import style from './Footer.module.scss';


const Footer: FC = () => {
	return (
		<div className={style.root}>
			<div className="module-spacer--sm" />
			<h1><i className="fab fa-twitter"></i>製作者のTwitter</h1>
			<a className={style.link} href="https://github.com/Patao150205">https://github.com/Patao150205</a>
			<div className="module-spacer--sm" />
		</div>
	)
}

export default Footer
