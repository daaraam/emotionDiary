import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteTest from './Components/RouteTest';
import Diary from './Pages/Diary';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import New from './Pages/New';

function App() {
	return (
		<BrowserRouter>
			<h1>App</h1>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/new" element={<New />} />
				<Route path="/edit" element={<Edit />} />
				<Route path="/diary/:id" element={<Diary />} />
			</Routes>
			<RouteTest />
		</BrowserRouter>
	);
}

export default App;
