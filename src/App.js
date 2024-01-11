import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Diary from './Pages/Diary';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import New from './Pages/New';

const reducer = (state, action) => {
	let newState = [];
	switch (action.type) {
		case 'INIT': {
			return action.data;
		}
		case 'CREATE': {
			newState = [action.data, ...state];
			break;
		}
		case 'REMOVE': {
			newState = state.filter(item => item.id !== action.targetId);
			break;
		}
		case 'EDIT': {
			//id유지하면서 data를 바꿈
			newState = state.map(item => (item.id === action.data.id ? { ...action.data } : item));
			break;
		}
		default:
			return state;
	}
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
const dummyData = [
	{
		id: 1,
		emotion: 1,
		content: 'diary1',
		date: 1704296999873,
	},
	{
		id: 2,
		emotion: 2,
		content: 'diary2',
		date: 1704296999874,
	},
	{
		id: 3,
		emotion: 3,
		content: 'diary3',
		date: 1704296999875,
	},
	{
		id: 4,
		emotion: 4,
		content: 'diary4',
		date: 1704296999876,
	},
	{
		id: 5,
		emotion: 5,
		content: 'diary5',
		date: 1704296999877,
	},
];
function App() {
	const [data, dispatch] = useReducer(reducer, dummyData);
	const dataId = useRef(0);

	const onCreate = (date, content, emotion) => {
		dispatch({
			type: 'CREATE',
			data: {
				id: dataId.current,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
		dataId.current += 1;
	};

	const onRemove = targetId => {
		dispatch({ type: 'REMOVE', targetId });
	};
	const onEdit = (targetId, date, emotion, content) => {
		dispatch({
			type: 'EDIT',
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	};

	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
				<div className="App">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/new" element={<New />} />
							<Route path="/edit" element={<Edit />} />
							<Route path="/diary/:id" element={<Diary />} />
						</Routes>
					</BrowserRouter>
				</div>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default App;
