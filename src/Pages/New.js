import React, { useEffect } from 'react';
import DiaryEditor from '../Components/DiaryEditor';

function New() {
	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerHTML = `새로운 일기`;
	}, []);
	return (
		<div>
			<DiaryEditor />
		</div>
	);
}

export default New;
