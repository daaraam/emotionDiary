import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../Components/MyButton';
import MyHeader from '../Components/MyHeader';

const getStringDate = date => {
	return date.toISOString().slice(0, 10);
};
function New() {
	const [date, setDate] = useState(getStringDate(new Date()));
	const navigate = useNavigate();
	return (
		<div>
			<MyHeader
				headText={'New Diary'}
				leftChild={
					<MyButton
						onClick={() => {
							navigate(-1);
						}}
						text={'<  뒤로가기'}
					/>
				}
			/>

			<div>
				<section>
					<h4>오늘은 언제인가요?</h4>
					<div className="input_box">
						<input
							className="input_date"
							type="date"
							value={date}
							onChange={e => setDate(e.target.value)}
						/>
					</div>
				</section>
			</div>
		</div>
	);
}

export default New;
