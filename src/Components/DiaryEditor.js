import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';
import EmotionItem from './EmotionItem';
import MyButton from './MyButton';
import MyHeader from './MyHeader';

function DiaryEditor({ isEdit, originData }) {
	const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

	const navigate = useNavigate();
	const contentRef = useRef();
	const [date, setDate] = useState(getStringDate(new Date()));
	const [emotion, setEmotion] = useState(3);
	const [content, setContent] = useState('');

	const handleClickEmote = useCallback(emotion => {
		setEmotion(emotion);
	}, []);

	const handleSubmit = () => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}

		if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '일기를 작성하시겠습니까?')) {
			if (!isEdit) {
				onCreate(date, content, emotion);
			} else {
				onEdit(originData.id, date, emotion, content);
			}
		}

		navigate('/', { replace: true });
		//replace true를 하면 뒤로가기를 눌러도 '/'로 이동하지 못함
	};

	const handleRemove = () => {
		if (window.confirm('삭제하시겠습니까?')) {
			onRemove(originData.id);
			navigate('/', { replace: true });
		}
	};

	useEffect(() => {
		if (isEdit) {
			setDate(getStringDate(new Date(parseInt(originData.date))));
			setEmotion(originData.emotion);
			setContent(originData.content);
		}
	}, [isEdit, originData]);

	return (
		<div className="DiaryEditor">
			<MyHeader
				headText={isEdit ? 'Edit Diary' : 'New Diary'}
				leftChild={
					<MyButton
						onClick={() => {
							navigate(-1);
						}}
						text={'<  Back'}
					/>
				}
				rightChild={isEdit && <MyButton text={'Delete'} type={'negative'} onClick={handleRemove} />}
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

				<section>
					<h4>오늘의 감정</h4>
					<div className="input_box emotion_list_wrapper">
						{emotionList.map(item => (
							<EmotionItem
								onClick={handleClickEmote}
								key={item.emotion_id}
								isSelected={emotion === item.emotion_id}
								{...item}
							/>
						))}
					</div>
				</section>

				<section>
					<h4>오늘의 일기</h4>
					<div className="input_box text_wrapper">
						<textarea
							placeholder="오늘은 어땠나요?"
							ref={contentRef}
							value={content}
							onChange={e => setContent(e.target.value)}
						/>
					</div>
				</section>

				<section>
					<div className="control_box">
						<MyButton text={'취소하기'} onClick={() => navigate(-1)} />
						<MyButton text={'작성완료'} onClick={handleSubmit} type={'positive'} />
					</div>
				</section>
			</div>
		</div>
	);
}
export default DiaryEditor;
