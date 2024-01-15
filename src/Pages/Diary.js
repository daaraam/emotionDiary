import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import MyButton from '../Components/MyButton';
import MyHeader from '../Components/MyHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

function Diary() {
	const diaryList = useContext(DiaryStateContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState();

	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerHTML = `${id}번째 일기`;
	}, []);

	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find(item => parseInt(item.id) === parseInt(id));
			console.log(targetDiary);
			if (targetDiary) {
				setData(targetDiary);
			} else {
				alert('없는 일기입니다');
				navigate('/', { replace: true });
			}
		}
	}, [id, diaryList]);

	if (!data) {
		return <div className="DiaryPage">Loading...</div>;
	} else {
		const curEmotionData = emotionList.find(item => parseInt(item.emotion_id) === parseInt(data.emotion));
		console.log(curEmotionData);

		return (
			<div className="DiaryPage">
				<MyHeader
					headText={`${getStringDate(new Date(data.date))}`}
					leftChild={
						<MyButton
							text={'< Back'}
							onClick={() => {
								navigate(-1);
							}}
						/>
					}
					rightChild={
						<MyButton
							text={'Edit >'}
							onClick={() => {
								navigate(`/edit/${data.id}`);
							}}
						/>
					}
				/>
				<article>
					<section>
						<h4>오늘의 감정</h4>
						<div className={['diary_img_wrapper', `diary_img_wrapper_${data.emotion}`].join(' ')}>
							<img src={curEmotionData.emotion_img} />
							<div className="emotion_description">{curEmotionData.emotion_description}</div>
						</div>
					</section>
					<section>
						<h4>오늘의 일기</h4>
						<div className="diary_content_wrapper">
							<p>{data.content}</p>
						</div>
					</section>
				</article>
			</div>
		);
	}
}

export default Diary;
