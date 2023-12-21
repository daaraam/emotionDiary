import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Edit() {
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get('id');
	console.log('id:', id);
	const mode = searchParams.get('mode');
	console.log('mode:', mode);

	const navigate = useNavigate();

	return (
		<div>
			Edit
			<br />
			<button onClick={() => setSearchParams({ id: 8000 })}>mode</button>
			<button
				onClick={() => {
					navigate('/home');
				}}
			>
				네비게이트
			</button>
			<button
				onClick={() => {
					navigate(-1);
				}}
			>
				뒤로가기
			</button>
		</div>
	);
}

export default Edit;
